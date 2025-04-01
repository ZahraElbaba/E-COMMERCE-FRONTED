import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductsPage from './pages/Productspage';
import SingleProductPage from './pages/SingleProductPage';
import CategoryPage from "./pages/CategoryPage";
import CartPage from "./pages/CartPage"; 
import Header from './components/Header';
import Footer from './components/Footer';
import Checkout from './pages/CheckoutPage';


function App() {
  return (
    <Router>
      <Header />
      <Routes>
       
      <Route path="/products" element={<ProductsPage/>} />
      <Route path="/product/:id" element={<SingleProductPage />} />
      <Route path="/category/:categoryId" element={<CategoryPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<Checkout />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
