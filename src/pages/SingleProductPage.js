import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext"; // Import useCart hook

const SingleProductPage = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart(); // Get addToCart function from CartContext
  const [added, setAdded] = useState(false); // State to show confirmation message

  useEffect(() => {
    // Fetch the product details using the ID
    fetch(`http://localhost:3000/api/products/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProduct(data.data); // Set the product data
        }
      })
      .catch((error) => console.error("Error fetching product:", error));
  }, [id]); // Run the effect when the product ID changes

  if (!product) return <p>Loading...</p>;

  // Map category_id to category name
  const categoryNames = {
    1: "For Him",
    2: "For Her",
  };

  const category = categoryNames[product.category_id] || "Uncategorized"; // Default to "Uncategorized" if not found

  // Handle Add to Cart
  const handleAddToCart = () => {
    addToCart({ 
      id: product.id, 
      name: product.name, 
      price: product.price, 
      image: product.image_url, 
      quantity: 1 // Default quantity
    });
    setAdded(true);

    // Remove confirmation message after 2 seconds
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Product Layout */}
      <div className="flex items-start">
        {/* Product Image (Left) */}
        <div className="w-1/2">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-64 h-64 object-contain mx-auto"
          />
        </div>

        {/* Product Details (Right) */}
        <div className="w-1/2 pl-6">
          <h1 className="text-3xl font-bold text-left mb-6">{product.name}</h1>

          {/* Category */}
          <p className="text-xl font-semibold text-gray-700">{category}</p>

          {/* Price */}
          <p className="text-2xl font-bold text-gray-800 mt-4">Price: ${product.price}</p>

          {/* Description */}
          <p className="text-lg text-gray-700 mt-4">{product.description}</p>

          {/* Buttons */}
          <div className="mt-6 flex flex-col space-y-4">
            {/* Add to Cart Button */}
            <button 
              onClick={handleAddToCart} 
              className="bg-black text-white px-8 py-3 rounded flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h2l1 5h13l1-5h2M5 8h14l-1 9H6L5 8zM10 21a1 1 0 102 0 1 1 0 00-2 0m6 0a1 1 0 102 0 1 1 0 00-2 0"
                />
              </svg>
              Add to Cart
            </button>

            {/* Show confirmation message */}
            {added && (
              <p className="text-green-600 text-lg font-semibold">
                Product added to cart!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProductPage;
