"use client";
import React, { useEffect, useRef, useState } from "react";
import TextBoxEditor from "./TextBoxEditor";
import { BranchType, DataValues } from "../[branch]/page";
import TableRowExt from "./TableRowExt";
import Dropdown from "./Dropdown";
import socket from "@/lib/socket";

type Props = {
  branch: BranchType | null;
  data: DataValues;
  updateDB: (id: string, column: string, value: string) => void;
  deleteDB: (id: string) => void;
  updateAllDB: (id: string, lastChange: DataValues) => void;
  setNewEntry: (newValue: React.SetStateAction<boolean>) => void;
  lockTable: boolean;
};

type InputState = {
  values: DataValues;
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
  const initialInputState: InputState = {
    values: {
      service_no: data.service_no,
      date: data.date,
      pic: data.pic,
      name: data.name,
      contact: data.contact,
      status: data.status,
      email: data.email,
      address: data.address,
      purchase_date: data.purchase_date,
      invoice: data.invoice,
      received_items: data.received_items,
      pin: data.pin,
      issues: data.issues,
      solutions: data.solutions,
      status_desc: data.status_desc,
      remarks: data.remarks,
      // locker: data.locker,
    },
  };

  const [inputValues, setInputValues] = useState<InputState>(initialInputState);
  const { values } = inputValues;

  useEffect(() => {
    setInputValues({
      values: {
        service_no: data.service_no,
        date: data.date,
        pic: data.pic,
        name: data.name,
        contact: data.contact,
        status: data.status,
        email: data.email,
        address: data.address,
        purchase_date: data.purchase_date,
        invoice: data.invoice,
        received_items: data.received_items,
        pin: data.pin,
        issues: data.issues,
        solutions: data.solutions,
        status_desc: data.status_desc,
        remarks: data.remarks,
        // locker: data.locker,
      },
    });
  }, [data]);

  // console.log(values, "check");

  // last change for individual cells
  const lastChangedRef = useRef<{
    column: string | null;
    value: string | null;
  }>({ column: null, value: null });

  // last change for extended fields
  const lastChangedExtRef = useRef<DataValues>({
    service_no: null,
    date: null,
    pic: null,
    name: null,
    contact: null,
    status: null,
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
    // locker: null,
  });

  // console.log(lastChangedExtRef);

  const prevValuesRef = useRef<DataValues>(values);

  useEffect(() => {
    // console.log("pass");
    setLastChangeUpdated(!lastChangeUpdated);
    const changes: Partial<DataValues> = {};

    (Object.keys(values) as Array<keyof DataValues>).forEach((key) => {
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

  // Check if lastChangedExtRef is empty ----
  const [lastChangeUpdated, setLastChangeUpdated] = useState(false);
  const isExtEmpty = (refObject: DataValues) => {
    for (const key of Object.keys(refObject) as Array<keyof DataValues>) {
      if (refObject[key] !== null) {
        return true;
      }
    }
    return false;
  };

  // update All DB and reset lastChangedExtRef ----

  const handleUpdateAllDB = async () => {
    if (data.service_no)
      await updateAllDB(data.service_no, lastChangedExtRef.current);

    clearExtRef();
  };

  const clearExtRef = () => {
    // Update to clear last change for Ext
    const keys = Object.keys(lastChangedExtRef.current) as Array<
      keyof typeof lastChangedExtRef.current
    >;
    keys.forEach((key) => {
      lastChangedExtRef.current[key] = null;
    });

    setLastChangeUpdated(!lastChangeUpdated);
  };

  // OpenClose for bottom box ----
  const [accordion, setAccordion] = useState(false);
  const [openTab, setOpenTab] = useState(false);
  // console.log(accordion, "accordion");

  // OpenClose for Row ----
  const [openClose, setOpenClose] = useState({
    status: false,
    pic: false,
    name: false,
    contact: false,
    service_no: false,
  });

  const handleOpenClose = (id: string, open: boolean) => {
    // console.log(id, open, "check");
    setOpenClose({ ...openClose, [id]: open });
    if (open) {
      socket.emit("lock-row", { lock: data.service_no });
      // console.log("lock handleOpenClose");
    } else {
      // console.log(accordion, "un lock handleOpenClose");
      if (accordion === false) {
        socket.emit("unlock-row", { lock: data.service_no });
      } else {
        socket.emit("re-render", { string: "render" });
      }
    }

    if (open) return;
    if (accordion === true) return;
    const lastChange = lastChangedRef.current;
    if (lastChange.column != null && lastChange.value != null) {
      console.log("pass handleOpenClose");
      if (values.service_no != null && values.service_no != "")
        updateDB(values.service_no, lastChange.column, lastChange.value);
      lastChangedRef.current = { column: null, value: null };
    }
  };

  //   console.log(openClose);

  // Handle outside click for all OpenClose Elements ----
  const openRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (openRef.current && openRef.current.contains(e.target as Node)) {
        setOpenClose({ ...openClose });
        setTimeout(() => {
          if (accordion === false) {
            socket.emit("unlock-row", { lock: data.service_no });
          } else {
            socket.emit("re-render", { string: "render" });
          }

          // console.log(accordion, "unlock outsideclick");
        }, 50);

        if (accordion === true) return;
        // Update DB with the changes, take values and pass to parent to DB.
        const lastChange = lastChangedRef.current;
        if (lastChange.column != null && lastChange.value != null) {
          // console.log("pass handleOutsideClick");
          if (values.service_no != null && values.service_no != "") {
            updateDB(values.service_no, lastChange.column, lastChange.value);
            lastChangedRef.current = { column: null, value: null };
          }
        }

        clearExtRef();
      }
    };
    window.addEventListener("mousedown", handleOutsideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [openRef, accordion]);

  // ----

  // const populateTemplateWithData = (template: string, data: DataValues) => {
  //   template = template.replace("{{name}}", data.name);
  // };

  // Socket io

  const [lockRow, setLockRow] = useState(false);
  // const [lockRowOther, setLockRowOther] = useState(false);

  useEffect(() => {
    const handleLockRow = ({ lock }: { lock: string }) => {
      if (lock === "" || lock === null) return;
      if (lock === data.service_no) setLockRow(true);
      // console.log("lock pass");
    };

    const handleUnlockRow = ({ lock }: { lock: string }) => {
      if (lock === "" || lock === null) return;
      if (lock === data.service_no) setLockRow(false);
      // console.log("unlock pass");
    };

    socket.on("lock-row", handleLockRow);
    socket.on("unlock-row", handleUnlockRow);

    return () => {
      socket.off("lock-row", handleLockRow);
      socket.off("unlock-row", handleUnlockRow);
    };
  }, []);

  // console.log(data.service_no, data.locker, "locker");

  return (
    <div
      className="tab-row border-t-[1px] border-zinc-800 relative
                data-[open=true]:bg-zinc-900 data-[open=false]:bg-transparent"
      data-open={accordion}
    >
      <button
        disabled={lockTable || lockRow}
        className={`
                  ${
                    openTab && !lockTable
                      ? "bg-zinc-700 mobilehover:hover:bg-accent/80 text-zinc-300 cursor-pointer"
                      : "bg-transparent text-transparent cursor-default"
                  }
                  absolute left-[-58px]
                          px-2 py-1 rounded-md transition-all border-[1px]
                          border-transparent`}
        onMouseEnter={() => setOpenTab(true)}
        onMouseLeave={() => setOpenTab(false)}
        onClick={() => {
          setAccordion(!accordion);
          if (accordion) {
            // if (data.service_no) updateDB(data.service_no, "locker", "0");
            setTimeout(() => {
              handleUpdateAllDB();
              socket.emit("unlock-row", { lock: data.service_no });
            }, 50);
          } else {
            // if (data.service_no) updateDB(data.service_no, "locker", "1");
            socket.emit("lock-row", { lock: data.service_no });
          }
        }}
      >
        <p>{accordion ? "Close" : "Open"}</p>
      </button>
      <div
        className="tab-row-top w-full flex [&>div]:w-full [&>div]:border-l-[1px] [&>div]:border-zinc-800 whitespace-nowrap"
        onMouseEnter={() => setOpenTab(true)}
        onMouseLeave={() => setOpenTab(false)}
      >
        <div className="max-w-[100px] !border-l-[0px] overflow-hidden px-2 py-1">
          <span>{values.date}</span>
        </div>
        <TextBoxEditor
          boxSize={120}
          values={values.service_no}
          id="service_no"
          onInputChange={inputChange}
          setOpenClose={handleOpenClose}
          openClose={openClose.service_no}
        />
        {branch && (
          <Dropdown
            boxSize={110}
            id={values.service_no}
            buttonId="pic"
            status={branch.pic}
            values={values.pic}
            setOpenClose={handleOpenClose}
            openClose={openClose.pic}
            setInputValues={setInputValues}
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
          boxSize={160}
          values={values.contact}
          id="contact"
          onInputChange={inputChange}
          setOpenClose={handleOpenClose}
          openClose={openClose.contact}
        />
        {branch && (
          <Dropdown
            boxSize={160}
            id={values.service_no}
            buttonId="status"
            status={branch.status}
            values={values.status}
            setOpenClose={handleOpenClose}
            openClose={openClose.status}
            setInputValues={setInputValues}
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
        data-open={accordion}
      >
        <TableRowExt
          onInputChange={inputChange}
          data={values}
          deleteDB={deleteDB}
          updateAllDB={handleUpdateAllDB}
          openCloseTab={setAccordion}
          isExtEmpty={!isExtEmpty(lastChangedExtRef.current)}
        />
      </div>
      <div
        data-open={lockRow}
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
