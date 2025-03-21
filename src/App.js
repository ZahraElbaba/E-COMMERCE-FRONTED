import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
// import Dashboard from "./pages/Dashboard";
// import AdminPanel from "./pages/AdminPanel";
import Unauthorized from "./pages/Unauthorized";
// import PrivateRoute from "./routes/PrivateRoute";
import "./App.css";

const App = () => {
    const [loading, setLoading] = useState(true); // Initial loading state

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false); // Simulate a loading delay
        }, 3000); // 3 seconds delay
        return () => clearTimeout(timer); // Clean up the timer
    }, []);
    

    return (
        <div className="app-container">
            {loading ? (
                <div className="spinner">Loading...</div>
            ) : (
                <Router>
                    <Routes>
                        {/* Public Routes */}
                       
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/unauthorized" element={<Unauthorized />} />
                        <Route path="/" element={<Home />} />

                        {/* Private Routes
                        <Route element={<PrivateRoute allowedRoles={["user", "admin"]} />}>
                            <Route path="/dashboard" element={<Dashboard />} />
                        </Route>

                        <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
                            <Route path="/admin" element={<AdminPanel />} />
                        </Route> */}
                    </Routes>
                </Router>
            )}
        </div>
    );
};

export default App;
