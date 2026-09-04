import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { MuiDynamicSelect } from "../../../../../ui/Select/MuiDynamicSelect";
import { useAuthStore } from "../../../../../services/store/authStore";

import style from "./Style.module.css";
import { API_URL } from "../../../../../config/api";
import axios from "axios";
import { getChildrenByBadge } from "../../../../../services/Api/children";
import type { ChildFormValues } from "../../../../../types/children";

export default function ChildrenTile() {
  const { user } = useAuthStore();

  const [badge, setBadge] = useState("");
  const [myChildState, setMyChildState] = useState<ChildFormValues[] | null>(
    null,
  );

  console.log(user);

  useEffect(() => {
    const loadChildren = async () => {
      const activeBadgeId = user?.activeBadgeId;
      if (!activeBadgeId) return; // якщо немає — не робимо запит

      const myChildren = await getChildrenByBadge(activeBadgeId);

      setMyChildState(myChildren);
    };

    loadChildren();
  }, [user?.activeBadgeId]);

  const handleBadgeSelect = async (badgeId: string) => {
    try {
      // 1. Записуємо вибраний бейдж у БД
      await axios.post(
        `${API_URL}/badges/set-active-badge`,
        { badgeId },
        { withCredentials: true },
      );

      // 2. Оновлюємо локальний стейт
      setBadge(badgeId);

      // 3. Оновлюємо user у authStore
      const store = useAuthStore.getState();
      store.setActiveBadge(badgeId);

      // 4. Завантажуємо дітей по бейджу
      const myChildren = await getChildrenByBadge(badgeId);
      setMyChildState(myChildren);
    } catch (err) {
      setMyChildState(null);
      console.error("Помилка при встановленні активного бейджа:", err);
    }
  };

  if (!user) return;

  return (
    <div>
      <div className={style.head_wrapper}>
        <h2>Moje dzieci</h2>
        {/* BADGE SELECT */}

        <MuiDynamicSelect
          label="Moje NFC"
          options={user.badges}
          onChange={handleBadgeSelect}
          value={user.activeBadgeId || badge}
        />
      </div>
      <ul>
        {myChildState !== null
          ? myChildState.map((item, index) => {
              return (
                <li key={index}>
                  {item.name} <Link to={`/badge/${item.badgeId}`}>123</Link>
                </li>
              );
            })
          : "Loading..."}
      </ul>
    </div>
  );
}
