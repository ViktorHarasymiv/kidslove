import { Link } from "react-router-dom";
import { useEffect } from "react";
import { MuiDynamicSelect } from "../../../../../ui/Select/MuiDynamicSelect";
import { useAuthStore } from "../../../../../services/store/authStore";

import style from "./Style.module.css";
import { API_URL } from "../../../../../config/api";
import axios from "axios";
import { useChildrenStore } from "../../../../../services/store/childrenStore";
import CustomRadio from "../../../../../ui/CustomRadio/CustomRadio";
import { useBadgeStore } from "../../../../../services/store/useBadgeStore";
import { getBadgeById } from "../../../../../services/Api/badge";

export default function ChildrenTile() {
  const { user } = useAuthStore();
  const { setBadgeData, setActiveChildId, activeChildId } = useBadgeStore();

  const { children, count, loading } = useChildrenStore();

  const loadChildren = useChildrenStore((s) => s.loadChildren);

  useEffect(() => {
    const loadChildrenEffect = async () => {
      const activeBadgeId = user?.activeBadgeId;
      if (!activeBadgeId) return; // якщо немає — не робимо запит

      await loadChildren(activeBadgeId);
      await getBadgeById(activeBadgeId).then((res) => {
        setBadgeData(res);
      });
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
    useChildrenStore.getState().setActiveChild(childId); // Завантажуємо обрану дитину

    setActiveChildId(childId); // Оновлюєм ід обраної дитини
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
      await getBadgeById(badgeId).then((res) => {
        setBadgeData(res);
      });
    } catch (err) {
      console.error("Помилка при встановленні активного бейджа:", err);
    }
  };

  let checkCurrentChild;

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
      {/* CHILDREN LIST */}
      <ul className={style.child_list}>
        {!loading &&
          children &&
          children.length > 0 &&
          children.map((item) => {
            checkCurrentChild = activeChildId === item._id;

            return (
              <li key={item._id} className={style.child_item}>
                <div className={style.child_info_wrapper}>
                  <img
                    src={item.avatarUrl || ""}
                    alt="Children avatar"
                    className={style.child_avatar}
                  />
                  <div className={style.child_details}>
                    <h2>{item.name}</h2>
                    <div className={style.details_wrapper}>
                      <p>
                        <span>Wiek</span> <span>{item.age}</span>
                      </p>
                    </div>

                    <div className={style.child_details}>
                      <div className={style.details_wrapper}>
                        <CustomRadio
                          onChange={() => setActiveChild(item._id)}
                          checked={checkCurrentChild}
                        />
                        <div className={style.link_wrapper}>
                          <p>Wyświetl na stronie</p>
                          {checkCurrentChild && (
                            <Link to={`/badge/${item.badgeId}`}>
                              Przejdź do strony
                            </Link>
                          )}
                        </div>
                      </div>
                      <div></div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}

        {!loading && children === null && (
          <div>
            <p>Brak informacji dla tego NFC</p>
          </div>
        )}
      </ul>
    </div>
  );
}
