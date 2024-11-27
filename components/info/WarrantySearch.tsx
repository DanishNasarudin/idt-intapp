"use client";
import { createURL } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { Input } from "../ui/input";

const WarrantySearch = () => {
  const [search, setSearch] = useState("");
  const [searchValues] = useDebounce(search, 500);

  const router = useRouter();
  const pathname = usePathname();
  const searchParamsCheck = useSearchParams();
  const setSearchParams = new URLSearchParams();

  useEffect(() => {
    if (searchValues) {
      setSearchParams.set("search", searchValues);
    } else {
      setSearchParams.delete("search");
    }
    const setURL = createURL(`${pathname}/`, setSearchParams);
    router.push(setURL);
  }, [pathname, searchParamsCheck, searchValues]);

  return (
    <div className="flex gap-2">
      <Input
        isSearch
        className="[&>input]:h-8 [&>input]:w-[300px] [&>input]:max-w-[300px]"
        onChange={(e) => setSearch(e.currentTarget.value)}
        placeholder={"Search your service number.."}
      />
    </div>
  );
};

export default WarrantySearch;
