import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";

// Dashboard-related imports
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/DashboardD";
import Users from "./pages/UsersD";
import Orders from "./pages/OrdersD";
import Products from "./pages/ProductsD";
import Categories from "./pages/CategoriesD";
import Shipping from "./pages/ShippingD";
import Wishlist from "./pages/WishlistD";

// E-commerce-related imports
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import ProductsPage from "./pages/Productspage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SingleProductPage from "./pages/SingleProductPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import CategoryPage from "./pages/CategoryPage";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Dashboard Routes with Sidebar Layout */}
        <Route
          path="/dashboard/*"
          element={
            <div className="flex h-screen w-full">
              <Sidebar />
              <div className="flex-1 bg-gray-100 p-4 overflow-y-auto">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/users" element={<Users />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/categories" element={<Categories />} />
                  <Route path="/shipping" element={<Shipping />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                </Routes>
              </div>
            </div>
          }
        />

        {/* E-commerce Routes with Header & Footer Layout */}
        <Route
          path="/*"
          element={
            <>
              <Header />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/category/:categoryId" element={<CategoryPage />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/product/:id" element={<SingleProductPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
              </Routes>
              <Footer />
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
