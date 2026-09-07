import axios from "axios";
import type { BadgeResponse } from "../../components/Badge/Badge";
import { API_URL } from "../../config/api";

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
