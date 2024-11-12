"use client";
import { CountAllDBType } from "@/services/warranty/dashboardActions";
import Chart from "chart.js/auto";
import { useEffect, useRef } from "react";

type Props = {
  branch: string;
  data: CountAllDBType;
};

const MainAnalytics = ({ branch, data }: Props) => {
  //   console.log(data);
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  const chartInstance = useRef<Chart<"pie", number[], string> | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    const myChartRef = chartRef.current.getContext("2d");

    if (myChartRef) {
      chartInstance.current = new Chart(myChartRef, {
        type: "pie",
        data: {
          labels: ["Current Branch", "Other Branch"],
          datasets: [
            {
              data: [data.total - data.other, data.other],
              backgroundColor: ["#009BFF", "rgb(39, 39, 42)"],
              borderColor: "rgb(63, 63, 70)",
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: false,
            },
          },
        },
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  const barRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!barRef.current) return;

    const myBarRef = barRef.current.getContext("2d");
    if (!myBarRef) return;
    myBarRef.canvas.width = 866;
    let barValue = {
      completed: (data.status.completed / data.total) * myBarRef.canvas.width,
      inProgress: (data.status.inProgress / data.total) * myBarRef.canvas.width,
      waiting: (data.status.waiting / data.total) * myBarRef.canvas.width,
      inQueue: (data.status.inQueue / data.total) * myBarRef.canvas.width,
      fromAP: (data.status.fromAP / data.total) * myBarRef.canvas.width,
      fromS2: (data.status.fromS2 / data.total) * myBarRef.canvas.width,
      fromSA: (data.status.fromSA / data.total) * myBarRef.canvas.width,
      fromJB: (data.status.fromJB / data.total) * myBarRef.canvas.width,
    };

    const drawBarSegment = (startX: number, width: number, color: string) => {
      myBarRef.fillStyle = color;
      myBarRef.fillRect(startX, 0, width, 100);
    };

    let startX = 0;
    drawBarSegment(startX, barValue.fromAP, "#06b6d4");
    startX += barValue.fromAP;
    drawBarSegment(startX, barValue.fromS2, "#06b6d4");
    startX += barValue.fromS2;
    drawBarSegment(startX, barValue.fromSA, "#3b82f6");
    startX += barValue.fromSA;
    drawBarSegment(startX, barValue.fromJB, "#6366f1");
    startX += barValue.fromJB;
    drawBarSegment(startX, barValue.inQueue, "#d946ef");
    startX += barValue.inQueue;
    drawBarSegment(startX, barValue.inProgress, "#a855f7");
    startX += barValue.inProgress;
    drawBarSegment(startX, barValue.waiting, "#ec4899");
    startX += barValue.waiting;
    drawBarSegment(startX, barValue.completed, "#10b981");

    const tooltip = document.getElementById("myTooltip"); // Assume you have a tooltip element

    type BarValue = {
      completed: number;
      inProgress: number;
      waiting: number;
      inQueue: number;
      fromAP: number;
      fromS2: number;
      fromSA: number;
      fromJB: number;
    };

    const onMouseMove = (event: MouseEvent) => {
      if (tooltip && barRef.current) {
        const rect = barRef.current.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        // console.log(x, y);

        let hoveredSegment: keyof BarValue | null = null;
        let currentX = 0;

        // Check each bar segment to see if the mouse is over it
        (Object.keys(barValue) as Array<keyof BarValue>).forEach((key) => {
          const value = barValue[key];
          if (x >= currentX && x < currentX + value) {
            hoveredSegment = key;
          }
          currentX += value;
        });

        if (hoveredSegment) {
          tooltip.style.display = "block";
          //   tooltip.textContent = `${hoveredSegment}: ${data.status[hoveredSegment]}`;
          tooltip.style.left = `${x}px`;
          tooltip.style.top = `${y}px`;
        } else {
          tooltip.style.display = "none";
        }
      }
    };

    barRef.current.addEventListener("mousemove", onMouseMove);

    return () => {
      barRef.current?.removeEventListener("mousemove", onMouseMove);
    };
  }, [data]);

  return (
    <div className="w-full flex flex-col gap-10 bg-zinc-900 border-[1px] border-zinc-800 rounded-md px-8 py-8">
      <div>
        <h2>{branch}</h2>
      </div>
      <div className="botbod flex gap-8">
        <div>
          <canvas ref={chartRef} className="max-w-[330px] max-h-[330px]" />
        </div>
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-4 w-full px-4 py-4 rounded-md bg-zinc-800 border-[1px] border-zinc-700">
            <span className="leading-none">Total Current Branch</span>
            <h2>{data.total} Units</h2>
          </div>
          <div className="flex flex-col gap-4 w-full px-4 py-4 rounded-md bg-zinc-800 border-[1px] border-zinc-700">
            <span className="leading-none">Other Branch</span>
            <h2>{data.other} Units</h2>
          </div>
          <div className="flex flex-col gap-4 w-full px-4 py-4 rounded-md bg-zinc-800 border-[1px] border-zinc-700">
            <span className="leading-none whitespace-nowrap">
              Passed to Other Branch
            </span>
            <h2>{data.pass} Units</h2>
          </div>
        </div>
        <div className="flex flex-col w-full">
          <div className="flex">
            <div className="w-full min-w-[99px] whitespace-nowrap px-2 py-2">
              <p>Name</p>
            </div>
            <div className="w-full whitespace-nowrap px-2 py-2 text-center">
              <p>PC Serviced</p>
            </div>
          </div>
          {data.leadboard &&
            data.leadboard.map((lead, key) => {
              return (
                <div key={key} className="flex border-t-[1px] border-zinc-700">
                  <div className="w-full whitespace-nowrap px-2 py-2">
                    <p>{lead.name}</p>
                  </div>
                  <div className="w-full whitespace-nowrap px-2 py-2 text-center">
                    <p>{lead.count}</p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <div className="botbod w-full flex flex-col gap-4">
        <div className="w-full overflow-hidden rounded-md h-[48px] relative">
          <canvas ref={barRef} className="" />
        </div>
        <div className="flex gap-8">
          <div
            className={`${
              data.status.fromAP !== 0 ? "flex" : "hidden"
            } gap-4 items-center`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-cyan-500 "
            >
              <path d="M17 2H7C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5z"></path>
            </svg>
            <p>
              From Ampang{" "}
              <span className="text-zinc-400">
                &#40;{data.status.fromAP}&#41;
              </span>
            </p>
          </div>
          <div
            className={`${
              data.status.fromS2 !== 0 ? "flex" : "hidden"
            } gap-4 items-center`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-cyan-500"
            >
              <path d="M17 2H7C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5z"></path>
            </svg>
            <p>
              From SS2{" "}
              <span className="text-zinc-400">
                &#40;{data.status.fromS2}&#41;
              </span>
            </p>
          </div>
          <div
            className={`${
              data.status.fromSA !== 0 ? "flex" : "hidden"
            } gap-4 items-center`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-blue-500"
            >
              <path d="M17 2H7C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5z"></path>
            </svg>
            <p>
              From Setia Alam{" "}
              <span className="text-zinc-400">
                &#40;{data.status.fromSA}&#41;
              </span>
            </p>
          </div>
          <div
            className={`${
              data.status.fromJB !== 0 ? "flex" : "hidden"
            } gap-4 items-center`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-indigo-500"
            >
              <path d="M17 2H7C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5z"></path>
            </svg>
            <p>
              From JB{" "}
              <span className="text-zinc-400">
                &#40;{data.status.fromJB}&#41;
              </span>
            </p>
          </div>
          <div
            className={`${
              data.status.inQueue !== 0 ? "flex" : "hidden"
            } gap-4 items-center`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-fuchsia-500"
            >
              <path d="M17 2H7C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5z"></path>
            </svg>
            <p>
              In Queue{" "}
              <span className="text-zinc-400">
                &#40;{data.status.inQueue}&#41;
              </span>
            </p>
          </div>
          <div
            className={`${
              data.status.inProgress !== 0 ? "flex" : "hidden"
            } gap-4 items-center`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-purple-500"
            >
              <path d="M17 2H7C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5z"></path>
            </svg>
            <p>
              In Progress{" "}
              <span className="text-zinc-400">
                &#40;{data.status.inProgress}&#41;
              </span>
            </p>
          </div>
          <div
            className={`${
              data.status.waiting !== 0 ? "flex" : "hidden"
            } gap-4 items-center`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-pink-500"
            >
              <path d="M17 2H7C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5z"></path>
            </svg>
            <p>
              Waiting For{" "}
              <span className="text-zinc-400">
                &#40;{data.status.waiting}&#41;
              </span>
            </p>
          </div>
          <div
            className={`${
              data.status.completed !== 0 ? "flex" : "hidden"
            } gap-4 items-center`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-emerald-500"
            >
              <path d="M17 2H7C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5z"></path>
            </svg>
            <p>
              Completed{" "}
              <span className="text-zinc-400">
                &#40;{data.status.completed}&#41;
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainAnalytics;
