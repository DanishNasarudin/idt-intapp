"use client";
import { cn } from "@/lib/utils";
import { SortDbType } from "@/services/warranty/warrantyActions";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import SortModuleDraggable from "./SortModuleDraggable";

type Props = {
  setSearchSort: Dispatch<SetStateAction<SortDbType[]>>;
};

export type SortColumnType = {
  id: string;
  name: string;
  direction: string;
};

const sortColumns: SortColumnType[] = [
  {
    id: "date",
    name: "Date",
    direction: "desc",
  },
  {
    id: "serviceNo",
    name: "Service No",
    direction: "desc",
  },
  {
    id: "name",
    name: "Name",
    direction: "desc",
  },
  {
    id: "status",
    name: "Status",
    direction: "desc",
  },
];

const SortModuleContext = ({ setSearchSort }: Props) => {
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(String(event.active.id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setSortingList((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);

        if (oldIndex === -1 || newIndex === -1) {
          return items;
        }

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const [sortingList, setSortingList] = useState<SortColumnType[]>(
    sortColumns.slice(0, 2)
  );

  const handleSortingAdd = (e: string) => {
    const selectedColumn = sortColumns.find((item) => item.id === e);
    if (selectedColumn) {
      setSortingList((prev) => [...prev, selectedColumn]);
    }
  };

  useEffect(() => {
    setSearchSort(() => {
      const newSortList = sortingList.map((item) => {
        return {
          type: item.id,
          direction: item.direction,
        };
      });
      return newSortList;
    });
  }, [sortingList]);

  return (
    <div
      className={cn(
        "border-zinc-800 border-[1px] rounded-md p-1",
        "flex gap-2"
      )}
    >
      <DndContext
        id={"unique-dnd-context"}
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="w-min flex gap-2">
          <SortableContext
            items={sortingList}
            strategy={horizontalListSortingStrategy}
          >
            {sortingList.map((item) => (
              <SortModuleDraggable
                key={item.id}
                id={item.id}
                name={item.name}
                setSortingList={setSortingList}
              />
            ))}
          </SortableContext>
        </div>
        <DragOverlay>
          {activeId ? (
            <SortModuleDraggable
              id={activeId}
              name={sortColumns.find((item) => item.id === activeId)?.name}
              setSortingList={setSortingList}
            />
          ) : null}
        </DragOverlay>
      </DndContext>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={"nothing"}
            size={"sm"}
            className={cn("mobilehover:hover:bg-white/20")}
          >
            + Add Sort
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuRadioGroup onValueChange={handleSortingAdd}>
            {sortColumns
              .filter(
                (item) => !sortingList.some((active) => active.id === item.id)
              )
              .map((item) => (
                <DropdownMenuRadioItem value={item.id} key={item.id}>
                  <Button
                    variant={"nothing"}
                    size={"sm"}
                    className="whitespace-nowrap"
                  >
                    {item.name}
                  </Button>
                </DropdownMenuRadioItem>
              ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SortModuleContext;
