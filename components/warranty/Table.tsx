"use client";
import { cn } from "@/lib/utils";
import { WarrantyDataType } from "@/services/common/FetchDB";
import React, { useEffect, useState } from "react";
import TableRow from "./TableRow";

type Props = {
  data?: WarrantyDataType[];
};

const NewTable = ({ data }: Props) => {
  const [value, setValue] = useState<WarrantyDataType[]>(data || []);

  useEffect(() => {
    if (data) setValue(data);
  }, [data]);

  return (
    <table className="table-fixed text-zinc-400 text-left w-full ">
      <thead className="max-h-[20px]">
        <tr className="[&>th]:px-2 [&>th]:w-full ">
          <th className="w-[100px]">
            <span>Date</span>
          </th>
          <th className="w-[110px]">
            <span>Service No</span>
          </th>
          <th className="w-[80px]">
            <span>IDT PC?</span>
          </th>
          <th className="w-[100px]">
            <span>Received by</span>
          </th>
          <th className="w-[100px]">
            <span>Serviced by</span>
          </th>
          <th className="w-[200px]">
            <span>Name</span>
          </th>
          <th className="w-[120px]">
            <span>Contact</span>
          </th>
          <th className="w-[120px]">
            <span>Status</span>
          </th>
        </tr>
      </thead>
      <tbody
        className={cn(
          "overflow-hidden relative",
          value.length === 0 && "h-[150px]"
        )}
      >
        {value.length > 0 ? (
          value.map((item) => (
            <React.Fragment key={item.service_no}>
              <TableRow data={item} />
            </React.Fragment>
          ))
        ) : (
          <tr className="absolute left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] font-bold text-lg">
            No Data
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default NewTable;
