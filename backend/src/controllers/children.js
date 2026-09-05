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

    const photo = req.file;
    let photoUrl;

    if (photo) {
      if (getEnvVar('ENABLE_CLOUDINARY') === 'true') {
        photoUrl = await saveFileToCloudinary(photo);
      } else {
        photoUrl = await saveFileToUploadDir(photo);
      }
    }

    const result = await createChildService(parentId, {
      ...data,
      avatarUrl: photoUrl,
    });

    res.status(201).json({
      message: 'Child created',
      result,
    });
  } catch (error) {
    console.error('Error creating child:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET BY ID

export const getChildByBadgeController = async (req, res) => {
  try {
    const parentId = req.user.id;
    const { badgeId } = req.params;

    const children = await getChildByBadgeService(parentId, badgeId);

    if (!children || children.length === 0) {
      return res.status(404).json({
        children: null,
        message: 'Children not found for this badge',
      });
    }

    res.json({
      message: 'Children found',
      children,
    });
  } catch (error) {
    console.error('Error fetching child by badge:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
