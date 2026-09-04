import { UsersCollection } from '../db/models/user.js';

export async function setActiveBadge(req, badgeId) {
  if (!req.user?.id) {
    throw new Error('User ID missing in auth middleware');
  }

  return UsersCollection.findByIdAndUpdate(
    req.user.id,
    { activeBadgeId: badgeId },
    { new: true },
  ).lean();
}
