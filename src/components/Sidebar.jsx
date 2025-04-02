// src/components/Sidebar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FiHome, FiUsers, FiShoppingCart, FiBox ,FiTag,FiTruck,FiHeart} from "react-icons/fi";

const navLinks = [
  { name: "Home", icon: <FiHome />, path: "/" },
  { name: "Users", icon: <FiUsers />, path: "/users" },
  { name: "Orders", icon: <FiShoppingCart />, path: "/orders" },
  { name: "Products", icon: <FiBox />, path: "/products" },
  { name: "Shipping", icon: <FiTruck />, path: "/shipping" },
  { name: "Categories", icon: <FiTag />, path: "/categories" },
   { name: "Wishlist", icon: <FiHeart />, path: "/wishlist" },
];

const Sidebar = () => {
  return (
    <div className="bg-black text-white w-64 p-4 flex flex-col">
      <div className="text-xl font-bold mb-8">Dashboard</div>
      <nav className="flex flex-col  gap-4">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className="flex items-center text-white gap-2 px-2 py-2 rounded-md hover:bg-gray-800"
          >
            {link.icon}
            <span>{link.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
