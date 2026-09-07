import { create } from "zustand";

export interface TabItem {
  id: number;
  tab: string;
}

interface TabState {
  activeTab: number;
  setActiveTab: (id: number) => void;
}

export const useTabAuthStore = create<TabState>((set) => ({
  activeTab: 0, // або будь-який дефолтний таб
  setActiveTab: (id) => set({ activeTab: id }),
}));
