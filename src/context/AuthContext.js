import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login, register } from "../api/auth"; // Fix API function import

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, [token]);

  const loginUser = async (email, password) => {
    try {
      const response = await login(email, password); // Use the correct function
      localStorage.setItem("token", response.token); // Fix token storage
      localStorage.setItem("user", JSON.stringify(response.user));
      setUser(response.user);
      setToken(response.token);

      if (response.user.role === "ADMIN") {
        navigate("/dashboard");
      } else {
        navigate("/home");
      }
    } catch (error) {
      console.error(error.response?.data?.error || "Login failed");
      throw new Error(error.response?.data?.error || "Login failed");
    }
  };

  const registerUser = async (name, email, password, phone) => {
    try {
      const response = await register(name, email, password,phone); // Ensure backend supports phone
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
      setUser(response.user);
      setToken(response.token);
      navigate("/login"); // Redirect after registration
    } catch (error) {
      console.error(error.response?.data?.error || "Registration failed");
      throw new Error(error.response?.data?.error || "Registration failed");
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, loginUser, registerUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
