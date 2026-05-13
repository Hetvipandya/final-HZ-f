import { useState } from "react";
import { FaCheck, FaBan, FaTrash } from "react-icons/fa";

export default function Reviews() {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      product: "Vedic Vastukkalp",
      user: "Bhavya Shah",
      rating: 4,
      status: "Approved",
    },
    {
      id: 2,
      product: "Charoit Rath",
      user: "Patel Parth",
      rating: 5,
      status: "Pending",
    },
    {
      id: 3,
      product: "Ayudh Frame",
      user: "Pandya Hetvi",
      rating: 2,
      status: "Rejected",
    },
  ]);

  /* TOGGLE APPROVE / DISAPPROVE */
  const toggleStatus = (id) => {
    setReviews(
      reviews.map((review) =>
        review.id === id
          ? {
              ...review,
              status:
                review.status === "Approved" ? "Rejected" : "Approved",
            }
          : review
      )
    );
  };

  /* DELETE REVIEW */
  const deleteReview = (id) => {
    if (window.confirm("Delete this review?")) {
      setReviews(reviews.filter((r) => r.id !== id));
    }
  };

  /* STATUS BADGE */
  const statusBadge = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const approvedCount = reviews.filter((review) => review.status === "Approved").length;
  const pendingCount = reviews.filter((review) => review.status === "Pending").length;
  const rejectedCount = reviews.filter((review) => review.status === "Rejected").length;

  return (
    <>
      <div className="mb-6 rounded-xl bg-white border border-slate-200 p-5 shadow-sm">
        <h2 className="text-2xl font-heading font-bold text-slate-900 mb-2">
          Reviews Management
        </h2>
        <p className="text-sm text-slate-500">
          Monitor and manage product reviews with clear status controls.
        </p>
        <div className="mt-5 flex flex-wrap gap-3 sm:items-center">
          <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">
            Total reviews: {reviews.length}
          </span>
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm text-emerald-700">
            Approved: {approvedCount}
          </span>
          <span className="rounded-full bg-amber-100 px-3 py-1 text-sm text-amber-700">
            Pending: {pendingCount}
          </span>
          <span className="rounded-full bg-rose-100 px-3 py-1 text-sm text-rose-700">
            Rejected: {rejectedCount}
          </span>
        </div>
      </div>

      <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full min-w-[900px] text-sm">
          <thead className="bg-slate-950 text-slate-50">
            <tr>
              <th className="p-4 text-left font-medium">Product</th>
              <th className="p-4 text-left font-medium">User</th>
              <th className="p-4 text-left font-medium">Rating</th>
              <th className="p-4 text-left font-medium">Status</th>
              <th className="p-4 text-center font-medium">Actions</th>
            </tr>
          </thead>

          <tbody>
            {reviews.map((review) => (
              <tr key={review.id} className="border-t border-slate-200 hover:bg-slate-50">
                <td className="p-4 font-semibold text-slate-900">{review.product}</td>
                <td className="p-4 text-slate-700">{review.user}</td>
                <td className="p-4 text-slate-700">⭐ {review.rating} / 5</td>
                <td className="p-4">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusBadge(review.status)}`}
                  >
                    {review.status}
                  </span>
                </td>
                <td className="p-4 text-center text-slate-700">
                  <div className="inline-flex items-center gap-3">
                    <button
                      onClick={() => toggleStatus(review.id)}
                      className="rounded-full border border-emerald-200 bg-emerald-50 p-2 text-emerald-600 transition hover:bg-emerald-100"
                      title="Approve / Disapprove"
                    >
                      {review.status === "Approved" ? <FaBan /> : <FaCheck />}
                    </button>
                    <button
                      onClick={() => deleteReview(review.id)}
                      className="rounded-full border border-rose-200 bg-rose-50 p-2 text-rose-600 transition hover:bg-rose-100"
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
