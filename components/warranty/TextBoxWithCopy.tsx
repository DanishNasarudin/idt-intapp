"use client";
import { cn } from "@/lib/utils";
import { CopyIcon } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

type Props = {
  id?: string;
  label?: string;
  isTextarea?: boolean;
  value?: string;
  onValueChange?: (newValue: string, id: string) => void;
  minHeight?: number;
};

const TextBoxWithCopy = ({
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

  return (
    <div className="relative group/textboxinput">
      <Label htmlFor={id}>{label}</Label>
      {isTextarea ? (
        <Textarea
          id={id}
          value={input}
          className={cn("[&>input]:px-1 resize-none", minHeightString)}
          onChange={handleInputChange}
        />
      ) : (
        <Input
          {...(id === "email" && options)}
          id={id}
          value={input}
          className="[&>input]:px-1"
          onChange={handleInputChange}
        />
      )}
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
