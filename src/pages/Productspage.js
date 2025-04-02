import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [category, setCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(6); // Number of products shown initially

  // Fetch products
  useEffect(() => {
    fetch("http://localhost:3000/api/products/products")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProducts(data.data);
          setDisplayedProducts(data.data.slice(0, visibleCount)); // Show initial products
        }
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  // Filter products based on selected category
  useEffect(() => {
    let filteredProducts = products;

    if (category === "new") {
      filteredProducts = [...products].reverse(); // Show newest products first
    } else if (category === "for_him") {
      filteredProducts = products.filter((p) => p.category_id === 1);
    } else if (category === "for_her") {
      filteredProducts = products.filter((p) => p.category_id === 2);
    }

    // Apply search filter
    if (searchQuery) {
      filteredProducts = filteredProducts.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setDisplayedProducts(filteredProducts.slice(0, visibleCount));
  }, [category, searchQuery, visibleCount, products]);

  return (
    <div className="max-w-6xl mx-auto p-6">

      {/* Search Input */}
      <div className="mb-4 text-center">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 rounded w-1/2"
        />
      </div>

      {/* Filter Buttons */}
      <div className="flex justify-center space-x-4 mb-4">
        <button onClick={() => setCategory("new")} className="bg-black text-white px-4 py-2 rounded">
          New
        </button>
        <button onClick={() => setCategory("for_him")} className="bg-black text-white px-4 py-2 rounded">
          For Him
        </button>
        <button onClick={() => setCategory("for_her")} className="bg-black text-white px-4 py-2 rounded">
          For Her
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {displayedProducts.length > 0 ? (
          displayedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="text-center col-span-3">No products found.</p>
        )}
      </div>

      {/* View More Button */}
      {visibleCount < products.length && (
        <div className="text-center mt-6">
          <button
            onClick={() => setVisibleCount((prev) => prev + 6)} // Load 6 more products
            className="bg-black text-white px-6 py-2 rounded"
          >
            View More
          </button>
        </div>
      )}
      
    </div>
  );
};

export default ProductsPage;
