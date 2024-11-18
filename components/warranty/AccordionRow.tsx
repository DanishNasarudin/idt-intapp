import { WarrantyDataType } from "@/services/warranty/warrantyActions";
import { Button } from "../ui/button";
import TextBoxWithCopy from "./TextBoxWithCopy";

type Props = {
  value?: WarrantyDataType;
  onValueChange?: (newValue: string, id: string) => void;
};

const AccordionRow = ({
  value = {
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
  },
  onValueChange = () => {},
}: Props) => {
  return (
    <div className="p-2 flex flex-col gap-2">
      <div className="flex gap-2 [&>div]:w-full [&>div]:flex [&>div]:flex-col [&>div]:gap-2 [&>div]:[&>div]:flex [&>div]:[&>div]:flex-col [&>div]:[&>div]:gap-2">
        <div className="">
          <TextBoxWithCopy
            id="email"
            label="Email"
            value={value.email}
            onValueChange={onValueChange}
          />
          <TextBoxWithCopy
            id="address"
            label="Address"
            isTextarea
            value={value.address}
            onValueChange={onValueChange}
          />
          <TextBoxWithCopy
            id="purchaseDate"
            label="Purchase Date"
            value={value.purchaseDate}
            onValueChange={onValueChange}
          />
          <TextBoxWithCopy
            id="invoice"
            label="Invoice"
            value={value.invoice}
            onValueChange={onValueChange}
          />
          <TextBoxWithCopy
            id="receivedItem"
            label="Received Item"
            value={value.receivedItems}
            onValueChange={onValueChange}
          />
          <TextBoxWithCopy id="pin" label="Pin" onValueChange={onValueChange} />
        </div>
        <div>
          <TextBoxWithCopy
            id="issues"
            label="Issues"
            isTextarea
            minHeight={150}
            value={value.issues}
            onValueChange={onValueChange}
          />
          <TextBoxWithCopy
            id="solutions"
            label="Solutions"
            isTextarea
            minHeight={150}
            value={value.solutions}
            onValueChange={onValueChange}
          />
        </div>
        <div>
          <TextBoxWithCopy
            id="statusDesc"
            label="Status Desc (Pending)"
            isTextarea
            minHeight={150}
            value={value.statusDesc}
            onValueChange={onValueChange}
          />
          <TextBoxWithCopy
            id="remarks"
            label="Remarks / Accessories"
            isTextarea
            minHeight={150}
            value={value.remarks}
            onValueChange={onValueChange}
          />
          <TextBoxWithCopy
            id="cost"
            label="Total Cost (RM) -Insert number only-"
            value={String(value.cost)}
            onValueChange={onValueChange}
          />
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button>Print PDF</Button>
          <Button>Copy</Button>
          <Button>Send Email</Button>
          <Button>Save Data</Button>
        </div>
        <Button>Delete</Button>
      </div>
    </div>
  );
};

export default AccordionRow;
