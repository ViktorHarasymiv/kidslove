import {
  createChildService,
  getChildByBadgeService,
} from '../services/children.js';

// CREATE

export const createChildController = async (req, res) => {
  try {
    const parentId = req.user.id; // якщо ти використовуєш auth middleware
    const data = req.body;

    const child = await createChildService(parentId, data);

    res.status(201).json({
      message: 'Child created',
      child,
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
