// src/components/Sidebar.jsx
import React from "react";
import { Link } from "react-router-dom";
import {
  FiHome, FiUsers, FiShoppingCart, FiBox, FiTag, FiTruck, FiHeart
} from "react-icons/fi";

const navLinks = [
  // { name: "Dashboard", icon: <FiHome />, path: "/dashboard" },
  { name: "Orders", icon: <FiHome />, path: "/dashboard/orders" },
  { name: "Users", icon: <FiUsers />, path: "/dashboard/users" },
  { name: "Products", icon: <FiBox />, path: "/dashboard/products" },
  { name: "Categories", icon: <FiTag />, path: "/dashboard/categories" },
  { name: "Shipping", icon: <FiTruck />, path: "/dashboard/shipping" },
  { name: "Wishlist", icon: <FiHeart />, path: "/dashboard/wishlist" },
];

const Sidebar = () => {
  return (
    <div className="bg-black text-white w-64 p-4 flex flex-col">
      <div className="text-xl font-bold mb-8">Dashboard</div>
      <nav className="flex flex-col gap-4">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className="flex items-center gap-2 px-3 py-2 hover:bg-gray-800 rounded-md"
          >
            {link.icon}
            {link.name}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
