import { useState } from "react";
import { MuiDynamicSelect } from "../../../../../ui/Select/MuiDynamicSelect";
import { useAuthStore } from "../../../../../services/store/authStore";

import style from "./Style.module.css";

export default function ChildrenTile() {
  const { user } = useAuthStore();
  const [badge, setBadge] = useState("");

  if (!user) return;
  return (
    <div>
      <div className={style.head_wrapper}>
        <h2>Moje dzieci</h2>
        {/* BADGE SELECT */}

        <MuiDynamicSelect
          label="Moje NFC"
          options={user.badges}
          onChange={setBadge}
          value={badge}
        />
      </div>
      <ul>
        <li>123</li>
      </ul>
    </div>
  );
}
