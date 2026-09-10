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

export const scanBadgeRequest = async (badgeId: string | undefined) => {
  try {
    // 1. Тиха точна геолокація (може повернути null)
    const preciseLocation = await getPreciseLocation();

    console.log(preciseLocation);

    // 2. Надсилаємо POST замість GET, бо передаємо body
    const res = await axios.post(
      `${API_URL}/push/scan/${badgeId}`,
      { preciseLocation },
      { withCredentials: true },
    );

    return res;
  } catch (err) {
    console.log("scanBadgeRequest error:", err);
    return null;
  }
};
