import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthStore } from "../../services/store/authStore";
import IsBuyPage from "./components/isBuy";
import IsActivated from "./components/IsActivated";
import type { ChildState } from "../../types/children";
import { useBadgeStore } from "../../services/store/useBadgeStore";
import { getBadgeById } from "../../services/Api/badge";

export interface BadgeResponse {
  status?:
    | "notFound"
    | "notPurchased"
    | "notActivated"
    | "noChildren"
    | "selectChild"
    | "ok"
    | "error"
    | "alreadyActive"
    | "invalidCode"
    | "activated";

  message?: string;

  isBuy: boolean;
  isActive: boolean;

  badgeId?: string;

  // нове поле — активна дитина
  activeChild?: ChildState;

  // нове поле — список дітей
  children?: ChildState[];
}

export default function Badge() {
  const { activeChild, badgeData, setBadgeData } = useBadgeStore();

  console.log(badgeData);

  const navigation = useNavigate();
  const { id } = useParams();
  const { authorized, loading } = useAuthStore();

  // 1. Завантажуємо бейдж
  useEffect(() => {
    getBadgeById(id).then((res) => {
      setBadgeData(res); // ← глобально зберігаємо
    });
  }, [id]);

  // 2. Редірект логіки — тільки після loading === false
  useEffect(() => {
    if (loading) return; // чекаємо поки авторизація завантажиться
    if (!badgeData) return; // чекаємо поки бейдж завантажиться

    const { isBuy, isActive } = badgeData;

    // ❗ Редірект тільки після того, як authorized визначився
    if (!authorized && isBuy && !isActive) {
      navigation("/zaloguj-się");
    }
  }, [authorized, loading, activeChild]);

  // 3. Поки все вантажиться — показуємо лоадер
  if (loading || !badgeData) {
    return <div>Завантаження...</div>;
  }

  const { isBuy, isActive } = badgeData;

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
      <h2>{activeChild?.name}</h2>
    </div>
  );
}
