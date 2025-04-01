import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import CategoryPage from "./pages/CategoryPage";

import Header from "./components/Header";
import Footer from "./components/Footer"; // Ensure Footer is included
//import checkout from "./components/checkout"
function App() {
  return (
    <Router>
      <Header /> 
      <Routes>
        <Route path="/category/:categoryId" element={<CategoryPage />} />
\
        <Route path="/checkout" element={<checkout />} />

        
        {/* Catch-all route should be last */}
        <Route path="*" element={<Navigate to="/category/1" replace />} />
      </Routes>
      <Footer /> 
    </Router>
  );
}

export default App;
