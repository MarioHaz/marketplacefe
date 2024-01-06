import { Navigate, Outlet } from "react-router-dom";

export default function LoggedInRoutes({ user }) {
  return user ? <Outlet /> : <Navigate to="/login" />;
}
