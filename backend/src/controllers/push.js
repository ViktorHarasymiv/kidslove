import { UsersCollection } from '../db/models/user.js';
import { handleBadgeScan } from '../services/push.js';
import { BadgeCollection } from '../db/models/badges.js';

export const saveSubscription = async (req, res) => {
  try {
    const userId = req.user.id;
    const subscription = req.body;

    const user = await UsersCollection.findById(userId);

    // Якщо масиву немає — створюємо
    if (!Array.isArray(user.pushSubscription)) {
      user.pushSubscription = [];
    }

    // Перевіряємо, чи така підписка вже існує
    const exists = user.pushSubscription.some(
      (sub) => sub.endpoint === subscription.endpoint,
    );
    // Якщо немає — додаємо
    if (!exists) {
      user.pushSubscription.push(subscription);
      await user.save();
    }

    res.json({ status: 'ok' });
  } catch (err) {
    console.log('saveSubscription error:', err);
    res.status(500).json({ error: 'Failed to save subscription' });
  }
};

export const getVapidPublicKey = (req, res) => {
  res.json({
    publicKey: process.env.VAPID_PUBLIC_KEY,
  });
};

export const scanBadgeController = async (req, res) => {
  console.log(req);
  try {
    const badgeId = req.params.badgeId;
    const badge = await BadgeCollection.findOne({ badgeId });

    if (!badge) {
      return res.status(404).json({ error: 'Badge not found' });
    }

    const preciseLocation = req.body.preciseLocation || null;

    await handleBadgeScan({ badge, req, preciseLocation });

    res.json({ status: 'scanned' });
  } catch (err) {
    console.log('scanBadgeController error:', err);
    res.status(500).json({ error: 'Failed to scan badge' });
  }
};
