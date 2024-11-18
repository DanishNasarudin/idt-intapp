"use client";
import { countAllBranchDB } from "@/services/warranty/dashboardActions";
import { useEffect, useRef, useState } from "react";

type Props = {
  inQ: (newValue: number) => void;
};

type DataType = {
  total: number;
  status: {
    completed: number;
    inProgress: number;
    inQueue: number;
  };
};

const initialData: DataType = {
  total: 0,
  status: {
    completed: 0,
    inProgress: 0,
    inQueue: 0,
  },
};

const WarrantyBar = ({ inQ }: Props) => {
  const barRef = useRef<HTMLCanvasElement | null>(null);
  const [data, setData] = useState<DataType>(initialData);

  useEffect(() => {
    countAllBranchDB().then((data: any) => setData(data));
  }, []);

  useEffect(() => {
    inQ(data.status.inQueue);
  }, [data]);

  useEffect(() => {
    if (!barRef.current) return;

    const myBarRef = barRef.current.getContext("2d");
    if (!myBarRef) return;
    // myBarRef.canvas.width = 706;

    //   const canvas = document.querySelector("canvas");
    myBarRef.canvas.width = window.innerWidth;

    let barValue = {
      completed: (data.status.completed / data.total) * myBarRef.canvas.width,
      inProgress: (data.status.inProgress / data.total) * myBarRef.canvas.width,
      inQueue: (data.status.inQueue / data.total) * myBarRef.canvas.width,
    };

    const drawBarSegment = (startX: number, width: number, color: string) => {
      myBarRef.fillStyle = color;
      myBarRef.fillRect(startX, 0, width, myBarRef.canvas.width / 12);
    };

    let startX = 0;
    drawBarSegment(startX, barValue.inQueue, "#d946ef");
    startX += barValue.inQueue;
    drawBarSegment(startX, barValue.inProgress, "#a855f7");
    startX += barValue.inProgress;
    drawBarSegment(startX, barValue.completed, "#10b981");
    window.addEventListener("resize", () => {
      myBarRef.canvas.width = window.innerWidth;
      let barValue = {
        completed: (data.status.completed / data.total) * myBarRef.canvas.width,
        inProgress:
          (data.status.inProgress / data.total) * myBarRef.canvas.width,
        inQueue: (data.status.inQueue / data.total) * myBarRef.canvas.width,
      };

      const drawBarSegment = (startX: number, width: number, color: string) => {
        myBarRef.fillStyle = color;
        myBarRef.fillRect(startX, 0, width, myBarRef.canvas.width / 12);
      };

      let startX = 0;
      drawBarSegment(startX, barValue.inQueue, "#d946ef");
      startX += barValue.inQueue;
      drawBarSegment(startX, barValue.inProgress, "#a855f7");
      startX += barValue.inProgress;
      drawBarSegment(startX, barValue.completed, "#10b981");
    });

    return () => {
      // barRef.current?.removeEventListener("mousemove", onMouseMove);

      window.removeEventListener("resize", () => {
        myBarRef.canvas.width = window.innerWidth;
      });
    };
  }, [data]);
  return (
    <div className="botbod w-full flex flex-col gap-4">
      <div className="w-full overflow-hidden rounded-md relative [&>canvas]:w-full aspect-[12/1]">
        <canvas ref={barRef} className="" />
      </div>
      <div className="flex gap-4 md:gap-8 w-full">
        <div
          className={`${
            data.status.inQueue !== 0 ? "flex" : "hidden"
          } gap-2 md:gap-4 items-center w-full`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="fill-fuchsia-500 w-max"
          >
            <path d="M17 2H7C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5z"></path>
          </svg>
          <h6 className="w-full">
            In Queue{" "}
            {/* <span className="text-zinc-400">
              &#40;{data.status.inQueue}&#41;
            </span> */}
          </h6>
        </div>
        <div
          className={`${
            data.status.inProgress !== 0 ? "flex" : "hidden"
          } gap-2 md:gap-4 items-center w-full`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="fill-purple-500 w-max"
          >
            <path d="M17 2H7C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5z"></path>
          </svg>
          <h6 className="w-full">
            In Progress{" "}
            {/* <span className="text-zinc-400">
              &#40;{data.status.inProgress}&#41;
            </span> */}
          </h6>
        </div>
        <div
          className={`${
            data.status.completed !== 0 ? "flex" : "hidden"
          } gap-2 md:gap-4 items-center w-full`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="fill-emerald-500 w-max"
          >
            <path d="M17 2H7C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5z"></path>
          </svg>
          <h6 className="w-full">
            Completed{" "}
            {/* <span className="text-zinc-400">
              &#40;{data.status.completed}&#41;
            </span> */}
          </h6>
        </div>
      </div>
    </div>
  );
};

export default WarrantyBar;
