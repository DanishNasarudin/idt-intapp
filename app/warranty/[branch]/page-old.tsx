"use client";
import {
  addData,
  deleteData,
  fetchData,
  moveBranchData,
  updateAllData,
  updateData,
} from "@/services/common/FetchDB";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDebounce } from "use-debounce";
import Tables from "../../../components/warranty/Tables";
// import socket from "@/lib/socket";
import DropdownIdv from "@/components/warranty/DropdownIdv";
import DropdownSort from "@/components/warranty/DropdownSort";
import DropdownSortAdd from "@/components/warranty/DropdownSortAdd";
import { useSocket } from "@/lib/providers/socket-provider";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";
import { getBranchFormat } from "../../../services/warranty/warrantyUtils";
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
  all_pic: BranchStatus[];
};

export type BranchFormat = {
  branch: BranchType[] | [];
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
  idt_pc: string | null;
  received_by: string | null;
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
  cost: string | null;
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
  { option: "By: Received Items", color: "bg-cyan-600 text-cyan-100" },
  { option: "By: Contact", color: "bg-blue-600 text-blue-100" },
];

const Branch = (props: Props) => {
  const { socket, isConnected } = useSocket();

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

  const currentPageChange = useRef<Paginate>();

  const refetchData = async () => {
    // console.log(
    //   JSON.stringify(page) !== JSON.stringify(currentPageChange.current)
    // );
    if (
      data.length > 0 &&
      JSON.stringify(page) !== JSON.stringify(currentPageChange.current)
    ) {
      // console.log("pass");
      socket.emit("unlock-row-all", { dataTable: branch?.data_local });
      // await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    currentPageChange.current = page;
    if (branch) {
      fetchData(
        branch.data_local,
        page.local.pageSize,
        page.local.pageNum,
        searchValues,
        searchFilter.current,
        sortingList
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
        sortingList
      ).then((data: any) => {
        setDataOther(data.rows);
        setPage((currentPage) => ({
          ...currentPage,
          other: { ...currentPage.other, count: data.count },
        }));
      });
    }
  };

  useEffect(() => {
    refetchData();

    const intervalId = setInterval(() => {
      refetchData();
      toast.success("Data refreshed.");
    }, 5 * 60 * 1000); // 5 minutes interval in milliseconds
    // console.log("check render");

    return () => clearInterval(intervalId);
  }, [newEntry, branch, searchValues]);

  useEffect(() => {
    const getFormat = async () => {
      const format = await getBranchFormat();

      if (branchId && format.branch.length > 0) {
        const branch = format.branch.find((b) => b.id === branchId);
        setBranch(branch || null); // Handle undefined
      } else {
        setBranch(null); // Reset when branchId is not available
      }
    };
    getFormat();
  }, [branchId]);

  // --------------------------

  // Update DB -----------

  const moveDB = async (toTable: number, id: string, value: string) => {
    try {
      if (branch === null) return;
      const format = await getBranchFormat();

      await moveBranchData(toTable, id, value, branch, format);
      setNewEntry(!newEntry);
      toast.success("Moved data.");
    } catch (error) {
      throw new Error(`Database error (moveDB): ${error}`);
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
        toast.success("Updated data.");
      }
    } catch (error) {
      throw new Error(`Database error (handleMoveDB): ${error}`);
    }
  };

  function debounce<T extends (...args: any[]) => void>(
    func: T,
    wait: number
  ): (...args: Parameters<T>) => void {
    let timeout: ReturnType<typeof setTimeout> | null = null;

    return (...args: Parameters<T>): void => {
      const later = () => {
        timeout = null;
        func(...args);
      };

      if (timeout !== null) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(later, wait);
    };
  }

  const debUpdateDB = async (id: string, column: string, value: string) => {
    // console.log("updated DB");
    try {
      if (branch) {
        if (column === "status") {
          handleMoveDB(value, id);
        } else {
          // console.log(id, column, value, "front");
          await updateData(branch.data_local, id, column, value);
          if (column !== "locker") {
            setNewEntry(!newEntry);
            toast.success("Updated data.");
          }
        }
      }
    } catch (error) {
      toast.error(
        `"Failed to move/update data OR Update too frequent. Chill..`
      );
      throw new Error(`Database error (updateDB): ${error}`);
    }
  };

  const updateDB = debounce(debUpdateDB, 500);

  const deleteDB = async (id: string) => {
    // console.log("deleted DB");
    try {
      if (branch) {
        await deleteData(branch.data_local, id);
        setData((prevData) =>
          prevData.filter((item) => item.service_no !== id)
        );
        setNewEntry(!newEntry);
        toast.warning("Deleted data.");
      }
    } catch (error) {
      toast.error("Failed to delete data.");
      throw new Error(`Database error (deleteDB): ${error}`);
    }
  };

  const updateDBWithChanges = async (id: string, lastChange: DataValues) => {
    // console.log("updated All DB");
    try {
      if (branch) {
        const changes = (
          Object.keys(lastChange) as Array<keyof DataValues>
        ).reduce((acc, key) => {
          if (key === "locker") {
            return acc;
          }
          const value = lastChange[key];
          if (value !== null) {
            acc[key] = value;
          }
          return acc;
        }, {} as Partial<DataValues>);

        if (Object.keys(changes).length > 0) {
          await updateAllData(branch.data_local, id, changes);
          // Reset logic here if needed

          toast.success("Updated all data.");
          // console.log("updated");
          // toasty("Updated all data.");
          // setNewEntry(!newEntry);
          // socket.emit("re-render", { string: "render" });
        }
      }
    } catch (error) {
      toast.error("Failed to update data.");
      throw new Error(`Database error (updateDBWithChanges): ${error}`);
    }
  };

  const addDB = async () => {
    // console.log("added DB");
    try {
      if (branch) {
        const { date, serviceNo } = await addData(branch.data_local);
        // console.log(date, serviceNo);
        const newRow: DataValues = {
          service_no: serviceNo,
          date: date,
          idt_pc: null,
          received_by: null,
          pic: null,
          name: null,
          contact: null,
          status: "In Queue",
          email: null,
          address: null,
          purchase_date: null,
          invoice: null,
          received_items: null,
          pin: null,
          issues: null,
          solutions: null,
          status_desc: null,
          remarks: null,
          cost: "0",
          locker: "0",
        };

        setData((prevData) => [newRow, ...prevData]);
        setNewEntry(!newEntry);
        toast.success("Added new data.");
        // socket.emit("re-render", { string: "render" });
        socket.emit("new-entry", { date: date, serviceNo: serviceNo });
      }
    } catch (error) {
      toast.error("Failed to add data.");
      throw new Error(`Database error (addDB): ${error}`);
    }
  };

  // New version of the app is available ---

  const [disconnected, setDisconnected] = useState(false);
  const [onlyIfConnect, setOnlyIfConnect] = useState(false);

  useEffect(() => {
    if (isConnected) setOnlyIfConnect(true);
    if (onlyIfConnect)
      if (!isConnected) {
        setDisconnected(true);
      }

    const disconnectUser = async () => {
      socket.emit("pre-disconnect", { dataTable: branch?.data_local });
      await new Promise((resolve) => setTimeout(resolve, 1000));
    };

    window.addEventListener("beforeunload", disconnectUser);
    return () => {
      window.removeEventListener("beforeunload", disconnectUser);
    };
  }, [isConnected]);

  // socket receiver ----
  // console.log(newEntry);

  useEffect(() => {
    const handleNewData = ({
      date,
      serviceNo,
    }: {
      date: string;
      serviceNo: string;
    }) => {
      if (serviceNo === "" || date === "") return;

      const newRow: DataValues = {
        service_no: serviceNo,
        date: date,
        idt_pc: null,
        received_by: null,
        pic: null,
        name: null,
        contact: null,
        status: "In Queue",
        email: null,
        address: null,
        purchase_date: null,
        invoice: null,
        received_items: null,
        pin: null,
        issues: null,
        solutions: null,
        status_desc: null,
        remarks: null,
        cost: "0",
        locker: "0",
      };

      setData((prevData) => [newRow, ...prevData]);
    };

    const handleDelData = ({ id }: { id: string }) => {
      setData((prevData) => prevData.filter((item) => item.service_no !== id));
    };

    if (socket === null) return;

    socket.on("new-entry", handleNewData);
    socket.on("del-entry", handleDelData);

    return () => {
      socket.off("new-entry", handleNewData);
      socket.off("del-entry", handleDelData);
    };
  }, [socket]);

  // sort system ----

  // type SortType = {
  //   [type: string]: string;
  // };

  const sortInitial = {
    date: "DESC",
    service_no: "DESC",
  };

  type SortType = {
    type: string;
    direction: string;
  };

  // Convert the initial object into an array to maintain order
  const initialSortArray: SortType[] = Object.entries(sortInitial).map(
    ([type, direction]) => ({ type, direction })
  );

  // Use this array for state
  const [sortingList, setSortingList] = useState<SortType[]>(initialSortArray);

  useEffect(() => {
    setNewEntry(!newEntry);
  }, [sortingList]);

  // const [sortingList, setSortingList] = useState<SortType>(sortInitial);
  // console.log(sortingList);

  // console.log(sortingList);

  const handleOnDrag = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData("sortType", id);
  };
  const handleOnDrop = (e: React.DragEvent, id: string) => {
    e.preventDefault();
    const draggedSortType = e.dataTransfer.getData("sortType");
    // console.log(id);

    // Find the indices
    const draggedIndex = sortingList.findIndex(
      (item) => item.type === draggedSortType
    );
    const dropIndex = sortingList.findIndex((item) => item.type === id);

    // Rearrange the array
    const newList = [...sortingList];
    const [removed] = newList.splice(draggedIndex, 1);
    newList.splice(dropIndex, 0, removed);

    setSortingList(newList);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const sortOptions: Options[] = [
    { option: "status", color: "" },
    { option: "name", color: "" },
  ];

  const [sortOpt, setSortOpt] = useState<Options[]>(sortOptions);

  return (
    <>
      <div className="hidden md:flex flex-col gap-16 w-full px-16 py-4">
        <div className="top nav w-full flex justify-end">
          {/* <button className="" onClick={() => signOut()}>
            Sign Out
          </button>
          <Avatar className="rounded-full w-8">
            <AvatarImage src="https://idealtech.com.my/wp-content/uploads/2023/03/IDT_LOGO-150x150.png" />
            <AvatarFallback>IT</AvatarFallback>
          </Avatar> */}
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
                  minSize="147"
                  values={searchFilter.current}
                  options={searchOptions}
                  setValues={searchFilter}
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
                    }, 50);
                  }}
                >
                  <p>Refresh Data</p>
                </button>
                <Link href={`/warranty/history/${branch?.id}`} target="_blank">
                  <button
                    className={`
                              px-4 py-2 rounded-md transition-all border-[1px]
                              bg-transparent border-zinc-600 text-zinc-600
                              mobilehover:hover:border-zinc-400 mobilehover:hover:text-zinc-400`}
                  >
                    <p>History</p>
                  </button>
                </Link>
                <button
                  className={`
                            px-4 py-2 rounded-md transition-all border-[1px]
                            border-transparent bg-accent
                            mobilehover:hover:bg-accent/80`}
                  onClick={() => {
                    addDB();
                    if (socket === null) return;
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
              {/* <button
                className={`
                ${
                  sortStatus
                    ? "border-accent/60 text-accent/60 mobilehover:hover:border-accent mobilehover:hover:text-accent"
                    : "border-zinc-600 text-zinc-600 mobilehover:hover:border-zinc-400 mobilehover:hover:text-zinc-400"
                }
                            px-4 py-2 rounded-md transition-all border-[1px]
                             
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
              </button> */}
              <div className="border-zinc-800 text-zinc-800 p-1 rounded-md transition-all border-[1px] bg-transparent flex gap-1">
                {/* {sortingList &&
                  Object.entries(sortingList).map(([key, value]) => (
                    <div
                      key={key}
                      draggable
                      onDragStart={(e) => handleOnDrag(e, key)}
                    >
                      <DropdownSort
                        key={key}
                        values={key}
                        setValues={setSortingList}
                      />
                    </div>
                  ))} */}
                {sortingList &&
                  sortingList.map((sort, key) => {
                    return (
                      <div
                        key={key}
                        draggable
                        onDragStart={(e) => handleOnDrag(e, sort.type)}
                        onDrop={(e) => handleOnDrop(e, sort.type)}
                        onDragOver={handleDragOver}
                        className="h-full"
                      >
                        <DropdownSort
                          key={key}
                          values={sort}
                          setOptions={setSortOpt}
                          setValues={setSortingList}
                        />
                      </div>
                    );
                  })}
                {/* <button
                  className="border-zinc-600 text-zinc-600 mobilehover:hover:border-zinc-400 mobilehover:hover:text-zinc-400
                px-2 py-0 rounded-md transition-all border-[1px] bg-transparent"
                  onClick={() => {
                    // if (!sortInitial["history"]) {
                    //   sortInitial["history"] = "ASC";
                    // }
                  }}
                >
                  <span>+ Add Sort</span>
                </button> */}
                <DropdownSortAdd
                  values="+ Add Sort"
                  setValues={setSortingList}
                  setOptions={setSortOpt}
                  options={sortOpt}
                />
              </div>
              {/* <span className="text-zinc-400"></span> */}
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
        data-open={disconnected}
        className="data-[open=true]:block data-[open=false]:hidden fixed z-[4] bg-black/50 w-[100vw] h-[100vh] top-0 left-0"
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
                              bg-transparent border-zinc-600 text-zinc-600
                              mobilehover:hover:border-zinc-400 mobilehover:hover:text-zinc-400`}
              onClick={() => {
                setDisconnected(false);
              }}
            >
              <p>Cancel</p>
            </button>
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

// export const revalidate = 0;
export default Branch;
