import { model, Schema } from 'mongoose';

const usersSchema = new Schema(
  {
    // Basic profile
    name: { type: String, required: false },
    photoUrl: { type: String, required: false },

    // Contact
    phone: { type: String, required: false },
    country: { type: String, required: false },
    city: { type: String, required: false },

    // Auth
    email: { type: String, required: true, unique: true },
    pendingEmail: { type: String, required: false, unique: true },
    password: { type: String, required: false },

    // Status
    isEmailVerified: { type: Boolean, default: false },

    // Badges
    badges: {
      type: [String], // або [ObjectId] якщо хочеш референси
      default: [],
    },

    // ============================================================
  },
  { timestamps: true, versionKey: false },
);

export const UsersCollection = model('users', usersSchema);
