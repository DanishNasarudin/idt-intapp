"use client";
import React, { useEffect, useState } from "react";
import TableRow from "../(components)/TableRow";
import { BranchType, DataValues } from "../[branch]/page";

type Props = {
  branch: BranchType | null;
  data: DataValues[];
  updateDB: (id: string, column: string, value: string) => void;
  deleteDB: (id: string) => void;
  updateAllDB: (id: string, lastChange: DataValues) => void;
};

const Tables = ({ branch, data, updateDB, deleteDB, updateAllDB }: Props) => {
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
      <div className="tab-body">
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
              />
            );
          })}
      </div>
    </div>
  );
};

export default Tables;
