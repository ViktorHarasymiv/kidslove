// services/store/childrenStore.ts
import { create } from "zustand";
import type { ChildFormValues } from "../../types/children";
import { getChildrenByBadge } from "../Api/children";

type ChildrenState = {
  children: ChildFormValues[] | null;
  activeChild: ChildFormValues | null;

  loadChildren: (badgeId: string) => Promise<void>;
  setActiveChild: (childId: string) => void;
  updateChildAvatar: (childId: string, avatar: string | null) => void;
};

export const useChildrenStore = create<ChildrenState>((set, get) => ({
  children: null,
  activeChild: null,

  loadChildren: async (badgeId) => {
    const children = await getChildrenByBadge(badgeId);
    set({ children });
  },

  setActiveChild: (childId) => {
    const child = get().children?.find((c) => c._id === childId) || null;
    set({ activeChild: child });
  },

  updateChildAvatar: (childId, avatar) => {
    const updated = get().children?.map((c) =>
      c._id === childId ? { ...c, avatarUrl: avatar } : c,
    );

    set({
      children: updated || null,
      activeChild: updated?.find((c) => c._id === childId) || null,
    });
  },
}));
