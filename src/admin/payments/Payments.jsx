import { useState } from "react";

export default function Payments() {
  const [payments] = useState([
    {
      id: 1,
      orderId: "ORD-1023",
      user: "Rahul Sharma",
      amount: 2499,
      method: "UPI",
      status: "Success",
    },
    {
      id: 2,
      orderId: "ORD-1028",
      user: "Anita Patel",
      amount: 1499,
      method: "Credit Card",
      status: "Pending",
    },
    {
      id: 3,
      orderId: "ORD-1035",
      user: "Vikram Singh",
      amount: 799,
      method: "Cash on Delivery",
      status: "Failed",
    },
  ]);

  const statusBadge = (status) => {
    switch (status) {
      case "Success":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Failed":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <>
      {/* PAGE TITLE */}
      <h2 className="text-2xl font-heading font-bold mb-6 text-primary">
        Payments
      </h2>

      {/* PAYMENTS TABLE */}
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-primary/70 text-light">
            <tr>
              <th className="p-3 text-left">Order ID</th>
              <th className="p-3 text-left">User</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Method</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id} className="border-t hover:bg-gray-50">
                <td className="p-3 font-semibold">
                  {payment.orderId}
                </td>
                <td className="p-3">{payment.user}</td>
                <td className="p-3 font-semibold">
                  ₹{payment.amount}
                </td>
                <td className="p-3">{payment.method}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded text-xs font-semibold ${statusBadge(
                      payment.status
                    )}`}
                  >
                    {payment.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
