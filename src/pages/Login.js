



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginPic from "../assets/images/LoginPic.svg";
import { login } from "../api/auth";  // You will need to create this API call.

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter both email and password!");
      return;
    }

    try {
      // Call the backend API to authenticate the user
      const response = await login(email, password);  // Backend API call

      // Check if the response is successful
      if (response && response.data) {
        toast.success("Login successful! Redirecting...");

        // Store the JWT token in localStorage (or cookies)
        localStorage.setItem("token", response.data.token);

        // Redirect based on the user's role
        if (response.data.role === "ADMIN") {
          navigate("/dashboard");
        } else {
          navigate("/home");
        }
      } else {
        toast.error("Login failed! Please try again.");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed!");
    }
  };

  return (
    <section className="flex justify-center items-center h-screen bg-gray-100">
      <div className="flex flex-col md:flex-row items-center max-w-3xl w-full bg-white p-8 rounded-lg shadow-lg">
        {/* Left Side - Form */}
        <div className="flex-1 p-6">
          <h2 className="text-2xl font-bold mb-4 text-center">Log In</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white py-2 mt-2 rounded-md hover:bg-gray-800 transition duration-300"
            >
              Login
            </button>
          </form>
          <p className="mt-3 text-sm text-gray-600 text-center">
            Don't have an account?{" "}
            <a href="/register" className="text-black font-semibold hover:underline">
              Sign Up
            </a>
          </p>
        </div>
        {/* Right Side - Image */}
        <div className="flex-1 flex justify-center">
          <img src={LoginPic} alt="Luxury Watch" className="max-w-full h-auto rounded-lg" />
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar closeOnClick pauseOnHover />
    </section>
  );
};

export default Login;
