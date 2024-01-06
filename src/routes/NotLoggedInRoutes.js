import { Navigate, Outlet } from "react-router-dom";

export default function NotLoggedInRoutes({ user }) {
  return user ? <Navigate to="/" /> : <Outlet />;
}
