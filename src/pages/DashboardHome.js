// src/pages/Dashboard.jsx
import React from "react";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Welcome to the Admin Dashboard</h1>
      <p className="text-gray-600">Use the sidebar to navigate between sections.</p>

      {/* Example Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded shadow text-center">
          <h2 className="text-xl font-semibold">Users</h2>
          <p className="text-2xl font-bold">150</p>
        </div>
        <div className="bg-white p-6 rounded shadow text-center">
          <h2 className="text-xl font-semibold">Orders</h2>
          <p className="text-2xl font-bold">42</p>
        </div>
        <div className="bg-white p-6 rounded shadow text-center">
          <h2 className="text-xl font-semibold">Revenue</h2>
          <p className="text-2xl font-bold">$12,345</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
