"use client";
import React, { useEffect, useRef, useState } from "react";
import TextBoxEditor from "./TextBoxEditor";
import { BranchType, DataValues } from "../[branch]/page";
import TableRowExt from "./TableRowExt";
import Dropdown from "./Dropdown";

type Props = {
  branch: BranchType | null;
  data: DataValues;
  updateDB: (id: string, column: string, value: string) => void;
  deleteDB: (id: string) => void;
  updateAllDB: (id: string, lastChange: DataValues) => void;
};

type InputState = {
  values: DataValues;
};

const TableRow = ({ branch, data, updateDB, deleteDB, updateAllDB }: Props) => {
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
    },
  };

  const [inputValues, setInputValues] = useState<InputState>(initialInputState);
  const { values } = inputValues;

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

    const lastChange = lastChangedRef.current;
    if (lastChange.column != null && lastChange.value != null) {
      // console.log("pass");
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

        // Update DB with the changes, take values and pass to parent to DB.
        const lastChange = lastChangedRef.current;
        if (lastChange.column != null && lastChange.value != null) {
          // console.log("pass");
          if (values.service_no != null && values.service_no != "")
            updateDB(values.service_no, lastChange.column, lastChange.value);
          lastChangedRef.current = { column: null, value: null };
        }

        clearExtRef();
      }
    };
    window.addEventListener("mousedown", handleOutsideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [openRef]);

  // ----

  // const populateTemplateWithData = (template: string, data: DataValues) => {
  //   template = template.replace("{{name}}", data.name);
  // };

  return (
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
        onClick={() => {
          setAccordion(!accordion);
          if (accordion) handleUpdateAllDB();
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
        {/* <TextBoxEditor
          boxSize={110}
          values={values.pic}
          id="pic"
          onInputChange={inputChange}
          setOpenClose={handleOpenClose}
          openClose={openClose.pic}
        /> */}
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
        {/* <div
          role="button"
          className="max-w-[160px] whitespace-nowrap relative px-2 py-1"
          onClick={() => setOpenClose({ ...openClose, openStatus: true })}
        >
          {branch &&
            branch.status.map((status, key) => {
              if (status.type === values.status)
                return (
                  <div
                    key={key}
                    role="button"
                    className={`rounded-md w-max px-2 ${status.color}`}
                  >
                    <span>{values.status}</span>
                  </div>
                );
            })}
          {openClose.openStatus && (
            <div className="z-[2] absolute w-full left-0 top-0 py-2 flex flex-col rounded-md bg-zinc-800">
              {branch &&
                branch.status.map((status, key) => {
                  return (
                    <div
                      key={key}
                      role="button"
                      className="row-cont px-2 py-1 mobilehover:hover:bg-zinc-700"
                      onClick={() => {
                        setInputValues((prev) => {
                          return {
                            ...prev,
                            values: { ...prev.values, status: status.type },
                          };
                        });
                        updateDB(values.service_no, "status", status.type);
                        setTimeout(() => {
                          clearExtRef();
                          setOpenClose((prev) => {
                            return { ...prev, openStatus: false };
                          });
                        }, 50);
                      }}
                    >
                      <div
                        className={`${status.color} rounded-md w-max leading-none px-2 py-[2px]`}
                      >
                        <span>{status.type}</span>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </div> */}
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
        data-open={Object.values(openClose).some((value) => value === true)}
        ref={openRef}
        className="data-[open=true]:block data-[open=false]:hidden fixed z-[1] bg-transparent w-[100vw] h-[100vh] top-0 left-0"
      ></div>
    </div>
  );
};

export default TableRow;
