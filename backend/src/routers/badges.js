import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

import { authMiddleware } from '../middlewares/authMiddleware.js';
import { activateBadge, getBadgeInfo } from '../controllers/badge.js';

const router = Router();

router.get('/:badgeId', ctrlWrapper(getBadgeInfo));

router.use(authMiddleware);

router.post('/activate', ctrlWrapper(activateBadge));

export default router;
