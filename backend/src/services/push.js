import { UsersCollection } from '../db/models/user.js';
import { ScanLogCollection } from '../db/models/scanLog.js';
import webpush from '../utils/webpush.js';

import geoip from 'geoip-lite';

export const handleBadgeScan = async ({ badge, req, preciseLocation }) => {
  try {
    // 1. Тиха геолокація через IP
    const rawIp = req.headers['x-forwarded-for'] || req.ip;
    const ip = rawIp === '::1' ? null : rawIp; // localhost → null

    const geo = ip ? geoip.lookup(ip) : null;

    const ipLocation = geo
      ? {
          country: geo.country || null,
          city: geo.city || null,
          lat: geo.ll?.[0] || null,
          lon: geo.ll?.[1] || null,
        }
      : null;

    console.log(ipLocation);

    // 2. Точна геолокація (якщо юзер дав дозвіл)
    const accurateLocation = preciseLocation || null;

    // 3. Логування сканування
    await ScanLogCollection.create({
      badgeId: badge.badgeId,
      ip,
      userAgent: req.headers['user-agent'],
      location: {
        accurate: accurateLocation,
        ipBased: ipLocation,
      },
      scannedAt: new Date(),
    });

    // 4. Знайти власника бейджа
    const parent = await UsersCollection.findById(badge.ownerId);

    if (
      !Array.isArray(parent.pushSubscription) ||
      parent.pushSubscription.length === 0
    ) {
      return;
    }

    // 5. Підготовка payload
    const payload = JSON.stringify({
      title: 'Kids ♥ove',
      body: `Бейдж вашої дитини сканували о ${new Date().toLocaleTimeString()}`,
      icon: '/icons/logo_light_m.svg',
      data: { badgeId: badge.badgeId },
    });

    // 6. Перевірка валідності підписки
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

    // 7. Надсилання пушів
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
