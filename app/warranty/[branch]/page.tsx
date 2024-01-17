"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  addData,
  deleteData,
  fetchData,
  updateAllData,
  updateData,
} from "@/app/(serverActions)/FetchDB";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/(scn-components)/ui/avatar";
import Tables from "../(sections)/Tables";
import { stringify } from "querystring";
import Dropdown from "../(components)/Dropdown";
import { useDebounce } from "use-debounce";

type Props = {};

// Branch formats

export type BranchStatus = {
  type: string;
  color: string;
};

export type BranchType = {
  id: string;
  data_local: string;
  data_other: string;
  name: string;
  status: BranchStatus[];
  pic: BranchStatus[];
};

type BranchFormat = {
  branch: BranchType[];
};

const branchFormat: BranchFormat = {
  branch: [
    {
      id: "ampang-hq",
      data_local: "ap_local",
      data_other: "ap_other",
      name: "Ampang HQ",
      status: [
        { type: "Pending", color: "bg-purple-600 text-purple-100" },
        { type: "Completed", color: "bg-emerald-600 text-emerald-100" },
        { type: "Pass SS2", color: "bg-red-600 text-red-100" },
        { type: "Return SS2", color: "bg-cyan-600 text-cyan-100" },
        { type: "Pass Setia Alam", color: "bg-orange-600 text-orange-100" },
        { type: "Return Setia Alam", color: "bg-blue-600 text-blue-100" },
      ],
      pic: [
        { type: "Hanif", color: "bg-purple-600 text-purple-100" },
        { type: "Anthony", color: "bg-emerald-600 text-emerald-100" },
        { type: "Hafiz", color: "bg-red-600 text-red-100" },
        { type: "Khai", color: "bg-cyan-600 text-cyan-100" },
        { type: "Dixon", color: "bg-orange-600 text-orange-100" },
      ],
    },
    {
      id: "ss2-pj",
      data_local: "s2_local",
      data_other: "s2_other",
      name: "SS2, PJ",
      status: [
        { type: "Pending", color: "bg-purple-600 text-purple-100" },
        { type: "Completed", color: "bg-emerald-600 text-emerald-100" },
        { type: "Pass Ampang", color: "bg-red-600 text-red-100" },
        { type: "Return Ampang", color: "bg-cyan-600 text-cyan-100" },
        { type: "Pass Setia Alam", color: "bg-orange-600 text-orange-100" },
        { type: "Return Setia Alam", color: "bg-blue-600 text-blue-100" },
      ],
      pic: [
        { type: "John", color: "bg-purple-600 text-purple-100" },
        { type: "Richard", color: "bg-emerald-600 text-emerald-100" },
      ],
    },
    {
      id: "setia-alam",
      data_local: "sa_local",
      data_other: "sa_other",
      name: "Setia Alam",
      status: [
        { type: "Pending", color: "bg-purple-600 text-purple-100" },
        { type: "Completed", color: "bg-emerald-600 text-emerald-100" },
        { type: "Pass Ampang", color: "bg-red-600 text-red-100" },
        { type: "Return Ampang", color: "bg-cyan-600 text-cyan-100" },
        { type: "Pass SS2", color: "bg-orange-600 text-orange-100" },
        { type: "Return SS2", color: "bg-blue-600 text-blue-100" },
      ],
      pic: [
        { type: "Zaki", color: "bg-purple-600 text-purple-100" },
        { type: "Irfan", color: "bg-emerald-600 text-emerald-100" },
      ],
    },
    {
      id: "jb",
      data_local: "jb_local",
      data_other: "jb_other",
      name: "Johor Bharu",
      status: [
        { type: "Pending", color: "bg-purple-600 text-purple-100" },
        { type: "Completed", color: "bg-emerald-600 text-emerald-100" },
        { type: "Pass Ampang", color: "bg-red-600 text-red-100" },
        { type: "Return Ampang", color: "bg-cyan-600 text-cyan-100" },
      ],
      pic: [
        { type: "Dixon", color: "bg-purple-600 text-purple-100" },
        { type: "Ghost1", color: "bg-emerald-600 text-emerald-100" },
      ],
    },
  ],
};

// Input states

type InputValues = {
  search: string;
};

type InputState = {
  values: InputValues;
};

const initialInputState: InputState = {
  values: {
    search: "",
  },
};

// Data types

export type DataValues = {
  service_no: string | null;
  date: string | null;
  pic: string | null;
  name: string | null;
  contact: string | null;
  status: string | null;
  email: string | null;
  address: string | null;
  purchase_date: string | null;
  invoice: string | null;
  received_items: string | null;
  pin: string | null;
  issues: string | null;
  solutions: string | null;
  status_desc: string | null;
  remarks: string | null;
};

