import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser, registerUser } from "../../feature/auth/authApi";
import { useSelector } from "react-redux";
import { selectAuthLoading } from "../../feature/auth/authSelector";

export default function AuthForm({ type }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const isLoading = useSelector(selectAuthLoading);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (type === "register") {
      if (!username || !email || !password || !confirmPassword) {
        alert("Please fill in all fields.");
        return;
      }
      if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
      }
      const userInfo = { username, email, password1: password, password2: confirmPassword };
      dispatch(registerUser(userInfo));
    } else {
      const loginInfo = { email, password };
      dispatch(loginUser(loginInfo));
    }
  };
  return (
      <form className="bg-gray-800 p-6 rounded-xl w-80 shadow-lg" onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold mb-4 text-center">
          {type === "login" ? "Login" : "Register"}
        </h2>

        {type === "register" && (
          <input
            type="text"
            placeholder="Username"
            className="w-full p-2 mb-3 rounded bg-gray-700 outline-none"
            value={username}
            onChange={(e) => setUsername(e.target.value)}

          />
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-3 rounded bg-gray-700 outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}

        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 rounded bg-gray-700 outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {type === "register" && (
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full p-2 mb-3 rounded bg-gray-700 outline-none"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        )}

        <button
          className="w-full bg-red-500 hover:bg-red-600 p-2 rounded font-semibold"
          type="submit"
          disabled={isLoading}
        >
          {type === "login" ? "Login" : "Register"}
        </button>
      </form>
  );
}
