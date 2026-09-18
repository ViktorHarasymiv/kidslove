import { Link } from "react-router-dom";
import { useAuthStore } from "../../../store/authStore";
import { Icons } from "../../../ui/Icons/icons";
import style from "./Style.module.css";

interface Props {
  dark?: boolean;
}

export default function AuthLayout({ dark }: Props) {
  const { user, getLogout } = useAuthStore();

  return (
    <div className={style.user_wrapper}>
      <button
        type="button"
        onClick={() => getLogout()}
        className={`button_link`}
      >
        Wyloguj się
      </button>
      <Link
        to="/profile"
        className={`${style.user_info} ${dark ? style.dark : ""}`}
      >
        <div className={style.user_avatar}>
          <Icons.user />
        </div>
        <span>{user?.name}</span>
      </Link>
    </div>
  );
}
