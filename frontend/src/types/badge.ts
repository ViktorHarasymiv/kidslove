export interface BadgeType {
  _id: string; // ObjectId as string
  badgeId: string; // public badge identifier
  activationCode: string; // activation code like ACT-xxxx
  isBuy: boolean; // purchased or not
  active: boolean; // activated or not
  orderId: string | null; // optional order reference
  type: "card" | "bracelet"; // or whatever types you support
  isLost: boolean; // lost flag
  updatedAt: string; // ISO date string
  ownerId: string; // parent ObjectId
  activeChildId: string | null; // ID of active child
}
