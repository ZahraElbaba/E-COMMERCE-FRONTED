// src/pages/Dashboard.jsx
import React from "react";
import Sidebar from "../components/Sidebar";
import Users from "./UsersD";
import Orders from "./OrdersD";
import Products from "./ProductsD";
import Categories from "./CategoriesD";
import Shipping from "./ShippingD";
import Wishlist from "./WishlistD";

const Dashboard = () => {
  return (
    <div className="flex h-screen w-full">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Scrollable */}
      <div className="flex-1 bg-gray-100 overflow-y-auto p-6 space-y-12">
        <section>
          <h2 className="text-2xl font-bold mb-4">Users</h2>
          <Users />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Orders</h2>
          <Orders />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Products</h2>
          <Products />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Categories</h2>
          <Categories />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Shipping</h2>
          <Shipping />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Wishlist</h2>
          <Wishlist />
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
