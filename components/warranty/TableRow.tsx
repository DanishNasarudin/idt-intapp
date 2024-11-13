"use client";
import { Options } from "@/app/warranty/settings/page";
import { cn } from "@/lib/utils";
import { useBranchFormat } from "@/lib/zus-store";
import { WarrantyDataType } from "@/services/common/FetchDB";
import { useState } from "react";
import DropdownBox from "./DropdownBox";
import EditableTextBox from "./EditableTextBox";

type Props = {
  data?: WarrantyDataType;
};

const TableRow = ({ data }: Props) => {
  const [value, setValue] = useState();

  const branchData = useBranchFormat((state) => state.branchData);

  const staffList: Options[] | undefined =
    branchData &&
    branchData.pic.map((item) => ({
      option: item.type,
      color: item.color,
    }));

  const statusList: Options[] | undefined =
    branchData &&
    branchData.status.map((item) => ({
      option: item.type,
      color: item.color,
    }));
  return (
    <tr
      className={cn(
        "border-t-[1px] border-zinc-800 relative w-full",
        "data-[open=true]:bg-zinc-900 data-[open=false]:bg-transparent",
        "[&>td]:border-l-[1px] "
      )}
      data-open={false}
      //   data-open={accordion.current}
    >
      <EditableTextBox id="date" />
      <EditableTextBox id="date" />
      <DropdownBox
        options={[
          { option: "Yes", color: "!bg-accent/80 !text-white" },
          { option: "No", color: "!bg-zinc-600 !text-zinc-200" },
        ]}
      />
      <DropdownBox options={staffList} />
      <DropdownBox options={staffList} />
      <EditableTextBox id="date" />
      <EditableTextBox id="date" />
      <DropdownBox options={statusList} />
    </tr>
  );
};

export default TableRow;
