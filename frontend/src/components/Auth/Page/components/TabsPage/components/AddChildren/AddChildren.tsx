import ChildrenForm from "./ChildrenForm";
import { useAuthStore } from "../../../../../../../services/store/authStore";
import axios from "axios";
import { API_URL } from "../../../../../../../config/api";

export default function AddChildren() {
  const { user } = useAuthStore();

  const handleAddChild = async (formData: FormData) => {
    try {
      const response = await axios.post(
        `${API_URL}/children/create`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      console.log("FormData sent:");
      for (const [key, value] of formData.entries()) {
        console.log(key, value);
      }

      alert("Дитину додано");
      return response.data;
    } catch (err) {
      console.error("Помилка при додаванні дитини:", err);

      console.log("FormData debug:");
      for (const [key, value] of formData.entries()) {
        console.log(key, value);
      }
    }
  };

  if (!user) return;

  if (!user.activeBadgeId) {
    return <p>Спочатку виберіть NFC бейдж</p>;
  }

  return (
    <ChildrenForm badgeId={user.activeBadgeId} onSubmit={handleAddChild} />
  );
}
