// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [error, setError] = useState(null);
//     const navigate = useNavigate();

//     const handleLogin = async (e) => {
//         e.preventDefault();
//         setError(null);

//         try {
//             const response = await fetch("http://localhost:5000/api/auth/login", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ email, password }),
//             });

//             const data = await response.json();

//             if (!response.ok) {
//                 throw new Error(data.message || "Login failed");
//             }

//             localStorage.setItem("user", JSON.stringify(data.data));
//             navigate(data.data.role === "admin" ? "/admin" : "/dashboard");
//         } catch (error) {
//             setError(error.message);
//         }
//     };

//     return (
//         <div>
//             <h2>Login</h2>
//             {error && <p style={{ color: "red" }}>{error}</p>}
//             <form onSubmit={handleLogin}>
//                 <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//                 <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
//                 <button type="submit">Login</button>
//             </form>
//         </div>
//     );
// };

// export default Login;




import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/Login.css'
import LoginPic from '../assets/images/LoginPic.svg';

const Login = () => {
  const navigate = useNavigate();

  // State for form values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle login button click
  const handleLogin = (e) => {
    e.preventDefault(); // Prevent form default behavior
    // Your logic here (e.g., API call, validation)
    navigate("/home"); // Navigate to home page
  };

  return (
    <section className="login-container">
      <div className="login-content">
        {/* Left Side - Form */}
        <div className="login-form">
          <h2 className="login-title">Log In</h2>
          
          <label>Email</label>
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="login-input" 
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
          />
          
          <label>Password</label>
          <input 
            type="password" 
            placeholder="Enter your password" 
            className="login-input" 
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
          />
          
          <button className="login-button" onClick={handleLogin}>Login</button>
          
          <p className="signup-text">
            Don't have an account? <a href="/register">Sign Up</a>
          </p>
        </div>

        {/* Right Side - Image */}
        <div className="login-image-container">
          <img src={LoginPic} alt="Luxury Watch" className="login-image" />
        </div>
      </div>
    </section>
  );
};

export default Login;
