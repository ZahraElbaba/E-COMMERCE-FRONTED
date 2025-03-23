import React from "react";
import { FiHome, FiUsers, FiBox, FiShoppingCart, FiSettings } from "react-icons/fi";


const navLinks = [
  { name: "Home", icon: <FiHome />, path: "/" },
  { name: "Users", icon: <FiUsers />, path: "/users" },
  { name: "Products", icon: <FiBox />, path: "/products" },
  { name: "Orders", icon: <FiShoppingCart />, path: "/orders" },
  { name: "Settings", icon: <FiSettings />, path: "/settings" },
];

const Sidebar = () => {
  return (
    <div className="bg-gray-800 text-white w-64 p-4 flex flex-col">
      {/* Logo or Title */}
      <div className="text-xl font-bold mb-8">Dashboard</div>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-4">
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.path}
            className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-gray-700"
          >
            {link.icon}
            <span>{link.name}</span>
          </a>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
