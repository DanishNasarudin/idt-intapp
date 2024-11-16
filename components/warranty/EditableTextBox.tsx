"use client";
import { cn } from "@/lib/utils";
import { useDropOutsideClick } from "@/lib/zus-store";
import { CopyIcon } from "lucide-react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";

type Props = {
  id?: string;
  value?: string;
  onValueChange?: (newValue: string, id: string) => void;
};

const EditableTextBox = ({
  id = "default",
  value = "",
  onValueChange = () => {},
}: Props) => {
  const [input, setInput] = useState(value || "");

  const [open, setOpen] = useState(false);

  const isOpenOutside = useDropOutsideClick((state) => state.isOpen);
  const setIsOpenOutside = useDropOutsideClick((state) => state.setIsOpen);

  const inputRef = useRef<HTMLInputElement>(null);

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.currentTarget.value);
    onValueChange(e.currentTarget.value, id);
  };

  useEffect(() => {
    if (isOpenOutside === false) setOpen(false);
  }, [isOpenOutside]);

  return (
    <td className={cn("relative overflow-hidden whitespace-nowrap group")}>
      <div
        role="button"
        className="w-full px-2 py-1 cursor-default"
        onClick={() => {
          setOpen(true);
          setIsOpenOutside(true);
          setTimeout(() => {
            if (inputRef.current && inputRef.current.id === id)
              inputRef.current.focus();
          }, 100);
        }}
      >
        {input === null ? (
          <p className="min-h-[24px]"></p>
        ) : (
          <p className="min-h-[24px]">{input}</p>
        )}
        <div
          role="textbox"
          data-open={open}
          className="z-[2] data-[open=true]:block data-[open=false]:hidden absolute w-full h-full top-0 left-0 bg-zinc-800 flex items-center whitespace-normal"
        >
          <div className="bg-zinc-800 h-max w-full px-1 py-1 rounded-md whitespace-normal">
            <input
              ref={open ? inputRef : null}
              id={id}
              type="text"
              value={input === null ? "" : input}
              onChange={onInputChange}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === "Escape") {
                  setOpen(false);
                  setIsOpenOutside(false);
                }
              }}
              placeholder=" "
              className="outline-none cursor-text w-full bg-zinc-800 text-white placeholder-gray-400"
            />
          </div>
        </div>
      </div>
      <Button
        variant={"secondary"}
        size={"icon"}
        className="group-hover:flex hidden h-[20px] w-[20px] absolute right-[5%] top-[50%] translate-y-[-50%]"
        onClick={() => {
          navigator.clipboard.writeText(input);
          toast.success("Copied!");
        }}
      >
        <CopyIcon size={10} />
      </Button>
    </td>
  );
};

export default EditableTextBox;
