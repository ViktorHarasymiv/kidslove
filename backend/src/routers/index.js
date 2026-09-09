// src/routers/index.js

import { Router } from 'express';
import authRouter from './auth.js';
import baigeRouter from './badges.js';
import childrenRouter from './children.js';
import pushRouter from './push.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/badges', baigeRouter);
router.use('/children', childrenRouter);
router.use('/push', pushRouter);

export default router;
