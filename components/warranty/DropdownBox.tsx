"use client";
import { Options } from "@/app/warranty/settings/page";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Badge } from "../ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

type Props = {
  id?: string;
  options?: Options[];
  value?: string;
  onValueChange?: (newValue: string) => void;
};

const defaultOptions: Options[] = [
  { option: "By: Name", color: "!bg-pink-600 !text-pink-100" },
  { option: "By: Email", color: "!bg-emerald-600 !text-emerald-100" },
  { option: "By: PIC", color: "!bg-red-600 !text-red-100" },
];

const DropdownBox = ({
  id = "default",
  options,
  value = "",
  onValueChange = () => {},
}: Props) => {
  const activeOptions =
    options && options.length > 0 ? options : defaultOptions;

  const [position, setPosition] = useState<string>(value || "");

  const handleValueChange = (value: string) => {
    if (value === position) {
      setPosition("");
      onValueChange("");
    } else {
      setPosition(value);
      onValueChange(value);
    }
  };

  const handleFindOptionIndex = (option: string) => {
    return activeOptions.findIndex((item) => item.option === option);
  };

  return (
    <td>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div
            role="button"
            className="w-full px-2 py-1 cursor-default whitespace-nowrap overflow-hidden"
          >
            {position === "" ? (
              <p className="min-h-[24px]"></p>
            ) : (
              <Badge
                className={cn(
                  `${
                    activeOptions[handleFindOptionIndex(position)]?.color || ""
                  }`
                )}
              >
                {position}
              </Badge>
            )}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuRadioGroup
            id={id}
            value={position ? position : ""}
            onValueChange={handleValueChange}
          >
            {activeOptions.map((opt) => (
              <DropdownMenuRadioItem value={opt.option} key={opt.option}>
                <Badge
                  className={cn(
                    `${
                      activeOptions[handleFindOptionIndex(opt.option)]?.color ||
                      ""
                    }`
                  )}
                >
                  {opt.option}
                </Badge>
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </td>
  );
};

export default DropdownBox;
