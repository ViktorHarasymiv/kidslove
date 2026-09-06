import { BadgeCollection } from '../db/models/badges.js';
import { ChildCollection } from '../db/models/children.js';
import {
  createChildService,
  getChildByBadgeService,
} from '../services/children.js';
import { getEnvVar } from '../utils/getEnvVar.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';

// CREATE

export const createChildController = async (req, res) => {
  try {
    const parentId = req.user.id;
    const data = req.body;

    const { badgeId } = data;

    if (!badgeId) {
      return res.json({
        status: 'badgeMissing',
        message: 'Badge ID is required',
      });
    }

    // 1. Перевірка кількості дітей
    const existingChildren = await ChildCollection.find({ badgeId });

    if (existingChildren.length >= 2) {
      return res.status(400).json({
        status: 'limitReached',
        message: 'You already have 2 children assigned to this badge',
        count: existingChildren.length,
      });
    }

    // 2. Обробка фото
    const photo = req.file;
    let photoUrl;

    if (photo) {
      if (getEnvVar('ENABLE_CLOUDINARY') === 'true') {
        photoUrl = await saveFileToCloudinary(photo);
      } else {
        photoUrl = await saveFileToUploadDir(photo);
      }
    }

    // 3. Створення дитини
    const result = await createChildService(parentId, {
      ...data,
      avatarUrl: photoUrl,
    });

    res.status(201).json({
      status: 'created',
      message: 'Child created',
      result,
    });
  } catch (error) {
    console.error('Error creating child:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error',
    });
  }
};

// GET BY ID

export const getChildByBadgeController = async (req, res) => {
  try {
    const parentId = req.user.id;
    const { badgeId } = req.params;

    const data = await getChildByBadgeService(parentId, badgeId);

    // Підрахунок дітей
    const count = data ? data.length : 0;

    if (!data || data.length === 0) {
      return res.json({
        children: null,
        count: count,
        message: 'Children not found for this badge',
      });
    }

    res.json({
      data,
      count: count,
      message: 'Children found',
    });
  } catch (error) {
    console.error('Error fetching child by badge:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
