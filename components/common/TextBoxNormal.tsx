"use client";
import React, { useEffect, useState } from "react";

type Props = {
  id?: string;
  title?: string;
  input?: string | null;
  onInputChange?: (
    newValue:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  area?: boolean;
  areaSize?: string;
};

const TextBoxNormal = ({
  id = "default",
  title = "Title Placeholder",
  input = "",
  area = false,
  areaSize = "0",
  onInputChange = () => {},
}: Props) => {
  // Copy values ----
  const [copyValues, setCopyValues] = useState("");
  const [copyValuesH, setCopyValuesH] = useState(false);

  useEffect(() => {
    if (copyValues) {
      navigator.clipboard.writeText(String(copyValues));
      setCopyValues("");
    }
  }, [copyValues]);

  if (area)
    return (
      <div className="z-[1] flex flex-col gap-2">
        <span className="text-zinc-400">{title}</span>
        <div
          className={`
        ${
          copyValuesH
            ? "[&>svg]:mobilehover:hover:fill-green-300 [&>svg]:mobilehover:hover:bg-green-700"
            : "[&>svg]:mobilehover:hover:fill-zinc-300 [&>svg]:mobilehover:hover:bg-zinc-700"
        }
      relative`}
        >
          <textarea
            placeholder=""
            className={`
                  bg-transparent border-[1px] border-zinc-800 outline-none rounded-md resize-none
                  px-2 py-1 h-[${areaSize}] w-full
            `}
            id={id}
            value={input === null ? "" : input}
            onChange={(e) => {
              onInputChange(e);
            }}
          />
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
              setCopyValues(input ? input : "");
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
      </div>
    );
  return (
    <div
      className={`z-[1]
    flex flex-col gap-2`}
    >
      <span className="text-zinc-400">{title}</span>
      <div
        className={`
      ${
        copyValuesH
          ? "[&>svg]:mobilehover:hover:fill-green-300 [&>svg]:mobilehover:hover:bg-green-700"
          : "[&>svg]:mobilehover:hover:fill-zinc-300 [&>svg]:mobilehover:hover:bg-zinc-700"
      }
      relative`}
      >
        <input
          type="text"
          placeholder=""
          className="
                  bg-transparent border-[1px] border-zinc-800 outline-none rounded-md w-full
                  px-2 py-1
            "
          id={id}
          value={input === null ? "" : input}
          onChange={(e) => {
            onInputChange(e);
          }}
        />
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
            setCopyValues(input ? input : "");
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
    </div>
  );
};

export default TextBoxNormal;
