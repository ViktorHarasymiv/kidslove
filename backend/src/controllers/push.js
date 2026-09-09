import { UsersCollection } from '../db/models/user.js';
import { handleBadgeScan } from '../services/push.js';
import { BadgeCollection } from '../db/models/badges.js';

export const saveSubscription = async (req, res) => {
  try {
    const userId = req.user.id; // якщо authMiddleware додає user
    const subscription = req.body;

    console.log(req);

    await UsersCollection.findByIdAndUpdate(userId, {
      pushSubscription: subscription,
    });

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
  try {
    const badgeId = req.params.badgeId;
    const badge = await BadgeCollection.findOne({ badgeId });

    if (!badge) {
      return res.status(404).json({ error: 'Badge not found' });
    }

    await handleBadgeScan({ badge, req });

    res.json({ status: 'scanned' });
  } catch (err) {
    console.log('scanBadgeController error:', err);
    res.status(500).json({ error: 'Failed to scan badge' });
  }
};
