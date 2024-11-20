"use client";
import { useEffect, useState } from "react";
// import { RowDataPacket } from "mysql2";
import { fetchHistoryData } from "@/services/common/FetchDB";
import { toast } from "sonner";
import { useDebounce } from "use-debounce";
import { Options } from "../../settings/page";

type Props = {};

type DataType = {
  sortableChangeTimestamp: string;
  change_timestamp: string;
  service_no: string;
  columns: Partial<HistoryDataType>;
  change_type: string;
};

type HistoryDataType = {
  history_id: number;
  service_no: string;
  date: string;
  idt_pc: string;
  received_by: string;
  pic: string;
  name: string;
  contact: string;
  status: string;
  email: string;
  address: string;
  purchase_date: string;
  invoice: string;
  received_items: string;
  pin: string;
  issues: string;
  solutions: string;
  status_desc: string;
  remarks: string;
  cost: string;
  locker: string;
  change_type: string;
  change_timestamp: string;
};

const searchOptions: Options[] = [
  { option: "Option 1", color: "bg-purple-600 text-purple-100" },
  { option: "Option 2", color: "bg-pink-600 text-pink-100" },
  { option: "Option 3", color: "bg-emerald-600 text-emerald-100" },
  { option: "Option 4", color: "bg-red-600 text-red-100" },
];

