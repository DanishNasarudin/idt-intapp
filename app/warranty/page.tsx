// "use client";
import { countAllDB } from "../(serverActions)/FetchDB";
import MainAnalytics from "./(components)/MainAnalytics";
import { getBranchFormat } from "./(utils)/warrantyUtils";

type Props = {};

const Warranty = async (props: Props) => {
  // const [branch, setBranch] = useState<BranchType[]>([]);

  // useEffect(() => {
  //   const getFormat = async () => {
  //     const format = await getBranchFormat();

  //     setBranch(format.branch);
  //   };
  //   getFormat();
  // }, []);

  // // count DB

  // const [sumData, setSumData] = useState({
  //   total: {
  //     ap: 0,
  //     s2: 0,
  //     sa: 0,
  //     jb: 0,
  //   },
  //   ap: {
  //     total: 0,
  //     other: 0,
  //     pass: 0,
  //     leadboard: [{ name: "", count: 0 }],
  //     status: {
  //       completed: 0,
  //       waiting: 0,
  //       inProgress: 0,
  //       inQueue: 0,
  //       fromAP: 0,
  //       fromS2: 0,
  //       fromSA: 0,
  //       fromJB: 0,
  //     },
  //   },
  //   s2: {
  //     total: 0,
  //     other: 0,
  //     pass: 0,
  //     leadboard: [{ name: "", count: 0 }],
  //     status: {
  //       completed: 0,
  //       waiting: 0,
  //       inProgress: 0,
  //       inQueue: 0,
  //       fromAP: 0,
  //       fromS2: 0,
  //       fromSA: 0,
  //       fromJB: 0,
  //     },
  //   },
  //   sa: {
  //     total: 0,
  //     other: 0,
  //     pass: 0,
  //     leadboard: [{ name: "", count: 0 }],
  //     status: {
  //       completed: 0,
  //       waiting: 0,
  //       inProgress: 0,
  //       inQueue: 0,
  //       fromAP: 0,
  //       fromS2: 0,
  //       fromSA: 0,
  //       fromJB: 0,
  //     },
  //   },
  //   jb: {
  //     total: 0,
  //     other: 0,
  //     pass: 0,
  //     leadboard: [
  //       { name: "", count: 0 },
  //       { name: "", count: 0 },
  //     ],
  //     status: {
  //       completed: 0,
  //       waiting: 0,
  //       inProgress: 0,
  //       inQueue: 0,
  //       fromAP: 0,
  //       fromS2: 0,
  //       fromSA: 0,
  //       fromJB: 0,
  //     },
  //   },
  // });

  // useEffect(() => {
  //   const fetchDataForLocal = async (
  //     local: string,
  //     prefix: string,
  //     leadList: string[]
  //   ) => {
  //     const countAll = await countAllDB(local, prefix, leadList);

  //     return {
  //       complete: countAll.complete,
  //       total: countAll.total,
  //       other: countAll.other,
  //       pass: countAll.pass,
  //       leadboard: countAll.leadboard,
  //       status: {
  //         completed: countAll.status.completed,
  //         waiting: countAll.status.waiting,
  //         inProgress: countAll.status.inProgress,
  //         inQueue: countAll.status.inQueue,
  //         fromAP: countAll.status.fromAP,
  //         fromS2: countAll.status.fromS2,
  //         fromSA: countAll.status.fromSA,
  //         fromJB: countAll.status.fromJB,
  //       },
  //     };
  //   };

  //   const fetchData = async () => {
  //     const apData = await fetchDataForLocal(
  //       "ap",
  //       "WAP",
  //       branch.find((br) => br.id === "ampang-hq") === undefined
  //         ? []
  //         : branch
  //             .find((br) => br.id === "ampang-hq")
  //             ?.pic.map((item) => {
  //               return item["type"];
  //             }) || []
  //     );
  //     const s2Data = await fetchDataForLocal(
  //       "s2",
  //       "WSS",
  //       branch.find((br) => br.id === "ss2-pj") === undefined
  //         ? []
  //         : branch
  //             .find((br) => br.id === "ss2-pj")
  //             ?.pic.map((item) => {
  //               return item["type"];
  //             }) || []
  //     );
  //     const saData = await fetchDataForLocal(
  //       "sa",
  //       "WSA",
  //       branch.find((br) => br.id === "setia-alam") === undefined
  //         ? []
  //         : branch
  //             .find((br) => br.id === "setia-alam")
  //             ?.pic.map((item) => {
  //               return item["type"];
  //             }) || []
  //     );
  //     const jbData = await fetchDataForLocal(
  //       "jb",
  //       "WJB",
  //       branch.find((br) => br.id === "jb") === undefined
  //         ? []
  //         : branch
  //             .find((br) => br.id === "jb")
  //             ?.pic.map((item) => {
  //               return item["type"];
  //             }) || []
  //     );
  //     // console.log(s2Data);

  //     setSumData((prev) => {
  //       return {
  //         ...prev,
  //         total: {
  //           ...prev.total,
  //           ap: apData.complete,
  //           s2: s2Data.complete,
  //           sa: saData.complete,
  //           jb: jbData.complete,
  //         },
  //         ap: {
  //           ...prev.ap,
  //           ...apData,
  //         },
  //         s2: {
  //           ...prev.s2,
  //           ...s2Data,
  //         },
  //         sa: {
  //           ...prev.sa,
  //           ...saData,
  //         },
  //         jb: {
  //           ...prev.jb,
  //           ...jbData,
  //         },
  //       };
  //     });
  //     return true;
  //   };

  //   // const promise = () => fetchData();
  //   if (branch.length > 0) {
  //     toast.promise(fetchData, {
  //       loading: "Loading data...",
  //       success: (data) => {
  //         return `Data loaded!`;
  //       },
  //       error: "Data failed to load.",
  //     });
  //   }

  //   // console.log("check pass");
  // }, [branch]);
  // console.log(sumData);
  //   console.log(sumData.ap);

  const dataFormat = (await getBranchFormat()).branch;

  const apData = await countAllDB(
    "ap",
    "WAP",
    dataFormat.find((br) => br.id === "ampang-hq") === undefined
      ? []
      : dataFormat
          .find((br) => br.id === "ampang-hq")
          ?.pic.map((item) => {
            return item["type"];
          }) || []
  );
  const s2Data = await countAllDB(
    "s2",
    "WSS",
    dataFormat.find((br) => br.id === "ss2-pj") === undefined
      ? []
      : dataFormat
          .find((br) => br.id === "ss2-pj")
          ?.pic.map((item) => {
            return item["type"];
          }) || []
  );
  const saData = await countAllDB(
    "sa",
    "WSA",
    dataFormat.find((br) => br.id === "setia-alam") === undefined
      ? []
      : dataFormat
          .find((br) => br.id === "setia-alam")
          ?.pic.map((item) => {
            return item["type"];
          }) || []
  );
  const jbData = await countAllDB(
    "jb",
    "WJB",
    dataFormat.find((br) => br.id === "jb") === undefined
      ? []
      : dataFormat
          .find((br) => br.id === "jb")
          ?.pic.map((item) => {
            return item["type"];
          }) || []
  );

  return (
    <>
      <div className="hidden md:flex flex-col gap-16 w-full px-16 py-4 max-w-[1060px] mx-auto">
        <div className="top nav w-full flex justify-end">
          {/* <Avatar className="rounded-full w-8">
            <AvatarImage src="https://idealtech.com.my/wp-content/uploads/2023/03/IDT_LOGO-150x150.png" />
            <AvatarFallback>IT</AvatarFallback>
          </Avatar> */}
        </div>
        <h1 className="leading-none">Dashboards</h1>
        <div className="summary flex flex-col gap-4">
          <div className="w-full">
            <h2>Total Completed Service</h2>
          </div>
          <div className="flex gap-4 w-full">
            <div className="flex flex-col gap-4 w-full px-4 py-4 rounded-md bg-zinc-900 border-[1px] border-zinc-800">
              <span className="leading-none">Ampang HQ</span>
              <h2>{apData.complete} Units</h2>
            </div>
            <div className="flex flex-col gap-4 w-full px-4 py-4 rounded-md bg-zinc-900 border-[1px] border-zinc-800">
              <span className="leading-none">SS2, PJ</span>
              <h2>{s2Data.complete} Units</h2>
            </div>
            <div className="flex flex-col gap-4 w-full px-4 py-4 rounded-md bg-zinc-900 border-[1px] border-zinc-800">
              <span className="leading-none">Setia Alam</span>
              <h2>{saData.complete} Units</h2>
            </div>
            <div className="flex flex-col gap-4 w-full px-4 py-4 rounded-md bg-zinc-900 border-[1px] border-zinc-800">
              <span className="leading-none">Johor Bahru</span>
              <h2>{jbData.complete} Units</h2>
            </div>
          </div>
        </div>
        <MainAnalytics branch="Ampang HQ" data={apData} />
        <MainAnalytics branch="SS2, PJ" data={s2Data} />
        <MainAnalytics branch="Setia Alam" data={saData} />
        <MainAnalytics branch="Johor Bahru" data={jbData} />
        <div className="h-[20vh]" />
      </div>
      <div className="md:hidden flex justify-center items-center h-[100vh] text-center w-full">
        <h2>Use Desktop PC</h2>
      </div>
      {/* <Toaster richColors theme="dark" /> */}
    </>
  );
};

export const revalidate = 0;
export default Warranty;
