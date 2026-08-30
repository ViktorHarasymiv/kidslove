import AuthDecor from "./AuthDecor";

import style from "./Style.module.css";

interface AuthLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className={style.auth_wrapper}>
      <AuthDecor />
      <>{children}</>
    </div>
  );
}
