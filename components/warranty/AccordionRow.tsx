import { useBranchFormat } from "@/lib/zus-store";
import {
  deleteWarranty,
  WarrantyDataType,
} from "@/services/warranty/warrantyActions";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import TextBoxWithCopy from "./TextBoxWithCopy";

import { useSocket } from "@/lib/providers/socket-provider";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { toast } from "sonner";

type Props = {
  value?: WarrantyDataType;
  onValueChange?: (
    newValue: string,
    id: keyof WarrantyDataType | "default"
  ) => void;
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
  const branchData = useBranchFormat((state) => state.branchData);

  const addDataToHTML = async () => {
    try {
      if (!branchData) throw new Error("Value undefined.");
      if (!value) throw new Error("Value undefined.");

      const response = await fetch("/serviceReceipt.html");
      let template = await response.text();

      template = template.replace("{{logo_display}}", "block");
      template = template.replace("{{emailgen_display}}", "none");
      template = template.replace("{{idt_address}}", branchData.address);
      template = template.replace("{{idt_office}}", branchData.office);
      template = template.replace("{{idt_whatsapp}}", branchData.whatsapp);
      template = template.replace(
        "{{service_no}}",
        value.serviceNo ? value.serviceNo : ""
      );
      template = template.replace("{{name}}", value.name ? value.name : "");
      template = template.replace(
        "{{contact}}",
        value.contact ? value.contact : ""
      );
      template = template.replace("{{email}}", value.email ? value.email : "");
      template = template.replace(
        "{{address}}",
        value.address ? value.address : ""
      );
      template = template.replace(
        "{{received_items}}",
        value.receivedItems ? value.receivedItems : ""
      );
      template = template.replace(
        "{{purchase_date}}",
        value.purchaseDate ? value.purchaseDate : ""
      );
      template = template.replace(
        "{{invoice}}",
        value.invoice ? value.invoice : ""
      );
      template = template.replace(
        "{{issues}}",
        value.issues ? value.issues.replace(/\n/g, "<br>") : ""
      );
      template = template.replace(
        "{{solutions}}",
        value.solutions ? value.solutions.replace(/\n/g, "<br>") : ""
      );
      template = template.replace(
        "{{received_by}}",
        value.receivedBy ? value.receivedBy : ""
      );
      template = template.replace("{{pic}}", value.pic ? value.pic : "");
      template = template.replace("{{date}}", value.date ? value.date : "");

      return template;
    } catch (e) {
      console.error("Error data to HTML convert.");
      return "";
    }
  };

  // Print or Download PDF

  const downloadPDF = async () => {
    try {
      const template = await addDataToHTML();

      const newWindow = window.open("", "_blank");
      if (newWindow) {
        const htmlBlob = new Blob([template], { type: "text/html" });
        const url = URL.createObjectURL(htmlBlob);

        newWindow.location.href = url;

        const checkContentInterval = setInterval(async () => {
          try {
            if (newWindow.document.readyState === "complete") {
              clearInterval(checkContentInterval);

              setTimeout(async () => {
                const element = newWindow.document.body
                  .firstElementChild as HTMLElement;

                if (!element) {
                  throw new Error(
                    "The target element is not loaded or does not exist."
                  );
                }

                const canvas = await html2canvas(element);

                const pdf = new jsPDF("p", "pt", "a4");

                const canvasAspectRatio = canvas.height / canvas.width;
                const a4AspectRatio =
                  pdf.internal.pageSize.height / pdf.internal.pageSize.width;
                let pdfWidth = pdf.internal.pageSize.width;
                let pdfHeight = pdf.internal.pageSize.height;

                if (canvasAspectRatio < a4AspectRatio) {
                  pdfHeight = pdfWidth * canvasAspectRatio;
                } else {
                  pdfWidth = pdfHeight / canvasAspectRatio;
                }

                const imgData = canvas.toDataURL("image/png");

                pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

                pdf.save(`${value.serviceNo}_IdealTechPC_Service.pdf`);

                // Clean up
                newWindow.close();
                URL.revokeObjectURL(url);
              }, 100);
            }
          } catch (error) {
            console.error("Error rendering the PDF:", error);
            clearInterval(checkContentInterval);
            newWindow.close();
            URL.revokeObjectURL(url);
          }
        }, 100);
      } else {
        console.error("Failed to open a new window");
      }
      return true;
    } catch (error) {
      console.error("Failed to generate PDF", error);
      return false;
    }
  };

  const sendEmail = async () => {
    try {
      const template = await addDataToHTML();

      await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify({
          template: template,
          values: value,
        }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
    } catch (e) {
      console.error("Email failed to send.");
    }
  };

  const copyDataToClipboard = async () => {
    try {
      const dataString = Object.entries(value)
        .map(([key, value]) => `${key}: ${value === null ? "" : value}`)
        .join("\n");

      navigator.clipboard.writeText(dataString);
    } catch (e) {
      console.error("Failed to copy data.");
    }
  };

  const { socket } = useSocket();

  return (
    <div className="p-2 flex flex-col gap-2">
      <div className="flex gap-2 [&>div]:w-full [&>div]:flex [&>div]:flex-col [&>div]:gap-2 [&>div]:[&>div]:flex [&>div]:[&>div]:flex-col [&>div]:[&>div]:gap-2">
        <div className="">
          <TextBoxWithCopy
            rowId={value.serviceNo}
            id="email"
            label="Email"
            value={value.email}
            onValueChange={onValueChange}
          />
          <TextBoxWithCopy
            rowId={value.serviceNo}
            id="address"
            label="Address"
            isTextarea
            value={value.address}
            onValueChange={onValueChange}
          />
          <TextBoxWithCopy
            rowId={value.serviceNo}
            id="purchaseDate"
            label="Purchase Date"
            value={value.purchaseDate}
            onValueChange={onValueChange}
          />
          <TextBoxWithCopy
            rowId={value.serviceNo}
            id="invoice"
            label="Invoice"
            value={value.invoice}
            onValueChange={onValueChange}
          />
          <TextBoxWithCopy
            rowId={value.serviceNo}
            id="receivedItems"
            label="Received Item"
            value={value.receivedItems}
            onValueChange={onValueChange}
          />
          <TextBoxWithCopy
            rowId={value.serviceNo}
            id="pin"
            label="Pin"
            onValueChange={onValueChange}
          />
        </div>
        <div>
          <TextBoxWithCopy
            rowId={value.serviceNo}
            id="issues"
            label="Issues"
            isTextarea
            minHeight={150}
            value={value.issues}
            onValueChange={onValueChange}
          />
          <TextBoxWithCopy
            rowId={value.serviceNo}
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
            rowId={value.serviceNo}
            id="statusDesc"
            label="Status Desc (Pending)"
            isTextarea
            minHeight={150}
            value={value.statusDesc}
            onValueChange={onValueChange}
          />
          <TextBoxWithCopy
            rowId={value.serviceNo}
            id="remarks"
            label="Remarks / Accessories"
            isTextarea
            minHeight={150}
            value={value.remarks}
            onValueChange={onValueChange}
          />
          <TextBoxWithCopy
            rowId={value.serviceNo}
            id="cost"
            label="Total Cost (RM) -Insert number only-"
            value={String(value.cost)}
            onValueChange={onValueChange}
          />
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button
            variant={"outline"}
            onClick={() => {
              toast.promise(downloadPDF(), {
                loading: "Converting to PDF..",
                success: "PDF Downloaded!",
                error: "PDF Download Error!",
              });
            }}
          >
            Print PDF
          </Button>
          <Button
            variant={"outline"}
            onClick={() => {
              toast.promise(copyDataToClipboard(), {
                loading: "Copying Data..",
                success: "Data Copied!",
                error: "Data Failed to Copy!",
              });
            }}
          >
            Copy
          </Button>
          <Button
            variant={"outline"}
            onClick={() => {
              toast.promise(sendEmail(), {
                loading: "Sending Email..",
                success: "Email Sent!",
                error: "Email Failed to Send!",
              });
            }}
          >
            Send Email
          </Button>
          {/* <Button>Save Data</Button> */}
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant={"destructive"}>Delete</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Are you sure you want to delete this Data?
              </DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete the
                data from our servers.
              </DialogDescription>
              <div className="flex justify-end gap-2">
                <DialogClose asChild>
                  <Button variant={"outline"}>Cancel</Button>
                </DialogClose>
                <Button
                  variant={"destructive"}
                  onClick={() => {
                    deleteWarranty({
                      tableName: branchData ? branchData?.data_local : "",
                      deleteId: value.serviceNo,
                    });
                    if (socket !== null) socket.emit("revalidate-data");
                  }}
                >
                  Delete
                </Button>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AccordionRow;
