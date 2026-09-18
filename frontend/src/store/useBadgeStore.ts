import { create } from "zustand";
import type { BadgeResponse } from "../../components/Badge/Badge";
import type { ChildState } from "../../types/children";

interface BadgeState {
  badgeData: BadgeResponse | null;
  activeChild: ChildState | null;
  badgeId: string;
  activeChildId: string | null;

  setBadgeData: (data: BadgeResponse) => void;
  setActiveChildId: (childId: string | null) => void;
}

export const useBadgeStore = create<BadgeState>((set) => ({
  badgeData: null,
  badgeId: "",
  activeChild: null,
  activeChildId: null,

  setBadgeData: (data) =>
    set({
      badgeData: data,
      badgeId: data.badgeId,
      activeChild: data.activeChild || null,
      activeChildId: data.activeChild?._id || null, // ← ВАЖЛИВО
    }),

  setActiveChildId: (childId) => set({ activeChildId: childId }),
}));
