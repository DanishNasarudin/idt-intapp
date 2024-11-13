"use client";
import { Options } from "@/app/warranty/settings/page";
import { cn } from "@/lib/utils";
import { useBranchFormat } from "@/lib/zus-store";
import { WarrantyDataType } from "@/services/common/FetchDB";
import { useEffect, useState } from "react";
import DropdownBox from "./DropdownBox";
import EditableTextBox from "./EditableTextBox";

type Props = {
  key?: string;
  data?: WarrantyDataType;
};

const defaultData: WarrantyDataType = {
  service_no: "",
  date: "",
  pic: "",
  received_by: "",
  name: "",
  contact: "",
  status: "",
  email: "",
  address: "",
  purchase_date: "",
  invoice: "",
  received_items: "",
  pin: "",
  issues: "",
  solutions: "",
  status_desc: "",
  remarks: "",
};

const TableRow = ({ key = "0", data }: Props) => {
  const activeData = data && Object.keys(data).length > 0 ? data : defaultData;

  const [value, setValue] = useState<WarrantyDataType>(activeData);

  useEffect(() => {
    if (data && Object.keys(data).length > 0) setValue(data);
  }, [data]);

  // console.log(value, "CHECK DATA");

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
      <EditableTextBox id="date" value={data?.date} />
      <EditableTextBox id="service_no" value={data?.service_no} />
      <DropdownBox
        id="idt_pc"
        options={[
          { option: "Yes", color: "!bg-accent/80 !text-white" },
          { option: "No", color: "!bg-zinc-600 !text-zinc-200" },
        ]}
      />
      <DropdownBox
        id="received_by"
        options={staffList}
        value={data?.received_by}
      />
      <DropdownBox id="pic" options={staffList} value={data?.pic} />
      <EditableTextBox id="name" value={data?.name} />
      <EditableTextBox id="contact" value={data?.contact} />
      <DropdownBox id="status" options={statusList} value={data?.status} />
    </tr>
  );
};

export default TableRow;
