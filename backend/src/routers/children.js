// routes/child.routes.ts
import { Router } from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';

import { upload } from '../middlewares/multer.js';

import { authMiddleware } from '../middlewares/authMiddleware.js';
import {
  createChildController,
  getChildByBadgeController,
} from '../controllers/children.js';

import { childSchemaJoi } from '../validation/children.js';

const router = Router();

router.use(authMiddleware);

router.get('/badge/:badgeId', ctrlWrapper(getChildByBadgeController));

router.post(
  '/create',
  upload.single('avatarUrl'),
  validateBody(childSchemaJoi),
  ctrlWrapper(createChildController),
);

export default router;
