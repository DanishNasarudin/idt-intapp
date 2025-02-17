import NewDropdownOutsideClick from "@/components/warranty/DropdownOutsideClick";
import SearchFilter from "@/components/warranty/SearchFilter";
import NewTable from "@/components/warranty/Table";
import TablePagination from "@/components/warranty/TablePagination";
import {
  getWarrantyByFilter,
  SortDbType,
} from "@/services/warranty/warrantyActions";
import { getBranchFormat } from "@/services/warranty/warrantyUtils";
import { Suspense } from "react";

type Props = {
  params: {
    branch: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
};

const Branch = async ({ params, searchParams }: Props) => {
  const branchId = params.branch;

  const format = (await getBranchFormat()).branch;

  const branchFormat = format.find((item) => item.id === branchId);

  if (branchFormat === undefined) {
    console.error("Branch format invalid.");
    throw new Error("Branch format invalid.");
  }

  const searchTerm = Array.isArray(searchParams.search)
    ? searchParams.search[0]
    : searchParams.search;

  const searchFilter = Array.isArray(searchParams.filter)
    ? searchParams.filter[0]
    : searchParams.filter;

  const searchSort = Array.isArray(searchParams.sort)
    ? searchParams.sort[0]
    : searchParams.sort;

  const parseSort =
    searchSort
      ?.split(",")
      .map((item) => {
        const [type, direction] = item.split("-");
        if (type && direction) {
          return { type, direction } as SortDbType;
        }
        return null;
      })
      .filter((entry): entry is SortDbType => entry !== null) || [];

  const searchPageNum = Array.isArray(searchParams.pageNum)
    ? searchParams.pageNum[0]
    : searchParams.pageNum;

  const searchPageSize = Array.isArray(searchParams.pageSize)
    ? searchParams.pageSize[0]
    : searchParams.pageSize;

  const branchData = await getWarrantyByFilter({
    tableName: branchFormat.data_local,
    pageSize: Number(searchPageSize || 10),
    pageNum: Number(searchPageNum || 1),
    search: searchTerm || "",
    searchBy: searchFilter || "By: Service No",
    sortList: parseSort,
  });

  const otherData = await getWarrantyByFilter({
    tableName: branchFormat.data_other,
    pageSize: 10,
    pageNum: 1,
    search: searchTerm || "",
    searchBy: searchFilter || "By: Service No",
    sortList: parseSort,
  });

  if (!("data" in branchData)) {
    console.error(branchData.message);
    throw new Error(branchData.message);
  }

  if (!("data" in otherData)) {
    console.error(otherData.message);
    throw new Error(otherData.message);
  }

  // console.log(branchData.data[0], "CJECK");

  return (
    <>
      <div className="hidden md:flex flex-col gap-16 w-full px-16 py-4">
        <div className="top nav w-full flex justify-end"></div>
        <div className="main-table flex flex-col gap-4">
          <h2>{branchFormat?.name} Warranty</h2>
          <Suspense>
            <SearchFilter branchData={branchFormat} />
          </Suspense>

          <NewTable data={branchData.data} />
          <TablePagination numData={branchData.totalCount} />
        </div>
        <div className="other-table flex flex-col gap-4">
          <h2>Other Branch Warranty</h2>
          <NewTable data={otherData.data} isDisabled />
        </div>
        <section className="h-[200px]"></section>
      </div>
      <NewDropdownOutsideClick />
      <div className="md:hidden flex justify-center items-center h-[100vh] text-center w-full">
        <h2>Use Desktop PC</h2>
      </div>
    </>
  );
};

export default Branch;
