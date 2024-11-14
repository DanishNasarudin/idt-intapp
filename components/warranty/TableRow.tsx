"use client";
import { Options } from "@/app/warranty/settings/page";
import { cn } from "@/lib/utils";
import { useBranchFormat } from "@/lib/zus-store";
import {
  updateData,
  WarrantyDataType,
} from "@/services/warranty/warrantyActions";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useDebouncedCallback } from "use-debounce";
import DropdownBox from "./DropdownBox";
import EditableTextBox from "./EditableTextBox";

type Props = {
  data?: WarrantyDataType;
};

const defaultData: WarrantyDataType = {
  serviceNo: "",
  date: "",
  pic: "",
  receivedBy: "",
  name: "",
  contact: "",
  status: "",
  email: "",
  address: "",
  purchaseDate: "",
  invoice: "",
  receivedItems: "",
  pin: "",
  issues: "",
  solutions: "",
  statusDesc: "",
  remarks: "",
  idtPc: "",
};

const TableRow = ({ data }: Props) => {
  const activeData = data && Object.keys(data).length > 0 ? data : defaultData;

  const [value, setValue] = useState<WarrantyDataType>(activeData);

  useEffect(() => {
    // console.log("PASS");
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

  const handleValueChange = useDebouncedCallback(
    (newValue: string, id: string) => {
      toast.promise(
        updateData({
          tableName: branchData ? branchData?.data_local : "apLocal",
          whereId: "serviceNo",
          whereValue: value.serviceNo,
          toChangeId: id,
          toChangeValue: newValue,
        }),
        {
          loading: `Updating..`,
          success: `Updated!`,
          error: "Update Error!",
        }
      );
    },
    500
  );
  return (
    <tr
      className={cn(
        "border-t-[1px] border-zinc-800 relative w-full",
        "data-[open=true]:bg-zinc-900 data-[open=false]:bg-transparent",
        "[&>td]:border-l-[1px] [&>*:first-child]:border-l-[0px]"
      )}
      data-open={false}
      //   data-open={accordion.current}
    >
      <EditableTextBox
        id="date"
        value={value.date}
        onValueChange={handleValueChange}
      />
      <EditableTextBox
        id="serviceNo"
        value={value.serviceNo}
        onValueChange={handleValueChange}
      />
      <DropdownBox
        id="idtPc"
        value={value.idtPc}
        options={[
          { option: "Yes", color: "!bg-accent/80 !text-white" },
          { option: "No", color: "!bg-zinc-600 !text-zinc-200" },
        ]}
        onValueChange={handleValueChange}
      />
      <DropdownBox
        id="receivedBy"
        options={staffList}
        value={value.receivedBy}
        onValueChange={handleValueChange}
      />
      <DropdownBox
        id="pic"
        options={staffList}
        value={value.pic}
        onValueChange={handleValueChange}
      />
      <EditableTextBox
        id="name"
        value={value.name}
        onValueChange={handleValueChange}
      />
      <EditableTextBox
        id="contact"
        value={value.contact}
        onValueChange={handleValueChange}
      />
      <DropdownBox
        id="status"
        options={statusList}
        value={value.status}
        onValueChange={handleValueChange}
      />
    </tr>
  );
};

export default TableRow;
