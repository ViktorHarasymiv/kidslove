import path from 'node:path';

// TIME CALC

export const TWO_HOUR = 120 * 60 * 1000;
export const ONE_DAY = 24 * 60 * 60 * 1000;
export const ONE_HOUR = 60 * 60 * 1000;

// IMAGES PAYLOAD

export const TEMPLATES_DIR = path.join(process.cwd(), 'src', 'templates');
export const TEMP_UPLOAD_DIR = path.join(process.cwd(), 'src/temp');
export const UPLOAD_DIR = path.join(process.cwd(), 'src/uploads');
