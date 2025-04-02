import React, { useState, useEffect } from "react";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // For adding a new category
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  // For editing a category
  const [editingCategory, setEditingCategory] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  // =========================
  // 1. Fetch Categories
  // =========================
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/categories");
      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }
      const data = await res.json();
      // Our API returns { data: [...], message: "", error: null }
      setCategories(data.data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // =========================
  // 2. Show/Hide Modals
  // =========================
  const handleShowAddModal = () => {
    setNewCategoryName("");
    setShowAddModal(true);
  };

  const handleHideAddModal = () => {
    setShowAddModal(false);
    setNewCategoryName("");
  };

  const handleShowEditModal = (category) => {
    setEditingCategory(category);
    setShowEditModal(true);
  };

  const handleHideEditModal = () => {
    setEditingCategory(null);
    setShowEditModal(false);
  };

  // =========================
  // 3. Create Category
  // =========================
  const handleCreateCategory = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newCategoryName }),
      });
      if (!res.ok) {
        throw new Error(`Create failed with status ${res.status}`);
      }
      // Refresh list
      fetchCategories();
      handleHideAddModal();
    } catch (err) {
      alert("Error creating category: " + err.message);
    }
  };

  // =========================
  // 4. Edit Category
  // =========================
  const handleEditCategory = async (e) => {
    e.preventDefault();
    if (!editingCategory) return;

    try {
      const res = await fetch(`http://localhost:5000/api/categories/${editingCategory.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editingCategory.name }),
      });
      if (!res.ok) {
        throw new Error(`Update failed with status ${res.status}`);
      }
      // Refresh list
      fetchCategories();
      handleHideEditModal();
    } catch (err) {
      alert("Error updating category: " + err.message);
    }
  };

  // =========================
  // 5. Delete Category
  // =========================
  const handleDeleteCategory = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/categories/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error(`Delete failed with status ${res.status}`);
      }
      // Refresh list
      fetchCategories();
    } catch (err) {
      alert("Error deleting category: " + err.message);
    }
  };

  // =========================
  // 6. Render
  // =========================
  if (loading) return <p>Loading categories...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Categories</h2>
        <button
          onClick={handleShowAddModal}
          className="px-4 py-2 bg-green-800 text-white rounded"
        >
          ADD Category
        </button>
      </div>

      {/* Categories Table */}
      <table className="min-w-full text-left border-collapse mb-8">
        <thead className="border-b">
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat.id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2">{cat.id}</td>
              <td className="px-4 py-2">{cat.name}</td>
              <td className="px-4 py-2">
                <button
                  className="mr-2 px-2 py-1 bg-blue-500 text-white rounded"
                  onClick={() => handleShowEditModal(cat)}
                >
                  Edit
                </button>
                <button
                  className="px-2 py-1 bg-red-500 text-white rounded"
                  onClick={() => handleDeleteCategory(cat.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* =========================
          Modal for Adding a Category
         ========================= */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded w-96">
            <h3 className="text-xl font-bold mb-4">Add Category</h3>
            <form onSubmit={handleCreateCategory} className="space-y-4">
              <div>
                <label className="block mb-1">Category Name</label>
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
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
          Modal for Editing a Category
         ========================= */}
      {showEditModal && editingCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded w-96">
            <h3 className="text-xl font-bold mb-4">Edit Category #{editingCategory.id}</h3>
            <form onSubmit={handleEditCategory} className="space-y-4">
              <div>
                <label className="block mb-1">Category Name</label>
                <input
                  type="text"
                  value={editingCategory.name}
                  onChange={(e) =>
                    setEditingCategory((prev) => ({ ...prev, name: e.target.value }))
                  }
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
};

export default Categories;
