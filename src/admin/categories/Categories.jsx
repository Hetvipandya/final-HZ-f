import { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import BASE_URL, { getImageUrl } from "../../BASEURL";

const backendUrl = process.env.REACT_APP_BACKEND_URL || BASE_URL;

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
 
  const navigate = useNavigate();
  const location = useLocation();

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${backendUrl}/api/category`);
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to load categories");
      }

      setCategories(data.data || []);
      setError("");
    } catch (err) {
      console.error("Fetch categories error:", err);
      setError(err.message || "Unable to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [location]);

  const deleteCategory = async (id) => {
    if (!window.confirm("Delete this category?")) return;

    try {
      const response = await fetch(`${backendUrl}/api/category/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Could not delete category");
      }

      setCategories((prev) => prev.filter((category) => (category._id || category.id) !== id));
    } catch (err) {
      console.error("Delete category error:", err);
      window.alert(err.message || "Failed to delete category.");
    }
  };

  const statusBadge = (status) =>
    "bg-green-100 text-green-700";

  const fallbackImage =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='56'%3E%3Crect width='100%25' height='100%25' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23717d7f' font-size='10'%3ENo Image%3C/text%3E%3C/svg%3E";

const getSafeImageSrc = (src) => {
  if (!src || typeof src !== "string") return fallbackImage;

  const trimmed = src.trim();

  // ✅ Cloudinary URL (MAIN CASE)
  if (trimmed.startsWith("http")) {
    return trimmed;
  }

  // ❌ If somehow old/local path still exists
  if (
    trimmed.includes("C:/") ||
    trimmed.includes("D:/") ||
    trimmed.includes("E:/")
  ) {
    return fallbackImage;
  }

  // ❌ Any non-http fallback
  return getImageUrl(trimmed, fallbackImage);
};

  if (loading) {
    return <p>Loading categories...</p>;
  }

  return (
    <>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-heading font-bold text-primary">
          Categories
        </h2>

        <Link to="/admin/categories/add"
          className="bg-primary text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <FaPlus /> Add Category
        </Link>
      </div>

      {error ? (
        <div className="bg-red-50 text-red-700 p-4 rounded mb-4">
          {error}
        </div>
      ) : null}

      {/* TABLE */}
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-primary/70 text-light">
            <tr>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {categories.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-6 text-center text-gray-500">
                  No categories found.
                </td>
              </tr>
            ) : (
              categories.map((category) => {
                const categoryId = category._id || category.id;
                const imageSrc = getSafeImageSrc(category.image);

                return (
                  <tr key={categoryId} className="border-t">
                    <td className="p-3 font-semibold">
                      <img
                        src={imageSrc}
                        alt={category.name}
                        className="h-14 w-14 object-cover rounded"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = fallbackImage;
                        }}
                      />
                    </td>
                    <td className="p-3 font-semibold">{category.name}</td>
                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded text-xs font-semibold ${statusBadge(
                          category.status
                        )}`}
                      >
                        {category.status}
                      </span>
                    </td>
                    <td className="p-3 text-center space-x-3">
                      <button
                        onClick={() => navigate(`/admin/categories/edit/${categoryId}`)}
                        className="text-blue-600"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>

                      <button
                        onClick={() => deleteCategory(categoryId)}
                        className="text-red-600"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
