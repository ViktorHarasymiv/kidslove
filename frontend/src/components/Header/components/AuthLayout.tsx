import { Link } from "react-router-dom";
import { useAuthStore } from "../../../services/store/authStore";
import { Icons } from "../../../ui/Icons/icons";
import style from "./Style.module.css";

interface Props {
  dark?: boolean;
}

export default function AuthLayout({ dark }: Props) {
  const { user, getLogout } = useAuthStore();

  return (
    <div className={style.user_wrapper}>
      <button type="button" onClick={() => getLogout()}>
        Wyloguj się
      </button>
      <div className={style.user_avatar}>
        <Icons.user />
      </div>
      <Link
        to="/profile"
        className={`${style.user_info} ${dark ? style.dark : ""}`}
      >
        {user?.name}
      </Link>
    </div>
  );
}
