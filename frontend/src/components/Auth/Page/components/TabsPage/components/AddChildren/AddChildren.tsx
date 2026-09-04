import ChildrenForm from "./ChildrenForm";
import { useAuthStore } from "../../../../../../../services/store/authStore";
import axios from "axios";
import { API_URL } from "../../../../../../../config/api";
import type { ChildFormValues } from "../../../../../../../types/children";

export default function AddChildren() {
  const { user } = useAuthStore();

  const handleAddChild = async (values: ChildFormValues) => {
    try {
      await axios.post(`${API_URL}/children/create`, values, {
        withCredentials: true,
      });
      console.log(values);
      alert("Дитину додано");
    } catch (err) {
      console.log(values);
      console.error("Помилка при додаванні дитини:", err);
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
