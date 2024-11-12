import { Options } from "@/app/warranty/settings/page";
import React, { useEffect, useRef, useState } from "react";

type SortType = {
  type: string;
  direction: string;
};

type Props = {
  values: string;
  setValues: (newVal: React.SetStateAction<SortType[]>) => void;
  setOptions: (newVal: React.SetStateAction<Options[]>) => void;
  options: Options[];
};

const initialOptions: Options[] = [
  { option: "Option 1", color: "bg-purple-600 text-purple-100" },
  { option: "Option 2", color: "bg-pink-600 text-pink-100" },
  { option: "Option 3", color: "bg-emerald-600 text-emerald-100" },
  { option: "Option 4", color: "bg-red-600 text-red-100" },
];

const DropdownSortAdd = ({ values, setValues, setOptions, options }: Props) => {
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

  useEffect(() => {
    if (options) setOptionValues(options);
  }, [options]);

  const [inputValues, setInputValues] = useState("ASC");

  //   useEffect(() => {
  //     if (values) setInputValues(values);
  //   }, [values]);

  return (
    <div className="relative h-full">
      <button
        className=" text-zinc-600 mobilehover:hover:text-zinc-400 [&>svg]:mobilehover:hover:fill-zinc-400
                  px-2 py-0 rounded-md transition-all border-[1px] border-transparent bg-transparent
                  flex gap-1 items-center h-full"
        onClick={() => setOpenClose(!openClose)}
      >
        <span>{values}</span>
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          className={`fill-zinc-600 transition-all ${
            inputValues === "ASC" ? "" : "rotate-180"
          }`}
        >
          <path d="M11 8.414V18h2V8.414l4.293 4.293 1.414-1.414L12 4.586l-6.707 6.707 1.414 1.414z"></path>
        </svg> */}
      </button>
      <div
        className={`${openClose ? "block" : "hidden"}
      z-[2] absolute w-min left-0 top-[100%] py-1 flex flex-col rounded-md bg-zinc-800`}
      >
        {optionValues &&
          optionValues.map((option, key) => {
            return (
              <button
                key={key}
                className=" text-zinc-500  mobilehover:hover:text-zinc-300 [&>svg]:mobilehover:hover:fill-zinc-300
                  px-2 py-1 rounded-md transition-all bg-transparent mobilehover:hover:bg-zinc-400 border-[1px] border-transparent
                  flex gap-1 items-center"
                onClick={() => {
                  // setValues.current = "ASC";
                  setValues((prev) => [
                    { type: option.option, direction: "ASC" },
                    ...prev,
                  ]);
                  setOptions((prev) =>
                    prev.filter((sort) => sort.option !== option.option)
                  );
                  //   setInputValues("ASC");
                  setOpenClose((prev) => !prev);
                }}
              >
                <span>{option.option}</span>
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  className="fill-zinc-500 transition-all"
                >
                  <path d="M11 8.414V18h2V8.414l4.293 4.293 1.414-1.414L12 4.586l-6.707 6.707 1.414 1.414z"></path>
                </svg> */}
              </button>
            );
          })}
      </div>
      <div
        data-open={openClose}
        ref={openRef}
        className="data-[open=true]:block data-[open=false]:hidden fixed z-[1] bg-transparent w-[100vw] h-[100vh] top-0 left-0"
      ></div>
    </div>
  );
};

export default DropdownSortAdd;
