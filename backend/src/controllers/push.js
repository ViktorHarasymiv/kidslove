import { UsersCollection } from '../db/models/user.js';

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
