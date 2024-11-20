"use client";
import TableRowUser from "@/components/warranty/settings/TableRowUser";
import {
  adminClerkUser,
  createClerkUser,
} from "@/services/common/clerkActions";
import { useUser } from "@clerk/nextjs";
import { useEffect, useRef, useState } from "react";
import { Options, UserType } from "../../../app/warranty/settings/page";

type Props = {
  data: UserType[];
  dataOptions: Options[];
};

type UserData = {
  id: number;
  email: string;
  roles: string;
};

const UserSettings = ({ data, dataOptions }: Props) => {
  const [isAdmin, setAdmin] = useState(true);
  const [render, setRender] = useState(false);
  const { user, isLoaded } = useUser();

  const [searchFocus, setSearchFocus] = useState(false);
  const [search, setSearch] = useState("");
  const searchRef = useRef("");

  useEffect(() => {
    const check = async () => {
      if (isLoaded && user !== null) {
        const checkAdmin = adminClerkUser(user.id);
        if (await checkAdmin) setAdmin(true);
        else setAdmin(false);
      }
    };
    check();
  }, [isLoaded]);

  return (
    <div className="relative">
      <h2>Users</h2>
      <div className="flex  py-4 gap-4">
        <button
          disabled={!(searchRef.current !== "")}
          className={`
          ${
            searchRef.current !== ""
              ? "bg-accent mobilehover:hover:bg-accent/80"
              : "bg-zinc-600 mobilehover:hover:bg-zinc-600/80"
          }
                          px-4 py-2 rounded-md transition-all border-[1px]
                          border-transparent 
                          `}
          onClick={async () => {
            if (searchRef.current !== "") {
              await createClerkUser(searchRef.current);
              setRender(!render);
              searchRef.current = "";
              setSearch("");
            }
          }}
        >
          <p>
            <b>New User</b>
          </p>
        </button>
        <p
          className={`
                  bg-transparent border-zinc-800 border-[1px] px-4 py-2 rounded-md flex gap-2 w-[210px]
                  ${searchFocus ? "!border-zinc-400" : ""}`}
        >
          <input
            type="text"
            value={search}
            name="search"
            onChange={(e) => {
              searchRef.current = e.target.value;
              setSearch((prev) => (prev = e.target.value));
            }}
            onBlur={() => {
              setTimeout(() => {
                setSearchFocus(false);
              }, 100);
            }}
            onFocus={() => setSearchFocus(true)}
            className={`bg-transparent outline-none w-full`}
            placeholder="Email"
          />
        </p>
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
          {data &&
            data.map((data, key) => {
              return (
                <TableRowUser
                  key={data.id}
                  dataOptions={dataOptions}
                  dataValues={data}
                  setRender={setRender}
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
export const revalidate = 0;
export default UserSettings;
