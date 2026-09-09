import webpush from 'web-push';
import { UsersCollection } from '../db/models/user.js';
import { ScanLogCollection } from '../db/models/scanLog.js';

export const handleBadgeScan = async ({ badge, req }) => {
  try {
    // 1. Логування
    await ScanLogCollection.create({
      badgeId: badge.badgeId,
      ip: req.ip,
      userAgent: req.headers['user-agent'],
      scannedAt: new Date(),
    });

    // 2. Знайти власника
    const parent = await UsersCollection.findById(badge.ownerId);
    if (!parent?.pushSubscription) return;

    // 3. Надіслати пуш
    await webpush.sendNotification(
      parent.pushSubscription,
      JSON.stringify({
        title: 'Kids ♥ove',
        body: `Бейдж вашої дитини сканували о ${new Date().toLocaleTimeString()}`,
        icon: '/icons/push-icon.png',
        data: { badgeId: badge.badgeId },
      }),
    );
  } catch (err) {
    console.log('handleBadgeScan error:', err);
  }
};
