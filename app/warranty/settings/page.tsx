"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/(scn-components)/ui/avatar";
import DropdownStd from "../(components)/DropdownStd";
import {
  addDBGeneral,
  deleteDBGeneral,
  fetchUsers,
  updateDBGeneral,
} from "@/app/(serverActions)/FetchDB";
import UserSettings from "../(sections)/UserSettings";

type Props = {};

export type UserType = {
  id: number;
  email: string;
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

const Settings = (props: Props) => {
  const [render, setRender] = useState(false);
  const [data, setData] = useState<UserType[]>([]);

  useEffect(() => {
    fetchUsers().then((users: UserType[]) => setData(users));
  }, [render]);

  // update data

  const updateDB = async (
    table: string,
    columnId: string,
    id: string,
    column: string,
    value: string
  ) => {
    try {
      if (id === "") return;
      //   console.log(table, columnId, id, column, value, "updated DB");

      await updateDBGeneral(table, columnId, id, column, value);
      setRender(!render);
    } catch (error) {
      throw new Error(`Database error: ${error}`);
    }
  };

  const addDB = async (table: string, columnId: string, id: string) => {
    try {
      if (id === "") return;
      await addDBGeneral(table, columnId, id);
      setRender(!render);
    } catch (error) {
      throw new Error(`Database error: ${error}`);
    }
  };

  const deleteDB = async (table: string, columnId: string, id: string) => {
    try {
      if (id === "") return;
      await deleteDBGeneral(table, columnId, id);
      setRender(!render);
    } catch (error) {
      throw new Error(`Database error: ${error}`);
    }
  };

  return (
    <>
      <div className="hidden md:flex flex-col gap-16 w-full px-16 py-4">
        <div className="top nav w-full flex justify-end">
          <Avatar className="rounded-full w-8">
            <AvatarImage src="https://idealtech.com.my/wp-content/uploads/2023/03/IDT_LOGO-150x150.png" />
            <AvatarFallback>IT</AvatarFallback>
          </Avatar>
        </div>
        {/* <div className="main-set">
          <h2>Users</h2>
          <div className="user-tab">
            <div className="tab-head flex [&>div]:w-full [&>div]:px-2 [&>div]:py-1">
              <div className="">
                <span>Email</span>
              </div>
              <div className="max-w-[150px]">
                <span>Roles</span>
              </div>
              <div className="max-w-[150px]">
                <span>Actions</span>
              </div>
            </div>
            <div className="tab-body">
              {data && (
                <div
                  className="
                          tab-row flex [&>div]:w-full [&>div]:px-2 [&>div]:py-1
                          border-t-[1px] border-zinc-800 [&>div]:border-l-[1px] [&>div]:border-zinc-800
                "
                >
                  <div className="!border-l-[0px]">
                    <span>Email</span>
                  </div>
                  {option && (
                    <DropdownStd
                      boxSize={150}
                      dataId={values.service_no}
                      buttonId="pic"
                      status={option.pic}
                      values={values.pic}
                      setOpenClose={handleOpenClose}
                      openClose={openClose.pic}
                      setInputValues={setInputValues}
                      updateDB={updateDB}
                    />
                  )}
                  <div className="max-w-[150px]">
                    <span>Actions</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div> */}
        <UserSettings
          dataOptions={dropdownOptions.users}
          dataValues={data}
          updateDB={updateDB}
          addDB={addDB}
          deleteDB={deleteDB}
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
