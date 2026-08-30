import { SessionsCollection } from '../db/models/session.js';
import { UsersCollection } from '../db/models/user.js';
import {
  // changeEmailConfirmService,
  // changeEmailRequestService,
  // changePasswordService,
  checkEmailService,
  deleteAccountService,
  loginService,
  logoutUser,
  refreshUsersSession,
  registerUser,
  // requestResetToken,
  // resetPassword,
} from '../services/auth.js';
import { setupSession } from '../utils/setupSession.js';
import createHttpError from 'http-errors';

// REGISTATION

export const registerUserController = async (req, res) => {
  const user = await registerUser(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: user,
  });
};

// LOGIN

export const loginUserController = async (req, res, next) => {
  try {
    const session = await loginService(req.body);

    setupSession(res, session);

    res.json({
      status: 200,
      message: 'Successfully logged',
      data: {
        accessToken: session.accessToken,
        refreshToken: session.refreshToken,
        sessionId: session.userId,
      },
    });
  } catch (error) {
    next(error);
  }
};

// DELETE

export const deleteAccountController = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const result = await deleteAccountService(userId);

    res.json({
      status: 200,
      message: 'Account successfully deleted',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// LOG OUT

export const logoutUserController = async (req, res) => {
  if (req.cookies.sessionId) {
    await logoutUser(req.cookies.sessionId);
  }

  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  res.clearCookie('sessionId');

  res.status(204).send();
};

// FETCH ME

export const meController = async (req, res) => {
  const user = await UsersCollection.findById(req.user.id).select('-password');

  return res.json(user);
};

// CHECK EMAIL

export const checkEmailController = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({
        exists: false,
        message: 'Email is required',
      });
    }

    const exists = await checkEmailService(email);

    return res.status(200).json({ exists });
  } catch (error) {
    return res.status(500).json({
      exists: false,
      message: 'Server error',
    });
  }
};

// SESSION

export const sessionController = async (req, res) => {
  try {
    const accessToken = req.cookies.accessToken;
    console.log(accessToken);

    // Немає токена → просто valid: false
    if (!accessToken) {
      return res.json({ valid: false });
    }

    const session = await SessionsCollection.findOne({ accessToken });

    // Немає сесії → valid: false
    if (!session) {
      return res.json({ valid: false });
    }

    // Токен протух → valid: false
    if (session.accessTokenValidUntil < new Date()) {
      return res.json({ valid: false });
    }

    // Все ок
    return res.json({ valid: true });
  } catch (err) {
    return res.json({ valid: false });
  }
};

// REFRESH SESSION

export const refreshUserSessionController = async (req, res) => {
  console.log(req.cookies);

  const rawToken = decodeURIComponent(req.cookies.refreshToken || '');

  if (!rawToken) {
    throw createHttpError(401, 'Refresh token missing');
  }

  const session = await refreshUsersSession({
    refreshToken: rawToken,
  });

  // ❗ Ставимо нові cookie
  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: {
      accessToken: session.accessToken,
      refreshToken: session.refreshToken,
      sessionId: session._id,
    },
  });
};

// RESET PASSWORD

export const requestResetEmailController = async (req, res) => {
  await requestResetToken(req.body.email);
  res.json({
    message: 'Reset password email was successfully sent!',
    status: 200,
    data: {},
  });
};

export const resetPasswordController = async (req, res) => {
  await resetPassword(req.body);
  res.json({
    message: 'Password was successfully reset!',
    status: 200,
    data: {},
  });
};

export const changePasswordController = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const userId = req.user.id;

    const result = await changePasswordService({
      userId,
      oldPassword,
      newPassword,
    });

    res.json({
      status: 200,
      message: 'Password updated successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// CHANGE E-MAIL

export const changeEmailRequestController = async (req, res, next) => {
  try {
    const { newEmail } = req.body;
    const userId = req.user.id;

    const result = await changeEmailRequestService({ userId, newEmail });

    res.json({
      status: 200,
      message: 'Activation link sent',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const changeEmailConfirmController = async (req, res, next) => {
  try {
    const { token } = req.query;

    const result = await changeEmailConfirmService({ token });

    res.json({
      status: 200,
      message: 'Email updated successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
