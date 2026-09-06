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

  const { children, count, loading } = useChildrenStore();

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

  const setActiveChild = async (childId: string) => {
    await axios.patch(
      `${API_URL}/badges/set-active-child`,
      {
        badgeId: user.activeBadgeId,
        childId,
      },
      { withCredentials: true },
    );

    // Оновлюємо Zustand
    useChildrenStore.getState().setActiveChild(childId);
  };

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
        <div>
          <h2>
            Moje dzieci <span>{count}/2</span>
          </h2>
        </div>
        {/* BADGE SELECT */}

        <MuiDynamicSelect
          label="Moje NFC"
          options={user.badges}
          onChange={handleBadgeSelect}
          value={user.activeBadgeId || ""}
        />
      </div>
      <ul className={style.child_list}>
        {!loading &&
          children &&
          children.length > 0 &&
          children.map((item) => (
            <li
              key={item._id}
              className={style.child_item}
              onClick={() => setActiveChild(item._id)}
            >
              <div className={style.child_info_wrapper}>
                <img
                  src={item.avatarUrl || ""}
                  alt=""
                  className={style.child_avatar}
                />
                <div className={style.child_details}>
                  <h2>{item.name}</h2>
                  <div className={style.details_wrapper}>
                    <p>
                      <span>Wiek</span> <span>{item.age}</span>
                    </p>
                  </div>
                  <Link to={`/badge/${item.badgeId}`}>Przejdź do strony</Link>
                </div>
              </div>
            </li>
          ))}

        {!loading && children === null && (
          <div>
            <p>Brak informacji dla tego NFC</p>
          </div>
        )}
      </ul>
    </div>
  );
}
