import Joi from 'joi';

export const childSchemaJoi = Joi.object({
  name: Joi.string().min(2).required(),
  age: Joi.number().min(1).required(),
  emergencyPhone: Joi.string().min(5).required(),

  allergies: Joi.array().items(Joi.string()).default([]),
  medicalNotes: Joi.array().items(Joi.string()).default([]),

  avatarUrl: Joi.string().allow(null).optional(),

  badgeId: Joi.string().required(),
});
