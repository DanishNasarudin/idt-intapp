import { fetchClerkUser } from "@/app/(serverActions)/FetchDB";
import UserSettings from "../(sections)/UserSettings";
import StaffBranchAssign from "./(settings-components)/StaffBranchAssign";
import { fetchStaffBranch } from "./(settings-server)/settingsActions";

type Props = {};

export type UserType = {
  id: number;
  email: string | null;
  roles: string;
};

type SettingsType = {
  users: UserType;
};

export type Options = {
  option: string;
  color: string;
};

type DropdownOptions = {
  users: Options[];
};

export type OpenClose = {
  users: boolean;
  email: boolean;
};

const dropdownOptions: DropdownOptions = {
  users: [
    { option: "Admin", color: "bg-purple-600 text-purple-100" },
    { option: "Staff", color: "bg-emerald-600 text-emerald-100" },
    { option: "Normal", color: "bg-gray-600 text-gray-100" },
  ],
};

const Settings = async (props: Props) => {
  const userData = await fetchClerkUser();
  const staffBranchData = await fetchStaffBranch();
  return (
    <>
      <div className="hidden md:flex flex-col gap-16 w-full px-16 py-4">
        <div className="top nav w-full flex justify-end"></div>
        <UserSettings
          dataOptions={dropdownOptions.users}
          data={userData}
          // dataValues={data}
          // updateDB={updateDB}
          // addDB={addDB}
          // deleteDB={deleteDB}
        />
        <StaffBranchAssign
          data={staffBranchData
            .sort((a, b) => {
              const nameA = a.name.toUpperCase();
              const nameB = b.name.toUpperCase();
              if (nameA < nameB) {
                return -1;
              }
              if (nameA > nameB) {
                return 1;
              }
              return 0;
            })
            .sort((a, b) => {
              const branchA = a.branch.toUpperCase();
              const branchB = b.branch.toUpperCase();
              if (branchA < branchB) {
                return -1;
              }
              if (branchA > branchB) {
                return 1;
              }
              return 0;
            })}
        />
        <div className="h-[20vh]" />
      </div>
      <div className="md:hidden flex justify-center items-center h-[100vh] text-center w-full">
        <h2>Use Desktop PC</h2>
      </div>
    </>
  );
};

export default Settings;
