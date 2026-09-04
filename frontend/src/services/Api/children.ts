import axios from "axios";
import { API_URL } from "../../config/api";

export const getChildrenByBadge = async (badgeId: string) => {
  const res = await axios.get(`${API_URL}/children/badge/${badgeId}`, {
    withCredentials: true,
  });

  return res.data.children; // масив
};
