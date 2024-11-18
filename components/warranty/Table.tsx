"use client";
import { cn } from "@/lib/utils";
import { WarrantyDataType } from "@/services/warranty/warrantyActions";
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
    <table className="table-fixed text-zinc-400 text-left w-full">
      <thead className="max-h-[20px]">
        <tr
          className={cn(
            "[&>th]:px-2 whitespace-nowrap [&>th]:!font-normal",
            value.length === 0 && "border-b-[1px] border-zinc-800"
          )}
        >
          <th className="w-[0%]"></th>
          <th className="w-[12%]">
            <span>Date</span>
          </th>
          <th className="w-[14%]">
            <span>Service No</span>
          </th>
          <th className="w-[10%]">
            <span>IDT PC?</span>
          </th>
          <th className="w-[13%]">
            <span>Received by</span>
          </th>
          <th className="w-[13%]">
            <span>Serviced by</span>
          </th>
          <th className="w-[20%]">
            <span>Name</span>
          </th>
          <th className="w-[14%]">
            <span>Contact</span>
          </th>
          <th className="w-[14%]">
            <span>Status</span>
          </th>
        </tr>
      </thead>
      <tbody
        className={cn(
          "overflow-hidden relative [&>*:last-child]:border-b-[1px]",
          value.length === 0 && "h-[150px]"
        )}
      >
        {value.length > 0 ? (
          value.map((item) => (
            <React.Fragment key={item.serviceNo}>
              <TableRow data={item} />
            </React.Fragment>
          ))
        ) : (
          <tr
            className={cn(
              "absolute left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%]",
              "font-bold text-lg"
            )}
          >
            No Data
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default NewTable;
