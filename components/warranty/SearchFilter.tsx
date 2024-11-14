"use client";
import { Options } from "@/app/warranty/settings/page";
import { createURL } from "@/lib/utils";
import { useBranchFormat } from "@/lib/zus-store";
import { BranchType } from "@/services/warranty/warrantyUtils";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Input } from "../ui/input";

type Props = {
  branchData?: BranchType | undefined;
};

const searchOptions: Options[] = [
  { option: "By: Service No", color: "bg-purple-600 text-purple-100" },
  { option: "By: Name", color: "bg-pink-600 text-pink-100" },
  { option: "By: Email", color: "bg-emerald-600 text-emerald-100" },
  { option: "By: PIC", color: "bg-red-600 text-red-100" },
  { option: "By: Received Items", color: "bg-cyan-600 text-cyan-100" },
  { option: "By: Contact", color: "bg-blue-600 text-blue-100" },
];

const SearchFilter = ({ branchData = undefined }: Props) => {
  // Search handler -------------------
  const [search, setSearch] = useState("");
  const [searchValues] = useDebounce(search, 500);

  const [searchFilter, setSearchFilter] = useState(
    searchOptions[0].option || ""
  );
  const [searchFilterValues] = useDebounce(searchFilter, 500);

  const router = useRouter();
  const pathname = usePathname();
  const setSearchParams = new URLSearchParams();

  useEffect(() => {
    if (pathname === null) return;

    if (searchValues) {
      setSearchParams.set("search", searchValues);
    } else {
      setSearchParams.delete("search");
    }

    if (searchFilterValues) {
      setSearchParams.set("filter", searchFilterValues);
    } else {
      setSearchParams.delete("filter");
    }

    const setURL = createURL(`${pathname}/`, setSearchParams);
    router.push(setURL);
  }, [searchValues, searchFilterValues]);

  // Branch Format Zustand Initiate -------------
  const setBranchData = useBranchFormat((state) => state.setBranchData);

  useEffect(() => {
    if (branchData !== undefined) {
      setBranchData(branchData);
    }
  }, [branchData]);

  //

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <div className="flex gap-4 items-center">
          <Input
            onChange={(e) => setSearch(e.currentTarget.value)}
            className={"rounded-lg w-full text-base"}
            isSearch={true}
            placeholder={"Search.."}
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="font-normal">
                {searchFilter}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start">
              <DropdownMenuRadioGroup
                value={searchFilter}
                onValueChange={setSearchFilter}
              >
                {searchOptions.map((opt) => (
                  <DropdownMenuRadioItem value={opt.option} key={opt.option}>
                    {opt.option}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex gap-4">
          <div className="border-zinc-800 text-zinc-800 p-1 rounded-md transition-all border-[1px] bg-transparent flex gap-1">
            {/* {sortingList &&
              sortingList.map((sort, key) => {
                return (
                  <div
                    key={key}
                    draggable
                    onDragStart={(e) => handleOnDrag(e, sort.type)}
                    onDrop={(e) => handleOnDrop(e, sort.type)}
                    onDragOver={handleDragOver}
                    className="h-full"
                  >
                    <DropdownSort
                      key={key}
                      values={sort}
                      setOptions={setSortOpt}
                      setValues={setSortingList}
                    />
                  </div>
                );
              })}
            <DropdownSortAdd
              values="+ Add Sort"
              setValues={setSortingList}
              setOptions={setSortOpt}
              options={sortOpt}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
