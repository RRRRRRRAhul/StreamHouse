import AuthForm from "../../components/auth/AuthForm";
import { useSelector } from "react-redux";
import {
  selectIsAuthenticated,
  selectAuthUser,
  selectAuthError,
} from "../../feature/auth/authSelector";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Register() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectAuthUser);
  const error = useSelector(selectAuthError);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && user) {
      navigate("/home");
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950 text-white px-4">
        {/* Error Message */}
        {error && (
          <div className="w-full max-w-md mb-4 bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-lg">
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

          <AuthForm type="register" />
      </div>
    </>
  );
}
