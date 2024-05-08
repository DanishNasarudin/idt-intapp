"use client";
import React from "react";
import { toast } from "sonner";
import {
  deleteStaffBranch,
  StaffBranchType,
  updateStaffBranch,
} from "../(settings-server)/settingsActions";
import DropdownStd from "../../(components)/DropdownStd";
import TextBoxEditorStd from "../../(components)/TextBoxEditorStd";
import { branchList, colors } from "./StaffBranchAssign";

type Props = { data: StaffBranchType; key: number };

function findUpdatedItems(
  originalItems: StaffBranchType[],
  currentItems: StaffBranchType[]
) {
  const updatedItems = currentItems.filter((currentItem) => {
    const originalItem = originalItems.find(
      (oItem) => oItem?.id === currentItem?.id
    );

    // If an item with the same ID is not found, it's a new item (or handle accordingly)
    if (!originalItem) return false;

    return (
      originalItem.name !== currentItem?.name ||
      originalItem.branch !== currentItem?.branch ||
      originalItem.color !== currentItem?.color
    );
  });

  return updatedItems;
}

const StaffTableRow = ({ data, key }: Props) => {
  const inputName = React.useRef(data.name || "");
  const inputBranch = React.useRef(data.branch || "");
  const inputColor = React.useRef(data.color || "");
  const prevValue = React.useRef(
    { name: data.name, branch: data.branch, color: data.color } || ""
  );

  // OpenClose for Row ------------------------------------------------------------
  const [openClose, setOpenClose] = React.useState({
    name: false,
    branch: false,
    color: false,
  });

  const handleOpenClose = (id: string, open: boolean) => {
    // console.log(id, open, "check");
    setOpenClose({ ...openClose, [id]: open });
    if (open) return;
    updateDB();
  };

  // Handle outside click for all OpenClose Elements ----
  const openRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (openRef.current && openRef.current.contains(e.target as Node)) {
        setOpenClose({ ...openClose });
        updateDB();
      }
    };
    window.addEventListener("mousedown", handleOutsideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [openRef]);

  const updateDB = () => {
    if (inputName.current !== prevValue.current.name) {
      // console.log("pass1");
      toast.promise(
        updateStaffBranch("name", inputName.current, "id", data.id).then(
          () => (prevValue.current.name = inputName.current)
        ),
        {
          loading: "Updating data..",
          success: "Data updated!",
          error: (error) => `Error updating: ${error}`,
        }
      );
    }
    if (inputBranch.current !== prevValue.current.branch) {
      // console.log("pass2");
      toast.promise(
        updateStaffBranch("branch", inputBranch.current, "id", data.id).then(
          () => (prevValue.current.branch = inputBranch.current)
        ),
        {
          loading: "Updating data..",
          success: "Data updated!",
          error: (error) => `Error updating: ${error}`,
        }
      );
    }
    if (inputColor.current !== prevValue.current.color) {
      // console.log("pass3");
      toast.promise(
        updateStaffBranch("color", inputColor.current, "id", data.id).then(
          () => (prevValue.current.color = inputColor.current)
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
    <div
      key={key}
      className="
                    tab-row flex [&>div]:w-full [&>div]:px-2 [&>div]:h-full
                    border-t-[1px] border-zinc-800 [&>div]:border-l-[1px] [&>div]:border-zinc-800"
    >
      <TextBoxEditorStd
        boxSize={9999}
        buttonId="name"
        values={inputName.current}
        setInput={inputName}
        setOpenClose={handleOpenClose}
        openClose={openClose.name}
        updateDB={updateDB}
      />
      {branchList && (
        <DropdownStd
          boxSize={150}
          buttonId="branch"
          options={branchList}
          values={inputBranch.current}
          setOpenClose={handleOpenClose}
          openClose={openClose.branch}
          setInput={inputBranch}
          updateDB={updateDB}
        />
      )}
      {colors && (
        <DropdownStd
          boxSize={150}
          buttonId="color"
          options={colors}
          values={inputColor.current}
          setOpenClose={handleOpenClose}
          openClose={openClose.color}
          setInput={inputColor}
          updateDB={updateDB}
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
            // await deleteStaffBranch(data.id);
            toast.promise(deleteStaffBranch(data.id), {
              loading: "Deleting data..",
              success: "Data deleted!",
              error: (error) => `Error deleting: ${error}`,
            });
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
  );
};

export default StaffTableRow;
