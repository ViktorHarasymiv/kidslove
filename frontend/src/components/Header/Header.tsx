import { useWindowWidth } from "../../hook/useWindowWidth";
import { useAuthStore } from "../../services/store/authStore";
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
  const { authorized } = useAuthStore();

  return (
    <header className={style.header}>
      <div className={`${style.header_wrapper} ${dark ? style.dark : ""}`}>
        <Logo dark={dark} />
        {width > 1191 ? (
          <>
            <NavList dark={dark} />
            {authorized ? <AuthLayout dark={dark} /> : <AuthList dark={dark} />}
          </>
        ) : (
          <MobileMenu dark={dark} />
        )}
      </div>
    </header>
  );
}
