export const setupSession = (res, session) => {
  // 2 години для accessToken
  res.cookie('accessToken', session.accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    path: '/',
    maxAge: 1000 * 60 * 60 * 2,
  });

  // Обчислюємо час життя refresh токена
  let refreshMs = session.refreshTokenValidUntil - Date.now();

  // Якщо refreshMs негативний або занадто малий — ставимо fallback
  if (refreshMs < 1000 * 60 * 60) {
    refreshMs = 1000 * 60 * 60 * 24 * 7; // 7 днів
  }

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    path: '/',
    maxAge: refreshMs,
  });

  // Узгоджуємо sessionId — ставимо саме session.sessionId
  res.cookie('sessionId', String(session.sessionId || session._id), {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    path: '/',
    maxAge: refreshMs,
  });
};
