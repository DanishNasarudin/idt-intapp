"use client";
import React, { useRef, useState } from "react";
import TextBoxNormal from "./TextBoxNormal";
import { BranchType, DataValues } from "../[branch]/page";
import socket from "@/lib/socket";

import html2pdf from "html2pdf.js";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import { Toaster, toast } from "sonner";

type Props = {
  branch: BranchType | null;
  data: DataValues;
  onInputChange: (
    newValue:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  deleteDB: (id: string) => void;
  openCloseTab: (open: boolean) => void;
  isExtEmpty: boolean;
  updateAllDB: () => void;
};

const TableRowExt = ({
  branch,
  data,
  onInputChange,
  deleteDB,
  openCloseTab,
  isExtEmpty,
  updateAllDB,
}: Props) => {
  const [deleteCon, setDeleteCon] = useState(false);

  // Copy all data ----
  const [copyValuesH, setCopyValuesH] = useState(false);
  const copyAllData = async (data: DataValues) => {
    try {
      setCopyValuesH(true);
      const dataString = Object.entries(data)
        .map(([key, value]) => `${key}: ${value === null ? "" : value}`)
        .join("\n");

      await navigator.clipboard.writeText(dataString);
      toast.success("Data Copied!");
      // console.log("Data copied to clipboard");
    } catch (error) {
      toast.success("Failed to copy data.");
      console.error("Failed to copy data to clipboard", error);
    } finally {
      setTimeout(() => {
        setCopyValuesH(false);
      }, 1000);
    }
  };

  // Print or Download PDF

  // const pdfRef = useRef<HTMLDivElement>(null);
  const [downloadPDFVisual, setDownloadPDFVisual] = useState(false);
  // console.log(data);

  const downloadPDF = async () => {
    try {
      if (!branch) return;
      if (!data) return;
      setDownloadPDFVisual(true);

      const response = await fetch("/serviceReceipt.html");
      let template = await response.text();

      template = template.replace("{{logo_display}}", "block");
      template = template.replace("{{emailgen_display}}", "none");
      template = template.replace("{{idt_address}}", branch.address);
      template = template.replace("{{idt_office}}", branch.office);
      template = template.replace("{{idt_whatsapp}}", branch.whatsapp);
      template = template.replace(
        "{{service_no}}",
        data.service_no ? data.service_no : ""
      );
      template = template.replace("{{name}}", data.name ? data.name : "");
      template = template.replace(
        "{{contact}}",
        data.contact ? data.contact : ""
      );
      template = template.replace("{{email}}", data.email ? data.email : "");
      template = template.replace(
        "{{address}}",
        data.address ? data.address : ""
      );
      template = template.replace(
        "{{received_items}}",
        data.received_items ? data.received_items : ""
      );
      template = template.replace(
        "{{purchase_date}}",
        data.purchase_date ? data.purchase_date : ""
      );
      template = template.replace(
        "{{invoice}}",
        data.invoice ? data.invoice : ""
      );
      template = template.replace(
        "{{issues}}",
        data.issues ? data.issues.replace(/\n/g, "<br>") : ""
      );
      template = template.replace(
        "{{solutions}}",
        data.solutions ? data.solutions.replace(/\n/g, "<br>") : ""
      );
      template = template.replace(
        "{{received_by}}",
        data.received_by ? data.received_by : ""
      );
      template = template.replace("{{pic}}", data.pic ? data.pic : "");
      template = template.replace("{{date}}", data.date ? data.date : "");

      // const parser = new DOMParser();
      // const doc = parser.parseFromString(template, "text/html");

      // const element = doc.body;

      // Open a new window
      const newWindow = window.open("", "_blank");
      if (newWindow) {
        // Write the HTML string to the new window
        newWindow.document.write(template);

        // Wait for the new window's content to fully load
        newWindow.document.close();
        newWindow.onload = async () => {
          // Render the new window's content to canvas
          const canvas = await html2canvas(
            newWindow.document.body.firstElementChild as HTMLElement
          );

          // Initialize jsPDF
          const pdf = new jsPDF("p", "pt", "a4");

          // Calculate the aspect ratio of the canvas
          const canvasAspectRatio = canvas.height / canvas.width;
          const a4AspectRatio =
            pdf.internal.pageSize.height / pdf.internal.pageSize.width;
          let pdfWidth = pdf.internal.pageSize.width;
          let pdfHeight = pdf.internal.pageSize.height;

          // Adjust dimensions if canvas aspect ratio is less than A4 aspect ratio
          if (canvasAspectRatio < a4AspectRatio) {
            pdfHeight = pdfWidth * canvasAspectRatio;
          } else {
            pdfWidth = pdfHeight / canvasAspectRatio;
          }

          // Convert canvas to image data
          const imgData = canvas.toDataURL("image/png");

          // Add the image to the PDF, fit to page
          pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

          // Save the PDF
          pdf.save(`${data.service_no}_IdealTechPC_Service.pdf`);

          // Close the new window
          newWindow.close();
        };
      } else {
        console.error("Failed to open a new window");
      }

      setTimeout(() => {
        setDownloadPDFVisual(false);
      }, 1000);
      // console.log("pass2");
      return true;
    } catch (error) {
      console.error("Failed to generate PDF", error);
      return false;
    }
  };

  // Send email of the invoice ----

  const [emailH, setEmailH] = useState(false);
  const [emailLocked, setEmailLocked] = useState(false);
  const lockDuration = 2000;

  const sendEmail = async () => {
    if (emailLocked) return;
    setEmailH(true);
    setEmailLocked(true);
    try {
      if (!branch) return;
      const response = await fetch("/serviceReceipt.html");
      let template = await response.text();
      let template2 = template;

      template = template.replace("{{logo_display}}", "none");
      template = template.replace("{{emailgen_display}}", "block");
      template = template.replace("{{idt_address}}", branch.address);
      template = template.replace("{{idt_office}}", branch.office);
      template = template.replace("{{idt_whatsapp}}", branch.whatsapp);
      template = template.replace(
        "{{service_no}}",
        data.service_no ? data.service_no : ""
      );
      template = template.replace("{{name}}", data.name ? data.name : "");
      template = template.replace(
        "{{contact}}",
        data.contact ? data.contact : ""
      );
      template = template.replace("{{email}}", data.email ? data.email : "");
      template = template.replace(
        "{{address}}",
        data.address ? data.address : ""
      );
      template = template.replace(
        "{{received_items}}",
        data.received_items ? data.received_items : ""
      );
      template = template.replace(
        "{{purchase_date}}",
        data.purchase_date ? data.purchase_date : ""
      );
      template = template.replace(
        "{{invoice}}",
        data.invoice ? data.invoice : ""
      );
      template = template.replace(
        "{{issues}}",
        data.issues ? data.issues.replace(/\n/g, "<br>") : ""
      );
      template = template.replace(
        "{{solutions}}",
        data.solutions ? data.solutions.replace(/\n/g, "<br>") : ""
      );
      template = template.replace(
        "{{received_by}}",
        data.received_by ? data.received_by : ""
      );
      template = template.replace("{{pic}}", data.pic ? data.pic : "");
      template = template.replace("{{date}}", data.date ? data.date : "");

      template2 = template2.replace("{{logo_display}}", "block");
      template2 = template2.replace("{{emailgen_display}}", "none");
      template2 = template2.replace("{{idt_address}}", branch.address);
      template2 = template2.replace("{{idt_office}}", branch.office);
      template2 = template2.replace("{{idt_whatsapp}}", branch.whatsapp);
      template2 = template2.replace(
        "{{service_no}}",
        data.service_no ? data.service_no : ""
      );
      template2 = template2.replace("{{name}}", data.name ? data.name : "");
      template2 = template2.replace(
        "{{contact}}",
        data.contact ? data.contact : ""
      );
      template2 = template2.replace("{{email}}", data.email ? data.email : "");
      template2 = template2.replace(
        "{{address}}",
        data.address ? data.address : ""
      );
      template2 = template2.replace(
        "{{received_items}}",
        data.received_items ? data.received_items : ""
      );
      template2 = template2.replace(
        "{{purchase_date}}",
        data.purchase_date ? data.purchase_date : ""
      );
      template2 = template2.replace(
        "{{invoice}}",
        data.invoice ? data.invoice : ""
      );
      template2 = template2.replace(
        "{{issues}}",
        data.issues ? data.issues.replace(/\n/g, "<br>") : ""
      );
      template2 = template2.replace(
        "{{solutions}}",
        data.solutions ? data.solutions.replace(/\n/g, "<br>") : ""
      );
      template2 = template2.replace(
        "{{received_by}}",
        data.received_by ? data.received_by : ""
      );
      template2 = template2.replace("{{pic}}", data.pic ? data.pic : "");
      template2 = template2.replace("{{date}}", data.date ? data.date : "");

      // let uploadedFilePath = "";
      // const newWindow = window.open("", "_blank");
      // if (newWindow) {
      //   // Write the HTML string to the new window
      //   newWindow.document.write(template2);

      //   // Wait for the new window's content to fully load
      //   newWindow.document.close();
      //   newWindow.onload = async () => {
      //     // Render the new window's content to canvas
      //     const canvas = await html2canvas(
      //       newWindow.document.body.firstElementChild as HTMLElement
      //     );

      //     // Initialize jsPDF
      //     const pdf = new jsPDF("p", "pt", "a4");

      //     // Calculate the aspect ratio of the canvas
      //     const canvasAspectRatio = canvas.height / canvas.width;
      //     const a4AspectRatio =
      //       pdf.internal.pageSize.height / pdf.internal.pageSize.width;
      //     let pdfWidth = pdf.internal.pageSize.width;
      //     let pdfHeight = pdf.internal.pageSize.height;

      //     // Adjust dimensions if canvas aspect ratio is less than A4 aspect ratio
      //     if (canvasAspectRatio < a4AspectRatio) {
      //       pdfHeight = pdfWidth * canvasAspectRatio;
      //     } else {
      //       pdfWidth = pdfHeight / canvasAspectRatio;
      //     }

      //     // Convert canvas to image data
      //     const imgData = canvas.toDataURL("image/png");

      //     // Add the image to the PDF, fit to page
      //     pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

      //     // Save the PDF
      //     // pdf.save(`${data.service_no}_IdealTechPC_Service.pdf`);
      //     const pdfOut = pdf.output("datauristring");

      //     uploadedFilePath = pdfOut;

      //     // Close the new window
      //     newWindow.close();

      //     await fetch("/api/contact", {
      //       method: "POST",
      //       body: JSON.stringify({
      //         template: template,
      //         values: data,
      //         attach: uploadedFilePath,
      //       }),
      //       headers: {
      //         "Content-Type": "application/json",
      //         Accept: "application/json",
      //       },
      //     });
      //   };
      // } else {
      //   console.error("Failed to open a new window");
      // }

      await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify({
          template: template,
          values: data,
        }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      setTimeout(() => {
        setEmailH(false);
      }, 2000);
      setTimeout(() => {
        setEmailLocked(false);
      }, lockDuration);
      return true;
    } catch (error) {
      console.error("Failed to generate PDF", error);
      setTimeout(() => {
        setEmailLocked(false);
      }, lockDuration);
      return false;
    }
  };

  return (
    <div id="rowext" className="overflow-hidden pt-1 pb-2">
      {data && (
        <div className="w-full flex gap-2">
          <div className="col1 w-full flex flex-col gap-2">
            <TextBoxNormal
              area={false}
              areaSize="0"
              id={"email"}
              title={"Email"}
              input={data.email}
              onInputChange={onInputChange}
            />
            <TextBoxNormal
              area={true}
              areaSize="120px"
              id={"address"}
              title={"Address"}
              input={data.address}
              onInputChange={onInputChange}
            />
            <TextBoxNormal
              area={false}
              areaSize="0"
              id={"purchase_date"}
              title={"Purchase Date"}
              input={data.purchase_date}
              onInputChange={onInputChange}
            />
            <TextBoxNormal
              area={false}
              areaSize="0"
              id={"invoice"}
              title={"Invoice"}
              input={data.invoice}
              onInputChange={onInputChange}
            />
            <TextBoxNormal
              area={false}
              areaSize="0"
              id={"received_items"}
              title={"Received Items"}
              input={data.received_items}
              onInputChange={onInputChange}
            />
            <TextBoxNormal
              area={false}
              areaSize="0"
              id={"pin"}
              title={"PIN / Pass"}
              input={data.pin}
              onInputChange={onInputChange}
            />
          </div>
          <div className="col2 w-full flex flex-col gap-2">
            <TextBoxNormal
              area={true}
              areaSize="150px"
              id={"issues"}
              title={"Issues"}
              input={data.issues}
              onInputChange={onInputChange}
            />
            <TextBoxNormal
              area={true}
              areaSize="150px"
              id={"solutions"}
              title={"Solutions"}
              input={data.solutions}
              onInputChange={onInputChange}
            />
          </div>
          <div className="col3 w-full flex flex-col gap-2">
            <TextBoxNormal
              area={true}
              areaSize="150px"
              id={"status_desc"}
              title={"Status Desc (Pending)"}
              input={data.status_desc}
              onInputChange={onInputChange}
            />
            <TextBoxNormal
              area={true}
              areaSize="150px"
              id={"remarks"}
              title={"Remarks / Accessories"}
              input={data.remarks}
              onInputChange={onInputChange}
            />
          </div>
        </div>
      )}
      <div className="buttons flex justify-between pt-4">
        <div className="flex gap-2">
          <button
            className={`
            ${
              downloadPDFVisual
                ? "border-green-600 text-green-600 mobilehover:hover:border-green-400 mobilehover:hover:text-green-400"
                : "border-zinc-600 text-zinc-600 mobilehover:hover:border-zinc-400 mobilehover:hover:text-zinc-400"
            }
                              px-4 py-2 rounded-md transition-all border-[1px]
                              bg-transparent 
                              `}
            onClick={() => {
              const promise = () => downloadPDF();
              toast.promise(promise, {
                loading: "Generating PDF...",
                success: () => {
                  return `PDF Generated!`;
                },
                error: "Failed to generate PDF.",
              });
            }}
          >
            <p>{downloadPDFVisual ? "Downloading.." : "Print PDF"}</p>
          </button>
          <button
            className={`
            ${
              copyValuesH
                ? "border-green-600 text-green-600 mobilehover:hover:border-green-400 mobilehover:hover:text-green-400"
                : "border-zinc-600 text-zinc-600 mobilehover:hover:border-zinc-400 mobilehover:hover:text-zinc-400"
            }
                              px-4 py-2 rounded-md transition-all border-[1px]
                              bg-transparent
                              `}
            onClick={() => copyAllData(data)}
          >
            <p>{copyValuesH ? "Copied!" : "Copy"}</p>
          </button>
          <button
            disabled={data.email === "" || data.email === null || emailLocked}
            className={`
            ${
              data.email === "" || data.email === null
                ? `border-zinc-800 text-zinc-800`
                : `${
                    false
                      ? "border-green-600 text-green-600"
                      : `border-zinc-600 text-zinc-600 ${
                          emailLocked
                            ? ""
                            : "mobilehover:hover:border-zinc-400 mobilehover:hover:text-zinc-400"
                        }`
                  }`
            }
                              px-4 py-2 rounded-md transition-all border-[1px]
                              bg-transparent 
                              `}
            onClick={() => {
              const promise = () => sendEmail();
              toast.promise(promise, {
                loading: "Sending email...",
                success: () => {
                  return `Email Sent!`;
                },
                error: "Email failed to send.",
              });
            }}
          >
            <p>{false ? "Email sent!" : "Send Email"}</p>
          </button>
          <button
            disabled={isExtEmpty}
            className={`
            ${
              isExtEmpty
                ? "bg-transparent border-zinc-800 text-zinc-800"
                : "bg-transparent border-accent text-accent mobilehover:hover:bg-accent/80 mobilehover:hover:text-white mobilehover:hover:border-white"
            }
                              px-4 py-2 rounded-md transition-all border-[1px]
                              `}
            onClick={() => {
              updateAllDB();
            }}
          >
            <p>Save Data</p>
          </button>
        </div>
        <button
          className={`
                          px-4 py-2 rounded-md transition-all border-[1px]
                          bg-transparent border-red-600/70 text-red-600/70
                          mobilehover:hover:border-red-400 mobilehover:hover:text-red-400`}
          onClick={() => {
            setDeleteCon(true);
          }}
        >
          <p>Delete</p>
        </button>
      </div>
      <div
        data-open={deleteCon}
        className="data-[open=true]:block data-[open=false]:hidden fixed z-[2] bg-black/50 w-[100vw] h-[100vh] top-0 left-0"
      >
        <div
          className="
        max-w-[500px] bg-zinc-900 border-zinc-700 border-[1px] p-8 rounded-md m-auto translate-y-[150%]
        flex flex-col gap-4
        "
        >
          <h3>Are you sure you want to delete this Data?</h3>
          <span>
            This action cannot be undone. This will permanently delete the data
            from our servers.
          </span>
          <div className="flex gap-2 justify-end">
            <button
              className={`
                              px-4 py-2 rounded-md transition-all border-[1px]
                              bg-transparent border-zinc-600/70 text-zinc-600/70
                              mobilehover:hover:border-zinc-400 mobilehover:hover:text-zinc-400`}
              onClick={() => setDeleteCon(false)}
            >
              <p>Cancel</p>
            </button>
            <button
              className={`
                              px-4 py-2 rounded-md transition-all border-[1px]
                              bg-transparent border-red-600/70 text-red-600/70
                              mobilehover:hover:border-red-400 mobilehover:hover:text-red-400`}
              onClick={() => {
                if (data.service_no) deleteDB(data.service_no);
                setTimeout(() => {
                  setDeleteCon(false);
                  openCloseTab(false);
                  socket.emit("re-render", { string: "render" });
                }, 50);
              }}
            >
              <p>Delete</p>
            </button>
          </div>
        </div>
      </div>
      <Toaster richColors theme="dark" closeButton />
    </div>
  );
};

export default TableRowExt;
