// src/routers/index.js

import { Router } from 'express';
import authRouter from './auth.js';
import baigeRouter from './badges.js';
// import userRouter from './users.js';
// import listingRouter from './listing.js';
// import categoriesRouter from './categories.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/badges', baigeRouter);
// router.use('/users', userRouter);
// router.use('/listing', listingRouter);
// router.use('/categories', categoriesRouter);

export default router;
