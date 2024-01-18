"use client";
import React, { useRef, useState } from "react";
import TextBoxNormal from "./TextBoxNormal";
import { DataValues } from "../[branch]/page";
import socket from "@/lib/socket";

import html2pdf from "html2pdf.js";

type Props = {
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
      // console.log("Data copied to clipboard");
    } catch (error) {
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
      setDownloadPDFVisual(true);

      const response = await fetch("/serviceReceipt.html");
      let template = await response.text();

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
      template = template.replace("{{pic}}", data.pic ? data.pic : "");
      template = template.replace("{{date}}", data.date ? data.date : "");

      const parser = new DOMParser();
      const doc = parser.parseFromString(template, "text/html");

      const element = doc.body;

      var opt = {
        margin: 8,
        image: { type: "jpeg", quality: 1 },
      };

      html2pdf()
        .from(element)
        .set(opt)
        .toPdf()
        .save("IdealTechPC_Service.pdf")
        .then(() => {
          document.body.removeChild(element);
        });

      setTimeout(() => {
        setDownloadPDFVisual(false);
      }, 1000);
      // console.log("pass2");
    } catch (error) {
      console.error("Failed to generate PDF", error);
    }
  };

  // Send email of the invoice ----

  const sendEmail = async () => {
    try {
      const response = await fetch("/serviceReceipt.html");
      let template = await response.text();

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
      template = template.replace("{{pic}}", data.pic ? data.pic : "");
      template = template.replace("{{date}}", data.date ? data.date : "");

      await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify({ template: template, values: data }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
    } catch (error) {
      console.error("Failed to generate PDF", error);
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
            onClick={() => downloadPDF()}
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
            disabled={data.email === "" || data.email === null}
            className={`
            ${
              data.email === "" || data.email === null
                ? "border-zinc-800 text-zinc-800"
                : "border-zinc-600 text-zinc-600 mobilehover:hover:border-zinc-400 mobilehover:hover:text-zinc-400"
            }
                              px-4 py-2 rounded-md transition-all border-[1px]
                              bg-transparent 
                              `}
            onClick={() => sendEmail()}
          >
            <p>Send Email</p>
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
    </div>
  );
};

export default TableRowExt;
