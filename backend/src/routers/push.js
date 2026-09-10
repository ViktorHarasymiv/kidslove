import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import {
  getVapidPublicKey,
  saveSubscription,
  scanBadgeController,
} from '../controllers/push.js';

const router = Router();

router.post('/scan/:badgeId', ctrlWrapper(scanBadgeController));

router.get('/vapid-public-key', getVapidPublicKey);
router.post('/save-subscription', authMiddleware, saveSubscription);

export default router;
