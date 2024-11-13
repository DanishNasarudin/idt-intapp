"use client";
import { Options, UserType } from "@/app/warranty/settings/page";
import DropdownStd from "@/components/warranty/old/DropdownStd";
import TextBoxEditorStd from "@/components/warranty/old/TextBoxEditorStd";
import {
  deleteClerkUser,
  updateClerkUser,
} from "@/services/common/clerkActions";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

type Props = {
  dataValues: UserType;
  dataOptions: Options[];
  setRender: (val: React.SetStateAction<boolean>) => void;
};

const TableRowUser = ({ dataValues, dataOptions, setRender }: Props) => {
  const inputId = useRef(dataValues.id || "");
  const inputRole = useRef(dataValues.roles || "");
  const inputEmail = useRef(dataValues.email || "");
  const prevValue = useRef(
    { email: dataValues.email, role: dataValues.roles } || ""
  );
  // const [render, setRender] =useState(false)

  // OpenClose for Row ----
  const [openClose, setOpenClose] = useState({
    users: false,
    email: false,
  });

  const handleOpenClose = (id: string, open: boolean) => {
    // console.log(id, open, "check");
    setOpenClose({ ...openClose, [id]: open });
    if (open) return;
    updateUserDB();
  };

  // Handle outside click for all OpenClose Elements ----
  const openRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (openRef.current && openRef.current.contains(e.target as Node)) {
        setOpenClose({ ...openClose });
        updateUserDB();
      }
    };
    window.addEventListener("mousedown", handleOutsideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [openRef]);

  const updateUserDB = async () => {
    if (inputRole.current !== prevValue.current.role) {
      // console.log("pass3");
      toast.promise(
        updateClerkUser(`${prevValue.current.email}`, inputRole.current).then(
          () => (prevValue.current.role = inputRole.current)
        ),
        {
          loading: "Updating data..",
          success: "Data updated!",
          error: (error) => `Error updating: ${error}`,
        }
      );
    }
  };

  return (
    <>
      <div
        className="
                          tab-row flex [&>div]:w-full [&>div]:px-2 [&>div]:h-full
                          border-t-[1px] border-zinc-800 [&>div]:border-l-[1px] [&>div]:border-zinc-800
                "
      >
        <TextBoxEditorStd
          boxSize={9999}
          buttonId="email"
          values={inputEmail.current}
          setInput={inputEmail}
          setOpenClose={handleOpenClose}
          openClose={openClose.email}
          updateDB={updateUserDB}
        />
        {dataOptions && (
          <DropdownStd
            boxSize={150}
            buttonId="users"
            options={dataOptions}
            values={inputRole.current}
            setOpenClose={handleOpenClose}
            openClose={openClose.users}
            setInput={inputRole}
            updateDB={updateUserDB}
          />
        )}
        <div className="max-w-[150px]">
          <button
            className={`
            text-red-500/80 underline
            mobilehover:hover:text-red-200
                           transition-all`}
            onClick={async () => {
              // deleteDB("auth_users", "id", String(keyId));
              // await deleteClerkUser(`${prevValue.current.email}`);
              toast.promise(deleteClerkUser(`${prevValue.current.email}`), {
                loading: "Deleting data..",
                success: "Data deleted!",
                error: (error) => `Error deleting: ${error}`,
              });
              // setRender((prev) => !prev);
            }}
          >
            <p>Delete</p>
          </button>
        </div>
        <div
          data-open={Object.values(openClose).some((value) => value === true)}
          ref={openRef}
          className="data-[open=true]:block data-[open=false]:hidden fixed z-[1] bg-transparent w-[100vw] h-[100vh] top-0 left-0"
        />
      </div>
    </>
  );
};

export default TableRowUser;
