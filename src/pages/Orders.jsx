import React, { useState, useEffect } from "react";
import Table from "../components/Table";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // For editing an order
  const [editingOrder, setEditingOrder] = useState(null);
  
  // Define columns for the orders table with Actions column
  const columns = [
    { Header: "Order ID", accessor: "id" },
    { Header: "User ID", accessor: "user_id" },
    { Header: "Order Date", accessor: "order_date" },
    { Header: "Total Amount", accessor: "total_amount" },
    { Header: "Status", accessor: "status" },
    {
      Header: "Actions",
      Cell: (row) => (
        <div>
          <button
            onClick={() => setEditingOrder(row)}
            className="mr-2 px-2 py-1 bg-blue-500 text-white rounded"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(row.id)}
            className="px-2 py-1 bg-red-500 text-white rounded"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  // Fetch orders from backend
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/orders");
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      const data = await response.json();
      setOrders(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Delete order function
  const handleDelete = async (orderId) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        const response = await fetch(`http://localhost:5000/api/orders/${orderId}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error(`Delete failed with status ${response.status}`);
        }
        // Refresh orders after deletion
        fetchOrders();
      } catch (err) {
        alert("Error deleting order: " + err.message);
      }
    }
  };

  // Update order function for editing
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editingOrder) return;
    try {
      const response = await fetch(`http://localhost:5000/api/orders/${editingOrder.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editingOrder),
      });
      if (!response.ok) {
        throw new Error(`Update failed with status ${response.status}`);
      }
      // Refresh orders and close modal
      fetchOrders();
      setEditingOrder(null);
    } catch (err) {
      alert("Error updating order: " + err.message);
    }
  };

  // Handle form input changes for the editing order
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingOrder((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <Table title="Orders" columns={columns} data={orders} />
      
      {/* Modal for editing an order */}
      {editingOrder && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-md p-6 w-96">
            <h2 className="text-xl font-bold mb-4">Edit Order #{editingOrder.id}</h2>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block mb-1">User ID</label>
                <input
                  type="number"
                  name="user_id"
                  value={editingOrder.user_id}
                  onChange={handleInputChange}
                  className="w-full border px-2 py-1"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Order Date</label>
                <input
                  type="datetime-local"
                  name="order_date"
                  value={new Date(editingOrder.order_date).toISOString().slice(0, 16)}
                  onChange={handleInputChange}
                  className="w-full border px-2 py-1"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Total Amount</label>
                <input
                  type="number"
                  step="0.01"
                  name="total_amount"
                  value={editingOrder.total_amount}
                  onChange={handleInputChange}
                  className="w-full border px-2 py-1"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Status</label>
                <select
                  name="status"
                  value={editingOrder.status}
                  onChange={handleInputChange}
                  className="w-full border px-2 py-1"
                  required
                >
                  <option value="IN_PROGRESS">IN_PROGRESS</option>
                  <option value="DONE">DONE</option>
                  <option value="DELIVERED">DELIVERED</option>
                  <option value="CANCELLED">CANCELLED</option>
                </select>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setEditingOrder(null)}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
