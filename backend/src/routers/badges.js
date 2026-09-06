import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

import { authMiddleware } from '../middlewares/authMiddleware.js';
import {
  activateBadge,
  getBadgeInfo,
  setActiveBadgeController,
  setActiveChild,
} from '../controllers/badge.js';

const router = Router();

router.get('/:badgeId', ctrlWrapper(getBadgeInfo));

router.use(authMiddleware);

router.post('/activate', ctrlWrapper(activateBadge));
router.post('/set-active-badge', ctrlWrapper(setActiveBadgeController));
router.patch('/set-active-child', ctrlWrapper(setActiveChild));

export default router;
