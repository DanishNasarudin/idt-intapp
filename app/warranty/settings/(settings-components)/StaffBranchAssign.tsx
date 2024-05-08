import { StaffBranchType } from "../(settings-server)/settingsActions";
import StaffAdd from "./StaffAdd";
import StaffTable from "./StaffTable";

type Props = { data: StaffBranchType[] };

export const colors = [
  {
    option: "fuchsia",
    color: "bg-fuchsia-600 text-fuchsia-100",
  },
  {
    option: "purple",
    color: "bg-purple-600 text-purple-100",
  },
  {
    option: "pink",
    color: "bg-pink-600 text-pink-100",
  },
  {
    option: "emerald",
    color: "bg-emerald-600 text-emerald-100",
  },
  {
    option: "red",
    color: "bg-red-600 text-red-100",
  },
  {
    option: "cyan",
    color: "bg-cyan-600 text-cyan-100",
  },
  {
    option: "orange",
    color: "bg-orange-600 text-orange-100",
  },
  {
    option: "blue",
    color: "bg-blue-600 text-blue-100",
  },
  {
    option: "amber",
    color: "bg-amber-600 text-amber-100",
  },
  {
    option: "indigo",
    color: "bg-indigo-600 text-indigo-100",
  },
];

export const branchList = [
  {
    option: "Ampang HQ",
    color: "bg-fuchsia-600 text-fuchsia-100",
  },
  {
    option: "SS2, PJ",
    color: "bg-purple-600 text-purple-100",
  },
  {
    option: "Setia Alam",
    color: "bg-pink-600 text-pink-100",
  },
  {
    option: "Johor Bahru",
    color: "bg-emerald-600 text-emerald-10",
  },
];

const StaffBranchAssign = ({ data }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <h2>Staff Branch Assignment</h2>
      <StaffAdd />
      <StaffTable data={data} />
    </div>
  );
};

export default StaffBranchAssign;
