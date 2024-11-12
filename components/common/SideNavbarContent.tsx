"use client";

import { useNavbarStore } from "@/lib/zus-store";

type SideBarType = {
  children: React.ReactNode;
  className?: string;
  openSize?: number;
  closeSize?: number;
};

const SideNavbarContent = ({
  children,
  className,
  openSize,
  closeSize,
}: SideBarType) => {
  const { isOpen } = useNavbarStore();
  // const defaultSize = !isOpen ? 260 : 90;
  // console.log(defaultSize);
  return (
    <div className="flex">
      {!isOpen ? (
        <div className={openSize ? `w-[${openSize}px]` : `!w-[260px]`} />
      ) : (
        <div className={closeSize ? `w-[${closeSize}px]` : `!w-[90px]`} />
      )}
      <div className={className}>{children}</div>
    </div>
  );
};

export default SideNavbarContent;
