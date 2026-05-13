import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import BASE_URL from "../../BASEURL";

const backendUrl =
  process.env.REACT_APP_BACKEND_URL || BASE_URL;

export default function CategoryAdd() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    status: "Active",
    image: null,
  });

  const [preview, setPreview] = useState(null);

  // HANDLE TEXT & SELECT
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  // HANDLE IMAGE
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setForm({
      ...form,
      image: file,
    });

    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(form);

    if (!form.name || !form.image) {
      toast.error("Name and Image are required");
      return;
    }

    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("status", form.status);
    formData.append("image", form.image);

    try {
      const response = await fetch(
        `${backendUrl}/api/category/create`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (data.success) {
        toast.success(
          "Category created successfully"
        );

        navigate("/admin/categories");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);

      toast.error("Server Error");
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-6">
        Add Category
      </h2>

      <form
        className="space-y-5"
        onSubmit={handleSubmit}
      >
        {/* IMAGE */}
        <div>
          <label className="font-semibold block mb-1">
            Category Image
          </label>

          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border px-4 py-2 rounded"
          />

          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-3 h-32 w-32 object-cover rounded border"
            />
          )}
        </div>

        {/* NAME */}
        <div>
          <label className="font-semibold block mb-1">
            Category Name
          </label>

          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
            required
          />
        </div>

        {/* STATUS */}
        <div>
          <label className="font-semibold block mb-1">
            Status
          </label>

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          >
            <option value="Active">
              Active
            </option>

            <option value="Inactive">
              Inactive
            </option>
          </select>
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={() =>
              navigate("/admin/categories")
            }
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-5 py-2 bg-primary text-white rounded"
          >
            Save Category
          </button>
        </div>
      </form>
    </div>
  );
}