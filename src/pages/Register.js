
// Register.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignUpPic from "../assets/images/SignUpPic.svg";
import { register } from "../api/auth"; // Import register function from api/auth

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const data = await register(name, email, password, phone); // Call register function
      toast.success("Registration successful! Redirecting to login...");

      setTimeout(() => {
        navigate("/login"); // Navigate to login page after 2s
      }, 2000);
    } catch (error) {
      toast.error("Failed to register. Please try again.");
    }
  };

  return (
    <section className="flex justify-center items-center h-screen bg-gray-100">
      <ToastContainer position="bottom-right" autoClose={4000} />
      <div className="flex flex-col md:flex-row items-center max-w-3xl w-full bg-white p-8 rounded-lg shadow-lg">
        {/* Left Side - Form */}
        <div className="flex-1 p-6">
          <h2 className="text-2xl font-bold mb-4">Registration</h2>
          <form onSubmit={handleRegister}>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <label className="block mt-4 text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label className="block mt-4 text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <label className="block mt-4 text-gray-700">Phone</label>
            <input
              type="tel"
              placeholder="Enter your phone number"
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />

            <button
              type="submit"
              className="w-full bg-black text-white py-2 mt-4 rounded-md hover:bg-gray-800 transition duration-300"
            >
              Create
            </button>
          </form>

          <p className="mt-3 text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-black font-semibold hover:underline">
              Sign in
            </a>
          </p>
        </div>

        {/* Right Side - Image */}
        <div className="flex-1 flex justify-center">
          <img src={SignUpPic} alt="Luxury Watch" className="max-w-full h-auto rounded-lg" />
        </div>
      </div>
    </section>
  );
};

export default Register;
