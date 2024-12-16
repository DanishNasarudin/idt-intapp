"use client";
import React, { useEffect, useRef, useState } from "react";
import Dropdown from "./Dropdown";
import TableRowExt from "./TableRowExt";
import TextBoxEditor from "./TextBoxEditor";
// import socket from "@/lib/socket";
import { useSocket } from "@/lib/providers/socket-provider";
import { debounceFunc } from "@/lib/utils";
import { WarrantyDataType } from "@/services/warranty/warrantyActions";
import { BranchType } from "@/services/warranty/warrantyUtils";

type Props = {
  branch: BranchType | null;
  data: WarrantyDataType;
  updateDB: (id: string, column: string, value: string) => void;
  deleteDB: (id: string) => void;
  updateAllDB: (id: string, lastChange: WarrantyDataType) => void;
  setNewEntry: (newValue: React.SetStateAction<boolean>) => void;
  lockTable: boolean;
};

type InputState = {
  values: WarrantyDataType;
};

const TableRow = ({
  branch,
  data,
  updateDB,
  deleteDB,
  updateAllDB,
  setNewEntry,
  lockTable,
}: Props) => {
  const { socket } = useSocket();
  // console.log(branch);

  const initialInputState: InputState = {
    values: {
      serviceNo: data.serviceNo,
      date: data.date,
      idtPc: data.idtPc,
      receivedBy: data.receivedBy,
      pic: data.pic,
      name: data.name,
      contact: data.contact,
      status: data.status,
      email: data.email,
      address: data.address,
      purchaseDate: data.purchaseDate,
      invoice: data.invoice,
      receivedItems: data.receivedItems,
      pin: data.pin,
      issues: data.issues,
      solutions: data.solutions,
      statusDesc: data.statusDesc,
      remarks: data.remarks,
      cost: data.cost,
      locker: data.locker,
    },
  };

  const [inputValues, setInputValues] = useState<InputState>(initialInputState);
  const { values } = inputValues;

  useEffect(() => {
    if (
      data !== prevValuesRef.current &&
      !accordion &&
      !isExtEmpty(lastChangedExtRef.current)
    )
      setInputValues({
        values: {
          serviceNo: data.serviceNo,
          date: data.date,
          idtPc: data.idtPc,
          receivedBy: data.receivedBy,
          pic: data.pic,
          name: data.name,
          contact: data.contact,
          status: data.status,
          email: data.email,
          address: data.address,
          purchaseDate: data.purchaseDate,
          invoice: data.invoice,
          receivedItems: data.receivedItems,
          pin: data.pin,
          issues: data.issues,
          solutions: data.solutions,
          statusDesc: data.statusDesc,
          remarks: data.remarks,
          cost: data.cost,
          locker: data.locker,
        },
      });
  }, [data]);

  // console.log(values.locker, "check");

  // last change for individual cells
  const lastChangedRef = useRef<{
    column: string | null;
    value: string | null;
  }>({ column: null, value: null });

  // last change for extended fields
  const lastChangedExtRef = useRef<WarrantyDataType>({
    serviceNo: null,
    date: null,
    idtPc: null,
    receivedBy: null,
    pic: null,
    name: null,
    contact: null,
    status: null,
    email: null,
    address: null,
    purchaseDate: null,
    invoice: null,
    receivedItems: null,
    pin: null,
    issues: null,
    solutions: null,
    statusDesc: null,
    remarks: null,
    cost: null,
    locker: 0,
  });

  // console.log(lastChangedExtRef);

  const prevValuesRef = useRef<WarrantyDataType>(values);

  useEffect(() => {
    // console.log("pass");
    setLastChangeUpdated(!lastChangeUpdated);
    const changes: Partial<WarrantyDataType> = {};

    (Object.keys(values) as Array<keyof WarrantyDataType>).forEach((key) => {
      if (key === "locker") return;
      if (values[key] !== prevValuesRef.current[key]) {
        changes[key] = values[key];
      }
    });

    if (Object.keys(changes).length > 0) {
      lastChangedExtRef.current = { ...lastChangedExtRef.current, ...changes };
    }

    prevValuesRef.current = values;
  }, [values]);

  // console.log(lastChanged, "last change");

  const inputChange = ({
    target,
  }:
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLTextAreaElement>) => {
    if (socket === null) return;
    socket.emit("input-change", {
      id: data.serviceNo,
      valueId: target.id,
      value: target.value,
    });
    // console.log(target.value, "check");
    setInputValues((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        [target.id]: target.value,
      },
    }));

    // lastChangedExtRef.current = {
    //   ...lastChangedExtRef.current,
    //   [target.id]: target.value,
    // };

    const updatedLastChanged = {
      column: String(target.id),
      value: String(target.value),
    };
    // setLastChanged(updatedLastChanged);
    lastChangedRef.current = updatedLastChanged;
  };

  const inputChangeDropdown = (id: string, value: string) => {
    if (socket === null) return;
    socket.emit("input-change", {
      id: data.serviceNo,
      valueId: id,
      value: value,
    });
    // console.log(target.value, "check");
    setInputValues((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        [id]: value,
      },
    }));

    const updatedLastChanged = {
      column: String(id),
      value: String(value),
    };
    // setLastChanged(updatedLastChanged);
    lastChangedRef.current = updatedLastChanged;
  };

  // Check if lastChangedExtRef is empty ----
  const [lastChangeUpdated, setLastChangeUpdated] = useState(false);
  const isExtEmpty = (refObject: WarrantyDataType) => {
    for (const key of Object.keys(refObject) as Array<keyof WarrantyDataType>) {
      if (key === "locker") continue;
      if (refObject[key] !== null) {
        return true;
      }
    }
    return false;
  };

  // update All DB and reset lastChangedExtRef ----

  const handleUpdateAllDB = async () => {
    if (data.serviceNo) {
      await updateAllDB(data.serviceNo, lastChangedExtRef.current);

      // socket.emit("re-render", { string: "render" });
      clearExtRef();
    }
  };

  const clearExtRef = () => {
    // Update to clear last change for Ext
    const keys = Object.keys(lastChangedExtRef.current) as Array<
      keyof typeof lastChangedExtRef.current
    >;
    keys.forEach((key) => {
      if (key === "locker") return;
      lastChangedExtRef.current[key] = null;
    });

    setLastChangeUpdated(!lastChangeUpdated);
  };

  // OpenClose for bottom box ----
  // const [accordion, setAccordion] = useState(false);
  const accordion = useRef(false);
  const [openTab, setOpenTab] = useState(false);
  // console.log(accordion.current, "accordion");

  // OpenClose for Row ----
  const [openClose, setOpenClose] = useState({
    status: false,
    idtPc: false,
    receivedBy: false,
    pic: false,
    name: false,
    contact: false,
    serviceNo: false,
    date: false,
  });

  const handleOpenClose = (id: string, open: boolean) => {
    console.log(id, open, "check");
    if (socket === null) return;
    setOpenClose({ ...openClose, [id]: open });

    if (open) {
      socket.emit("lock-row", { lock: data.serviceNo });
      // console.log("pass check1", lastChangedExtRef.current);
      return;
    } else {
      // console.log(accordion.current, "accordion1");
      if (accordion.current === true) {
        socket.emit("unlock-row", { lock: data.serviceNo });
        const lastChange = lastChangedRef.current;
        // console.log("pass check2");
        if (lastChange.column != null && lastChange.value != null) {
          // console.log("pass handleOpenClose");
          if (values.serviceNo != null && values.serviceNo != "")
            updateDB(values.serviceNo, lastChange.column, lastChange.value);
          lastChangedRef.current = { column: null, value: null };
        }
      } else {
        // console.log("pass check3");
        const lastChange = lastChangedRef.current;
        // console.log("pass check2");
        if (lastChange.column != null && lastChange.value != null) {
          // console.log("pass handleOpenClose");
          if (values.serviceNo != null && values.serviceNo != "")
            updateDB(values.serviceNo, lastChange.column, lastChange.value);
          lastChangedRef.current = { column: null, value: null };
        }
        return;
      }
    }
  };

  //   console.log(openClose);

  // Handle outside click for all OpenClose Elements ----
  const openRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (socket === null) return;
    const handleOutsideClick = (e: MouseEvent) => {
      // console.log(accordion.current, "accordion3");
      if (openRef.current && openRef.current.contains(e.target as Node)) {
        setOpenClose({ ...openClose });
        // setTimeout(() => {

        //   // console.log(accordion, "unlock outsideclick");
        // }, 50);
        // console.log(accordion.current, "accordion2");
        if (accordion.current === true) {
          socket.emit("unlock-row", { lock: data.serviceNo });
          // Update DB with the changes, take values and pass to parent to DB.
          const lastChange = lastChangedRef.current;
          if (lastChange.column != null && lastChange.value != null) {
            // console.log("pass handleOutsideClick");
            if (values.serviceNo != null && values.serviceNo != "") {
              updateDB(values.serviceNo, lastChange.column, lastChange.value);
              lastChangedRef.current = { column: null, value: null };
            }
          }
        } else {
          // socket.emit("re-render", { string: "render" });
          // console.log("test");
          // Update DB with the changes, take values and pass to parent to DB.
          const lastChange = lastChangedRef.current;
          if (lastChange.column != null && lastChange.value != null) {
            // console.log("pass handleOutsideClick");
            if (values.serviceNo != null && values.serviceNo != "") {
              updateDB(values.serviceNo, lastChange.column, lastChange.value);
              lastChangedRef.current = { column: null, value: null };
            }
          }
          return;
        }

        // if (accordion === true) return;
      }
    };
    window.addEventListener("mousedown", handleOutsideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [openRef, accordion]);

  // ----

  // batch update calls -----------

  type UpdateBatch = {
    [rowId: string]: { column: string; value: string };
  };

  let updateQueue: UpdateBatch = {};

  const processBatchUpdates = async () => {
    for (const rowId in updateQueue) {
      const { column, value } = updateQueue[rowId];
      // console.log(`Updating ${rowId} - ${column}: ${value}`);
      try {
        // Your existing logic to update the database
        updateDB(rowId, column, value);
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (error) {
        // console.error(`Failed to update row ${rowId}:`, error);
      }
    }
    updateQueue = {}; // Clear the queue after processing
  };

  // Debounce the processBatchUpdates function instead of debUpdateDB
  const debounceProcessBatch = debounceFunc(processBatchUpdates, 1000);

  // Socket io -----------------

  const [lockRow, setLockRow] = useState(false);
  // const [lockRowOther, setLockRowOther] = useState(false);

  useEffect(() => {
    if (socket === null) return;

    const handleIfRowLock = ({
      rowId,
      isLocked,
    }: {
      rowId: string;
      isLocked: boolean;
    }) => {
      // console.log(rowId, isLocked);
      if (rowId === data.serviceNo) {
        if (isLocked) {
          // console.log("lock state");
          setLockRow(true);
          setInputValues((prev) => ({
            ...prev,
            values: { ...prev.values, locker: "1" },
          }));
        } else {
          // console.log("unlock state");
          setLockRow(false);
          setInputValues((prev) => ({
            ...prev,
            values: { ...prev.values, locker: "0" },
          }));
        }
      }
    };

    const handleLockRowDB = ({
      rowId,
      isLocked,
      multiLock,
    }: {
      rowId: string;
      isLocked: boolean;
      multiLock: boolean;
    }) => {
      if (!multiLock && rowId === data.serviceNo) {
        if (isLocked) {
          // console.log("lock db");
          updateDB(data.serviceNo, "locker", "1");
        } else {
          // console.log("unlock db");
          updateDB(data.serviceNo, "locker", "0");
        }
      } else if (multiLock) {
        // console.log(rowId);
        if (!isLocked) {
          if (!updateQueue[rowId])
            updateQueue[rowId] = { column: "locker", value: "0" };
          debounceProcessBatch();
        }
      }
    };

    const handleInputChange = ({
      id,
      valueId,
      value,
    }: {
      id: string;
      valueId: string;
      value: string;
    }) => {
      if (valueId === "" || value === "") return;
      if (id === data.serviceNo) {
        setInputValues((prev) => ({
          ...prev,
          values: {
            ...prev.values,
            [valueId]: value,
          },
        }));
      }
    };

    socket.on("lock-row", handleLockRowDB);
    socket.on("input-change", handleInputChange);
    socket.on("lock-row-state", handleIfRowLock);
    // socket.on("unlock-row-all", handleUnlockAllRow);

    return () => {
      socket.off("lock-row", handleLockRowDB);
      socket.off("input-change", handleInputChange);
      socket.off("lock-row-state", handleIfRowLock);
      // socket.off("unlock-row-all", handleUnlockAllRow);
    };
  }, [socket]);

  // alert if date is past 5 days ----

  const [isDateOld, setIsDateOld] = useState(false);

  useEffect(() => {
    const today = new Date();

    if (data.date === null) return;

    // Assuming data.date is in 'DD/MM/YYYY' format
    const [year, month, day] = data.date.split("-").map(Number);
    const currentDate = new Date(year, month - 1, day);

    // Calculate the difference in days
    const diffTime = Math.abs(today.getTime() - currentDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Check if the difference is more than 5 days
    if (diffDays > 5 && data.status !== "Completed") {
      setIsDateOld(true);
    } else {
      setIsDateOld(false);
    }
  }, [data.date, data.status]);

  return (
    <div
      className="tab-row border-t-[1px] border-zinc-800 relative
                data-[open=true]:bg-zinc-900 data-[open=false]:bg-transparent"
      data-open={accordion.current}
    >
      <button
        // disabled={lockRow}
        // disabled={accordion ? false : lockRow || String(values.locker) === "1"}
        className={`
                  ${
                    openTab
                      ? "bg-zinc-700 mobilehover:hover:bg-accent/80 text-zinc-300 cursor-pointer"
                      : "bg-transparent text-transparent cursor-default"
                  }
                  absolute left-[-58px]
                          px-2 py-1 rounded-md transition-all border-[1px]
                          border-transparent`}
        onMouseEnter={() => setOpenTab(true)}
        onMouseLeave={() => setOpenTab(false)}
        onClick={() => {
          // setAccordion(!accordion);
          // console.log(accordion.current, "before");
          accordion.current = !accordion.current;
          // console.log(accordion.current, "after");
          if (!accordion.current) {
            if (data.serviceNo) {
              handleUpdateAllDB();
              socket.emit("unlock-row", {
                rowId: data.serviceNo,
                count: -1,
              });
            }
          } else {
            if (data.serviceNo) {
              socket.emit("lock-row", { rowId: data.serviceNo, count: 1 });
            }
          }
        }}
      >
        <p>{accordion.current ? "Close" : "Open"}</p>
      </button>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        className={`${
          isDateOld ? "block" : "hidden"
        } fill-red-500 absolute left-[100%] top-1`}
      >
        <path d="M17 2H7C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5z"></path>
      </svg>
      <div
        className="tab-row-top w-full flex [&>div]:w-full [&>div]:border-l-[1px] [&>*:first-child]:border-l-[0px] [&>div]:border-zinc-800 whitespace-nowrap"
        onMouseEnter={() => setOpenTab(true)}
        onMouseLeave={() => setOpenTab(false)}
      >
        {/* <div className="max-w-[100px] !border-l-[0px] overflow-hidden px-2 py-1">
          <span>{values.date}</span>
        </div> */}
        <TextBoxEditor
          boxSize={100}
          values={values.date}
          id="date"
          onInputChange={inputChange}
          setOpenClose={handleOpenClose}
          openClose={openClose.date}
        />
        <TextBoxEditor
          boxSize={110}
          values={values.serviceNo}
          id="serviceNo"
          onInputChange={inputChange}
          setOpenClose={handleOpenClose}
          openClose={openClose.serviceNo}
        />
        {branch && (
          <Dropdown
            boxSize={80}
            id={values.serviceNo}
            buttonId="idtPc"
            status={[
              { type: "Yes", color: "bg-accent/80 text-white" },
              { type: "No", color: "bg-zinc-600 text-zinc-200" },
            ]}
            status_all={[
              { type: "Yes", color: "bg-accent/80 text-white" },
              { type: "No", color: "bg-zinc-600 text-zinc-200" },
            ]}
            values={values.idtPc}
            setOpenClose={handleOpenClose}
            openClose={openClose.idtPc}
            setInputValues={inputChangeDropdown}
            updateDB={updateDB}
            clearExtRef={clearExtRef}
          />
        )}
        {branch && (
          <Dropdown
            boxSize={100}
            id={values.serviceNo}
            buttonId="receivedBy"
            status={branch.pic}
            status_all={branch.all_pic}
            values={values.receivedBy}
            setOpenClose={handleOpenClose}
            openClose={openClose.receivedBy}
            setInputValues={inputChangeDropdown}
            updateDB={updateDB}
            clearExtRef={clearExtRef}
          />
        )}
        {branch && (
          <Dropdown
            boxSize={100}
            id={values.serviceNo}
            buttonId="pic"
            status={branch.pic}
            status_all={branch.all_pic}
            values={values.pic}
            setOpenClose={handleOpenClose}
            openClose={openClose.pic}
            setInputValues={inputChangeDropdown}
            updateDB={updateDB}
            clearExtRef={clearExtRef}
          />
        )}
        <TextBoxEditor
          boxSize={9999}
          values={values.name}
          id="name"
          onInputChange={inputChange}
          setOpenClose={handleOpenClose}
          openClose={openClose.name}
        />
        <TextBoxEditor
          boxSize={120}
          values={values.contact}
          id="contact"
          onInputChange={inputChange}
          setOpenClose={handleOpenClose}
          openClose={openClose.contact}
        />
        {branch && (
          <Dropdown
            boxSize={120}
            id={values.serviceNo}
            buttonId="status"
            status={branch.status}
            status_all={branch.status}
            values={values.status}
            setOpenClose={handleOpenClose}
            openClose={openClose.status}
            setInputValues={inputChangeDropdown}
            updateDB={updateDB}
            clearExtRef={clearExtRef}
          />
        )}
      </div>
      <div
        className="
                  tab-row-bot grid
                  px-2 data-[open=true]:py-1 data-[open=false]:py-0
                  data-[open=true]:h-auto data-[open=false]:h-0
                  data-[open=true]:grid-rows-[1fr] data-[open=false]:grid-rows-[0fr] transition-all
                  border-t-[1px] data-[open=true]:border-zinc-800 data-[open=false]:border-transparent overflow-hidden
                  "
        data-open={accordion.current}
      >
        <TableRowExt
          branch={branch}
          onInputChange={inputChange}
          data={values}
          deleteDB={deleteDB}
          updateAllDB={handleUpdateAllDB}
          openCloseTab={accordion}
          isExtEmpty={!isExtEmpty(lastChangedExtRef.current)}
        />
      </div>
      <div
        data-open={
          accordion.current ? false : lockRow || String(values.locker) === "1"
        }
        className="data-[open=true]:block data-[open=false]:hidden z-[3] absolute bg-red-800/20 w-full h-full left-0 top-0"
      />
      <div
        data-open={Object.values(openClose).some((value) => value === true)}
        ref={openRef}
        className="data-[open=true]:block data-[open=false]:hidden fixed z-[1] bg-transparent w-[100vw] h-[100vh] top-0 left-0"
      ></div>
    </div>
  );
};

export default TableRow;
