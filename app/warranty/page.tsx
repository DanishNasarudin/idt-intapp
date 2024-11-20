import MainAnalytics from "@/components/warranty/MainAnalytics";
import { countAllDB } from "@/services/warranty/dashboardActions";
import { getBranchFormat } from "@/services/warranty/warrantyUtils";

const Warranty = async () => {
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
