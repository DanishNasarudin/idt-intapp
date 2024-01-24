"use client";
import React, { useEffect, useRef, useState } from "react";

type Props = {
  boxSize: number;
  values: string | null;
  id: string;
  onInputChange: (newValue: React.ChangeEvent<HTMLInputElement>) => void;
  setOpenClose: (id: string, newValue: boolean) => void;
  openClose: boolean;
};

const TextBoxEditor = ({
  boxSize,
  values,
  id,
  onInputChange,
  setOpenClose,
  openClose,
}: Props) => {
  // Open input box ----
  const inputRef = useRef<HTMLInputElement>(null);

  // Copy values ----
  const [copyValues, setCopyValues] = useState("");
  const [copyValuesH, setCopyValuesH] = useState(false);

  useEffect(() => {
    if (copyValues) {
      navigator.clipboard.writeText(String(copyValues));
      setCopyValues("");
    }
  }, [copyValues]);
  // console.log(values);

  return (
    <div
      className={`
                  max-w-[${boxSize}px] h-full
                  relative
                  ${openClose ? "" : "overflow-hidden"}
                  ${
                    copyValuesH
                      ? "[&>svg]:mobilehover:hover:fill-green-300 [&>svg]:mobilehover:hover:bg-green-700"
                      : "[&>svg]:mobilehover:hover:fill-zinc-300 [&>svg]:mobilehover:hover:bg-zinc-700"
                  }`}
    >
      <div
        role="button"
        className="w-full px-2 py-1 cursor-default"
        onClick={() => {
          setOpenClose(id, true);
          setTimeout(() => {
            if (inputRef.current && inputRef.current.id === id)
              inputRef.current.focus();
          }, 100);
        }}
      >
        {values === null ? (
          <p className="min-h-[24px]"></p>
        ) : (
          <p className="min-h-[24px]">{values}</p>
        )}
        <div
          role="textbox"
          data-open={openClose}
          className="z-[2] data-[open=true]:block data-[open=false]:hidden absolute w-full h-full top-0 left-0 bg-zinc-800 flex items-center whitespace-normal"
        >
          <div className="bg-zinc-800 h-max w-full px-1 py-1 rounded-md whitespace-normal">
            <input
              ref={openClose ? inputRef : null}
              id={id}
              type="text"
              value={values === null ? "" : values}
              onChange={(e) => {
                onInputChange(e);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === "Escape") {
                  setOpenClose(id, false);
                }
              }}
              placeholder=" "
              className="outline-none cursor-text w-full bg-zinc-800 text-white placeholder-gray-400"
            />
          </div>
        </div>
      </div>
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
          setCopyValues(values ? values : "");
          setCopyValuesH(true);
          setTimeout(() => {
            setCopyValuesH(false);
          }, 1000);
        }}
      >
        <path d="M20 2H10c-1.103 0-2 .897-2 2v4H4c-1.103 0-2 .897-2 2v10c0 1.103.897 2 2 2h10c1.103 0 2-.897 2-2v-4h4c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zM4 20V10h10l.002 10H4zm16-6h-4v-4c0-1.103-.897-2-2-2h-4V4h10v10z"></path>
        <path d="M6 12h6v2H6zm0 4h6v2H6z"></path>
      </svg>
    </div>
  );
};

export default TextBoxEditor;
