



// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Home from "./pages/Home";
// import AboutUs from "./components/AboutUs"; 
// import Contact from "./pages/Contact";
// import Category from "./pages/Category";

// const App = () => {
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const timer = setTimeout(() => {
//             setLoading(false);
//         }, 3000); 
//         return () => clearTimeout(timer);
//     }, []);

//     return (
//         <div className="app-container">
//             {loading ? (
//                 <div className="spinner">Loading...</div>
//             ) : (
//                 <Router>
//                     <Routes>
//                         {/* Public Routes */}
//                         <Route path="/" element={<Home />} /> 
//                         <Route path="/login" element={<Login/>} /> 
//                         <Route path="/register" element={<Register />} />
//                         <Route path="/home" element={<Home />} />  
//                         <Route path="/about-us" element={<AboutUs />} />
//                         <Route path="/contact" element={<Contact/>}/>
//                         <Route path="/category/:type" element={<Category />} />
                        
//                         {/* Catch-all route to redirect unknown paths */}
//                         {/* <Route path="*" element={<Navigate to="/login" replace />} /> */}
//                     </Routes>
//                 </Router>
//             )}
//         </div>
//     );
// };

// export default App;


import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"; // Import AuthProvider
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import AboutUs from "./components/AboutUs";
import Contact from "./pages/Contact";
import Categories from "./pages/Categories";
import Dashboard from "./pages/Dashboard"; // Assuming you have a Dashboard page
import ProtectedRoute from "./routes/PrivateRoute"; // Import ProtectedRoute component
import RecentProducts from "./pages/RecentProducts";

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
        <Router> {/* Ensure Router wraps the whole app */}
          <AuthProvider> {/* AuthProvider should be inside the Router */}
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/home" element={<Home />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/categories/:type" element={<Categories />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/recent-products" element={<RecentProducts />} />
              

              {/* Protected Routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute requiredRole="ADMIN">
                    <Dashboard />
                  </ProtectedRoute>
                }
              />

              {/* Catch-all route to redirect unknown paths */}
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </AuthProvider>
        </Router>
      )}
    </div>
  );
};

export default App;



