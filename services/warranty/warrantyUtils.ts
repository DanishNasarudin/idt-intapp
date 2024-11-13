"use server";
import { colors } from "@/components/warranty/settings/StaffBranchAssign";
import { fetchStaffBranch } from "./settingsActions";

export type BranchStatus = {
  type: string;
  color: string;
};

export type BranchType = {
  id: string;
  data_local: string;
  data_other: string;
  name: string;
  address: string;
  office: string;
  whatsapp: string;
  status: BranchStatus[];
  pic: BranchStatus[];
  all_pic: BranchStatus[];
};

export type BranchFormat = {
  branch: BranchType[] | [];
};

export const getBranchFormat = async (): Promise<BranchFormat> => {
  const branchStaff = await fetchStaffBranch();
  const allStaff = branchStaff.map((item) => ({
    type: item.name,
    color: colors.find((col) => col.option === item.color)?.color || "",
  }));
  const ampangStaff = branchStaff
    .filter((item) => item.branch === "Ampang HQ")
    .map((item) => ({
      type: item.name,
      color: colors.find((col) => col.option === item.color)?.color || "",
    }));
  const ss2Staff = branchStaff
    .filter((item) => item.branch === "SS2, PJ")
    .map((item) => ({
      type: item.name,
      color: colors.find((col) => col.option === item.color)?.color || "",
    }));
  const saStaff = branchStaff
    .filter((item) => item.branch === "Setia Alam")
    .map((item) => ({
      type: item.name,
      color: colors.find((col) => col.option === item.color)?.color || "",
    }));
  const jbStaff = branchStaff
    .filter((item) => item.branch === "Johor Bahru")
    .map((item) => ({
      type: item.name,
      color: colors.find((col) => col.option === item.color)?.color || "",
    }));

  const branchFormat: BranchFormat = {
    branch: [
      {
        id: "ampang-hq",
        data_local: "ap_local",
        data_other: "ap_other",
        name: "Ampang HQ",
        address:
          "No. 17, Jalan Pandan Prima 1, Dataran Pandan Prima, 55100 Kuala Lumpur, Malaysia.",
        office: "+603 9202 3137",
        whatsapp: "+6012 427 8782",
        status: [
          { type: "In Queue", color: "!bg-fuchsia-600 !text-fuchsia-100" },
          { type: "In Progress", color: "!bg-purple-600 !text-purple-100" },
          { type: "Waiting For", color: "!bg-pink-600 !text-pink-100" },
          { type: "Completed", color: "!bg-emerald-600 !text-emerald-100" },
          { type: "Pass SS2", color: "!bg-red-600 !text-red-100" },
          { type: "From SS2", color: "!bg-cyan-600 !text-cyan-100" },
          { type: "Pass Setia Alam", color: "!bg-orange-600 !text-orange-100" },
          { type: "From Setia Alam", color: "!bg-blue-600 !text-blue-100" },
          { type: "Pass JB", color: "!bg-amber-600 !text-amber-100" },
          { type: "From JB", color: "!bg-indigo-600 !text-indigo-100" },
        ],
        pic: ampangStaff,
        all_pic: allStaff,
      },
      {
        id: "ss2-pj",
        data_local: "s2_local",
        data_other: "s2_other",
        name: "SS2, PJ",
        address: "42, Jalan SS 2/55, SS 2, 47300 Petaling Jaya, Selangor.",
        office: "+603 7876 0076",
        whatsapp: "+6017 865 0076",
        status: [
          { type: "In Queue", color: "!bg-fuchsia-600 !text-fuchsia-100" },
          { type: "In Progress", color: "!bg-purple-600 !text-purple-100" },
          { type: "Waiting For", color: "!bg-pink-600 !text-pink-100" },
          { type: "Completed", color: "!bg-emerald-600 !text-emerald-100" },
          { type: "Pass Ampang", color: "!bg-red-600 !text-red-100" },
          { type: "From Ampang", color: "!bg-cyan-600 !text-cyan-100" },
          { type: "Pass Setia Alam", color: "!bg-orange-600 !text-orange-100" },
          { type: "From Setia Alam", color: "!bg-blue-600 !text-blue-100" },
        ],
        pic: ss2Staff,
        all_pic: allStaff,
      },
      {
        id: "setia-alam",
        data_local: "sa_local",
        data_other: "sa_other",
        name: "Setia Alam",
        address:
          "No 36-G, Jalan Setia Utama AU U13/AU Setia Alam, 40170 Shah Alam, Selangor.",
        office: "+603 3358 3713",
        whatsapp: "+6012 610 1871",
        status: [
          { type: "In Queue", color: "!bg-fuchsia-600 !text-fuchsia-100" },
          { type: "In Progress", color: "!bg-purple-600 !text-purple-100" },
          { type: "Waiting For", color: "!bg-pink-600 !text-pink-100" },
          { type: "Completed", color: "!bg-emerald-600 !text-emerald-100" },
          { type: "Pass Ampang", color: "!bg-red-600 !text-red-100" },
          { type: "From Ampang", color: "!bg-cyan-600 !text-cyan-100" },
          { type: "Pass SS2", color: "!bg-orange-600 !text-orange-100" },
          { type: "From SS2", color: "!bg-blue-600 !text-blue-100" },
        ],
        pic: saStaff,
        all_pic: allStaff,
      },
      {
        id: "jb",
        data_local: "jb_local",
        data_other: "jb_other",
        name: "Johor Bahru",
        address:
          "53, Jln Austin Height 8/8, Taman Mount Austin, 81100 Johor Bahru, Johor.",
        office: "Pending",
        whatsapp: "+6016 854 1253",
        status: [
          { type: "Pending", color: "!bg-purple-600 !text-purple-100" },
          { type: "Waiting For", color: "!bg-pink-600 !text-pink-100" },
          { type: "Completed", color: "!bg-emerald-600 !text-emerald-100" },
          { type: "Pass Ampang", color: "!bg-red-600 !text-red-100" },
          { type: "From Ampang", color: "!bg-cyan-600 !text-cyan-100" },
        ],
        pic: jbStaff,
        all_pic: allStaff,
      },
    ],
  };

  // console.log(branchFormat, "SERVER CHECK STAFF");

  return branchFormat;
};
