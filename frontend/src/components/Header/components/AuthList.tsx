import { Link } from "react-router-dom";
import style from "./Style.module.css";

interface Props {
  light?: boolean;
  dark?: boolean;
  mobile?: boolean;
}

export default function AuthList({ light, dark, mobile }: Props) {
  return (
    <div
      className={`${mobile ? style.mobile_auth_wrapper : ""} ${style.auth_wrapper}`}
    >
      <Link
        to={"/zaloguj-się"}
        className={`button_link ${light || dark ? style.login_light : style.login}`}
      >
        Zaloguj się
      </Link>
      <Link to={"/zarejestruj-się"} className={`button_link ${style.signup}`}>
        Zarejestruj się
      </Link>
    </div>
  );
}
