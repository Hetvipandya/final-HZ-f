export default function UserDetailsModal({ user, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md p-6 rounded shadow">

        <h3 className="text-xl font-heading font-bold mb-4 text-primary">
          User Details
        </h3>

        <p className="mb-2">
          <strong>Name:</strong> {user.name}
        </p>
        <p className="mb-2">
          <strong>Email:</strong> {user.email}
        </p>
        <p className="mb-2">
          <strong>Phone:</strong> {user.phone}
        </p>
        <p className="mb-2">
          <strong>Role:</strong> {user.role}
        </p>
        <p className="mb-4">
          <strong>Status:</strong>{" "}
          <span
            className={`px-2 py-1 rounded text-sm ${
              user.status === "Active"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {user.status}
          </span>
        </p>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
