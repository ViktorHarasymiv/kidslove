import { Schema, model } from 'mongoose';

const ChildSchema = new Schema(
  {
    parentId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
      index: true,
    },

    badgeId: {
      type: String,
      required: true, // дитина створюється ТІЛЬКИ після активації бейджа
      index: true,
    },

    name: {
      type: String,
      required: true,
    },

    age: {
      type: Number,
      required: true,
    },

    allergies: { type: [String], default: [] },

    medicalNotes: { type: [String], default: [] },

    emergencyPhone: {
      type: String,
      required: true,
    },

    avatarUrl: {
      type: String,
      default: null,
    },

    isLost: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: false },
);

export const ChildCollection = model('childrens', ChildSchema);
