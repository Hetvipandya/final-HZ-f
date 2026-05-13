import { useState } from "react";
import { FaEye, FaBan, FaTrash, FaUserPlus } from "react-icons/fa";
import UserDetailsModal from "../components/UserDetailsModal";
import AddAdminModal from "../components/AddAdminModal";

export default function Users() {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Rahul Sharma",
      email: "rahul@gmail.com",
      phone: "9876543210",
      role: "User",
      status: "Active",
    },
    {
      id: 2,
      name: "Anita Patel",
      email: "anita@gmail.com",
      phone: "9123456789",
      role: "User",
      status: "Blocked",
    },
    {
      id: 3,
      name: "Admin User",
      email: "admin@gmail.com",
      phone: "9999999999",
      role: "Admin",
      status: "Active",
    },
  ]);

  const [selectedUser, setSelectedUser] = useState(null);
  const [showAddAdmin, setShowAddAdmin] = useState(false);

  const toggleStatus = (id) => {
    setUsers(
      users.map((user) =>
        user.id === id
          ? {
              ...user,
              status: user.status === "Active" ? "Blocked" : "Active",
            }
          : user
      )
    );
  };

  const deleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  const addAdmin = (adminData) => {
    setUsers([
      ...users,
      {
        id: Date.now(),
        ...adminData,
        role: "Admin",
      },
    ]);
    setShowAddAdmin(false);
  };

  const statusBadge = (status) =>
    status === "Active"
      ? "bg-green-100 text-green-700"
      : "bg-red-100 text-red-700";

  return (
    <>
      {/* HEADER */}
      <div className="flex justify-between md:items-center mb-6 md:flex-row flex-col items-start gap-2">
        <h2 className="text-2xl font-heading font-bold text-primary">
          Users Management
        </h2>

        <button
          onClick={() => setShowAddAdmin(true)}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded"
        >
          <FaUserPlus /> Add Admin
        </button>
      </div>

      {/* USERS TABLE */}
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-primary/70">
            <tr className="text-light">
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="p-3 font-semibold">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.phone}</td>
                <td className="p-3">{user.role}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded text-xs font-semibold ${statusBadge(
                      user.status
                    )}`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="p-3 text-center space-x-3 space-y-3">
                  <button
                    onClick={() => setSelectedUser(user)}
                    className="text-primary"
                  >
                    <FaEye />
                  </button>

                  {user.role !== "Admin" && (
                    <>
                      <button
                        onClick={() => toggleStatus(user.id)}
                        className="text-yellow-600"
                      >
                        <FaBan />
                      </button>

                      <button
                        onClick={() => deleteUser(user.id)}
                        className="text-red-600"
                      >
                        <FaTrash />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODALS */}
      {selectedUser && (
        <UserDetailsModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}

      {showAddAdmin && (
        <AddAdminModal
          onClose={() => setShowAddAdmin(false)}
          onSave={addAdmin}
        />
      )}
    </>
  );
}
