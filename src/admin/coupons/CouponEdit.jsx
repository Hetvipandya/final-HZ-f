import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function CouponEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock fetch by ID
  const [form, setForm] = useState({
    code: "SAVE10",
    discount: 10,
    expiry: "2025-12-31",
    status: "Active",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("UPDATED COUPON:", id, form);
    navigate("/admin/coupons");
  };

  return (
    <div className="bg-white p-6 rounded shadow ">
      <h2 className="text-2xl font-heading font-bold mb-6 text-primary">
        Edit Coupon
      </h2>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <input
          name="code"
          value={form.code}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        />

        <input
          name="discount"
          type="number"
          value={form.discount}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        />

        <input
          name="expiry"
          type="date"
          value={form.expiry}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        />

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        >
          <option>Active</option>
          <option>Inactive</option>
        </select>

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={() => navigate("/admin/coupons")}
            className="border px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button className="bg-primary text-white px-5 py-2 rounded">
            Update Coupon
          </button>
        </div>
      </form>
    </div>
  );
}
