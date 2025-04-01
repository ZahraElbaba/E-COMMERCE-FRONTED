// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Dashboard Layout (holds Sidebar and an Outlet for nested routes)
import DashboardLayout from "./pages/DashboardLayout";
// Public Dashboard pages
import DashboardHome from "./pages/DashboardHome";
import Users from "./pages/UsersD";
import Orders from "./pages/OrdersD";
import Products from "./pages/ProductsD";
import Categories from "./pages/CategoriesD";
import Shipping from "./pages/ShippingD";
import Wishlist from "./pages/WishlistD";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Home Page */}
          <Route
            path="/"
            element={
              <header className="App-header">
                <img src="/logo.svg" className="App-logo" alt="logo" />
                <p>Edit <code>src/App.jsx</code> and save to reload.</p>
                <a
                  className="App-link"
                  href="https://reactjs.org"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn React
                </a>
              </header>
            }
          />

          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} /> {/* /dashboard */}
            <Route path="users" element={<Users />} />
            <Route path="orders" element={<Orders />} />
            <Route path="products" element={<Products />} />
            <Route path="categories" element={<Categories />} />
            <Route path="shipping" element={<Shipping />} />
            <Route path="wishlist" element={<Wishlist />} />
          </Route>
        </Routes>
         
      </div>
    </Router>
  );
}

export default App;
