import { UsersCollection } from '../db/models/user.js';
import { ScanLogCollection } from '../db/models/scanLog.js';
import webpush from '../utils/webpush.js';

import geoip from 'geoip-lite';
import parseUserAgent from '../utils/parseUserAgent.js';
// import { getCityFromGPS } from '../utils/getCityFromGPS.js';

export const handleBadgeScan = async ({ badge, req, preciseLocation }) => {
  try {
    // 1. Тиха геолокація через IP
    const forwarded = req.headers['x-forwarded-for'];
    const realIp = forwarded ? forwarded.split(',')[0].trim() : null;

    const ip = realIp || req.headers['x-real-ip'] || req.ip || null;

    const geo = ip ? geoip.lookup(ip) : null;

    const ipBased = geo
      ? {
          country: geo.country || null,
          city: geo.city || null,
          lat: geo.ll?.[0] || null,
          lon: geo.ll?.[1] || null,
        }
      : null;

    // 2. Точна геолокація (якщо юзер дав дозвіл)
    let accurateCity = null;

    // if (preciseLocation) {
    //   accurateCity = await getCityFromGPS(
    //     preciseLocation.lat,
    //     preciseLocation.lon,
    //   );
    // }

    const location = {
      accurate: {
        lat: preciseLocation?.lat || null,
        lon: preciseLocation?.lon || null,
        accuracy: preciseLocation?.accuracy || null,
        city: accurateCity?.city || null,
        district: accurateCity?.district || null,
        street: accurateCity?.street || null,
      },
      ipBased: {
        country: ipBased?.country || null,
        city: ipBased?.city || null,
        lat: ipBased?.lat || null,
        lon: ipBased?.lon || null,
      },
    };

    const userAgent = req.headers['user-agent'];
    const device = parseUserAgent(userAgent);

    // 3. Логування сканування
    await ScanLogCollection.create({
      badgeId: badge.badgeId,
      ip,
      userAgent: req.headers['user-agent'],
      device,
      location,
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
