



import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import AboutUs from "./components/AboutUs"; 
import Contact from "./pages/Contact";
import Category from "./pages/Category";

const App = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000); 
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="app-container">
            {loading ? (
                <div className="spinner">Loading...</div>
            ) : (
                <Router>
                    <Routes>
                        {/* Public Routes */}
                        <Route path="/" element={<Home />} /> 
                        <Route path="/login" element={<Login/>} /> 
                        <Route path="/register" element={<Register />} />
                        <Route path="/home" element={<Home />} />  
                        <Route path="/about-us" element={<AboutUs />} />
                        <Route path="/contact" element={<Contact/>}/>
                        <Route path="/category/:type" element={<Category />} />
                        
                        {/* Catch-all route to redirect unknown paths */}
                        {/* <Route path="*" element={<Navigate to="/login" replace />} /> */}
                    </Routes>
                </Router>
            )}
        </div>
    );
};

export default App;




