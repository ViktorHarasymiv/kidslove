import { BadgeCollection } from '../db/models/badges.js';
import { ChildCollection } from '../db/models/children.js';
import { UsersCollection } from '../db/models/user.js';
import { setActiveBadge } from '../services/badge.js';
import { handleBadgeScan } from '../utils/handleBadgeScan.js';

// GET BY ACTIVE CHILD

export const getBadgeInfo = async (req, res) => {
  try {
    const { badgeId } = req.params;

    // 1. Знайти бейдж
    const badge = await BadgeCollection.findOne({ badgeId });

    if (!badge) {
      return res.status(404).json({
        status: 'notFound',
        message: 'Бейдж не знайдено.',
      });
    }

    // 2. Перевірити покупку
    if (!badge.isBuy) {
      return res.json({
        status: 'notPurchased',
        isBuy: badge.isBuy,
        isActive: badge.active,
        badgeId,
        message: 'Цей бейдж ще не куплений.',
      });
    }

    // 3. Перевірити активацію
    if (!badge.active) {
      return res.json({
        status: 'notActivated',
        isBuy: badge.isBuy,
        isActive: badge.active,
        badgeId,
        message: 'Бейдж куплений, але ще не активований.',
      });
    }

    // 4. Отримати всіх дітей цього бейджа
    const children = await ChildCollection.find({ badgeId });

    if (!children.length) {
      return res.json({
        status: 'noChildren',
        isBuy: badge.isBuy,
        isActive: badge.active,
        badgeId,
        children: [],
        message: 'Створіть дитину для цього бейджа.',
      });
    }

    // 5. Якщо активна дитина встановлена
    if (badge.activeChildId) {
      const activeChild = children.find(
        (c) => c._id.toString() === badge.activeChildId.toString(),
      );

      if (activeChild) {
        // Логування + пуш
        handleBadgeScan({ badge, req });
        //
        return res.json({
          status: 'ok',
          isBuy: badge.isBuy,
          isActive: badge.active,
          badgeId,
          activeChild,
          children,
          message: 'Активна дитина знайдена.',
        });
      }
    }

    // 6. Якщо активної дитини немає → показати список
    return res.json({
      status: 'selectChild',
      isBuy: badge.isBuy,
      isActive: badge.active,
      badgeId,
      children,
      message: 'Виберіть активну дитину.',
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: 'error',
      message: 'Помилка сервера.',
    });
  }
};

// GET ACTIVE

export const activateBadge = async (req, res) => {
  try {
    const { badgeId, activationCode } = req.body;
    const userId = req.user.id;

    // 1. Знайти бейдж
    const badge = await BadgeCollection.findOne({ badgeId });

    if (!badge) {
      return res.status(404).json({
        status: 'notFound',
        message: 'Бейдж не знайдено.',
      });
    }

    // 2. Перевірити чи куплений
    if (!badge.isBuy) {
      return res.status(400).json({
        status: 'notPurchased',
        message: 'Бейдж не куплений.',
      });
    }

    // 3. Перевірити чи вже активований
    if (badge.active) {
      return res.status(400).json({
        status: 'alreadyActive',
        message: 'Бейдж вже активований.',
      });
    }

    // 4. Перевірити activationCode
    if (!activationCode || badge.activationCode !== activationCode) {
      return res.status(400).json({
        status: 'invalidCode',
        message: 'Невірний код активації.',
      });
    }

    // 5. Прив’язати бейдж до юзера
    badge.ownerId = userId;
    badge.active = true;

    // 🔥 ВАЖЛИВО: видаляємо activationCode після активації
    badge.activationCode = null;

    await badge.save();

    // 6. Додаємо badgeId в масив badges юзера
    await UsersCollection.updateOne(
      { _id: userId },
      { $addToSet: { badges: badgeId } },
    );

    return res.json({
      status: 'activated',
      message: 'Бейдж успішно активовано.',
      badgeId,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: 'error',
      message: 'Помилка сервера.',
    });
  }
};

// SET ACTIVE BADGE

export async function setActiveBadgeController(req, res) {
  try {
    const { badgeId } = req.body;

    if (!badgeId) {
      return res.status(400).json({ message: 'badgeId is required' });
    }

    const updatedUser = await setActiveBadge(req, badgeId);

    return res.json({
      status: 'success',
      user: updatedUser,
    });
  } catch (err) {
    console.error('Error setting active badge:', err);
    return res.status(500).json({ message: 'Server error' });
  }
}

// SET ACTIVE CHILD

export const setActiveChild = async (req, res) => {
  try {
    const { badgeId, childId } = req.body;
    const userId = req.user.id;

    // 1. Знайти бейдж
    const badge = await BadgeCollection.findOne({ badgeId });

    if (!badge) {
      return res.status(404).json({
        status: 'notFound',
        message: 'Бейдж не знайдено',
      });
    }

    // 2. Перевірити власника
    if (badge.ownerId.toString() !== userId.toString()) {
      return res.status(403).json({
        status: 'forbidden',
        message: 'Це не ваш бейдж',
      });
    }

    // 3. Перевірити, що дитина належить цьому бейджу
    const child = await ChildCollection.findOne({
      _id: childId,
      badgeId: badgeId,
    });

    if (!child) {
      return res.status(404).json({
        status: 'childNotFound',
        message: 'Дитину не знайдено або вона не належить цьому бейджу',
      });
    }

    // 4. Записати активну дитину
    badge.activeChildId = childId;
    await badge.save();

    return res.json({
      status: 'ok',
      activeChildId: childId,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: 'error',
      message: 'Помилка сервера',
    });
  }
};
