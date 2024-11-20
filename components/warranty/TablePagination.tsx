"use client";
import { createURL } from "@/lib/utils";
import { ChevronsUpDownIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export type Page = {
  pageSize: number;
  pageNum: number;
  count: number;
};

const TablePagination = ({ numData = 0 }: { numData?: number }) => {
  const NUMBER_OF_ROW = [10, 20, 30];

  const [page, setPage] = useState<Page>({
    pageSize: 10,
    pageNum: 1,
    count: 0,
  });

  useEffect(() => {
    if (numData) setPage({ ...page, count: numData });
  }, [numData]);

  const handleRowNumChange = (value: string) => {
    setPage({ ...page, pageSize: Number(value) });
  };

  const handlePageNumChange = (value: number) => {
    setPage({ ...page, pageNum: page.pageNum + value });
  };

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const setSearchParams = new URLSearchParams(searchParams?.toString());

  useEffect(() => {
    if (page.pageNum > 0) {
      setSearchParams.set("pageNum", String(page.pageNum));
    } else {
      setSearchParams.delete("pageNum");
    }

    if (page.pageSize > 0) {
      setSearchParams.set("pageSize", String(page.pageSize));
    } else {
      setSearchParams.delete("pageSize");
    }

    const setURL = createURL(`${pathname}/`, setSearchParams);
    router.push(setURL);
  }, [searchParams, pathname, page.pageNum, page.pageSize]);

  return (
    <div className="flex justify-end gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"outline"} className="font-normal">
            {page.pageSize} Rows <ChevronsUpDownIcon size={16} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuRadioGroup
            value={String(page.pageSize)}
            onValueChange={handleRowNumChange}
          >
            {NUMBER_OF_ROW.map((item) => (
              <DropdownMenuRadioItem key={item} value={String(item)}>
                {item} Rows
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <Button
        variant={"outline"}
        className="font-normal"
        disabled={!(page.pageNum - 1 > 0)}
        onClick={() => {
          if (page.pageNum - 1 > 0) handlePageNumChange(-1);
        }}
      >
        Previous
      </Button>
      <Button
        variant={"outline"}
        className="font-normal"
        disabled={!(page.pageNum < Math.floor(page.count / page.pageSize) + 1)}
        onClick={() => {
          if (page.pageNum < Math.floor(page.count / page.pageSize) + 1)
            handlePageNumChange(1);
        }}
      >
        Next
      </Button>
    </div>
  );
};

export default TablePagination;
