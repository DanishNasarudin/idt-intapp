"use client";
import React, { useEffect, useRef, useState } from "react";
import DropdownStd from "../(components)/DropdownStd";
import TableRowUser from "../(components)/TableRowUser";
import TextBoxEditorStd from "../(components)/TextBoxEditorStd";
import { Options, UserType, OpenClose } from "../settings/page";
import { useSession } from "next-auth/react";
import { searchUser } from "@/app/(serverActions)/FetchDB";

type Props = {
  dataValues: UserType[];
  dataOptions: Options[];
  updateDB: (
    table: string,
    columnId: string,
    id: string,
    column: string,
    value: string
  ) => void;
  addDB: (table: string, columnId: string, id: string) => void;
  deleteDB: (table: string, columnId: string, id: string) => void;
};

type UserData = {
  id: number;
  email: string;
  roles: string;
};

const UserSettings = ({
  dataValues,
  dataOptions,
  updateDB,
  addDB,
  deleteDB,
}: Props) => {
  const { data: session } = useSession();
  const [isAdmin, setAdmin] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      if (session?.user?.email) {
        const check: UserData | null = await searchUser(session.user.email);
        if (check && check.roles === "Admin") return true;
      }
      return false;
    };

    checkUser().then((isAdmin) => {
      setAdmin(isAdmin);
    });
  }, [session]);
  return (
    <div className="relative">
      <h2>Users</h2>
      <div className="flex justify- py-4">
        <button
          className={`
                          px-4 py-2 rounded-md transition-all border-[1px]
                          border-transparent bg-accent
                          mobilehover:hover:bg-accent/80`}
          onClick={() => {
            addDB("auth_users", "roles", "Normal");
          }}
        >
          <p>
            <b>New User</b>
          </p>
        </button>
      </div>
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
          {dataValues &&
            dataValues.map((data, key) => {
              return (
                <TableRowUser
                  key={data.id}
                  keyId={data.id}
                  dataOptions={dataOptions}
                  dataValues={data}
                  updateDB={updateDB}
                  deleteDB={deleteDB}
                />
              );
            })}
        </div>
      </div>
      <div
        data-open={isAdmin}
        className="data-[open=true]:hidden data-[open=false]:block z-[1] absolute w-full h-full bg- top-0 left-0"
      />
    </div>
  );
};

export default UserSettings;
