import Offers from "@/components/info/Offers";
import WarrantySearch from "@/components/info/WarrantySearch";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { getWarrantyDetail } from "@/services/warranty/warrantyActions";
import { getBranchFormat } from "@/services/warranty/warrantyUtils";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const WarrantyInfo = async ({ searchParams }: Props) => {
  const searchTerm = Array.isArray(searchParams.search)
    ? searchParams.search[0]
    : searchParams.search;

  const data = await getWarrantyDetail(searchTerm || "");

  if (!("data" in data)) {
    console.error(data.message);
    throw new Error(data.message);
  }

  const format = (await getBranchFormat()).branch;

  const branchFormat = format.find((item) => item.id === "ampang-hq");

  if (branchFormat === undefined) {
    console.error("Branch format invalid.");
    throw new Error("Branch format invalid.");
  }

  return (
    <div className="mt-12 xs:mt-auto flex flex-col gap-8 xs:gap-16 max-w-[900px] w-full px-4 xs:px-16 py-4 mx-auto">
      <div className="top nav w-full flex justify-end"></div>
      <h2>Warranty Services</h2>
      <div className="flex flex-col gap-8 w-full">
        <div className="flex flex-col">
          <Offers />
        </div>
        <div className="max-w-[300px] flex gap-4 items-end">
          <WarrantySearch />
        </div>
        <div className="w-full flex">
          {data.data !== undefined ? (
            <div className="bg-zinc-900 p-4 rounded-md border-[1px] dark:border-zinc-800 border-zinc-400 w-full">
              <div className="flex">
                <div className="w-full min-w-[100px]">
                  <p className="whitespace-nowrap pb-3 text-zinc-400">
                    Service Number:
                  </p>
                </div>
                <div className="w-full">
                  <p className="pb-3">{data.data.serviceNo}</p>
                </div>
              </div>
              <div className="flex">
                <div className="w-full min-w-[100px] text-zinc-400">
                  <p className="whitespace-nowrap pb-3">Status:</p>
                </div>
                <div className="w-full">
                  <Badge
                    className={cn(
                      `${
                        branchFormat?.status.find(
                          (item) => item.type === data.data?.status
                        )?.color
                      }`
                    )}
                  >
                    {data.data.status}
                  </Badge>
                </div>
              </div>
              <div className="flex py-4">
                <div className="w-full border-[1px] dark:border-zinc-800 border-zinc-400" />
              </div>
              <div className="flex">
                <div className="w-full min-w-[100px] text-zinc-400">
                  <p className="whitespace-nowrap pb-3">Issues:</p>
                </div>
                <div className="w-full">
                  <p className="pb-3">{data.data.issues}</p>
                </div>
              </div>
              <div className="flex">
                <div className="w-full min-w-[100px] text-zinc-400">
                  <p className="whitespace-nowrap pb-3">Serviced by:</p>
                </div>
                <div className="w-full">
                  <Badge
                    className={cn(
                      `${
                        branchFormat?.all_pic.find(
                          (item) => item.type === data.data?.pic
                        )?.color
                      }`
                    )}
                  >
                    {data.data.pic}
                  </Badge>
                </div>
              </div>
              <div className="flex">
                <div className="w-full min-w-[100px] text-zinc-400">
                  <p className="whitespace-nowrap pb-3">Date Issued:</p>
                </div>
                <div className="w-full">
                  <p className="pb-3">{data.data.date}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex gap-4 items-center mx-auto py-8">
              <h1>Enter your Service Number.</h1>
            </div>
          )}
        </div>
      </div>
      <div className="h-[20vh]" />
    </div>
  );
};

export default WarrantyInfo;
