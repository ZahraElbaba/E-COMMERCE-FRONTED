// src/pages/Wishlist.jsx
import React, { useState, useEffect } from "react";

const Wishlist = () => {
  const [wishlistData, setWishlistData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedUserId, setExpandedUserId] = useState(null);

  const fetchWishlist = async () => {
    setLoading(true);
    try {
      // const token =
      //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJTYW1pQGV4YW1wbGUuY29tIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzQyOTUyNDI3LCJleHAiOjE3NDM1NTcyMjd9.dAXhrlOXxZkFOXXQn7FNRqMG20hm4Fo0kn8PO59lN_s";
        const token =localStorage.setItem("token", token);
      if (!token) {
        throw new Error("No token found. Please log in first.");
      }
      const response = await fetch("http://localhost:5000/api/user/getAllWishlist", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      const data = await response.json();
      setWishlistData(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  // Group wishlist items by user
  const groupedByUser = wishlistData.reduce((acc, item) => {
    if (!acc[item.user_id]) {
      acc[item.user_id] = {
        user_id: item.user_id,
        user_name: item.user_name,
        user_email: item.user_email,
        wishlist_items: [],
      };
    }
    acc[item.user_id].wishlist_items.push(item);
    return acc;
  }, {});

  const usersArray = Object.values(groupedByUser);

  const handleToggleProducts = (userId) => {
    setExpandedUserId((prev) => (prev === userId ? null : userId));
  };

  if (loading) return <p>Loading wishlist...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Wishlist</h2>
      {usersArray.length > 0 ? (
        <table className="min-w-full border-collapse mb-8">
          <thead className="border-b">
            <tr>
              <th className="px-4 py-2">User ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {usersArray.map((user) => {
              const isExpanded = expandedUserId === user.user_id;
              return (
                <React.Fragment key={user.user_id}>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">{user.user_id}</td>
                    <td className="px-4 py-2">{user.user_name}</td>
                    <td className="px-4 py-2">{user.user_email}</td>
                    <td className="px-4 py-2">
                      <button
                        className="px-2 py-1 bg-blue-500 text-white rounded"
                        onClick={() => handleToggleProducts(user.user_id)}
                      >
                        {isExpanded ? "Hide Products" : "Show Products"}
                      </button>
                    </td>
                  </tr>
                  {isExpanded && (
                    <tr>
                      <td colSpan="4" className="p-4 bg-gray-100">
                        <h3 className="font-semibold mb-2">
                          Products for {user.user_name}
                        </h3>
                        {user.wishlist_items.length > 0 ? (
                          <ul className="list-disc list-inside">
                            {user.wishlist_items.map((item) => (
                              <li key={item.wishlist_id}>
                                {item.product_name} (ID: {item.product_id})
                                {item.created_at && (
                                  <span>
                                    {" "}
                                    - {new Date(item.created_at).toLocaleString()}
                                  </span>
                                )}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p>No products in wishlist.</p>
                        )}
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>No wishlist items found.</p>
      )}
    </div>
  );
};

export default Wishlist;
