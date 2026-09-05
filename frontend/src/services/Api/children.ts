import axios from "axios";
import { API_URL } from "../../config/api";

export const getChildrenByBadge = async (badgeId: string) => {
  const res = await axios.get(`${API_URL}/children/badge/${badgeId}`, {
    withCredentials: true,
  });

  return res.data.children; // масив
};

// CHILDREN PHOTO

export const uploadImageChildren = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  const { data } = await axios.post(`${API_URL}/children/upload`, formData);
  return data.url;
};
