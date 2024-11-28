"use client";
import { useSocket } from "@/lib/providers/socket-provider";
import { cn } from "@/lib/utils";
import { WarrantyDataType } from "@/services/warranty/warrantyActions";
import { CopyIcon } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

type Props = {
  rowId?: string;
  id?: keyof WarrantyDataType | "default";
  label?: string;
  isTextarea?: boolean;
  value?: string;
  onValueChange?: (
    newValue: string,
    id: keyof WarrantyDataType | "default"
  ) => void;
  minHeight?: number;
};

const TextBoxWithCopy = ({
  rowId = "defaultRowId",
  id = "default",
  label = "Label Placeholder",
  isTextarea = false,
  value = "",
  onValueChange = () => {},
  minHeight = 60,
}: Props) => {
  const [input, setInput] = useState("");

  useEffect(() => {
    setInput(value);
  }, [value]);

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newValue = event.currentTarget.value;
    onValueChange(newValue, id);
    setInput(newValue);
  };

  const options = {
    type: "email",
  };

  const minHeightString = minHeight ? `h-[${minHeight}px]` : "";

  const [edit, setEdit] = useState(false);
  const [open, setOpen] = useState(false);

  const { socket, setIsFocus } = useSocket();

  useEffect(() => {
    if (socket === null) return;
    const socketHandler = (socketData: {
      rowId: string;
      columnId: string;
      isEditing: boolean;
    }) => {
      const { rowId: socketRowId, columnId, isEditing } = socketData;
      if (socketRowId === rowId && columnId === id) {
        setEdit(isEditing);
      }
    };

    socket.on("cell-isediting", socketHandler);

    return () => {
      socket.off("cell-isediting", socketHandler);
    };
  }, [socket]);

  useEffect(() => {
    if (socket === null) return;
    if (open) {
      socket.emit("editing-cell", { rowId, columnId: id, isEditing: true });
    } else {
      socket.emit("editing-cell", { rowId, columnId: id, isEditing: false });
    }
  }, [open, socket]);

  const handleFocus = () => {
    setOpen(true);
    setIsFocus(true);
  };

  const handleBlur = () => {
    setOpen(false);
    setIsFocus(false);
  };

  return (
    <div
      className={cn("relative group/textboxinput")}
      onFocus={() => handleFocus()}
      onBlur={() => handleBlur()}
    >
      <Label
        htmlFor={id}
        className={cn(edit && "pointer-events-none opacity-50")}
      >
        {label}
      </Label>
      <Tooltip {...(!edit && { open: false })}>
        <TooltipTrigger className="cursor-default">
          {isTextarea ? (
            <Textarea
              id={id}
              value={input === null ? "" : input}
              className={cn(
                "[&>input]:px-1 resize-none",
                minHeightString,
                edit && "pointer-events-none opacity-50"
              )}
              onChange={handleInputChange}
            />
          ) : (
            <Input
              {...(id === "email" && options)}
              id={id}
              value={input === null ? "" : input}
              className="[&>input]:px-1"
              onChange={handleInputChange}
            />
          )}
        </TooltipTrigger>
        <TooltipContent className="dark:bg-zinc-700 dark:text-foreground">
          <p>Other People Editing..</p>
        </TooltipContent>
      </Tooltip>

      <Button
        size={"icon"}
        variant={"secondary"}
        className={cn(
          "mobilehover:group-hover/textboxinput:flex hidden w-[20px] h-[20px]",
          "absolute top-[30px] right-[5%]"
        )}
        onClick={() => {
          navigator.clipboard.writeText(input);
          toast.success("Copied!");
        }}
      >
        <CopyIcon size={12} />
      </Button>
    </div>
  );
};

export default TextBoxWithCopy;
