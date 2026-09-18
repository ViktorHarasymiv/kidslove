import type { ReactNode } from "react";
import { create } from "zustand";

type ModalState = {
  open: boolean;
  content: ReactNode | null;
  openModal: (content: ReactNode) => void;
  closeModal: () => void;
};

export const useModalStore = create<ModalState>((set) => ({
  open: false,
  content: null,

  openModal: (content) => {
    document.body.style.overflow = "hidden"; // 🔥 блокуємо скролл
    set({
      open: true,
      content,
    });
  },

  closeModal: () => {
    document.body.style.overflow = ""; // 🔥 повертаємо скролл
    set({
      open: false,
      content: null,
    });
  },
}));
