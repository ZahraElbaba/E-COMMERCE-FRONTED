import React, { useState, useEffect } from "react";

// Child component to display and manage a shipping address
const ShippingAddressDetails = ({ addressId, addressMap, refreshAddress }) => {
  const address = addressMap[addressId];
  const [showEditModal, setShowEditModal] = useState(false);
  const [localAddress, setLocalAddress] = useState(address);

  useEffect(() => {
    setLocalAddress(address);
  }, [address]);

  if (!localAddress) {
    return <p>Address not found or deleted.</p>;
  }

  // Show/Hide Edit Modal
  const handleShowEdit = () => setShowEditModal(true);
  const handleHideEdit = () => setShowEditModal(false);

  // Submit the edit form
  const handleEditAddress = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/shipping-address/${localAddress.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          city: localAddress.city,
          building: localAddress.building,
          floor: localAddress.floor,
          street: localAddress.street,
          user_id: localAddress.user_id,
        }),
      });
      if (!res.ok) {
        throw new Error(`Update failed with status ${res.status}`);
      }
      await refreshAddress(localAddress.id);
      setShowEditModal(false);
      alert("Address updated successfully!");
    } catch (err) {
      alert("Error updating address: " + err.message);
    }
  };

  // Delete the address
  const handleDeleteAddress = async () => {
    if (!window.confirm("Are you sure you want to delete this shipping address?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/shipping-address/${localAddress.id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error(`Delete failed with status ${res.status}`);
      }
      setLocalAddress(null); // Mark it deleted in the UI
      alert("Address deleted!");
    } catch (err) {
      alert("Error deleting address: " + err.message);
    }
  };

  return (
    <div className="border p-4 rounded bg-white">
      <h4 className="font-semibold mb-2">Shipping Address #{localAddress.id}</h4>
      <p>City: {localAddress.city}</p>
      <p>Building: {localAddress.building}</p>
      <p>Floor: {localAddress.floor}</p>
      <p>Street: {localAddress.street}</p>
      <p>User ID: {localAddress.user_id}</p>
      <div className="mt-2">
        <button
          className="mr-2 px-2 py-1 bg-blue-500 text-white rounded"
          onClick={handleShowEdit}
        >
          Edit Address
        </button>
        <button
          className="px-2 py-1 bg-red-500 text-white rounded"
          onClick={handleDeleteAddress}
        >
          Delete Address
        </button>
      </div>

      {/* Edit Address Modal */}
      {showEditModal && localAddress && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-white p-6 rounded w-96">
            <h3 className="text-xl font-bold mb-4">
              Edit Address #{localAddress.id}
            </h3>
            <form onSubmit={handleEditAddress} className="space-y-4">
              <div>
                <label className="block mb-1">City</label>
                <input
                  type="text"
                  value={localAddress.city}
                  onChange={(e) =>
                    setLocalAddress({ ...localAddress, city: e.target.value })
                  }
                  className="w-full border px-2 py-1"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Building</label>
                <input
                  type="text"
                  value={localAddress.building}
                  onChange={(e) =>
                    setLocalAddress({ ...localAddress, building: e.target.value })
                  }
                  className="w-full border px-2 py-1"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Floor</label>
                <input
                  type="text"
                  value={localAddress.floor}
                  onChange={(e) =>
                    setLocalAddress({ ...localAddress, floor: e.target.value })
                  }
                  className="w-full border px-2 py-1"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Street</label>
                <input
                  type="text"
                  value={localAddress.street}
                  onChange={(e) =>
                    setLocalAddress({ ...localAddress, street: e.target.value })
                  }
                  className="w-full border px-2 py-1"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">User ID</label>
                <input
                  type="number"
                  value={localAddress.user_id}
                  onChange={(e) =>
                    setLocalAddress({ ...localAddress, user_id: e.target.value })
                  }
                  className="w-full border px-2 py-1"
                  required
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 rounded"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-green-800 text-white rounded">
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

// Main Shipping component
export default function Shipping() {
  const [shippingData, setShippingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // For adding a shipping record
  const [showAddModal, setShowAddModal] = useState(false);
  const [newShipping, setNewShipping] = useState({
    order_id: "",
    shipping_address_id: "", // might be null or 0 if no address yet
    shipping_amount: "",
  });

  // For editing a shipping record
  const [editingShipping, setEditingShipping] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  // For collapsible address
  const [expandedShippingId, setExpandedShippingId] = useState(null);
  // Map of addresses: { addressId: { ... } }
  const [addressMap, setAddressMap] = useState({});

  // =========================
  // 1. Fetch Shipping
  // =========================
  const fetchShipping = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/shipping");
      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }
      const data = await res.json();
      setShippingData(data.data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShipping();
  }, []);

  // Refresh a single address
  const refreshAddress = async (addressId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/shipping-address/${addressId}`);
      if (!res.ok) {
        throw new Error(`Failed to refresh address #${addressId}`);
      }
      const data = await res.json();
      setAddressMap((prev) => ({
        ...prev,
        [addressId]: data.data,
      }));
    } catch (err) {
      alert(err.message);
    }
  };

  // =========================
  // 2. Collapse/Expand Address
  // =========================
  const handleToggleAddress = async (ship) => {
    if (expandedShippingId === ship.id) {
      setExpandedShippingId(null);
    } else {
      setExpandedShippingId(ship.id);
      const addressId = ship.shipping_address_id;
      if (addressId && !addressMap[addressId]) {
        try {
          const res = await fetch(`http://localhost:5000/api/shipping-address/${addressId}`);
          if (!res.ok) {
            throw new Error(`Failed to fetch address #${addressId}`);
          }
          const data = await res.json();
          setAddressMap((prev) => ({
            ...prev,
            [addressId]: data.data,
          }));
        } catch (err) {
          alert(err.message);
        }
      }
    }
  };

  // =========================
  // 3. Create Shipping
  // =========================
  const handleShowAddModal = () => {
    setNewShipping({
      order_id: "",
      shipping_address_id: "", // or 0 if you prefer
      shipping_amount: "",
    });
    setShowAddModal(true);
  };

  const handleHideAddModal = () => {
    setShowAddModal(false);
  };

  const handleNewShippingChange = (e) => {
    const { name, value } = e.target;
    setNewShipping((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateShipping = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/shipping", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newShipping),
      });
      if (!res.ok) {
        throw new Error(`Create failed with status ${res.status}`);
      }
      fetchShipping();
      setShowAddModal(false);
    } catch (err) {
      alert("Error creating shipping record: " + err.message);
    }
  };

  // =========================
  // 4. Edit Shipping
  // =========================
  const handleShowEditModal = (ship) => {
    setEditingShipping(ship);
    setShowEditModal(true);
  };

  const handleHideEditModal = () => {
    setEditingShipping(null);
    setShowEditModal(false);
  };

  const handleEditShippingChange = (e) => {
    const { name, value } = e.target;
    setEditingShipping((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditShippingSubmit = async (e) => {
    e.preventDefault();
    if (!editingShipping) return;
    try {
      const res = await fetch(`http://localhost:5000/api/shipping/${editingShipping.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          shipping_address_id: editingShipping.shipping_address_id,
          shipping_amount: editingShipping.shipping_amount,
        }),
      });
      if (!res.ok) {
        throw new Error(`Update failed with status ${res.status}`);
      }
      fetchShipping();
      setShowEditModal(false);
    } catch (err) {
      alert("Error updating shipping record: " + err.message);
    }
  };

  // =========================
  // 5. Delete Shipping
  // =========================
  const handleDeleteShipping = async (id) => {
    if (!window.confirm("Are you sure you want to delete this shipping record?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/shipping/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error(`Delete failed with status ${res.status}`);
      }
      fetchShipping();
    } catch (err) {
      alert("Error deleting shipping record: " + err.message);
    }
  };

  // =========================
  // 6. Render
  // =========================
  if (loading) return <p>Loading shipping data...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Shipping</h2>
        <button onClick={handleShowAddModal} className="px-4 py-2 bg-green-800 text-white rounded">
          ADD Shipping
        </button>
      </div>

      <table className="min-w-full text-left border-collapse mb-8">
        <thead className="border-b">
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Order ID</th>
            <th className="px-4 py-2">Shipping Address ID</th>
            <th className="px-4 py-2">Shipping Amount</th>
            <th className="px-4 py-2">Address</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {shippingData.map((ship) => {
            const isExpanded = expandedShippingId === ship.id;
            return (
              <React.Fragment key={ship.id}>
                <tr className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{ship.id}</td>
                  <td className="px-4 py-2">{ship.order_id}</td>
                  <td className="px-4 py-2">{ship.shipping_address_id}</td>
                  <td className="px-4 py-2">{ship.shipping_amount}</td>
                  <td className="px-4 py-2">
                    <button
                      className="px-2 py-1 bg-blue-500 text-white rounded"
                      onClick={() => handleToggleAddress(ship)}
                    >
                      {isExpanded ? "Hide Address" : "Show Address"}
                    </button>
                  </td>
                  <td className="px-4 py-2">
                    <button
                      className="mr-2 px-2 py-1 bg-blue-500 text-white rounded"
                      onClick={() => handleShowEditModal(ship)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-2 py-1 bg-red-500 text-white rounded"
                      onClick={() => handleDeleteShipping(ship.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
                {isExpanded && (
                  <tr>
                    <td colSpan={6} className="p-4 bg-gray-100">
                      {ship.shipping_address_id ? (
                        <ShippingAddressDetails
                          addressId={ship.shipping_address_id}
                          addressMap={addressMap}
                          refreshAddress={refreshAddress}
                        />
                      ) : (
                        <p>No address linked.</p>
                      )}
                    </td>
                  </tr>
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>

      {/* =========================
          Modal for Adding Shipping
         ========================= */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded w-96">
            <h3 className="text-xl font-bold mb-4">Add Shipping Record</h3>
            <form onSubmit={handleCreateShipping} className="space-y-4">
              <div>
                <label className="block mb-1">Order ID</label>
                <input
                  type="number"
                  name="order_id"
                  value={newShipping.order_id}
                  onChange={handleNewShippingChange}
                  className="w-full border px-2 py-1"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Shipping Address ID</label>
                <input
                  type="text"
                  name="shipping_address_id"
                  value={newShipping.shipping_address_id}
                  onChange={handleNewShippingChange}
                  className="w-full border px-2 py-1"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Shipping Amount</label>
                <input
                  type="number"
                  step="0.01"
                  name="shipping_amount"
                  value={newShipping.shipping_amount}
                  onChange={handleNewShippingChange}
                  className="w-full border px-2 py-1"
                  required
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 rounded"
                  onClick={handleHideAddModal}
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-green-800 text-white rounded">
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================
          Modal for Editing Shipping
         ========================= */}
      {showEditModal && editingShipping && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded w-96">
            <h3 className="text-xl font-bold mb-4">Edit Shipping #{editingShipping.id}</h3>
            <form onSubmit={handleEditShippingSubmit} className="space-y-4">
              <div>
                <label className="block mb-1">Shipping Address ID</label>
                <input
                  type="text"
                  name="shipping_address_id"
                  value={editingShipping.shipping_address_id}
                  onChange={handleEditShippingChange}
                  className="w-full border px-2 py-1"
                />
              </div>
              <div>
                <label className="block mb-1">Shipping Amount</label>
                <input
                  type="number"
                  step="0.01"
                  name="shipping_amount"
                  value={editingShipping.shipping_amount}
                  onChange={handleEditShippingChange}
                  className="w-full border px-2 py-1"
                  required
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 rounded"
                  onClick={handleHideEditModal}
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-green-800 text-white rounded">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
