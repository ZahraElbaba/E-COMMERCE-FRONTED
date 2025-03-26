// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/DashboardD"; // Home or default page
import Users from "./pages/UsersD";
import Orders from "./pages/OrdersD";
import Products from "./pages/ProductsD";
import Categories from "./pages/CategoriesD";
import Shipping from "./pages/ShippingD";
import Wishlist from "./pages/WishlistD";

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
            <Route path="/wishlist" element={<Wishlist />} />
            {/* <Route path="/products" element={<Products />} /> */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
