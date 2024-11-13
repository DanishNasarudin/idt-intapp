"use client";
import { useDropOutsideClick } from "@/lib/zus-store";
import { useEffect, useRef } from "react";

type Props = {};

const DropdownOutsideClick = (props: Props) => {
  const isOpen = useDropOutsideClick((state) => state.isOpen);
  const setIsOpen = useDropOutsideClick((state) => state.setIsOpen);
  const openRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = () => {
      setIsOpen(false);
    };

    window.addEventListener("mousedown", handleOutsideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [openRef]);

  return (
    <div
      data-open={isOpen}
      ref={openRef}
      className="data-[open=true]:block data-[open=false]:hidden fixed z-[1] bg-transparent w-[100vw] h-[100vh] top-0 left-0"
    ></div>
  );
};

export default DropdownOutsideClick;
