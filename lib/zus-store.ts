import { BranchType } from "@/services/warranty/warrantyUtils";
import { create } from "zustand";

type NavbarStore = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export const useNavbarStore = create<NavbarStore>()((set) => ({
  isOpen: true,
  setIsOpen: (isOpen) => set({ isOpen }),
}));

export const useDropOutsideClick = create<NavbarStore>()((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
}));

type BranchFormatStore = {
  branchData: BranchType | undefined;
  setBranchData: (branchData: BranchType) => void;
};

export const useBranchFormat = create<BranchFormatStore>()((set) => ({
  branchData: undefined,
  setBranchData: (branchData) => set({ branchData }),
}));
