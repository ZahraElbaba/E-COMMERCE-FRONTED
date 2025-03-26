import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductsPage from './pages/Productspage';
import SingleProductPage from './pages/SingleProductPage';
function App() {
  return (
    <Router>
      <Routes>
      <Route path="/products" element={<ProductsPage/>} />
      <Route path="/product/:id" element={<SingleProductPage />} />
      </Routes>
    </Router>
  );
}

export default App;
