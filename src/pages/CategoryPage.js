import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

const CategoryPage = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6); // Number of products shown initially

  useEffect(() => {
    fetch(`http://localhost:3000/api/products/category/${categoryId}`)
      .then((res) => res.json())
      .then((data) => setProducts(data.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, [categoryId]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        {categoryId === "1" ? "For Him" : "For Her"}
      </h1>

      {/* Grid layout for 3 items per row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.slice(0, visibleCount).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* View More Button */}
      {visibleCount < products.length && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setVisibleCount((prev) => prev + 6)}
            className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition"
          >
            View More
          </button>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
