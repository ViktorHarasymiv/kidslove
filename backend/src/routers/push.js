import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { getVapidPublicKey, saveSubscription } from '../controllers/push.js';

const router = Router();

router.get('/vapid-public-key', getVapidPublicKey);
router.post('/save-subscription', authMiddleware, saveSubscription);

export default router;
