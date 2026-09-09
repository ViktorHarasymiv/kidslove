import { Router } from 'express';

const router = Router();

router.get('/vapid-public-key', (_, res) => {
  res.json({ publicKey: process.env.VAPID_PUBLIC_KEY });
});

export default router;
