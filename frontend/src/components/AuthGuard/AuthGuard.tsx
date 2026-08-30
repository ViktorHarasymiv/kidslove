import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../services/store/authStore";
import type { ReactNode } from "react";

interface AuthGuardProps {
  children: ReactNode;
}
export const AuthGuard = ({ children }: AuthGuardProps) => {
  const authorized = useAuthStore((s) => s.authorized);
  const loading = useAuthStore((s) => s.loading);

  if (loading) return <div>Loading...</div>;

  if (!authorized) return <Navigate to="/zaloguj-się" replace />;

  return children;
};
