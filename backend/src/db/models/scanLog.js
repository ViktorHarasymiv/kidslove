import { Schema, model } from 'mongoose';

const ScanLogSchema = new Schema(
  {
    badgeId: {
      type: String,
      required: true,
      index: true, // швидкий пошук по бейджу
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: false, // якщо треба логувати хто сканував (опціонально)
    },

    ip: {
      type: String,
      required: false,
    },

    userAgent: {
      type: String,
      required: false,
    },

    location: {
      // опціонально — якщо будеш робити GeoIP
      country: { type: String, default: null },
      city: { type: String, default: null },
      lat: { type: Number, default: null },
      lon: { type: Number, default: null },
    },

    device: {
      // parsed userAgent (опціонально)
      os: { type: String, default: null },
      browser: { type: String, default: null },
      model: { type: String, default: null },
    },

    scannedAt: {
      type: Date,
      default: Date.now,
      index: true, // для історії сканувань
    },
  },
  { timestamps: true, versionKey: false },
);

export const ScanLogCollection = model('scan_logs', ScanLogSchema);