const Branch = (props: Props) => {
  // Input handler -------------------
  const [inputValues, setInputValues] = useState<InputState>(initialInputState);

  const { values } = inputValues;

  const inputChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setInputValues((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        [target.name]: target.value,
      },
    }));
  };

  // Search handler -------------------
  const [searchFocus, setSearchFocus] = useState(false);
  const [searchValues] = useDebounce(values.search, 500);
  // console.log(searchValues);

  // Branch handler -------------------
  const pathname = usePathname();

  const [branchId, setBranchId] = useState<string | null>(null);
  const [branch, setBranch] = useState<BranchType | null>(null);

  const [data, setData] = useState<DataValues[]>([]);
  const [newEntry, setNewEntry] = useState(false);
  // console.log(data);
  const [page, setPage] = useState({ pageSize: 10, pageNum: 1, count: 0 });
  // console.log(page, "pages");
  // console.log(Math.floor(page.count / page.pageSize) + 1, "check");

  useEffect(() => {
    const pathArray = pathname!.split("/");
    const id = pathArray[pathArray.length - 1];
    if (id) {
      setBranchId(id);
    }

    if (branch) {
      // console.log("fetched");
      fetchData(
        branch.data_local,
        page.pageSize,
        page.pageNum,
        searchValues
      ).then((data: any) => {
        setData(data.rows);
        setPage({ ...page, count: data.count });
      });
    }
  }, [pathname, newEntry, branch, searchValues]);

  useEffect(() => {
    if (branchId) {
      const branch = branchFormat.branch.find((b) => b.id === branchId);
      setBranch(branch || null); // Handle undefined
    } else {
      setBranch(null); // Reset when branchId is not available
    }
  }, [branchId]);

  // --------------------------

  // Update DB -----------

  const updateDB = async (id: string, column: string, value: string) => {
    console.log("updated DB");
    try {
      if (branch) {
        await updateData(branch.data_local, id, column, value);
      }
    } catch (error) {
      throw new Error(`Database error: ${error}`);
    }
  };

  const deleteDB = async (id: string) => {
    console.log("deleted DB");
    try {
      if (branch) {
        await deleteData(branch.data_local, id);
        setNewEntry(!newEntry);
      }
    } catch (error) {
      throw new Error(`Database error: ${error}`);
    }
  };

  const updateDBWithChanges = async (id: string, lastChange: DataValues) => {
    console.log("updated All DB");
    try {
      if (branch) {
        const changes = (
          Object.keys(lastChange) as Array<keyof DataValues>
        ).reduce((acc, key) => {
          const value = lastChange[key];
          if (value !== null) {
            acc[key] = value;
          }
          return acc;
        }, {} as Partial<DataValues>);

        if (Object.keys(changes).length > 0) {
          await updateAllData(branch.data_local, id, changes);
          // Reset logic here if needed
        }
      }
    } catch (error) {
      throw new Error(`Database error: ${error}`);
    }
  };

  const addDB = async () => {
    console.log("added DB");
    try {
      if (branch) {
        await addData(branch.data_local);
        setNewEntry(!newEntry);
      }
    } catch (error) {
      throw new Error(`Database error: ${error}`);
    }
  };

  return (
    <>
      <div className="hidden sm:flex flex-col gap-16 w-full px-16 py-4">
        <div className="top nav w-full flex justify-end">
          <Avatar className="rounded-full w-8">
            <AvatarImage src="https://idealtech.com.my/wp-content/uploads/2023/03/IDT_LOGO-150x150.png" />
            <AvatarFallback>IT</AvatarFallback>
          </Avatar>
        </div>
        <div className="main-table flex flex-col gap-4">
          <h2>{branch?.name} Warranty</h2>
          <div className="flex justify-between">
            <p
              className={`
              bg-transparent border-zinc-800 border-[1px] px-4 py-2 rounded-md flex gap-2 w-[250px]
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
                value={values.search}
                name="search"
                onChange={(e) => inputChange(e)}
                onBlur={() => {
                  setTimeout(() => {
                    setSearchFocus(false);
                  }, 100);
                }}
                onFocus={() => setSearchFocus(true)}
                className={`bg-transparent outline-none w-full`}
                placeholder="Search Service No"
              />
            </p>
            <div className="flex gap-4">
              <button
                className={`
                          px-4 py-2 rounded-md transition-all border-[1px]
                          bg-transparent border-zinc-600 text-zinc-600
                          mobilehover:hover:border-zinc-400 mobilehover:hover:text-zinc-400`}
                onClick={() => setNewEntry(!newEntry)}
              >
                <p>Refresh Data</p>
              </button>
              <button
                className={`
                          px-4 py-2 rounded-md transition-all border-[1px]
                          border-transparent bg-accent
                          mobilehover:hover:bg-accent/80`}
                onClick={() => addDB()}
              >
                <p>
                  <b>New Entry</b>
                </p>
              </button>
            </div>
          </div>
          {/* <div className="tab-container">
            <div className="tab-head flex [&>div]:w-full [&>div]:px-2 [&>div]:py-1">
              <div className="!w-[40%]">Date</div>
              <div className="!w-[40%]">Service No</div>
              <div className="!w-[40%]">PIC</div>
              <div>Name</div>
              <div className="!w-[60%]">Contact</div>
              <div className="!w-[60%]">Status</div>
            </div>
            <div className="tab-body">
              <div
                className="tab-row border-t-[1px] border-zinc-800 relative
                data-[open=true]:bg-zinc-900 data-[open=false]:bg-transparent"
                data-open={accordion}
              >
                <button
                  className={`
                  ${
                    openTab
                      ? "bg-zinc-700 mobilehover:hover:bg-accent/80 text-zinc-300"
                      : "bg-transparent text-transparent"
                  }
                  absolute left-[-58px]
                          px-2 py-1 rounded-md transition-all border-[1px]
                          border-transparent`}
                  onMouseEnter={() => setOpenTab(true)}
                  onMouseLeave={() => setOpenTab(false)}
                  onClick={() => setAccordion(!accordion)}
                >
                  <p>Open</p>
                </button>
                <div
                  className="tab-row-top w-full flex [&>div]:w-full [&>div]:px-2 [&>div]:py-1 [&>div]:border-l-[1px] [&>div]:border-zinc-800 whitespace-nowrap"
                  onMouseEnter={() => setOpenTab(true)}
                  onMouseLeave={() => setOpenTab(false)}
                >
                  <div className="!w-[40%] !border-l-[0px] overflow-hidden">
                    22/12/2024
                  </div>
                  <div className="!w-[40%] overflow-hidden">WAP2401001</div>
                  <div className="!w-[40%] overflow-hidden">Hanif</div>
                  <div
                    className={`relative 
                  ${
                    copyValuesH.name
                      ? "[&>svg]:mobilehover:hover:fill-green-300 [&>svg]:mobilehover:hover:bg-green-700"
                      : "[&>svg]:mobilehover:hover:fill-zinc-300 [&>svg]:mobilehover:hover:bg-zinc-700"
                  }`}
                  >
                    <span>Danish Aiman Bin Nasarudin</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      className={`
                      cursor-pointer w-6 h-6 py-1 rounded-md absolute top-0 right-0 translate-x-[-35%] translate-y-[15%]  transition-all
                      fill-transparent bg-transparent
                      `}
                      onClick={() => {
                        setCopyValues({
                          ...copyValues,
                          name: "Danish Aiman Bin Nasarudin",
                        });
                        setCopyValuesH({
                          ...copyValuesH,
                          name: true,
                        });
                        setTimeout(() => {
                          setCopyValuesH({
                            ...copyValuesH,
                            name: false,
                          });
                        }, 1000);
                      }}
                    >
                      <path d="M20 2H10c-1.103 0-2 .897-2 2v4H4c-1.103 0-2 .897-2 2v10c0 1.103.897 2 2 2h10c1.103 0 2-.897 2-2v-4h4c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zM4 20V10h10l.002 10H4zm16-6h-4v-4c0-1.103-.897-2-2-2h-4V4h10v10z"></path>
                      <path d="M6 12h6v2H6zm0 4h6v2H6z"></path>
                    </svg>
                  </div>
                  <div
                    className={`
                  !w-[60%] overflow-hidden
                  relative 
                  ${
                    copyValuesH.contact
                      ? "[&>svg]:mobilehover:hover:fill-green-300 [&>svg]:mobilehover:hover:bg-green-700"
                      : "[&>svg]:mobilehover:hover:fill-zinc-300 [&>svg]:mobilehover:hover:bg-zinc-700"
                  }`}
                  >
                    <span>+6012 309 4044</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      className={`
                      cursor-pointer w-6 h-6 py-1 rounded-md absolute top-0 right-0 translate-x-[-35%] translate-y-[15%]  transition-all
                      fill-transparent bg-transparent
                      `}
                      onClick={() => {
                        setCopyValues({
                          ...copyValues,
                          contact: "+6012 309 4044",
                        });
                        setCopyValuesH({
                          ...copyValuesH,
                          contact: true,
                        });
                        setTimeout(() => {
                          setCopyValuesH({
                            ...copyValuesH,
                            contact: false,
                          });
                        }, 1000);
                      }}
                    >
                      <path d="M20 2H10c-1.103 0-2 .897-2 2v4H4c-1.103 0-2 .897-2 2v10c0 1.103.897 2 2 2h10c1.103 0 2-.897 2-2v-4h4c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zM4 20V10h10l.002 10H4zm16-6h-4v-4c0-1.103-.897-2-2-2h-4V4h10v10z"></path>
                      <path d="M6 12h6v2H6zm0 4h6v2H6z"></path>
                    </svg>
                  </div>
                  <div className="!w-[60%] overflow-hidden">
                    <select
                      value={rowValues.status}
                      data-value={rowValues.status}
                      className={`
                                          appearance-none w-max bg-transparent outline-none px-2
                      [&>option]:appearance-none [&>option]:bg-zinc-900`}
                      onChange={(e) => {
                        setRowValues({ ...rowValues, status: e.target.value });
                      }}
                    >
                      <option value="t1">Return Setia Alam</option>
                      <option value="t2">Return SS2</option>
                    </select>
                  </div>
                </div>
                <div
                  className="tab-row-bot px-2 py-1
                  grid
                  data-[open=true]:grid-rows-[1fr] data-[open=false]:grid-rows-[0fr] transition-all
                  border-t-[1px] border-zinc-800"
                  data-open={accordion}
                >
                  <div className="overflow-hidden">test</div>
                </div>
              </div>
            </div>
          </div> */}
          <Tables
            branch={branch}
            data={data}
            updateDB={updateDB}
            deleteDB={deleteDB}
            updateAllDB={updateDBWithChanges}
          />
          <div className="flex gap-4 justify-end">
            <div
              className={`border-[1px] pl-4 rounded-md overflow-hidden
              bg-transparent border-zinc-600 text-zinc-600
            flex gap-2 items-center
            `}
            >
              <span className="text-zinc-600 cursor-default">
                {page.pageSize} Rows
              </span>
              <div className={`flex flex-col`}>
                <button
                  onClick={() => {
                    if (page.pageSize < 50)
                      setPage({ ...page, pageSize: page.pageSize + 10 });
                    setNewEntry(!newEntry);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="20"
                    viewBox="0 0 24 18"
                    className={`px-1 
                    transition-all
                    fill-zinc-600
                    mobilehover:hover:bg-zinc-400
                    `}
                  >
                    <path d="m6.293 13.293 1.414 1.414L12 10.414l4.293 4.293 1.414-1.414L12 7.586z"></path>
                  </svg>
                </button>
                <button
                  onClick={() => {
                    if (page.pageSize > 10)
                      setPage({ ...page, pageSize: page.pageSize - 10 });
                    setNewEntry(!newEntry);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="20"
                    viewBox="0 0 24 18"
                    className={`px-1
                    transition-all rotate-180
                    fill-zinc-600
                    mobilehover:hover:bg-zinc-400
                    `}
                  >
                    <path d="m6.293 13.293 1.414 1.414L12 10.414l4.293 4.293 1.414-1.414L12 7.586z"></path>
                  </svg>
                </button>
              </div>
            </div>
            <button
              disabled={!(page.pageNum - 1 > 0)}
              className={`
                          px-4 py-2 rounded-md transition-all border-[1px]
                          bg-transparent 
                          ${
                            !(page.pageNum - 1 > 0)
                              ? "border-zinc-800 text-zinc-800"
                              : "border-zinc-600 text-zinc-600 mobilehover:hover:border-zinc-400 mobilehover:hover:text-zinc-400"
                          }`}
              onClick={() => {
                if (page.pageNum - 1 > 0)
                  setPage({ ...page, pageNum: page.pageNum - 1 });
                setNewEntry(!newEntry);
              }}
            >
              <p>Previous</p>
            </button>
            <button
              disabled={
                !(page.pageNum < Math.floor(page.count / page.pageSize) + 1)
              }
              className={`
                          px-4 py-2 rounded-md transition-all border-[1px]
                          bg-transparent
                          ${
                            !(
                              page.pageNum <
                              Math.floor(page.count / page.pageSize) + 1
                            )
                              ? "border-zinc-800 text-zinc-800"
                              : "border-zinc-600 text-zinc-600 mobilehover:hover:border-zinc-400 mobilehover:hover:text-zinc-400"
                          }`}
              onClick={() => {
                if (page.pageNum < Math.floor(page.count / page.pageSize) + 1)
                  setPage({ ...page, pageNum: page.pageNum + 1 });
                setNewEntry(!newEntry);
              }}
            >
              <p>Next</p>
            </button>
          </div>
        </div>
        <div className="other-table"></div>
      </div>
      <div className="sm:hidden flex justify-center items-center h-[100vh] text-center w-full">
        <h2>Use Desktop PC</h2>
      </div>
    </>
  );
};

export default Branch;
