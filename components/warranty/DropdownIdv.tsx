"use client";
import { Options } from "@/app/warranty/settings/page";
import React, { useEffect, useRef, useState } from "react";

type Props = {
  minSize: string;
  values: string;
  options: Options[];
  setValues: React.MutableRefObject<string>;
  updateDB?: () => void;
  className?: string;
};

const initialOptions: Options[] = [
  { option: "Option 1", color: "bg-purple-600 text-purple-100" },
  { option: "Option 2", color: "bg-pink-600 text-pink-100" },
  { option: "Option 3", color: "bg-emerald-600 text-emerald-100" },
  { option: "Option 4", color: "bg-red-600 text-red-100" },
];

const DropdownIdv = ({ minSize, values, options, setValues }: Props) => {
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

  const [inputValues, setInputValues] = useState("Option 1");

  useEffect(() => {
    if (values) setInputValues(values);
  }, [values]);
  return (
    <div className="relative">
      <button
        className={`
                  ${
                    openClose
                      ? "border-accent/60 text-accent/60 mobilehover:hover:border-accent mobilehover:hover:text-accent"
                      : "border-zinc-600 text-zinc-600 mobilehover:hover:border-zinc-400 mobilehover:hover:text-zinc-400"
                  }
                              px-4 py-2 rounded-md transition-all border-[1px] ${
                                minSize
                                  ? `min-w-[${minSize}px]`
                                  : `min-w-[147px]`
                              }  
                              bg-transparent
                              `}
        onClick={() => {
          setOpenClose((prev) => !prev);
        }}
      >
        <p>{inputValues}</p>
      </button>
      {openClose && (
        <div className="z-[2] absolute w-min left-0 top-[100%] py-2 flex flex-col rounded-md bg-zinc-800">
          {optionValues &&
            optionValues.map((options, key) => {
              return (
                <div
                  key={key}
                  role="button"
                  className="row-cont px-2 py-1 mobilehover:hover:bg-zinc-700"
                  onClick={() => {
                    setValues.current = options.option;
                    setInputValues(options.option);
                    setOpenClose((prev) => !prev);
                  }}
                >
                  <div
                    className={`${options.color} rounded-md w-max leading-none px-2 py-[2px]`}
                  >
                    <span>{options.option}</span>
                  </div>
                </div>
              );
            })}
        </div>
      )}
      <div
        data-open={openClose}
        ref={openRef}
        className="data-[open=true]:block data-[open=false]:hidden fixed z-[1] bg-transparent w-[100vw] h-[100vh] top-0 left-0"
      ></div>
    </div>
  );
};

export default DropdownIdv;
