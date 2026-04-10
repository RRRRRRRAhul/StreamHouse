import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { selectIsAuthenticated } from "../../feature/auth/authSelector";
import { logoutUser } from "../../feature/auth/authApi";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function Navbar() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const keyword = location.pathname.split("/").pop();
  const currentPage = keyword?.toLowerCase();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignUp = () => {
    navigate("/register");
  }

  const handleCategory = () => {
    navigate("/category");
  }

  const handleHome = () => {
    navigate("/");
  }

  const handleUpload = () => {
    navigate("/upload");
  }

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-black text-white shadow-md">
      <h1 className="text-xl font-bold text-red-500">StreamHouse</h1>

      <div className="flex gap-4">
        {currentPage != "home" && (
          <button className="hover:text-red-400" onClick={handleHome}>
            Home
          </button>
        )}
        {isAuthenticated ? (
          <>
            {currentPage != "category" && (
              <button className="hover:text-red-400" onClick={handleCategory}>Categories</button>
            )}
            {currentPage != "upload" && (
              <button className="hover:text-red-400" onClick={handleUpload}>
                Upload
              </button>
            )}
            <button className="hover:text-red-400" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <button className="hover:text-red-400" onClick={handleLogin}>
              Login
            </button>
            <button className="hover:text-red-400" onClick={handleSignUp}>
              Sign Up
            </button>
          </>
        )}
      </div>
    </nav>
  );
}