"use client";
import TextBoxNormal from "@/app/(components)/TextBoxNormal";
import { searchData } from "@/app/(serverActions)/FetchDB";
import React, { useEffect, useRef, useState } from "react";
import WarrantyBar from "../(components)/WarrantyBar";
import Offers from "../(sections)/Offers";

type Props = {};

type SearchData = {
  service_no: string;
  date: string;
  pic: string;
  status: string;
  issues: string;
};

const initSearchData: SearchData = {
  service_no: "",
  date: "",
  pic: "",
  status: "",
  issues: "",
};

const statusColor = [
  { type: "In Queue", color: "bg-fuchsia-600 text-fuchsia-100" },
  { type: "In Progress", color: "bg-purple-600 text-purple-100" },
  { type: "Completed", color: "bg-emerald-600 text-emerald-100" },
];

const Warranty = (props: Props) => {
  const [data, setData] = useState<SearchData>(initSearchData);
  const [color, setColor] = useState("");
  const input = useRef("");
  const [inputRender, setInputRender] = useState("");
  const [inputQRender, setInputQRender] = useState(0);

  const change = ({
    target,
  }:
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLTextAreaElement>) => {
    input.current = target.value;
    setInputRender((prev) => (prev = target.value));
  };

  const inpQ = (value: number) => {
    setInputQRender((prev) => (prev = value));
  };

  // on search

  const onSearch = async () => {
    const result = await searchData(input.current);
    if (result.rows.length === 0) return;
    setData(result.rows[0]);

    setInputRender((prev) => (prev = ""));
    input.current = "";

    const matchColor = statusColor.find(
      (data) => data.type === result.rows[0].status
    );

    if (matchColor) {
      setColor(matchColor.color);
    } else {
      setColor("");
    }
  };

  // console.log(data);

  return (
    <>
      <div className="mt-12 xs:mt-auto flex flex-col gap-8 xs:gap-16 max-w-[900px] w-full px-4 xs:px-16 py-4 mx-auto">
        <div className="top nav w-full flex justify-end"></div>
        <h2>Warranty Services</h2>
        <div className="flex flex-col gap-8 w-full">
          {/* <div className="flex gap-8 flex-col md:flex-row">
            <div className="flex flex-col gap-2 md:w-min p-4 rounded-md bg-zinc-900 border-[1px] border-zinc-800">
              <p className="whitespace-nowrap">PCs in Queue (All Store)</p>
              <h2>{inputQRender} Units</h2>
            </div>
            <WarrantyBar inQ={inpQ} />
          </div> */}
          <div className="flex flex-col">
            <Offers />
          </div>
          <div className="max-w-[300px] flex gap-4 items-end">
            <TextBoxNormal
              id={"service"}
              title={"Service Number"}
              input={inputRender}
              onInputChange={change}
              area={false}
              areaSize={""}
            />
            <button
              className={`
                              px-4 py-2 rounded-md transition-all border-[1px] h-min
                              bg-transparent border-zinc-600 text-zinc-600
                              mobilehover:hover:border-accent mobilehover:hover:text-accent`}
              onClick={() => onSearch()}
            >
              <p className="leading-none">Search</p>
            </button>
          </div>
          <div className="w-full flex">
            {data.date ? (
              <div className="bg-zinc-900 p-4 rounded-md border-[1px] dark:border-zinc-800 border-zinc-400 w-full md:w-auto">
                <div className="flex">
                  <div className="w-full min-w-[100px]">
                    <p className="whitespace-nowrap pb-3 text-zinc-400">
                      Service Number:
                    </p>
                  </div>
                  <div className="w-full">
                    <p className="pb-3">{data.service_no}</p>
                  </div>
                </div>
                <div className="flex">
                  <div className="w-full min-w-[100px] text-zinc-400">
                    <p className="whitespace-nowrap pb-3">Status:</p>
                  </div>
                  <div className="w-full">
                    <p
                      className={`${color} p-1 rounded-md leading-none w-min whitespace-nowrap`}
                    >
                      {data.status}
                    </p>
                  </div>
                </div>
                <div className="flex py-4">
                  <div className="w-full border-[1px] dark:border-zinc-800 border-zinc-400" />
                </div>
                <div className="flex">
                  <div className="w-full min-w-[100px] text-zinc-400">
                    <p className="whitespace-nowrap pb-3">Issues:</p>
                  </div>
                  <div className="w-full">
                    <p className="pb-3">{data.issues}</p>
                  </div>
                </div>
                <div className="flex">
                  <div className="w-full min-w-[100px] text-zinc-400">
                    <p className="whitespace-nowrap pb-3">Serviced by:</p>
                  </div>
                  <div className="w-full">
                    <p className="pb-3">{data.pic}</p>
                  </div>
                </div>
                <div className="flex">
                  <div className="w-full min-w-[100px] text-zinc-400">
                    <p className="whitespace-nowrap pb-3">Date Issued:</p>
                  </div>
                  <div className="w-full">
                    <p className="pb-3">{data.date}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex gap-4 items-center mx-auto py-8">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="80"
                  height="80"
                  viewBox="0 0 24 24"
                  className="fill-white w-20 animate-[spin_5s_linear_infinite]"
                >
                  <path d="M12 16c2.206 0 4-1.794 4-4s-1.794-4-4-4-4 1.794-4 4 1.794 4 4 4zm0-6c1.084 0 2 .916 2 2s-.916 2-2 2-2-.916-2-2 .916-2 2-2z"></path>
                  <path d="m2.845 16.136 1 1.73c.531.917 1.809 1.261 2.73.73l.529-.306A8.1 8.1 0 0 0 9 19.402V20c0 1.103.897 2 2 2h2c1.103 0 2-.897 2-2v-.598a8.132 8.132 0 0 0 1.896-1.111l.529.306c.923.53 2.198.188 2.731-.731l.999-1.729a2.001 2.001 0 0 0-.731-2.732l-.505-.292a7.718 7.718 0 0 0 0-2.224l.505-.292a2.002 2.002 0 0 0 .731-2.732l-.999-1.729c-.531-.92-1.808-1.265-2.731-.732l-.529.306A8.1 8.1 0 0 0 15 4.598V4c0-1.103-.897-2-2-2h-2c-1.103 0-2 .897-2 2v.598a8.132 8.132 0 0 0-1.896 1.111l-.529-.306c-.924-.531-2.2-.187-2.731.732l-.999 1.729a2.001 2.001 0 0 0 .731 2.732l.505.292a7.683 7.683 0 0 0 0 2.223l-.505.292a2.003 2.003 0 0 0-.731 2.733zm3.326-2.758A5.703 5.703 0 0 1 6 12c0-.462.058-.926.17-1.378a.999.999 0 0 0-.47-1.108l-1.123-.65.998-1.729 1.145.662a.997.997 0 0 0 1.188-.142 6.071 6.071 0 0 1 2.384-1.399A1 1 0 0 0 11 5.3V4h2v1.3a1 1 0 0 0 .708.956 6.083 6.083 0 0 1 2.384 1.399.999.999 0 0 0 1.188.142l1.144-.661 1 1.729-1.124.649a1 1 0 0 0-.47 1.108c.112.452.17.916.17 1.378 0 .461-.058.925-.171 1.378a1 1 0 0 0 .471 1.108l1.123.649-.998 1.729-1.145-.661a.996.996 0 0 0-1.188.142 6.071 6.071 0 0 1-2.384 1.399A1 1 0 0 0 13 18.7l.002 1.3H11v-1.3a1 1 0 0 0-.708-.956 6.083 6.083 0 0 1-2.384-1.399.992.992 0 0 0-1.188-.141l-1.144.662-1-1.729 1.124-.651a1 1 0 0 0 .471-1.108z"></path>
                </svg>
                <h1>Find out your service status..</h1>
              </div>
            )}
          </div>
        </div>
        <div className="h-[20vh]" />
      </div>
      {/* <div className="md:hidden flex justify-center items-center h-[100vh] text-center w-full">
        <h2>Use Desktop PC</h2>
      </div> */}
    </>
  );
};

export default Warranty;
