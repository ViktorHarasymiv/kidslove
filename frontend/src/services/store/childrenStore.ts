import { create } from "zustand";
import type { ChildState } from "../../types/children";
import { getChildrenByBadge } from "../Api/children";

type ChildrenState = {
  children: ChildState[] | null;
  activeChild: ChildState | null;

  count: number;

  loading: boolean;

  loadChildren: (badgeId: string) => Promise<void>;
  setActiveChild: (childId: string) => void;
};

export const useChildrenStore = create<ChildrenState>((set, get) => ({
  children: null,
  activeChild: null,
  count: 0,
  loading: false,

  loadChildren: async (badgeId) => {
    try {
      set({ loading: true });

      const children = await getChildrenByBadge(badgeId);

      set({
        children: children.data,
        count: children.count,
        loading: false,
      });
    } catch (err) {
      console.error("Помилка завантаження дітей:", err);
      set({ loading: false });
    }
  },

  setActiveChild: (childId) => {
    const child = get().children?.find((c) => c._id === childId) || null;

    set({
      activeChild: child,
    });
  },
}));
