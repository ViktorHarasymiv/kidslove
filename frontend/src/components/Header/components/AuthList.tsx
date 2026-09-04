import { Link } from "react-router-dom";
import style from "./Style.module.css";
import { useAuthStore } from "../../../services/store/authStore";
import AuthLayout from "./AuthLayout";

interface Props {
  light?: boolean;
  dark?: boolean;
  mobile?: boolean;
}

export default function AuthList({ light, dark, mobile }: Props) {
  const { authorized } = useAuthStore();
  return (
    <div
      className={`${mobile ? style.mobile_auth_wrapper : ""} ${style.auth_wrapper}`}
    >
      {authorized ? (
        <AuthLayout dark />
      ) : (
        <>
          <Link
            to={"/zaloguj-się"}
            className={`button_link ${light || dark ? style.login_light : style.login}`}
          >
            Zaloguj się
          </Link>
          <Link
            to={"/zarejestruj-się"}
            className={`button_link ${style.signup}`}
          >
            Zarejestruj się
          </Link>
        </>
      )}
    </div>
  );
}
