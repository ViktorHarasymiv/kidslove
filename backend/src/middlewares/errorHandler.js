// src/middlewares/errorHandler.js

// Імпортуємо клас HttpError для обробки помилок HTTP з відповідними статус-кодами
import { HttpError } from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  console.log('GLOBAL ERROR:', err);

  if (err instanceof HttpError) {
    return res.status(err.status).json({
      status: err.status,
      message: err.message, // ✔ ПРАВИЛЬНО
    });
  }

  return res.status(500).json({
    status: 500,
    message: 'Something went wrong',
  });
};
