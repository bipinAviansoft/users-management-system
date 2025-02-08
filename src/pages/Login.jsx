import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { loginSuccess, setLoggedInUser } from "../redux/authSlice";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle Login Function
  const handleLogin = async (e) => {
    e.preventDefault();

    // Input Validation
    if (!email.trim() || !password.trim()) {
      toast.error("Please enter both email and password");
      return;
    }

    setLoading(true); // Show loading state

    try {
      const response = await axios.post(
        "https://interview.optimavaluepro.com/api/v1/login",
        { email, password }
      );

      console.log("response.data: ", response.data.data.authorization);
      dispatch(loginSuccess(response.data.data.authorization)); // Store user in Redux
      toast.success("Login successful!");
      console.log(response.data.data);

      const loggedInDetails = {
        name: response.data.data.name,
        image: response.data.data.profile,
      };
      dispatch(setLoggedInUser(loggedInDetails));
      navigate("/"); // Redirect to Users page
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false); // Hide loading state
    }
  };

  return (
    <div className="grid grid-cols-2 h-screen">
      <div
        className="flex flex-col justify-between items-start p-[3.75rem]"
        style={{ backgroundImage: "url(/assets/images/login-bg.jpg)" }}
      >
        <a href="#">
          <img src="/assets/images/logo.png" alt="logo" />
        </a>
        <h2 className="text-[1.3rem] text-white font-[500]">
          Welcome to Eastern Techno Solutions!{" "}
        </h2>
        <h5 className="text-[13px] text-white font-[500]">
          © 2025 Eastern Techno Solutions{" "}
        </h5>
      </div>

      <div className="w-full bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center">
        <div className="w-full max-w-[436px] mx-auto">
          <div className="text-center">
            <h2 className="text-xl font-[500] text-center mb-[5px]">Sign In</h2>
            <p className="text-[13px] text-[#8daab3] font-[400] text-center">
              Enter your username and password
            </p>
          </div>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-semibold">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 mt-2 border rounded !outline-none "
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-semibold">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 mt-2 border rounded !outline-none"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#007190] text-white py-2 mt-4 rounded"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
