import { useState } from "react";
import { FaCheck, FaTimes, FaMoneyBillWave } from "react-icons/fa";

export default function ReturnsRefunds() {
  /* ---------------- RETURNS DATA ---------------- */
  const [returns, setReturns] = useState([
    {
      id: 1,
      orderId: "ORD-1023",
      user: "Rahul Sharma",
      reason: "Wrong Size",
      status: "Pending",
    },
    {
      id: 2,
      orderId: "ORD-1041",
      user: "Anita Patel",
      reason: "Damaged Product",
      status: "Approved",
    },
  ]);

  /* ---------------- REFUNDS DATA ---------------- */
  const [refunds, setRefunds] = useState([
    {
      id: 1,
      orderId: "ORD-1041",
      amount: 1499,
      status: "Pending",
    },
    {
      id: 2,
      orderId: "ORD-1012",
      amount: 799,
      status: "Processed",
    },
  ]);

  /* ---------------- HELPERS ---------------- */
  const statusBadge = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Approved":
        return "bg-green-100 text-green-700";
      case "Rejected":
        return "bg-red-100 text-red-700";
      case "Processed":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  /* ---------------- RETURN ACTIONS ---------------- */
  const approveReturn = (id) => {
    setReturns(
      returns.map((r) =>
        r.id === id ? { ...r, status: "Approved" } : r
      )
    );
  };

  const rejectReturn = (id) => {
    setReturns(
      returns.map((r) =>
        r.id === id ? { ...r, status: "Rejected" } : r
      )
    );
  };

  /* ---------------- REFUND ACTIONS ---------------- */
  const processRefund = (id) => {
    setRefunds(
      refunds.map((r) =>
        r.id === id ? { ...r, status: "Processed" } : r
      )
    );
  };

  return (
    <>
      {/* PAGE TITLE */}
      <h2 className="text-2xl font-heading font-bold mb-6 text-primary">
        Returns & Refunds Management
      </h2>

      {/* ================= RETURNS TABLE ================= */}
      <div className="bg-white rounded shadow mb-10 overflow-x-auto">
        <h3 className="text-lg font-semibold p-4 border-b text-primary">
          Return Requests
        </h3>

        <table className="w-full text-sm">
          <thead className="bg-primary/70 text-light">
            <tr>
              <th className="p-3 text-left">Order ID</th>
              <th className="p-3 text-left">User</th>
              <th className="p-3 text-left">Reason</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {returns.map((ret) => (
              <tr key={ret.id} className="border-t">
                <td className="p-3 font-semibold">{ret.orderId}</td>
                <td className="p-3">{ret.user}</td>
                <td className="p-3">{ret.reason}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded text-xs font-semibold ${statusBadge(
                      ret.status
                    )}`}
                  >
                    {ret.status}
                  </span>
                </td>
                <td className="p-3 text-center space-x-3">
                  {ret.status === "Pending" && (
                    <>
                      <button
                        onClick={() => approveReturn(ret.id)}
                        className="text-green-600"
                        title="Approve"
                      >
                        <FaCheck />
                      </button>
                      <button
                        onClick={() => rejectReturn(ret.id)}
                        className="text-red-600"
                        title="Reject"
                      >
                        <FaTimes />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= REFUNDS TABLE ================= */}
      <div className="bg-white rounded shadow overflow-x-auto">
        <h3 className="text-lg font-semibold p-4 border-b text-primary">
          Refund Requests
        </h3>

        <table className="w-full text-sm">
          <thead className="bg-primary/70 text-light">
            <tr>
              <th className="p-3 text-left">Order ID</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {refunds.map((ref) => (
              <tr key={ref.id} className="border-t">
                <td className="p-3 font-semibold">{ref.orderId}</td>
                <td className="p-3">₹{ref.amount}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded text-xs font-semibold ${statusBadge(
                      ref.status
                    )}`}
                  >
                    {ref.status}
                  </span>
                </td>
                <td className="p-3 text-center">
                  {ref.status === "Pending" && (
                    <button
                      onClick={() => processRefund(ref.id)}
                      className="text-blue-600"
                      title="Process Refund"
                    >
                      <FaMoneyBillWave />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
