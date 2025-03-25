// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard"; // Home or default page
import Users from "./pages/Users";
import Orders from "./pages/Orders";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import Shipping from "./pages/Shipping";

const App = () => {
  return (
    <Router>
      <div className="flex h-screen w-full">
        {/* Sidebar on the left */}
        <Sidebar />

        {/* Main content area */}
        <div className="flex-1 bg-gray-100 p-4 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Orders />} />
            <Route path="/users" element={<Users />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/products" element={<Products />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/shipping" element={<Shipping />} />
            {/* <Route path="/products" element={<Products />} /> */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
