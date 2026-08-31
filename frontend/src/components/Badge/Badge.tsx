import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../../config/api";
import axios from "axios";
import { useAuthStore } from "../../services/store/authStore";
import IsBuyPage from "./components/isBuy";

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
  const [code, setCode] = useState("");

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

  const activateBadge = async (
    badgeId: string,
    userInputCode: string,
  ): Promise<BadgeResponse> => {
    try {
      const res = await axios.post<BadgeResponse>(
        `${API_URL}/badges/activate`,
        {
          badgeId,
          activationCode: userInputCode,
        },
        { withCredentials: true },
      );

      return res.data;
    } catch (err) {
      console.error("Activation error:", err);

      return {
        status: "error",
        message: "Помилка активації.",
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

  // 4. Якщо авторизований і бейдж куплений, але не активований

  if (authorized && !isBuy && !isActive) {
    return <IsBuyPage />;
  }

  // 4. Якщо авторизований і бейдж куплений, але не активований
  if (authorized && isBuy && !isActive) {
    return (
      <div>
        <input
          type="text"
          placeholder="Введіть код активації"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button
          onClick={async () => {
            const res = await activateBadge(id!, code);

            if (res.status === "activated") {
              navigation(`/dziecko/stwórz?badgeId=${id}`);
            }
          }}
        >
          Активувати
        </button>
      </div>
    );
  }

  // 5. Інші стани
  return (
    <div>
      <h1>Badge ID: {id}</h1>
    </div>
  );
}
