import { UsersCollection } from '../db/models/user.js';
import { ScanLogCollection } from '../db/models/scanLog.js';
import webpush from '../utils/webpush.js';

export const handleBadgeScan = async ({ badge, req }) => {
  try {
    // 1. Логування сканування
    await ScanLogCollection.create({
      badgeId: badge.badgeId,
      ip: req.ip,
      userAgent: req.headers['user-agent'],
    });

    // 2. Знайти власника бейджа
    const parent = await UsersCollection.findById(badge.ownerId);

    // Якщо немає масиву підписок — нічого не робимо
    if (
      !Array.isArray(parent.pushSubscription) ||
      parent.pushSubscription.length === 0
    ) {
      return;
    }

    // 3. Підготовка payload
    const payload = JSON.stringify({
      title: 'Kids ♥ove',
      body: `Бейдж вашої дитини сканували о ${new Date().toLocaleTimeString()}`,
      icon: '/icons/logo_light_m.svg',
      data: { badgeId: badge.badgeId },
    });

    // 4. Функція перевірки валідності підписки
    const isValidSubscription = (sub) =>
      sub &&
      typeof sub === 'object' &&
      typeof sub.endpoint === 'string' &&
      sub.endpoint.startsWith('https://') &&
      sub.endpoint.length > 30 &&
      sub.keys &&
      typeof sub.keys.p256dh === 'string' &&
      sub.keys.p256dh.length > 30 &&
      typeof sub.keys.auth === 'string' &&
      sub.keys.auth.length > 10;

    // 5. Надсилання пушів на всі валідні підписки
    for (const sub of parent.pushSubscription) {
      if (!isValidSubscription(sub)) continue;

      try {
        await webpush.sendNotification(sub, payload);
      } catch (err) {
        console.log('Push error for subscription:', sub.endpoint, err);
      }
    }
  } catch (err) {
    console.log('handleBadgeScan error:', err);
  }
};
