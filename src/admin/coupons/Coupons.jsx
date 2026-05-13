import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Coupons() {
  const navigate = useNavigate();

  const [coupons, setCoupons] = useState([
    {
      id: 1,
      code: "SAVE10",
      discount: 10,
      expiry: "2025-12-31",
      status: "Active",
    },
    {
      id: 2,
      code: "NEW20",
      discount: 20,
      expiry: "2024-06-30",
      status: "Inactive",
    },
  ]);

  const deleteCoupon = (id) => {
    if (window.confirm("Delete this coupon?")) {
      setCoupons(coupons.filter((c) => c.id !== id));
    }
  };

  const statusBadge = (status) =>
    status === "Active"
      ? "bg-green-100 text-green-700"
      : "bg-red-100 text-red-700";

  return (
    <>
      {/* HEADER */}
      <div className="flex justify-between items-start md:items-center mb-6 md:flex-row flex-col gap-2 ">
        <h2 className="text-2xl font-heading font-bold text-primary">
          Coupon Management
        </h2>

        <button
          onClick={() => navigate("/admin/coupons/add")}
          className="bg-primary text-white px-4 py-2 rounded"
        >
          + Add Coupon
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-primary/70 text-white">
            <tr>
              <th className="p-3 text-left">Code</th>
              <th className="p-3 text-left">Discount %</th>
              <th className="p-3 text-left">Expiry Date</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {coupons.map((coupon) => (
              <tr key={coupon.id} className="border-t">
                <td className="p-3 font-semibold">{coupon.code}</td>
                <td className="p-3">{coupon.discount}%</td>
                <td className="p-3">{coupon.expiry}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded text-xs font-semibold ${statusBadge(
                      coupon.status
                    )}`}
                  >
                    {coupon.status}
                  </span>
                </td>
                <td className="p-3 text-center space-x-3">
                  <button
                    onClick={() =>
                      navigate(`/admin/coupons/edit/${coupon.id}`)
                    }
                    className="text-blue-600"
                  >
                    <FaEdit />
                  </button>

                  <button
                    onClick={() => deleteCoupon(coupon.id)}
                    className="text-red-600"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
