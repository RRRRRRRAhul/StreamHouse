// App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Pages
import Home from "./pages/home/HomePage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import VideoPlayerPage from "./pages/video/VideoPlayerPage";
import CategoryPage from "./pages/category/categoryPage";
import UploadPage from "./pages/video/UploadVideoPage";



// Protected Route
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";


import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initializeAuth } from "./feature/auth/authApi";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);
  return (
    <BrowserRouter>
      <Routes>

        <Route index element={<Navigate to="/login" />} />

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/video/:id" element={<VideoPlayerPage />} />
          <Route path="/category" element={<CategoryPage />} />
          <Route path="/upload" element={<UploadPage />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;