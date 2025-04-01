import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UsersD = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "USER",
  });
  
  // Fetch all users
  const fetchUsers = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      if (!token) throw new Error("No token found");

      const res = await fetch("http://localhost:5000/api/user/allusers", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error(`Error: ${res.status}`);
      const data = await res.json();
      setUsers(data.data);
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Add user (submit form)
  const handleAddUser = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newUser),
      });

      if (!res.ok) throw new Error(`Failed to add user`);

      toast.success("User added successfully!");
      setShowAddModal(false);
      fetchUsers();
    } catch (err) {
      toast.error("Error adding user: " + err.message);
    }
  };

  // Delete user
  const handleDeleteUser = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this user?");
    if (!confirm) return;
  
    const token = localStorage.getItem("token");
  
    try {
      const res = await fetch(`http://localhost:5000/api/user/deleteuser/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!res.ok) throw new Error("Failed to delete user");
  
      toast.success("✅ User deleted successfully!");
      fetchUsers();
    } catch (err) {
      toast.error("❌ " + err.message);
    }
  };
  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Users</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Add User
        </button>
      </div>

      <table className="min-w-full bg-white shadow rounded overflow-hidden">
        <thead className="bg-black text-white">
          <tr>
            {"ID Name Email Phone Role Created Actions".split(" ").map((head) => (
              <th key={head} className="px-4 py-2 text-left text-sm">
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map((u, i) => (
            <tr key={u.id} className="border-b hover:bg-gray-100">
              <td className="px-4 py-2">{u.id}</td>
              <td className="px-4 py-2">{u.name}</td>
              <td className="px-4 py-2">{u.email}</td>
              <td className="px-4 py-2">{u.phone}</td>
              <td className="px-4 py-2">{u.role}</td>
              <td className="px-4 py-2">{new Date(u.created_at).toLocaleString()}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => handleDeleteUser(u.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <form
            onSubmit={handleAddUser}
            className="bg-white p-6 rounded w-96 shadow space-y-4"
          >
            <h2 className="text-xl font-bold">Add New User</h2>
            {Object.entries(newUser).map(([field, value]) => (
              field !== "role" && (
                <div key={field}>
                  <label className="block capitalize">{field}</label>
                  <input
                    type={field === "password" ? "password" : "text"}
                    className="w-full border px-2 py-1"
                    required
                    value={value}
                    onChange={(e) =>
                      setNewUser((prev) => ({ ...prev, [field]: e.target.value }))
                    }
                  />
                </div>
              )
            ))}
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button type="submit" className="bg-green-700 text-white px-4 py-2 rounded">
                Add
              </button>
            </div>
          </form>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default UsersD;