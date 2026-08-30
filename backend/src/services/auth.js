// src/services/auth.js

// import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';

// import handlebars from 'handlebars';
// import path from 'node:path';
// import fs from 'node:fs/promises';

import { UsersCollection } from '../db/models/user.js';
import { SessionsCollection } from '../db/models/session.js';

import { ONE_DAY } from '../constants/index.js';

// import { SMTP } from '../constants/index.js';
// import { getEnvVar } from '../utils/getEnvVar.js';
// import { sendEmail } from '../utils/sendMail.js';

import { createSession } from '../utils/createSession.js';

// REGISTRATION

export const registerUser = async (payload) => {
  const user = await UsersCollection.findOne({ email: payload.email });
  if (user) throw createHttpError(409, 'Email in use');

  const encryptedPassword = await bcrypt.hash(payload.password, 10);

  return await UsersCollection.create({
    ...payload,
    password: encryptedPassword,
  });
};

// LOGIN

export const loginService = async (payload) => {
  const { rememberMe } = payload;

  const user = await UsersCollection.findOne({ email: payload.email });

  if (!user) {
    throw createHttpError(401, 'User not found');
  }

  const isEqual = bcrypt.compare(payload.password, user.password);

  if (!isEqual) {
    throw createHttpError(401, 'Invalid Email or Password');
  }

  // Видаляємо стару сесію користувача
  await SessionsCollection.deleteOne({ userId: user._id });

  // Створюємо базову сесію (2 години + 1 день)
  const baseSession = createSession();

  // Якщо rememberMe → збільшуємо refreshTokenValidUntil
  if (rememberMe) {
    baseSession.refreshTokenValidUntil = Date.now() + ONE_DAY * 30; // 30 днів
  }

  // Створюємо сесію в базі
  return await SessionsCollection.create({
    userId: user._id,
    accessToken: baseSession.accessToken,
    refreshToken: baseSession.refreshToken,
    accessTokenValidUntil: baseSession.accessTokenValidUntil,
    refreshTokenValidUntil: baseSession.refreshTokenValidUntil,
  });
};

// DELETE

export const deleteAccountService = async (userId) => {
  const user = await UsersCollection.findById(userId);

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  // Видаляємо всі сесії
  await SessionsCollection.deleteMany({ userId });

  // Видаляємо акаунт
  await UsersCollection.findByIdAndDelete(userId);

  return { success: true };
};

// LOG OUT

export const logoutUser = async (sessionId) => {
  await SessionsCollection.deleteOne({ _id: sessionId });
};

// CHECK EMAIL

export const checkEmailService = async (email) => {
  const user = await UsersCollection.findOne({ email });
  return Boolean(user);
};

// REFRESH SESSION

export const refreshUsersSession = async ({ refreshToken }) => {
  const session = await SessionsCollection.findOne({ refreshToken });
  console.log(session);

  if (!session) {
    throw createHttpError(401, 'Refresh token not found');
  }

  const isExpired = Date.now() > session.refreshTokenValidUntil;

  if (isExpired) {
    await SessionsCollection.deleteOne({ _id: session._id });
    throw createHttpError(401, 'Refresh token expired');
  }

  // Створюємо нову сесію
  const newSessionData = createSession();

  // Видаляємо стару
  await SessionsCollection.deleteOne({ _id: session._id });

  // Створюємо нову
  const newSession = await SessionsCollection.create({
    userId: session.userId,
    ...newSessionData,
  });

  return newSession;
};

// RESET PASSWORD

// export const requestResetToken = async (email) => {
//   const user = await UsersCollection.findOne({ email });
//   if (!user) {
//     throw createHttpError(404, 'User not found');
//   }
//   const resetToken = jwt.sign(
//     {
//       sub: user._id,
//       email,
//     },
//     getEnvVar('JWT_SECRET'),
//     {
//       expiresIn: '15m',
//     },
//   );

//   const resetPasswordTemplatePath = path.join(
//     TEMPLATES_DIR,
//     'reset-password-email.html',
//   );

//   const templateSource = (
//     await fs.readFile(resetPasswordTemplatePath)
//   ).toString();

//   const template = handlebars.compile(templateSource);
//   const html = template({
//     name: `${user.firstName} ${user.lastName}`,
//     link: `${getEnvVar('APP_DOMAIN')}/reset-password/new-pass?token=${resetToken}`,
//   });

//   await sendEmail({
//     from: getEnvVar(SMTP.SMTP_FROM),
//     to: email,
//     subject: 'Reset your password',
//     html,
//   });
// };

// export const resetPassword = async (payload) => {
//   let entries;

//   try {
//     entries = jwt.verify(payload.token, getEnvVar('JWT_SECRET'));
//   } catch (err) {
//     if (err instanceof Error) throw createHttpError(401, err.message);
//     throw err;
//   }

//   const user = await UsersCollection.findOne({
//     email: entries.email,
//     _id: entries.sub,
//   });

//   if (!user) {
//     throw createHttpError(404, 'User not found');
//   }

//   const encryptedPassword = await bcrypt.hash(payload.password, 10);

//   await UsersCollection.updateOne(
//     { _id: user._id },
//     { password: encryptedPassword },
//   );
// };

// export const changePasswordService = async ({
//   userId,
//   oldPassword,
//   newPassword,
// }) => {
//   const user = await UsersCollection.findOne({ _id: userId });

//   if (!user) {
//     throw createHttpError(404, 'User not found');
//   }

//   const isMatch = await bcrypt.compare(oldPassword, user.password);

//   if (!isMatch) {
//     throw createHttpError(401, 'Incorrect current password');
//   }

//   const encryptedPassword = await bcrypt.hash(newPassword, 10);

//   await UsersCollection.updateOne(
//     { _id: user._id },
//     { password: encryptedPassword },
//   );

//   return { updated: true };
// };

// CHANGE E-MAIL

// export const changeEmailRequestService = async ({ userId, newEmail }) => {
//   const user = await UsersCollection.findOne({ _id: userId });

//   if (!user) {
//     throw createHttpError(404, 'User not found');
//   }

//   // Перевірка чи email не зайнятий
//   const exists = await UsersCollection.findOne({ email: newEmail });
//   if (exists) {
//     throw createHttpError(409, 'Email already in use');
//   }

//   // Створюємо токен
//   const token = jwt.sign({ userId, newEmail }, process.env.JWT_SECRET, {
//     expiresIn: '30m',
//   });

//   await UsersCollection.updateOne({ _id: userId }, { pendingEmail: newEmail });

//   // Надсилаємо лист
//   await sendEmail({
//     from: getEnvVar(SMTP.SMTP_FROM),
//     to: newEmail,
//     subject: 'Potwierdź zmianę adresu e-mail',
//     html: `
//       <p>Kliknij w link, aby potwierdzić zmianę adresu e-mail:</p>
//       <a href="${process.env.APP_DOMAIN}/change-email/confirm?token=${token}">
//         Potwierdź zmianę
//       </a>
//     `,
//   });

//   return { sent: true };
// };

// export const changeEmailConfirmService = async ({ token }) => {
//   const { userId, newEmail } = jwt.verify(token, process.env.JWT_SECRET);

//   const user = await UsersCollection.findOne({ _id: userId });

//   if (!user) {
//     throw createHttpError(404, 'User not found');
//   }

//   if (user.pendingEmail !== newEmail) {
//     throw createHttpError(400, 'Invalid email change request');
//   }

//   await UsersCollection.updateOne(
//     { _id: userId },
//     { email: newEmail, pendingEmail: null },
//   );

//   return { updated: true };
// };
