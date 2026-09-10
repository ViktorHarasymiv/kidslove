import { Schema, model } from 'mongoose';

const ScanLogSchema = new Schema(
  {
    badgeId: {
      type: String,
      required: true,
      index: true, // швидкий пошук по бейджу
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
      accurate: {
        lat: Number,
        lon: Number,
        accuracy: Number,

        city: String,
        district: String,
        street: String,
      },
      ipBased: {
        country: String,
        city: String,
        lat: Number,
        lon: Number,
      },
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
