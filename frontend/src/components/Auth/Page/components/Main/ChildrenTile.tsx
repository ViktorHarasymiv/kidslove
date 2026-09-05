import { Link } from "react-router-dom";
import { useEffect } from "react";
import { MuiDynamicSelect } from "../../../../../ui/Select/MuiDynamicSelect";
import { useAuthStore } from "../../../../../services/store/authStore";

import style from "./Style.module.css";
import { API_URL } from "../../../../../config/api";
import axios from "axios";
import { useChildrenStore } from "../../../../../services/store/childrenStore";

export default function ChildrenTile() {
  const { user } = useAuthStore();

  const children = useChildrenStore((s) => s.children);
  const loadChildren = useChildrenStore((s) => s.loadChildren);

  useEffect(() => {
    const loadChildrenEffect = async () => {
      const activeBadgeId = user?.activeBadgeId;
      if (!activeBadgeId) return; // якщо немає — не робимо запит

      await loadChildren(activeBadgeId);
    };

    loadChildrenEffect();
  }, []);

  if (!user) return;

  const handleBadgeSelect = async (badgeId: string) => {
    try {
      await axios.post(
        `${API_URL}/badges/set-active-badge`,
        { badgeId },
        { withCredentials: true },
      );

      const store = useAuthStore.getState();
      store.setActiveBadge(badgeId);

      await loadChildren(badgeId);
    } catch (err) {
      console.error("Помилка при встановленні активного бейджа:", err);
    }
  };

  return (
    <div className={style.child_wrapper}>
      <div className={style.head_wrapper}>
        <h2>Moje dzieci</h2>
        {/* BADGE SELECT */}

        <MuiDynamicSelect
          label="Moje NFC"
          options={user.badges}
          onChange={handleBadgeSelect}
          value={user.activeBadgeId || ""}
        />
      </div>
      <ul>
        {children
          ? children.map((item) => (
              <li key={item._id}>
                {item.name} <Link to={`/badge/${item.badgeId}`}>123</Link>
              </li>
            ))
          : "Loading..."}
      </ul>
    </div>
  );
}
