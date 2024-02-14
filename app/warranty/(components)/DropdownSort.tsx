import React, { useEffect, useRef, useState } from "react";
import { Options } from "../settings/page";

type SortType = {
  type: string;
  direction: string;
};

type Props = {
  values: SortType;
  setValues: (newVal: React.SetStateAction<SortType[]>) => void;
  setOptions: (newVal: React.SetStateAction<Options[]>) => void;
};

const initialOptions: Options[] = [
  { option: "Option 1", color: "bg-purple-600 text-purple-100" },
  { option: "Option 2", color: "bg-pink-600 text-pink-100" },
  { option: "Option 3", color: "bg-emerald-600 text-emerald-100" },
  { option: "Option 4", color: "bg-red-600 text-red-100" },
];

const DropdownSort = ({ values, setValues, setOptions }: Props) => {
  const [openClose, setOpenClose] = useState(false);

  const openRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (openRef.current && openRef.current.contains(e.target as Node)) {
        setOpenClose((prev) => !prev);
      }
    };
    window.addEventListener("mousedown", handleOutsideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [openRef]);

  // Values ---

  const [optionValues, setOptionValues] = useState<Options[]>(initialOptions);

  //   useEffect(() => {
  //     if (options) setOptionValues(options);
  //   }, [options]);

  const [inputValues, setInputValues] = useState("ASC");

  useEffect(() => {
    if (values) setInputValues(values.direction);
  }, [values]);

  return (
    <div className="relative h-full">
      <button
        className="border-zinc-600 text-zinc-600 mobilehover:hover:border-zinc-400 mobilehover:hover:text-zinc-400 [&>svg]:mobilehover:hover:fill-zinc-400
                  px-2 py-0 rounded-md transition-all border-[1px] bg-transparent cursor-grab
                  flex gap-1 items-center h-full"
        onClick={() => setOpenClose(!openClose)}
      >
        <span>{values.type}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          className={`fill-zinc-600 transition-all ${
            inputValues === "ASC" ? "" : "rotate-180"
          }`}
        >
          <path d="M11 8.414V18h2V8.414l4.293 4.293 1.414-1.414L12 4.586l-6.707 6.707 1.414 1.414z"></path>
        </svg>
      </button>
      <div
        className={`${openClose ? "block" : "hidden"}
      z-[2] absolute w-min left-0 top-[100%] py-1 flex flex-col rounded-md bg-zinc-800`}
      >
        <button
          className=" text-zinc-500  mobilehover:hover:text-zinc-300 [&>svg]:mobilehover:hover:fill-zinc-300
                  px-2 py-1 rounded-md transition-all bg-transparent mobilehover:hover:bg-zinc-400 border-[1px] border-transparent
                  flex gap-1 items-center"
          onClick={() => {
            // setValues.current = "ASC";
            setValues((prev) =>
              prev.map((item) =>
                item.type === values.type ? { ...item, direction: "ASC" } : item
              )
            );
            setInputValues("ASC");
            setOpenClose((prev) => !prev);
          }}
        >
          <span>{values.type}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            className="fill-zinc-500 transition-all"
          >
            <path d="M11 8.414V18h2V8.414l4.293 4.293 1.414-1.414L12 4.586l-6.707 6.707 1.414 1.414z"></path>
          </svg>
        </button>
        <button
          className=" text-zinc-500  mobilehover:hover:text-zinc-300 [&>svg]:mobilehover:hover:fill-zinc-300
                  px-2 py-1 rounded-md transition-all bg-transparent mobilehover:hover:bg-zinc-400 border-[1px] border-transparent
                  flex gap-1 items-center"
          onClick={() => {
            // setValues.current = "DESC";
            setValues((prev) =>
              prev.map((item) =>
                item.type === values.type
                  ? { ...item, direction: "DESC" }
                  : item
              )
            );
            setInputValues("DESC");
            setOpenClose((prev) => !prev);
          }}
        >
          <span>{values.type}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            className="fill-zinc-500 transition-all rotate-180"
          >
            <path d="M11 8.414V18h2V8.414l4.293 4.293 1.414-1.414L12 4.586l-6.707 6.707 1.414 1.414z"></path>
          </svg>
        </button>
        <button
          className=" text-red-500  mobilehover:hover:text-zinc-300 [&>svg]:mobilehover:hover:fill-zinc-300
                  px-2 py-1 rounded-md transition-all bg-transparent mobilehover:hover:bg-zinc-400 border-[1px] border-transparent
                  flex gap-1 items-center"
          onClick={() => {
            // setValues.current = "DESC";
            setValues((prev) =>
              prev.filter((sort) => sort.type !== values.type)
            );
            // setInputValues("DESC");
            setOptions((prev) => [...prev, { option: values.type, color: "" }]);
            setOpenClose((prev) => !prev);
          }}
        >
          <span>Remove</span>
        </button>
      </div>
      <div
        data-open={openClose}
        ref={openRef}
        className="data-[open=true]:block data-[open=false]:hidden fixed z-[1] bg-transparent w-[100vw] h-[100vh] top-0 left-0"
      ></div>
    </div>
  );
};

export default DropdownSort;
