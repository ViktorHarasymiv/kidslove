import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { API_URL } from "../../../config/api";
import type { BadgeResponse } from "../Badge";

import style from "./Style.module.css";

interface Props {
  id?: string;
}

export default function IsActivated({ id }: Props) {
  const [code, setCode] = useState("");
  const navigation = useNavigate();

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
  return (
    <section className="block_wrapper">
      <div className={style.wrapper}>
        <div className={style.content}>
          <div>
            <h1>Wprowadź kod aktywacyjny</h1>
            <h2 className="accent_text">
              znajdujący się w opakowaniu produktu.
            </h2>
          </div>
          <input
            type="text"
            placeholder="Wprowadź kod aktywacyjny"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="input input_special"
          />
          <button
            onClick={async () => {
              const res = await activateBadge(id!, code);

              if (res.status === "activated") {
                navigation(`/badge/${id}`);
              }
            }}
            className="button_link"
          >
            Aktywować
          </button>
        </div>
      </div>
    </section>
  );
}
