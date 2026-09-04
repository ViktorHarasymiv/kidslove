import { ChildCollection } from '../db/models/children.js';

// CREATE

export const createChildService = async (parentId, data) => {
  return ChildCollection.create({
    ...data,
    parentId,
  });
};

// GET BY ID

export const getChildByBadgeService = async (parentId, badgeId) => {
  return ChildCollection.find({ parentId, badgeId }).lean();
};
