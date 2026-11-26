import { Navigate, useLocation } from "react-router-dom";
import useAuthStore from "@/store/useAuthStore";
import { AuthLayout, MainLayout } from "@/layouts";

export function AuthMiddleware() {
  const user = useAuthStore((state) => state.user);
  const location = useLocation();
    return user ? <MainLayout /> : <Navigate to="/signin" replace state={{ from: location }} />;

}

export function GuestMiddleware() {
  const user = useAuthStore((state) => state.user);
  return user ? <Navigate to="/" replace /> : <AuthLayout />;
}
