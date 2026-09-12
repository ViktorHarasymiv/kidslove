import axios from "axios";
import type { BadgeLogsResponse } from "../../types/logsType";
import { API_URL } from "../../config/api";

export async function fetchBadgeLogs(
  badgeId: string,
  page: number = 1,
  limit: number = 20,
): Promise<BadgeLogsResponse> {
  const res = await axios.get<BadgeLogsResponse>(
    `${API_URL}/badges/logs/${badgeId}`,
    {
      params: { page, limit },
      withCredentials: true,
    },
  );

  return res.data;
}
