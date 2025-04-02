import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import CategoryPage from "./pages/CategoryPage";

import Header from "./components/Header";
import Footer from "./components/Footer"; // Ensure Footer is included
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import ProductsPage from "./pages/Productspage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SingleProductPage from "./pages/SingleProductPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
//import checkout from "./components/checkout"
function App() {
  return (
    <Router>
       <Routes>
       <Route path="/" element={<Home/>}/>
       </Routes>
      <Header /> 
      <Routes>
        <Route path="/category/:categoryId" element={<CategoryPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products" element={<ProductsPage/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/product/:id" element={<SingleProductPage/>} />
        <Route path="/cart" element={<CartPage/>} />
        <Route path="/checkout" element={<CheckoutPage/>} />
        <Route path="/category/:id" element={<CategoryPage/>} />





        {/* Catch-all route should be last */}
      </Routes>
      <Footer /> 
    </Router>
  );
}

export default App;