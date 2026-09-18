import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import type { ReactNode } from "react";
import Loader from "../../ui/Loader/Loader";

interface AuthGuardProps {
  children: ReactNode;
}
export const AuthGuard = ({ children }: AuthGuardProps) => {
  const authorized = useAuthStore((s) => s.authorized);
  const loading = useAuthStore((s) => s.loading);

  if (loading) return <Loader mode="fullscreen" />;

  if (!authorized) return <Navigate to="/zaloguj-się" replace />;

  return children;
};
