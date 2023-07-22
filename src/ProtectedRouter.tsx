import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isLoggedIn = useSelector((state) => state.autheUser.isLoggedIn);
  const location = useLocation();

  return isLoggedIn ? (
    children
  ) : (
    <Navigate to={"/login"} replace state={{ path: location.pathname }} />
  );
};
export default ProtectedRoute;
