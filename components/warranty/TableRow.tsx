"use client";
import { Options } from "@/app/warranty/settings/page";
import { cn } from "@/lib/utils";
import { useBranchFormat } from "@/lib/zus-store";
import {
  passWarranty,
  updateWarranty,
  WarrantyDataType,
} from "@/services/warranty/warrantyActions";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useDebouncedCallback } from "use-debounce";
import { Accordion, AccordionContent, AccordionItem } from "../ui/accordion";
import { Button } from "../ui/button";
import AccordionRow from "./AccordionRow";
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
  cost: 0,
  locker: 0,
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

  const allStaffList: Options[] | undefined =
    branchData &&
    branchData.all_pic.map((item) => ({
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
      if (id === "status" && newValue.includes("Pass")) {
        const fromDb = branchData?.data_local;
        const toDbString = newValue;
        let toDb: string;
        let displayString: string;

        switch (toDbString) {
          case "Pass Ampang":
            toDb = "ap_local";
            displayString = "Ampang";
            break;
          case "Pass SS2":
            toDb = "s2_local";
            displayString = "SS2";
            break;
          case "Pass Setia Alam":
            toDb = "sa_local";
            displayString = "Setia Alam";
            break;
          case "Pass JB":
            toDb = "jb_local";
            displayString = "JB";
            break;
          default:
            throw new Error(`Update fails at moving data.`);
        }

        toast.promise(
          passWarranty({
            tableFrom: fromDb,
            tableTo: toDb,
            toPassId: value.serviceNo,
          }),
          {
            loading: `Passing..`,
            success: `Passed to ${displayString}!`,
            error: "Data Passing Error!",
          }
        );
      } else {
        toast.promise(
          updateWarranty({
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
      }
    },
    500
  );

  const [accordion, setAccordion] = useState("");
  return (
    <>
      <tr
        className={cn(
          "border-t-[1px] border-zinc-800 relative w-full",
          "[&>td]:border-l-[1px] [&>*:last-child]:border-r-[1px]",
          "group/accordion transition-all",
          accordion === "" ? "bg-transparent" : "bg-zinc-900"
        )}
      >
        <td className="relative">
          <Button
            onClick={() =>
              setAccordion((prev) => (prev === "" ? "item-1" : ""))
            }
            variant={"nothing"}
            size={"sm"}
            className={cn(
              "absolute right-[-100%] top-0 mobilehover:group-hover/accordion:text-white text-transparent bg-transparent transition-all",
              accordion === ""
                ? "mobilehover:group-hover/accordion:bg-accent"
                : "mobilehover:group-hover/accordion:bg-destructive"
            )}
          >
            {accordion === "" ? "Open" : "Close"}
          </Button>
        </td>
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
          allOptions={[
            { option: "Yes", color: "!bg-accent/80 !text-white" },
            { option: "No", color: "!bg-zinc-600 !text-zinc-200" },
          ]}
          onValueChange={handleValueChange}
        />
        <DropdownBox
          id="receivedBy"
          options={staffList}
          allOptions={allStaffList}
          value={value.receivedBy}
          onValueChange={handleValueChange}
        />
        <DropdownBox
          id="pic"
          options={staffList}
          allOptions={allStaffList}
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
      <tr
        className={cn(
          accordion === "" ? "bg-transparent" : "bg-zinc-900",
          "transition-all"
        )}
      >
        <td colSpan={9}>
          <Accordion
            type="single"
            collapsible
            className="w-full"
            value={accordion}
            onValueChange={setAccordion}
          >
            <AccordionItem
              value="item-1"
              className={cn(
                "border-b-[0px] transition-all ",
                accordion === "" ? "" : "border-t-[1px]"
              )}
            >
              <AccordionContent className="pb-0">
                <AccordionRow value={value} onValueChange={handleValueChange} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </td>
      </tr>
    </>
  );
};

export default TableRow;
