"use client";
import { SearchIcon } from "@/components/common/Icons";
import { Button, Input } from "@nextui-org/react";
import { useState } from "react";

const OrdersTopSection = () => {
  const [searchVal, setSearchVal] = useState("");
  return (
    <>
      <div className="flex gap-2 w-full justify-end mb-8">
        <Button
          size="sm"
          radius="sm"
          variant="bordered"
          className="text-zinc-500 mobilehover:hover:text-zinc-300"
        >
          Refresh Data
        </Button>
        <Button
          size="sm"
          radius="sm"
          variant="bordered"
          className="text-zinc-500 mobilehover:hover:text-zinc-300"
        >
          History
        </Button>
      </div>
      <h2 className="mt-8 mb-4">Branch Name</h2>
      <div className="flex justify-between">
        <Input
          variant="bordered"
          size="sm"
          isClearable={true}
          placeholder="Type to search..."
          startContent={<SearchIcon className="fill-zinc-500" />}
          className="max-w-[250px]"
          value={searchVal}
          onValueChange={(e) => setSearchVal(e)}
          onClear={() => setSearchVal("")}
        />
        <div className="flex gap-2">
          <Button
            size="lg"
            radius="sm"
            className="bg-accent mobilehover:hover:bg-accentHov font-bold"
          >
            New Order
          </Button>
        </div>
      </div>
      <div></div>
    </>
  );
};

export default OrdersTopSection;
