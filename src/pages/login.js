import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { useDispatch } from "react-redux";
import { setUser } from "../features/user/userSlice";
import { Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const users = await api.get("/users");

    const user = users.data.find((user) => user.email === email);

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      dispatch(setUser(user));
      navigate("/");
    } else {
      alert("User does not exist!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[url(https://seatgeek.com/_next/image?url=https%3A%2F%2Fseatgeek.com%2Fimages%2Fimage_uploads%2Fhomepage%2Fhomepage-medium.jpg&w=3840&q=75)]">
      <div className="bg-white p-8 rounded-lg shadow-md w-full md:w-1/3">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block mb-1" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border rounded"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border rounded"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Login
          </button>
          <Link to="/">
            <div className="text-center mt-4">
              <span className="text-sm">Back to Home</span>
            </div>
          </Link>
        </form>
      </div>
    </div>
  );
}
