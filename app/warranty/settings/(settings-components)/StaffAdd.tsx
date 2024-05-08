"use client";
import { Button, Input } from "@nextui-org/react";
import React from "react";
import { toast } from "sonner";
import { addStaffBranch } from "../(settings-server)/settingsActions";
import { colors } from "./StaffBranchAssign";

type Props = {};

const StaffAdd = (props: Props) => {
  const [value, setValue] = React.useState("");

  const addStaff = async (name: string) => {
    try {
      await addStaffBranch(
        name,
        "Ampang HQ",
        colors[Math.floor(Math.random() * colors.length)].option
      );
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(`Error (addStaff): `);
      }
    }
  };

  return (
    <div className="flex gap-2">
      <Button
        size="lg"
        radius="sm"
        className="font-bold"
        isDisabled={value === ""}
        onClick={() => {
          toast.promise(
            addStaff(value).then(() => setValue("")),
            {
              loading: "Adding data..",
              success: "Added!",
              error: (error) => `Error adding data: {${error}}`,
            }
          );
          // addStaff(value);
        }}
      >
        New Staff
      </Button>
      <Input
        type="name"
        placeholder="Staff Name"
        size="sm"
        radius="sm"
        value={value}
        onValueChange={setValue}
      />
    </div>
  );
};

export default StaffAdd;
