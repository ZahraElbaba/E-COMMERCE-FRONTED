// src/pages/Products.jsx
import React, { useState, useEffect } from "react";
import Table from "../components/Table";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Define columns for the products table
  const columns = [
    { Header: "ID", accessor: "id" },
    { Header: "Name", accessor: "name" },
    { Header: "Description", accessor: "description" },
    {
      Header: "Image",
      accessor: "image",
      // Render the image as an <img> element
      Cell: (row) => (
        <img
          src={row.image}
          alt={row.name}
          className="w-12 h-12 object-cover"
        />
      ),
    },
    { Header: "Price", accessor: "price" },
    { Header: "Stock", accessor: "stock_quantity" },
    { Header: "Category ID", accessor: "category_id" },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products/products");
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const data = await response.json();
        // If your API returns an object with a "data" property, use that array:
        setProducts(data.data ? data.data : data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

  return <Table title="Products" columns={columns} data={products} />;
};

export default Products;
