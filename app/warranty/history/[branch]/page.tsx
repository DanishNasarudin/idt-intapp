import {
  getWarrantyHistory,
  WarrantyHistoryDataType,
} from "@/services/warranty/warrantyActions";
import { getBranchFormat } from "@/services/warranty/warrantyUtils";

type Props = {
  params: {
    branch: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
};

type HistoryDataDisplayType = {
  sortableChangeTimestamp: string;
  changeTimestamp: string;
  serviceNo: string;
  columns: Partial<WarrantyHistoryDataType>;
  changeType: string;
};

const History = async ({ params, searchParams }: Props) => {
  const branchId = params.branch;

  const format = (await getBranchFormat()).branch;

  const branchFormat = format.find((item) => item.id === branchId);

  const searchTerm = Array.isArray(searchParams.search)
    ? searchParams.search[0]
    : searchParams.search;

  const historyData = await getWarrantyHistory(branchId, searchTerm || "");

  if (!("data" in historyData)) {
    console.error(historyData.message);
    throw new Error(historyData.message);
  }

  const groupByServiceNo = (
    data: WarrantyHistoryDataType[]
  ): Record<string, WarrantyHistoryDataType[]> => {
    return data.reduce((acc, item) => {
      const serviceNo = item.serviceNo;
      if (!acc[serviceNo]) {
        acc[serviceNo] = [];
      }
      acc[serviceNo].push(item);
      return acc;
    }, {} as Record<string, WarrantyHistoryDataType[]>);
  };

  const filterChanges = (
    prevData: WarrantyHistoryDataType,
    newData: WarrantyHistoryDataType,
    excludeKeys: Array<keyof WarrantyHistoryDataType> = [
      "changeTimestamp",
      "changeType",
      "historyId",
    ]
  ): Partial<WarrantyHistoryDataType> => {
    return Object.keys(newData).reduce((changes, key) => {
      const typedKey = key as keyof WarrantyHistoryDataType;
      if (
        !excludeKeys.includes(typedKey) &&
        newData[typedKey] !== prevData[typedKey]
      ) {
        changes[typedKey] = newData[typedKey] as any;
      }
      return changes;
    }, {} as Partial<WarrantyHistoryDataType>);
  };

  const formatMySQLDate = (isoString: string) => {
    const date = new Date(isoString);
    const options = {
      year: "numeric" as const,
      month: "2-digit" as const,
      day: "2-digit" as const,
      hour: "2-digit" as const,
      minute: "2-digit" as const,
      second: "2-digit" as const,
      hour12: true,
    };
    const formattedDate = new Intl.DateTimeFormat("en-US", options)
      .format(date)
      .replace(/(\d+)\/(\d+)\/(\d+),/, "$3/$1/$2 at");
    return formattedDate;
  };

  const createChangeObjects = (
    data: WarrantyHistoryDataType[]
  ): HistoryDataDisplayType[] => {
    const groupedData = groupByServiceNo(data);
    const result: HistoryDataDisplayType[] = [];

    Object.values(groupedData).forEach((group) => {
      for (let i = 0; i < group.length - 1; i++) {
        const prevData = group[i];
        const newData = group[i + 1];

        // Use filterChanges to find the differences between newData and prevData
        const columns = filterChanges(prevData, newData, [
          "changeTimestamp",
          "changeType",
          "historyId",
        ]);

        if (Object.keys(columns).length > 0) {
          // Ensure there are changes
          result.push({
            sortableChangeTimestamp: newData.changeTimestamp,
            changeTimestamp: formatMySQLDate(newData.changeTimestamp),
            serviceNo: newData.serviceNo,
            columns,
            changeType: newData.changeType,
          });
        }
      }
    });

    result.sort(
      (a, b) =>
        new Date(a.sortableChangeTimestamp).getTime() -
        new Date(b.sortableChangeTimestamp).getTime()
    );

    return result;
  };

  const refactorData = createChangeObjects(historyData.data);

  return (
    <>
      <div className="hidden md:flex flex-col gap-16 w-full px-16 py-4">
        <div className="top nav w-full flex justify-end"></div>
        <div className="main-table flex flex-col gap-4">
          <h2>{branchFormat?.name} Warranty</h2>
          <div className="tab w-full">
            <div className="tab-head flex [&>div]:w-full [&>div]:px-2 [&>div]:py-1 text-zinc-400">
              <div className="max-w-[210px]">
                <span>Date</span>
              </div>
              <div className="max-w-[110px]">
                <span>Service No</span>
              </div>
              <div className="max-w-[9999px]">
                <span>Changed Values</span>
              </div>
              <div className="max-w-[100px]">
                <span>Type</span>
              </div>
            </div>
            <div className="tabbod">
              {refactorData &&
                refactorData.map((data, key) => {
                  return (
                    <div
                      key={key}
                      className="flex [&>div]:w-full [&>div]:px-2 [&>div]:py-1 border-t-[1px] border-zinc-800"
                    >
                      <div className="max-w-[210px]">
                        <span>{data.changeTimestamp}</span>
                      </div>
                      <div className="max-w-[110px] border-l-[1px] border-zinc-800">
                        <span>{data.serviceNo}</span>
                      </div>
                      <div className="max-w-[9999px] border-l-[1px] border-zinc-800">
                        {Object.entries(data.columns).map(([key, val]) => {
                          return (
                            <div key={key} className="w-auto">
                              <span>{`${key}: ${val}`}</span>
                            </div>
                          );
                        })}
                      </div>
                      <div className="max-w-[100px] border-l-[1px] border-zinc-800">
                        <span>{data.changeType}</span>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        <section className="h-[200px]"></section>
      </div>
      <div className="md:hidden flex justify-center items-center h-[100vh] text-center w-full">
        <h2>Use Desktop PC</h2>
      </div>
    </>
  );
};

export default History;
