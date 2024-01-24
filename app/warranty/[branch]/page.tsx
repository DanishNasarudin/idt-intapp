"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  addData,
  deleteData,
  fetchData,
  moveBranchData,
  moveData,
  updateAllData,
  updateData,
} from "@/app/(serverActions)/FetchDB";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/(scn-components)/ui/avatar";
import Tables from "../(sections)/Tables";
import { useDebounce } from "use-debounce";
import socket from "@/lib/socket";
import DropdownIdv from "../(components)/DropdownIdv";
import { Options } from "../settings/page";

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
  address: string;
  office: string;
  whatsapp: string;
  status: BranchStatus[];
  pic: BranchStatus[];
};

export type BranchFormat = {
  branch: BranchType[];
};

const branchFormat: BranchFormat = {
  branch: [
    {
      id: "ampang-hq",
      data_local: "ap_local",
      data_other: "ap_other",
      name: "Ampang HQ",
      address:
        "No. 17, Jalan Pandan Prima 1, Dataran Pandan Prima, 55100 Kuala Lumpur, Malaysia.",
      office: "+603 9202 3137",
      whatsapp: "+6012 427 8782",
      status: [
        { type: "In Queue", color: "bg-fuchsia-600 text-fuchsia-100" },
        { type: "In Progress", color: "bg-purple-600 text-purple-100" },
        { type: "Waiting For", color: "bg-pink-600 text-pink-100" },
        { type: "Completed", color: "bg-emerald-600 text-emerald-100" },
        { type: "Pass SS2", color: "bg-red-600 text-red-100" },
        { type: "From SS2", color: "bg-cyan-600 text-cyan-100" },
        { type: "Pass Setia Alam", color: "bg-orange-600 text-orange-100" },
        { type: "From Setia Alam", color: "bg-blue-600 text-blue-100" },
        { type: "Pass JB", color: "bg-amber-600 text-amber-100" },
        { type: "From JB", color: "bg-indigo-600 text-indigo-100" },
      ],
      pic: [
        { type: "Hanif", color: "bg-purple-600 text-purple-100" },
        { type: "Anthony", color: "bg-emerald-600 text-emerald-100" },
        { type: "Hafiz WTY", color: "bg-red-600 text-red-100" },
        { type: "Joon", color: "bg-cyan-600 text-cyan-100" },
        { type: "Dixon", color: "bg-orange-600 text-orange-100" },
        { type: "Amir", color: "bg-blue-600 text-blue-100" },
      ],
    },
    {
      id: "ss2-pj",
      data_local: "s2_local",
      data_other: "s2_other",
      name: "SS2, PJ",
      address: "42, Jalan SS 2/55, SS 2, 47300 Petaling Jaya, Selangor.",
      office: "+603 7876 0076",
      whatsapp: "+6017 865 0076",
      status: [
        { type: "In Queue", color: "bg-fuchsia-600 text-fuchsia-100" },
        { type: "In Progress", color: "bg-purple-600 text-purple-100" },
        { type: "Waiting For", color: "bg-pink-600 text-pink-100" },
        { type: "Completed", color: "bg-emerald-600 text-emerald-100" },
        { type: "Pass Ampang", color: "bg-red-600 text-red-100" },
        { type: "From Ampang", color: "bg-cyan-600 text-cyan-100" },
        { type: "Pass Setia Alam", color: "bg-orange-600 text-orange-100" },
        { type: "From Setia Alam", color: "bg-blue-600 text-blue-100" },
      ],
      pic: [
        { type: "John", color: "bg-purple-600 text-purple-100" },
        { type: "Richard", color: "bg-emerald-600 text-emerald-100" },
        { type: "Akmal", color: "bg-red-600 text-red-100" },
        { type: "John Shen", color: "bg-cyan-600 text-cyan-100" },
      ],
    },
    {
      id: "setia-alam",
      data_local: "sa_local",
      data_other: "sa_other",
      name: "Setia Alam",
      address:
        "No 36-G, Jalan Setia Utama AU U13/AU Setia Alam, 40170 Shah Alam, Selangor.",
      office: "+603 3358 3713",
      whatsapp: "+6012 610 1871",
      status: [
        { type: "In Queue", color: "bg-fuchsia-600 text-fuchsia-100" },
        { type: "In Progress", color: "bg-purple-600 text-purple-100" },
        { type: "Waiting For", color: "bg-pink-600 text-pink-100" },
        { type: "Completed", color: "bg-emerald-600 text-emerald-100" },
        { type: "Pass Ampang", color: "bg-red-600 text-red-100" },
        { type: "From Ampang", color: "bg-cyan-600 text-cyan-100" },
        { type: "Pass SS2", color: "bg-orange-600 text-orange-100" },
        { type: "From SS2", color: "bg-blue-600 text-blue-100" },
      ],
      pic: [
        { type: "Zaki", color: "bg-purple-600 text-purple-100" },
        { type: "Irfan", color: "bg-emerald-600 text-emerald-100" },
        { type: "Jack", color: "bg-red-600 text-red-100" },
        { type: "Azran", color: "bg-cyan-600 text-cyan-100" },
      ],
    },
    {
      id: "jb",
      data_local: "jb_local",
      data_other: "jb_other",
      name: "Johor Bahru",
      address:
        "53, Jln Austin Height 8/8, Taman Mount Austin, 81100 Johor Bahru, Johor.",
      office: "Pending",
      whatsapp: "+6016 854 1253",
      status: [
        { type: "Pending", color: "bg-purple-600 text-purple-100" },
        { type: "Waiting For", color: "bg-pink-600 text-pink-100" },
        { type: "Completed", color: "bg-emerald-600 text-emerald-100" },
        { type: "Pass Ampang", color: "bg-red-600 text-red-100" },
        { type: "From Ampang", color: "bg-cyan-600 text-cyan-100" },
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
  locker: string | null;
};

// Page types

export type Page = {
  pageSize: number;
  pageNum: number;
  count: number;
};

export type Paginate = {
  local: Page;
  other: Page;
};

// Search options

const searchOptions: Options[] = [
  { option: "By: Service No", color: "bg-purple-600 text-purple-100" },
  { option: "By: Name", color: "bg-pink-600 text-pink-100" },
  { option: "By: Email", color: "bg-emerald-600 text-emerald-100" },
  { option: "By: PIC", color: "bg-red-600 text-red-100" },
];

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
  const [dataOther, setDataOther] = useState<DataValues[]>([]);
  const [newEntry, setNewEntry] = useState(false);
  // console.log(data);
  // console.log(newEntry);

  // Page paginations
  const [page, setPage] = useState<Paginate>({
    local: { pageSize: 10, pageNum: 1, count: 0 },
    other: { pageSize: 10, pageNum: 1, count: 0 },
  });

  // console.log(page);

  const handleSetPage = (id: string, obj: Page) => {
    if (id === "local") {
      setPage({ ...page, local: obj });
    } else if (id === "other") {
      setPage({ ...page, other: obj });
    }
  };
  // console.log(page, "pages");
  // console.log(Math.floor(page.count / page.pageSize) + 1, "check");

  // Sort and filter toggles ----

  const [sortStatus, setSortStatus] = useState(false);
  const [sortDate, setSortDate] = useState(false);

  // Search filtered options ----

  const searchFilter = useRef(searchOptions[0].option || "");
  // console.log(searchFilter);

  useEffect(() => {
    const pathArray = pathname!.split("/");
    const id = pathArray[pathArray.length - 1];
    if (id) {
      setBranchId(id);
    }
  }, [pathname]);

  useEffect(() => {
    if (branch) {
      // console.log("fetched");
      fetchData(
        branch.data_local,
        page.local.pageSize,
        page.local.pageNum,
        searchValues,
        searchFilter.current,
        sortStatus,
        sortDate
      ).then((data: any) => {
        setData(data.rows);
        setPage((currentPage) => ({
          ...currentPage,
          local: { ...currentPage.local, count: data.count },
        }));
      });
      fetchData(
        branch.data_other,
        page.other.pageSize,
        page.other.pageNum,
        searchValues,
        searchFilter.current,
        sortStatus,
        sortDate
      ).then((data: any) => {
        setDataOther(data.rows);
        setPage((currentPage) => ({
          ...currentPage,
          other: { ...currentPage.other, count: data.count },
        }));
      });
    }
  }, [newEntry, branch, searchValues]);

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

  const moveDB = async (toTable: number, id: string, value: string) => {
    try {
      if (branch === null) return;
      // await moveData(branch.data_local, branch.data_other, id);
      // await updateData(branch.data_local, id, "status", value);
      // await moveData(
      //   branch.data_local,
      //   branchFormat.branch[toTable].data_local,
      //   id
      // );
      // await deleteData(branch.data_local, id);
      await moveBranchData(toTable, id, value, branch, branchFormat);
      setNewEntry(!newEntry);
    } catch (error) {
      throw new Error(`Database error: ${error}`);
    }
  };

  const handleMoveDB = async (value: string, id: string) => {
    try {
      if (branch === null) return;
      if (value === "Pass SS2") {
        if (branch.data_local === "ap_local") {
          moveDB(1, id, "From Ampang");
        } else if (branch.data_local === "sa_local") {
          moveDB(1, id, "From Setia Alam");
        }
      } else if (value === "Pass Ampang") {
        if (branch.data_local === "s2_local") {
          moveDB(0, id, "From SS2");
        } else if (branch.data_local === "sa_local") {
          moveDB(0, id, "From Setia Alam");
        } else if (branch.data_local === "jb_local") {
          moveDB(0, id, "From JB");
        }
      } else if (value === "Pass Setia Alam") {
        if (branch.data_local === "ap_local") {
          moveDB(2, id, "From Ampang");
        } else if (branch.data_local === "s2_local") {
          moveDB(2, id, "From SS2");
        }
      } else if (value === "Pass JB") {
        if (branch.data_local === "ap_local") {
          moveDB(3, id, "From Ampang");
        }
      } else {
        await updateData(branch.data_local, id, "status", value);
      }
    } catch (error) {
      throw new Error(`Database error: ${error}`);
    }
  };

  const updateDB = async (id: string, column: string, value: string) => {
    // console.log("updated DB");
    try {
      if (branch) {
        if (column === "status") {
          handleMoveDB(value, id);
        } else {
          await updateData(branch.data_local, id, column, value);
          setNewEntry(!newEntry);
        }
      }
    } catch (error) {
      throw new Error(`Database error: ${error}`);
    }
  };

  const deleteDB = async (id: string) => {
    // console.log("deleted DB");
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
    // console.log("updated All DB");
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
        // setNewEntry(!newEntry);
      }
    } catch (error) {
      throw new Error(`Database error: ${error}`);
    }
  };

  const addDB = async () => {
    // console.log("added DB");
    try {
      if (branch) {
        await addData(branch.data_local);
        setNewEntry(!newEntry);
      }
    } catch (error) {
      throw new Error(`Database error: ${error}`);
    }
  };

  // socket receiver ----
  // console.log(newEntry);

  useEffect(() => {
    const handleUnlockRow = ({ lock }: { lock: string }) => {
      if (lock === "" || lock === null) return;
      setNewEntry((prevNewEntry) => !prevNewEntry);
    };

    const handleRender = ({ string }: { string: string }) => {
      if (string === "" || string === null) return;
      // console.log("check");
      setNewEntry((prevNewEntry) => !prevNewEntry);
    };

    socket.on("unlock-row", handleUnlockRow);
    socket.on("re-render", handleRender);

    return () => {
      socket.off("unlock-row", handleUnlockRow);
      socket.off("re-render", handleRender);
    };
  }, []);

  // New version of the app is available ---

  // A function to fetch the current version from the server
  async function fetchVersion(): Promise<string | null> {
    try {
      const res = await fetch("/api/version");
      const data = await res.json();
      return data.version;
    } catch (error) {
      console.error("Failed to fetch version:", error);
      return null;
    }
  }

  // Use setInterval for polling
  function startVersionPolling(
    currentVersion: string,
    onNewVersionDetected: () => void
  ) {
    const interval = setInterval(async () => {
      const serverVersion = await fetchVersion();
      if (serverVersion && serverVersion !== currentVersion) {
        clearInterval(interval); // Stop polling once a new version is detected
        onNewVersionDetected();
      }
    }, 60000); // Poll every 60 seconds

    return () => clearInterval(interval); // Return a cleanup function
  }

  const [isUpdateAvailable, setUpdateAvailable] = useState(false);
  const currentVersion = process.env.APP_VERSION; // The version the client is currently on

  useEffect(() => {
    if (!currentVersion) return;
    const cleanup = startVersionPolling(currentVersion, () => {
      setUpdateAvailable(true);
    });

    return cleanup; // Cleanup the interval when the component unmounts
  }, []);

  return (
    <>
      <div className="hidden md:flex flex-col gap-16 w-full px-16 py-4 bg">
        <div className="top nav w-full flex justify-end">
          <Avatar className="rounded-full w-8">
            <AvatarImage src="https://idealtech.com.my/wp-content/uploads/2023/03/IDT_LOGO-150x150.png" />
            <AvatarFallback>IT</AvatarFallback>
          </Avatar>
        </div>
        <div className="main-table flex flex-col gap-4">
          <h2>{branch?.name} Warranty</h2>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
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
                    placeholder="Search"
                  />
                </p>
                <DropdownIdv
                  minSize="140px"
                  values={searchFilter.current}
                  options={searchOptions}
                  setValues={searchFilter}
                  updateDB={() => {
                    return;
                  }}
                />
              </div>
              <div className="flex gap-4">
                <button
                  className={`
                            px-4 py-2 rounded-md transition-all border-[1px]
                            bg-transparent border-zinc-600 text-zinc-600
                            mobilehover:hover:border-zinc-400 mobilehover:hover:text-zinc-400`}
                  onClick={() => {
                    setTimeout(() => {
                      setNewEntry(!newEntry);
                      // console.log("pass");
                      socket.emit("re-render", { string: "render" });
                    }, 50);
                  }}
                >
                  <p>Refresh Data</p>
                </button>
                <button
                  className={`
                            px-4 py-2 rounded-md transition-all border-[1px]
                            border-transparent bg-accent
                            mobilehover:hover:bg-accent/80`}
                  onClick={() => {
                    addDB();
                    socket.emit("re-render", { string: "render" });
                  }}
                >
                  <p>
                    <b>New Entry</b>
                  </p>
                </button>
              </div>
            </div>
            <div className="flex gap-4">
              <button
                className={`
                ${
                  sortStatus
                    ? "border-accent/60 text-accent/60 mobilehover:hover:border-accent mobilehover:hover:text-accent"
                    : "border-zinc-600 text-zinc-600 mobilehover:hover:border-zinc-400 mobilehover:hover:text-zinc-400"
                }
                            px-4 py-2 rounded-md transition-all border-[1px]
                            bg-transparent 
                            `}
                onClick={() => {
                  setTimeout(async () => {
                    await setSortStatus(!sortStatus);
                    setNewEntry(!newEntry);
                    socket.emit("re-render", { string: "render" });
                  }, 50);
                }}
              >
                <p>
                  Sort by: {sortStatus ? "Status >" : ""} Date {">"} Service No{" "}
                </p>
              </button>
              <button
                className={`
                ${
                  sortDate
                    ? "border-accent/60 text-accent/60 mobilehover:hover:border-accent mobilehover:hover:text-accent"
                    : "border-zinc-600 text-zinc-600 mobilehover:hover:border-zinc-400 mobilehover:hover:text-zinc-400"
                }
                            px-4 py-2 rounded-md transition-all border-[1px]
                            bg-transparent 
                            `}
                onClick={() => {
                  setTimeout(async () => {
                    await setSortDate(!sortDate);
                    setNewEntry(!newEntry);
                    socket.emit("re-render", { string: "render" });
                  }, 50);
                }}
              >
                <p>{sortDate ? "Date Ascending" : "Date Descending"}</p>
              </button>
              <span className="text-zinc-400"></span>
            </div>
          </div>
          <Tables
            id="local"
            branch={branch}
            data={data}
            updateDB={updateDB}
            deleteDB={deleteDB}
            updateAllDB={updateDBWithChanges}
            setNewEntry={setNewEntry}
            page={page.local}
            handleSetPage={handleSetPage}
            lockTable={false}
          />
        </div>
        <div className="other-table flex flex-col gap-4">
          <h2>Other Branch Warranty</h2>
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
          </div>
          <Tables
            id="other"
            branch={branch}
            data={dataOther}
            updateDB={updateDB}
            deleteDB={deleteDB}
            updateAllDB={updateDBWithChanges}
            setNewEntry={setNewEntry}
            page={page.other}
            handleSetPage={handleSetPage}
            lockTable={true}
          />
        </div>
      </div>
      <div
        data-open={isUpdateAvailable}
        className="data-[open=true]:block data-[open=false]:hidden fixed z-[2] bg-black/50 w-[100vw] h-[100vh] top-0 left-0"
      >
        <div
          className="
        max-w-[500px] bg-zinc-900 border-zinc-700 border-[1px] p-8 rounded-md m-auto translate-y-[150%]
        flex flex-col gap-4
        "
        >
          <h3>Refresh now!</h3>
          <span>A new version is available.</span>
          <div className="flex gap-2 justify-end">
            <button
              className={`
                              px-4 py-2 rounded-md transition-all border-[1px]
                              bg-transparent border-sky-600 text-sky-600
                              mobilehover:hover:border-sky-400 mobilehover:hover:text-sky-400`}
              onClick={() => {
                window.location.reload();
              }}
            >
              <p>Refresh</p>
            </button>
          </div>
        </div>
      </div>
      <div className="md:hidden flex justify-center items-center h-[100vh] text-center w-full">
        <h2>Use Desktop PC</h2>
      </div>
    </>
  );
};

export default Branch;
