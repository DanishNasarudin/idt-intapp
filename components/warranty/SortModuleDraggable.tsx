import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import { cn } from "@/lib/utils";
import {
  ChevronsDownIcon,
  ChevronsUpIcon,
  MinusCircleIcon,
} from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { SortColumnType } from "./SortModuleContext";

type Props = {
  id?: string;
  name?: string;
  direction?: string;
  setSortingList: Dispatch<SetStateAction<SortColumnType[]>>;
};

const SortModuleDraggable = ({
  id = "default",
  name = "default",
  direction = "desc",
  setSortingList,
}: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: id,
    });
  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

  const dragProps = {
    ref: setNodeRef,
    style,
    ...listeners,
    ...attributes,
  };

  const [position, setPosition] = useState<string>("");

  useEffect(() => {
    setPosition(direction);
    switch (direction) {
      case "ASC":
        setIcon(<ChevronsUpIcon />);
        break;
      case "desc":
        setIcon(<ChevronsDownIcon />);
        break;
      case "remove":
        setIcon(<MinusCircleIcon />);
        break;
      default:
        throw new Error(`Invalid direction.`);
    }
  }, [direction]);

  const handleOnValueChange = (e: string) => {
    switch (e) {
      case "asc":
        setSortingList((prev) => {
          const newList = prev.map((item) => {
            if (item.id === id) {
              return { ...item, direction: "asc" };
            } else {
              return item;
            }
          });

          return newList;
        });
        setPosition("asc");
        setIcon(<ChevronsUpIcon />);
        break;
      case "desc":
        setSortingList((prev) => {
          const newList = prev.map((item) => {
            if (item.id === id) {
              return { ...item, direction: "desc" };
            } else {
              return item;
            }
          });

          return newList;
        });
        setPosition("desc");
        setIcon(<ChevronsDownIcon />);
        break;
      case "remove":
        setSortingList((prev) => {
          const newList = prev.filter((item) => item.id !== id);

          return newList;
        });
        setPosition("remove");
        setIcon(<MinusCircleIcon />);
        break;
      default:
        throw new Error(`Invalid selection.`);
    }
  };

  const [icon, setIcon] = useState<JSX.Element>(<MinusCircleIcon />);

  const [open, setOpen] = useState(false);

  return (
    <div
      {...(!open && dragProps)}
      className={cn(
        "flex border-zinc-700 border-[1px] rounded-md bg-background",
        ""
      )}
    >
      <Button
        variant={"nothing"}
        size={"sm"}
        className="whitespace-nowrap front-normal cursor-grab"
      >
        {name}
      </Button>
      <DropdownMenu onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant={"nothing"}
            className="whitespace-nowrap font-normal px-2 mobilehover:hover:bg-white/20"
            size={"sm"}
          >
            {icon}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuRadioGroup
            value={position ? position : ""}
            onValueChange={handleOnValueChange}
          >
            <DropdownMenuRadioItem value={"asc"}>
              <Button
                variant={"nothing"}
                size={"sm"}
                className="whitespace-nowrap "
              >
                Ascending <ChevronsUpIcon />
              </Button>
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value={"desc"}>
              <Button
                variant={"nothing"}
                size={"sm"}
                className="whitespace-nowrap"
              >
                Descending <ChevronsDownIcon />
              </Button>
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value={"remove"}>
              <Button
                variant={"destructive"}
                size={"sm"}
                className="whitespace-nowrap"
              >
                Remove
                <MinusCircleIcon />
              </Button>
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SortModuleDraggable;
