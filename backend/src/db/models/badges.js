import { Schema, model } from 'mongoose';

const BadgeSchema = new Schema(
  {
    badgeId: {
      type: String,
      required: true,
      unique: true, // стабільний ID для NFC/QR
      index: true,
    },

    activationCode: {
      type: String,
      required: false,
      default: null,
    },

    isBuy: {
      type: Boolean,
      default: false, // куплений чи ні
      index: true,
    },

    active: {
      type: Boolean,
      default: false, // активований чи ні
    },

    ownerId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      default: null, // хто активував
    },

    orderId: {
      type: String,
      default: null, // до якого замовлення прив’язаний
    },

    childId: { type: String, default: null },

    // опційно: дата активації
    activatedAt: {
      type: Date,
      default: null,
    },

    // опційно: тип бейджа (браслет, картка, кулон)
    type: {
      type: String,
      enum: ['bracelet', 'card', 'pendant'],
      default: 'bracelet',
    },

    // опційно: статус втрати
    isLost: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: false },
);

export const BadgeCollection = model('badges', BadgeSchema);
