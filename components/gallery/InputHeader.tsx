"use client";
import { SearchIcon } from "@/components/common/Icons";
import { Button, Input } from "@nextui-org/react";
import { useState } from "react";

type Props = {};

const InputHeader = (props: Props) => {
  const [searchVal, setSearchVal] = useState("");

  return (
    <section className="flex justify-between">
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
          New Photo
        </Button>
      </div>
    </section>
  );
};

export default InputHeader;
