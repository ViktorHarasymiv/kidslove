import jwt from 'jsonwebtoken';
import { SessionsCollection } from '../db/models/session.js';

export const authMiddleware = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const rawAccessToken = decodeURIComponent(accessToken);

    const session = await SessionsCollection.findOne({
      accessToken: rawAccessToken,
    });

    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    req.user = { id: session.userId };
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
};
