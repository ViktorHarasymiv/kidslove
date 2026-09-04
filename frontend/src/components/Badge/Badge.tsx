import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../../config/api";
import axios from "axios";
import { useAuthStore } from "../../services/store/authStore";
import IsBuyPage from "./components/isBuy";
import IsActivated from "./components/IsActivated";

export interface BadgeResponse {
  status?:
    | "notFound"
    | "notPurchased"
    | "notActivated"
    | "childMissing"
    | "ok"
    | "error"
    | "alreadyActive"
    | "invalidCode"
    | "activated";

  message?: string;

  isBuy?: boolean;
  isActive?: boolean;

  badgeId?: string;
}

export default function Badge() {
  const navigation = useNavigate();
  const { id } = useParams();

  const { authorized, loading } = useAuthStore();
  const [data, setData] = useState<BadgeResponse | null>(null);

  // HTTPS

  const getBadgeById = async (
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

  // 1. Завантажуємо бейдж
  useEffect(() => {
    getBadgeById(id).then(setData);
  }, [id]);

  // 2. Редірект логіки — тільки після loading === false
  useEffect(() => {
    if (loading) return; // чекаємо поки авторизація завантажиться
    if (!data) return; // чекаємо поки бейдж завантажиться

    const { isBuy, isActive } = data;

    // ❗ Редірект тільки після того, як authorized визначився
    if (!authorized && isBuy && !isActive) {
      navigation("/zaloguj-się");
    }
  }, [authorized, loading, data]);

  // 3. Поки все вантажиться — показуємо лоадер
  if (loading || !data) {
    return <div>Завантаження...</div>;
  }

  const { isBuy, isActive } = data;
  console.log(data);

  // 4. Якщо авторизований і бейдж куплений, але не активований

  if (!isBuy) {
    return <IsBuyPage />;
  }

  // 4. Якщо авторизований і бейдж куплений, але не активований
  if (!isActive) {
    if (!authorized) {
      navigation("/zaloguj-się");
      return null;
    }

    return <IsActivated id={id} />;
  }

  // 5. Інші стани
  return (
    <div>
      <h1>Badge ID: {id}</h1>
    </div>
  );
}
