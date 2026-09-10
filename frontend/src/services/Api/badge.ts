import axios from "axios";
import type { BadgeResponse } from "../../components/Badge/Badge";
import { API_URL } from "../../config/api";
import getPreciseLocation from "../utils/getPreciseLoc";

export const getBadgeById = async (
  id: string | undefined,
): Promise<BadgeResponse> => {
  try {
    const res = await axios.get<BadgeResponse>(`${API_URL}/badges/${id}`, {
      withCredentials: true,
    });

    return res.data;
  } catch (err) {
    console.error("Error fetching badge:", err);

    return {
      message: "Помилка при отриманні даних бейджа.",
      isBuy: false,
      isActive: false,
    };
  }
};

let isScanning = false;

export const scanBadgeRequest = async (badgeId: string | undefined) => {
  if (isScanning) return; // 🔥 блокуємо повтори
  isScanning = true;

  try {
    const preciseLocation = await getPreciseLocation();

    return axios.post(
      `${API_URL}/push/scan/${badgeId}`,
      { preciseLocation },
      { withCredentials: true },
    );
  } finally {
    isScanning = false; // 🔥 розблоковуємо після завершення
  }
};