const History = ({ params }: { params: { branch: string } }) => {
  const [changeData, setData] = useState<DataType[]>([]);

  // Search handler -------------------
  const [searchFocus, setSearchFocus] = useState(false);
  const [search, setSearch] = useState("");
  const [searchValues] = useDebounce(search, 500);
  const [newEntry, setNewEntry] = useState(false);

  // console.log(params.branch);

  useEffect(() => {
    let dataHistory;
    if (params.branch === "ampang-hq") {
      dataHistory = "ap_local_history";
    } else if (params.branch === "ss2-pj") {
      dataHistory = "s2_local_history";
    } else if (params.branch === "setia-alam") {
      dataHistory = "sa_local_history";
    } else if (params.branch === "jb") {
      dataHistory = "jb_local_history";
    }

    if (dataHistory)
      fetchHistoryData(dataHistory, searchValues).then((data: any) => {
        const changeData = createChangeObjects(data.rows.reverse());

        changeData.sort(
          (a, b) =>
            new Date(a.sortableChangeTimestamp).getTime() -
            new Date(b.sortableChangeTimestamp).getTime()
        );
        setData(changeData);
        toast.success("Data refreshed.");
        // console.log(data.rows);
      });
  }, [searchValues, newEntry, params.branch]);

  // const searchFilter = useRef(searchOptions[0].option || "");

  function filterChanges(
    prevData: HistoryDataType,
    newData: HistoryDataType,
    excludeKeys: Array<keyof HistoryDataType> = [
      "change_timestamp",
      "change_type",
      "history_id",
    ]
  ): Partial<HistoryDataType> {
    return Object.keys(newData).reduce((changes, key) => {
      const typedKey = key as keyof HistoryDataType;
      if (
        !excludeKeys.includes(typedKey) &&
        newData[typedKey] !== prevData[typedKey]
      ) {
        changes[typedKey] = newData[typedKey] as any;
      }
      return changes;
    }, {} as Partial<HistoryDataType>);
  }

  // if (data[0] !== undefined && data[1] !== undefined)
  //   console.log(filterChanges(data[0], data[1]));

  function formatMySQLDate(isoString: string) {
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
  }

  const groupByServiceNo = (
    data: HistoryDataType[]
  ): Record<string, HistoryDataType[]> => {
    return data.reduce((acc, item) => {
      const serviceNo = item.service_no;
      if (!acc[serviceNo]) {
        acc[serviceNo] = [];
      }
      acc[serviceNo].push(item);
      return acc;
    }, {} as Record<string, HistoryDataType[]>);
  };

  const createChangeObjects = (data: HistoryDataType[]): DataType[] => {
    const groupedData = groupByServiceNo(data);
    const result: DataType[] = [];

    Object.values(groupedData).forEach((group) => {
      for (let i = 0; i < group.length - 1; i++) {
        const prevData = group[i];
        const newData = group[i + 1];

        // Use filterChanges to find the differences between newData and prevData
        const columns = filterChanges(prevData, newData, [
          "change_timestamp",
          "change_type",
          "history_id",
        ]);

        if (Object.keys(columns).length > 0) {
          // Ensure there are changes
          result.push({
            sortableChangeTimestamp: newData.change_timestamp,
            change_timestamp: formatMySQLDate(newData.change_timestamp),
            service_no: newData.service_no,
            columns,
            change_type: newData.change_type,
          });
        }
      }
    });

    return result;
  };

  // console.log(createChangeObjects(data));

  // console.log(changeData);

  // const searchRef = useRef("");

  return (
    <>
      <div className="hidden md:flex flex-col gap-16 w-full px-16 py-4">
        <div className="top nav w-full flex justify-end">
          {/* <Avatar className="rounded-full w-8">
            <AvatarImage src="https://idealtech.com.my/wp-content/uploads/2023/03/IDT_LOGO-150x150.png" />
            <AvatarFallback>IT</AvatarFallback>
          </Avatar> */}
        </div>
        <h2>History</h2>
        <div className="flex flex-col gap-8">
          <div className="flex gap-4 items-center">
            <p
              className={`
                    bg-transparent border-zinc-800 border-[1px] px-4 py-2 rounded-md flex gap-2 w-[210px]
                    ${searchFocus ? "!border-zinc-400" : ""}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-white w-4"
              >
                <path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"></path>
              </svg>
              <input
                type="text"
                value={search}
                name="search"
                onChange={(e) => setSearch((prev) => (prev = e.target.value))}
                // onBlur={() => {
                //   setTimeout(() => {
                //     setSearchFocus(false);
                //   }, 100);
                // }}
                // onFocus={() => setSearchFocus(true)}
                className={`bg-transparent outline-none w-full`}
                placeholder="Service No"
              />
            </p>
            {/* <DropdownIdv
              minSize="147"
              values={searchFilter.current}
              options={searchOptions}
              setValues={searchFilter}
              updateDB={() => {
                return;
              }}
            /> */}
            <button
              className={`
                            px-4 py-2 rounded-md transition-all border-[1px]
                            bg-transparent border-zinc-600 text-zinc-600
                            mobilehover:hover:border-zinc-400 mobilehover:hover:text-zinc-400`}
              onClick={() => {
                setTimeout(() => {
                  setNewEntry(!newEntry);
                }, 50);
              }}
            >
              <p>Refresh Data</p>
            </button>
          </div>
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
              {changeData &&
                changeData
                  .reverse()
                  .slice(0, 20)
                  .map((data, key) => {
                    return (
                      <div
                        key={key}
                        className="flex [&>div]:w-full [&>div]:px-2 [&>div]:py-1 border-t-[1px] border-zinc-800"
                      >
                        <div className="max-w-[210px]">
                          <span>{data.change_timestamp}</span>
                        </div>
                        <div className="max-w-[110px] border-l-[1px] border-zinc-800">
                          <span>{data.service_no}</span>
                        </div>
                        <div className="max-w-[9999px] border-l-[1px] border-zinc-800">
                          {/* <DropdownIdv
                          minSize="100"
                          options={searchOptions}
                          setValues={searchFilter}
                          updateDB={() => {
                            return;
                          }}
                          values={searchFilter.current}
                        /> */}
                          {Object.entries(data.columns).map(([key, val]) => {
                            return (
                              <div key={key} className="w-auto">
                                <span>{`${key}: ${val}`}</span>
                              </div>
                            );
                          })}
                        </div>
                        <div className="max-w-[100px] border-l-[1px] border-zinc-800">
                          <span>{data.change_type}</span>
                        </div>
                      </div>
                    );
                  })}
            </div>
          </div>
        </div>
        <div className="h-[20vh]" />
      </div>
      <div className="md:hidden flex justify-center items-center h-[100vh] text-center w-full">
        <h2>Use Desktop PC</h2>
      </div>
    </>
  );
};

export default History;
