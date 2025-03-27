import React from "react";
import Sidebar from "../components/Sidebar";
import Table from "../components/Table";

const Dashboard = () => {
  return (
    <div className="flex h-screen w-full">
      {/* Sidebar on the left */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex-1 bg-gray-100 p-4 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        
        {/* Example table section */}
        <div className="bg-white rounded-md shadow-md p-4">
          <h2 className="text-xl font-semibold mb-4">Orders</h2>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
