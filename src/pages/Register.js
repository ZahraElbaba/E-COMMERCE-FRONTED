// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Register = () => {
//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [phone, setPhone] = useState("");
//     const [error, setError] = useState(null);
//     const navigate = useNavigate();

//     const handleRegister = async (e) => {
//         e.preventDefault();
//         setError(null);

//         try {
//             const response = await fetch("http://localhost:5000/api/auth/signup", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ name, email, password, phone }),
//             });

//             const data = await response.json();

//             if (!response.ok) {
//                 throw new Error(data.message || "Registration failed");
//             }

//             navigate("/login");
//         } catch (error) {
//             setError(error.message);
//         }
//     };

//     return (
//         <div>
//             <h2>Register</h2>
//             {error && <p style={{ color: "red" }}>{error}</p>}
//             <form onSubmit={handleRegister}>
//                 <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
//                 <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//                 <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
//                 <input type="text" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
//                 <button type="submit">Register</button>
//             </form>
//         </div>
//     );
// };

// export default Register;



import React from "react";
import '../styles/Register.css'
import SignUpPic from '../assets/images/SignUpPic.svg'; // Adjust the path if needed

const Register = () => {
  return (
    <section className="signup-container">
      <div className="signup-content">
        {/* Left Side - Form */}
        <div className="signup-form">
          <h2 className="signup-title">Registration</h2>

          <label>Full Name</label>
          <input type="text" placeholder="Enter your full name" className="signup-input" />

          <label>Email</label>
          <input type="email" placeholder="Enter your email" className="signup-input" />

          <label>Password</label>
          <input type="password" placeholder="Enter your password" className="signup-input" />

          <label>Phone</label>
          <input type="tel" placeholder="Enter your phone number" className="signup-input" />

          <button className="signup-button">Create</button>

          <p className="signin-text">
            Already have an account? <a href="/login">Sign in</a>
          </p>
        </div>

        {/* Right Side - Image */}
        <div className="signup-image-container">
          <img src={SignUpPic} alt="Luxury Watch" className="signup-image" />
        </div>
      </div>
    </section>
  );
};

export default Register;
