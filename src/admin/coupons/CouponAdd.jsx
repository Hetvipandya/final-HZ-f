import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CouponAdd() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    code: "",
    discount: "",
    expiry: "",
    status: "Active",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("NEW COUPON:", form);
    navigate("/admin/coupons");
  };

  return (
    <div className="bg-white p-6 rounded shadow ">
      <h2 className="text-2xl font-heading font-bold mb-6 text-primary">
        Add Coupon
      </h2>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label className="font-semibold block mb-1">Coupon Code</label>
          <input
            name="code"
            value={form.code}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="font-semibold block mb-1">Discount (%)</label>
          <input
            name="discount"
            type="number"
            value={form.discount}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="font-semibold block mb-1">Expiry Date</label>
          <input
            name="expiry"
            type="date"
            value={form.expiry}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="font-semibold block mb-1">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          >
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={() => navigate("/admin/coupons")}
            className="border px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-primary text-white px-5 py-2 rounded"
          >
            Save Coupon
          </button>
        </div>
      </form>
    </div>
  );
}
