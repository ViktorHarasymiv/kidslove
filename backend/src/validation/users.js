import Joi from 'joi';

export const userUpdateValidator = Joi.object({
  // Basic profile
  name: Joi.string().max(20).allow(null, ''),
  // Auth
  email: Joi.string().email(),
  // Status
  isEmailVerified: Joi.boolean(),
  timezone: Joi.string().allow(null),
});
