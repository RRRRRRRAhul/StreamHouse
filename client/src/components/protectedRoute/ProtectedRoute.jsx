import { Navigate, Outlet } from "react-router-dom";
import { selectIsAuthenticated } from "../../feature/auth/authSelector";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  // TEMP: replace with Redux state later
  const isAuthenticated = useSelector(selectIsAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
