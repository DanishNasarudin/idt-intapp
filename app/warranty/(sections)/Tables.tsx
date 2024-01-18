"use client";
import React, { useEffect, useState } from "react";
import TableRow from "../(components)/TableRow";
import { BranchType, DataValues, Page } from "../[branch]/page";

type Props = {
  id: string;
  branch: BranchType | null;
  data: DataValues[];
  updateDB: (id: string, column: string, value: string) => void;
  deleteDB: (id: string) => void;
  updateAllDB: (id: string, lastChange: DataValues) => void;
  setNewEntry: (newValue: React.SetStateAction<boolean>) => void;
  page: Page;
  handleSetPage: (id: string, obj: Page) => void;
  lockTable: boolean;
};

const Tables = ({
  id,
  branch,
  data,
  updateDB,
  deleteDB,
  updateAllDB,
  setNewEntry,
  page,
  handleSetPage,
  lockTable,
}: Props) => {
  return (
    <div className="tab-container py-2">
      <div className="tab-head flex [&>div]:w-full [&>div]:px-2 [&>div]:py-1">
        <div className="max-w-[100px]">
          <span>Date</span>
        </div>
        <div className="max-w-[120px]">
          <span>Service No</span>
        </div>
        <div className="max-w-[110px]">
          <span>PIC</span>
        </div>
        <div className="max-w-[9999px]">
          <span>Name</span>
        </div>
        <div className="max-w-[160px]">
          <span>Contact</span>
        </div>
        <div className="max-w-[160px]">
          <span>Status</span>
        </div>
      </div>
      <div className="tab-body relative min-h-[336px]">
        {data &&
          data.map((row) => {
            return (
              <TableRow
                key={row.service_no}
                branch={branch}
                data={row}
                updateDB={updateDB}
                deleteDB={deleteDB}
                updateAllDB={updateAllDB}
                setNewEntry={setNewEntry}
                lockTable={lockTable}
              />
            );
          })}
        <div
          className={`${
            lockTable ? "block" : "hidden"
          } z-[3] absolute w-full h-full bg-zinc-800/50 top-0 left-0`}
        />
      </div>
      <div className="flex gap-4 justify-end pt-8">
        <div
          className={`border-[1px] pl-4 rounded-md overflow-hidden
              bg-transparent border-zinc-600 text-zinc-600
            flex gap-2 items-center
            `}
        >
          <span className="text-zinc-600 cursor-default">
            {page.pageSize} Rows
          </span>
          <div className={`flex flex-col`}>
            <button
              onClick={() => {
                if (page.pageSize < 50)
                  handleSetPage(id, { ...page, pageSize: page.pageSize + 10 });
                setNewEntry((prev) => !prev);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="20"
                viewBox="0 0 24 18"
                className={`px-1 
                    transition-all
                    fill-zinc-600
                    mobilehover:hover:bg-zinc-400
                    `}
              >
                <path d="m6.293 13.293 1.414 1.414L12 10.414l4.293 4.293 1.414-1.414L12 7.586z"></path>
              </svg>
            </button>
            <button
              onClick={() => {
                if (page.pageSize > 10)
                  handleSetPage(id, { ...page, pageSize: page.pageSize - 10 });
                setNewEntry((prev) => !prev);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="20"
                viewBox="0 0 24 18"
                className={`px-1
                    transition-all rotate-180
                    fill-zinc-600
                    mobilehover:hover:bg-zinc-400
                    `}
              >
                <path d="m6.293 13.293 1.414 1.414L12 10.414l4.293 4.293 1.414-1.414L12 7.586z"></path>
              </svg>
            </button>
          </div>
        </div>
        <button
          disabled={!(page.pageNum - 1 > 0)}
          className={`
                          px-4 py-2 rounded-md transition-all border-[1px]
                          bg-transparent 
                          ${
                            !(page.pageNum - 1 > 0)
                              ? "border-zinc-800 text-zinc-800"
                              : "border-zinc-600 text-zinc-600 mobilehover:hover:border-zinc-400 mobilehover:hover:text-zinc-400"
                          }`}
          onClick={() => {
            if (page.pageNum - 1 > 0)
              handleSetPage(id, { ...page, pageNum: page.pageNum - 1 });
            setNewEntry((prev) => !prev);
          }}
        >
          <p>Previous</p>
        </button>
        <button
          disabled={
            !(page.pageNum < Math.floor(page.count / page.pageSize) + 1)
          }
          className={`
                          px-4 py-2 rounded-md transition-all border-[1px]
                          bg-transparent
                          ${
                            !(
                              page.pageNum <
                              Math.floor(page.count / page.pageSize) + 1
                            )
                              ? "border-zinc-800 text-zinc-800"
                              : "border-zinc-600 text-zinc-600 mobilehover:hover:border-zinc-400 mobilehover:hover:text-zinc-400"
                          }`}
          onClick={() => {
            if (page.pageNum < Math.floor(page.count / page.pageSize) + 1)
              handleSetPage(id, { ...page, pageNum: page.pageNum + 1 });
            setNewEntry((prev) => !prev);
          }}
        >
          <p>Next</p>
        </button>
      </div>
    </div>
  );
};

export default Tables;
