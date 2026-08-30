// src/routers/auth.js

import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  changeEmailConfirmSchema,
  changeEmailRequestSchema,
  changePasswordSchema,
  registerUserSchema,
  requestResetEmailSchema,
  resetPasswordSchema,
} from '../validation/auth.js';
import {
  changeEmailConfirmController,
  changeEmailRequestController,
  changePasswordController,
  checkEmailController,
  deleteAccountController,
  loginUserController,
  logoutUserController,
  meController,
  refreshUserSessionController,
  registerUserController,
  requestResetEmailController,
  resetPasswordController,
  sessionController,
} from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = Router();

// CHECK

router.get('/check-email', checkEmailController);

// AUTH

router.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

router.post('/login', loginUserController);
router.post('/logout', ctrlWrapper(logoutUserController));

// SESSION

router.get('/session', sessionController);
router.post('/refresh', refreshUserSessionController);

// DATA

router.get('/me', authMiddleware, meController);
router.delete('/delete', authMiddleware, ctrlWrapper(deleteAccountController));

// RESET PASSWORD

router.post(
  '/request-reset-email',
  validateBody(requestResetEmailSchema),
  ctrlWrapper(requestResetEmailController),
);

router.post(
  '/reset-password',
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController),
);

router.post(
  '/change-password',
  authMiddleware,
  validateBody(changePasswordSchema),
  changePasswordController,
);

// CHANGE E-MAIL

router.post(
  '/change-email/request',
  authMiddleware,
  validateBody(changeEmailRequestSchema),
  ctrlWrapper(changeEmailRequestController),
);

router.get(
  '/change-email/confirm',
  validateBody(changeEmailConfirmSchema),
  ctrlWrapper(changeEmailConfirmController),
);

export default router;
