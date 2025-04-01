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
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found. Please log in first.");

      const response = await fetch("http://localhost:5000/api/user/getAllWishlist", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error(`Request failed with status ${response.status}`);

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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Wishlist</h1>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-black">
            <tr>
              {["User ID", "Name", "Email", "Actions"].map((head) => (
                <th
                  key={head}
                  className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {usersArray.map((user) => {
              const isExpanded = expandedUserId === user.user_id;
              return (
                <React.Fragment key={user.user_id}>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-800">{user.user_id}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{user.user_name}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{user.user_email}</td>
                    <td className="px-6 py-4 text-sm">
                      <button
                        className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                        onClick={() => handleToggleProducts(user.user_id)}
                      >
                        {isExpanded ? "Hide Products" : "Show Products"}
                      </button>
                    </td>
                  </tr>

                  {isExpanded && (
                    <tr className="bg-gray-100">
                      <td colSpan="4" className="px-6 py-4">
                        <div>
                          <h3 className="font-semibold mb-2 text-gray-700">
                            Products for {user.user_name}
                          </h3>
                          {user.wishlist_items.length > 0 ? (
                            <ul className="list-disc list-inside text-sm text-gray-800">
                              {user.wishlist_items.map((item) => (
                                <li key={item.wishlist_id}>
                                  <span className="font-medium">{item.product_name}</span>{" "}
                                  (ID: {item.product_id}) —{" "}
                                  {new Date(item.created_at).toLocaleString()}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-sm text-gray-500">No products in wishlist.</p>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {usersArray.length === 0 && (
        <p className="text-gray-600 mt-6">No wishlist items found.</p>
      )}
    </div>
  );
};

export default Wishlist;
