import { create } from "zustand";

type NavbarStore = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export const useNavbarStore = create<NavbarStore>()((set) => ({
  isOpen: true,
  setIsOpen: (isOpen) => set({ isOpen }),
}));
