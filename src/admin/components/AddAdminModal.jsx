import { useState } from "react";
import { FiX } from "react-icons/fi";

export default function AddAdminModal({ onClose, onSave }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "Admin",
    status: "Active",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      
      <div className="bg-white w-full max-w-md rounded shadow-lg p-6 relative top-20">

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          <FiX size={20} />
        </button>

        <h2 className="text-2xl font-heading font-bold mb-6 text-primary">
          Add New Admin
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* NAME */}
          <div>
            <label className="font-semibold block mb-1">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
              required
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="font-semibold block mb-1">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
              required
            />
          </div>

          {/* PHONE */}
          <div>
            <label className="font-semibold block mb-1">Phone</label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
              required
            />
          </div>

          {/* STATUS */}
          <div>
            <label className="font-semibold block mb-1">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
            >
              <option value="Active">Active</option>
              <option value="Blocked">Blocked</option>
            </select>
          </div>

          {/* ACTIONS */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-primary text-white rounded"
            >
              Add Admin
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
