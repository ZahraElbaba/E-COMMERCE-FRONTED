import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import CategoryPage from "./pages/CategoryPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/category/:categoryId" element={<CategoryPage />} />
        <Route path="*" element={<Navigate to="/category/1" />} />
      </Routes>
    </Router>
  );
}

export default App;
