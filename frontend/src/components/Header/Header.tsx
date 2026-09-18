import { Skeleton } from "@mui/material";

import { useWindowWidth } from "../../hook/useWindowWidth";
import { useAuthStore } from "../../store/authStore";
import AuthLayout from "./components/AuthLayout";
import AuthList from "./components/AuthList";
import Logo from "./components/Logo";
import MobileMenu from "./components/Mobile/MobileMenu";
import NavList from "./components/NavList";
import style from "./Style.module.css";

interface Props {
  dark?: boolean;
}

export default function Header({ dark }: Props) {
  const width = useWindowWidth();
  const { authorized, loading } = useAuthStore();

  return (
    <header className={style.header}>
      <div className={`${style.header_wrapper} ${dark ? style.dark : ""}`}>
        <Logo dark={dark} />
        {width > 1191 ? (
          <>
            <NavList dark={dark} />

            {loading ? (
              // ✔ Показуємо Skeleton поки authStore перевіряє токен
              <div className="auth_skeleton">
                <Skeleton width={127} height={50} />
                <Skeleton width={211} height={50} />
              </div>
            ) : authorized ? (
              // ✔ Авторизований
              <AuthLayout dark={dark} />
            ) : (
              // ✔ Не авторизований
              <AuthList dark={dark} />
            )}
          </>
        ) : (
          <MobileMenu dark={dark} />
        )}
      </div>
    </header>
  );
}
