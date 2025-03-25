import axios from "axios";

const API_URL = "http://localhost:5000/api/auth"; // Change to your backend URL

// Login function
export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data; // { token, user: { id, name, role } }
};

// Register function
export const register = async (name, email, password,phone) => {
  const response = await axios.post(`${API_URL}/signup`, { name, email, password ,phone});
  return response.data; // { message: "User registered successfully" }
};
