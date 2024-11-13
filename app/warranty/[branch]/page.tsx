import NewDropdownOutsideClick from "@/components/warranty/DropdownOutsideClick";
import SearchFilter from "@/components/warranty/SearchFilter";
import NewTable from "@/components/warranty/Table";
import { WarrantyDataType } from "@/services/common/FetchDB";
import { getDataByFilter } from "@/services/warranty/warrantyActions";
import { getBranchFormat } from "@/services/warranty/warrantyUtils";

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
    throw new Error("Branch Page Invalid.");
  }

  // const preData = await fetchData(
  //   branchFormat.data_local,
  //   10,
  //   1,
  //   "",
  //   "By: Service No",
  //   []
  // );

  const searchTerm = Array.isArray(searchParams.search)
    ? searchParams.search[0]
    : searchParams.search;

  const searchFilter = Array.isArray(searchParams.filter)
    ? searchParams.filter[0]
    : searchParams.filter;

  const preData = await getDataByFilter({
    tableName: branchFormat.data_local,
    pageSize: 10,
    pageNum: 1,
    search: searchTerm || "",
    searchBy: searchFilter || "By: Service No",
    sortList: [],
  });

  const data = preData as WarrantyDataType[];

  // console.log(data, "CJECK");

  return (
    <>
      <div className="hidden md:flex flex-col gap-16 w-full px-16 py-4">
        <div className="top nav w-full flex justify-end"></div>
        <div className="main-table flex flex-col gap-4">
          <h2>{branchFormat?.name} Warranty</h2>
          <SearchFilter branchData={branchFormat} />
          <NewTable data={data} />
        </div>
      </div>
      <NewDropdownOutsideClick />
      <div className="md:hidden flex justify-center items-center h-[100vh] text-center w-full">
        <h2>Use Desktop PC</h2>
      </div>
    </>
  );
};

export default Branch;
