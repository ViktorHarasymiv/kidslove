export interface AccurateLocation {
  lat: number | null;
  lon: number | null;
  accuracy: number | null;
  city: string | null;
  district: string | null;
  street: string | null;
}

export interface IpBasedLocation {
  country: string | null;
  city: string | null;
  lat: number | null;
  lon: number | null;
}

export interface LocationData {
  accurate: AccurateLocation;
  ipBased: IpBasedLocation;
}

export interface DeviceInfo {
  os: string | null;
  browser: string | null;
  model: string | null;
}

export interface BadgeScanLog {
  _id: string;
  badgeId: string;
  ip: string | null;
  userAgent: string | null;
  location: LocationData;
  device: DeviceInfo;
  scannedAt: string; // ISO string
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
}

export interface BadgeLogsResponse {
  badgeId: string;
  page: number;
  limit: number;
  total: number;
  pages: number;
  logs: BadgeScanLog[];
}
