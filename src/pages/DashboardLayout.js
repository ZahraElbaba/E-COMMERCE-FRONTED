// src/pages/DashboardLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen w-full">
      <Sidebar />
      <div className="flex-1 bg-gray-100 p-4 overflow-y-auto">
        <Outlet /> {/* renders nested route (like Users, Orders, etc.) */}
      </div>
    </div>
  );
};

export default DashboardLayout;
