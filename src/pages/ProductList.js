import { useState, useEffect } from "react";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/products/products") // Replace with your API endpoint
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  if (loading) return <p>Loading products...</p>;

  return (
    <div className="grid grid-cols-3 gap-8 p-6">
      {products.map((product) => (
        <div key={product.id} className="text-center">
          <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4" />
          <h2 className="font-bold">{product.name}</h2>
          <p className="text-gray-600">${product.price.toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};

export default Products;
