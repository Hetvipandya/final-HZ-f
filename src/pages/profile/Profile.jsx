// import { useState, useEffect } from "react";
// import {
//   FaPlus, FaEdit, FaTrash, FaUserCircle,
//   FaSignOutAlt, FaEnvelope, FaPhoneAlt,
// } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import BASE_URL from "../../BASEURL";

// export default function Profile() {
//   const navigate = useNavigate();

//   const [profile, setProfile] = useState(null);
//   const [addresses, setAddresses] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [editAddress, setEditAddress] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // ================= LOAD PROFILE =================
//   const loadProfile = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       if (!token) {
//         navigate("/login");
//         return;
//       }

//       const res = await fetch(`${BASE_URL}/api/auth/profile`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const data = await res.json();

//       console.log("API RESPONSE:", data);

//       if (!res.ok) {
//         localStorage.removeItem("token");
//         navigate("/login");
//         return;
//       }

//       // ✅ FIXED: support both structures
//       const userData = data.user || data;

//       setProfile(userData || null);
//       setAddresses(userData?.addresses || []);

//     } catch (err) {
//       console.error("Profile error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadProfile();
//   }, []);

//   // ================= SAVE ADDRESS =================
//   const saveAddress = async (formData) => {
//     try {
//       const token = localStorage.getItem("token");

//       const res = await fetch(`${BASE_URL}/api/auth/add-address`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         alert(data.message || "Failed to save address");
//         return;
//       }

//       const updatedUser = data.user || data;

//       setProfile(updatedUser);
//       setAddresses(updatedUser?.addresses || []);

//       setShowForm(false);
//       setEditAddress(null);

//     } catch (err) {
//       console.error("Save error:", err);
//     }
//   };

//   // ================= DELETE ADDRESS =================
//   const deleteAddress = async (id) => {
//     if (!window.confirm("Delete this address?")) return;

//     try {
//       const token = localStorage.getItem("token");

//       const res = await fetch(
//         `${BASE_URL}/api/auth/delete-address/${id}`,
//         {
//           method: "DELETE",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const data = await res.json();

//       if (res.ok) {
//         const updatedUser = data.user || data;
//         setAddresses(updatedUser?.addresses || []);
//       }

//     } catch (err) {
//       console.error("Delete error:", err);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("currentUser");
//     navigate("/login");
//   };

//   if (loading) {
//     return <div className="text-center py-20">Loading...</div>;
//   }

//   return (
//     <section className="bg-[#FCFBFA] py-16 min-h-screen">
//       <div className="max-w-6xl mx-auto px-6 space-y-12">

//         {/* ================= PROFILE HEADER ================= */}
//         <div className="bg-black rounded-3xl p-8 text-white flex justify-between items-center">

//           <div className="flex items-center gap-6">
//             <FaUserCircle className="text-7xl text-orange-500 bg-white rounded-full" />

//             <div>
//               <h2 className="text-3xl font-bold">
//                 {profile?.name || "No Name"}
//               </h2>

//               <div className="text-gray-300 flex gap-4 mt-2">
//                 <span className="flex items-center gap-2">
//                   <FaEnvelope /> {profile?.email || "No Email"}
//                 </span>
//               </div>
//             </div>
//           </div>

//           <button
//             onClick={handleLogout}
//             className="bg-red-500 px-4 py-2 rounded"
//           >
//             <FaSignOutAlt /> Logout
//           </button>
//         </div>

//         {/* ================= ADDRESS SECTION ================= */}
//         <div className="bg-white p-8 rounded-2xl border">

//           <div className="flex justify-between mb-6">
//             <h3 className="text-xl font-bold">Addresses</h3>

//             <button
//               onClick={() => {
//                 setEditAddress(null);
//                 setShowForm(true);
//               }}
//               className="bg-black text-white px-4 py-2 rounded"
//             >
//               <FaPlus /> Add
//             </button>
//           </div>

//           <div className="grid md:grid-cols-2 gap-6">
//             {addresses?.length > 0 ? (
//               addresses.map((addr) => (
//                 <div key={addr._id} className="border p-4 rounded-xl">

//                   <div className="flex justify-between">
//                     <h4 className="font-bold">{addr.fullName}</h4>

//                     <div className="flex gap-3">
//                       <button onClick={() => {
//                         setEditAddress(addr);
//                         setShowForm(true);
//                       }}>
//                         <FaEdit />
//                       </button>

//                       <button onClick={() => deleteAddress(addr._id)}>
//                         <FaTrash />
//                       </button>
//                     </div>
//                   </div>

//                   <p>{addr.houseNo}, {addr.area}</p>
//                   <p>{addr.city}, {addr.state}</p>
//                   <p>{addr.pincode}</p>
//                   <p>{addr.phone}</p>

//                 </div>
//               ))
//             ) : (
//               <p>No addresses found</p>
//             )}
//           </div>
//         </div>

//         {/* ================= FORM ================= */}
//         {showForm && (
//           <AddressForm
//             onClose={() => setShowForm(false)}
//             onSave={saveAddress}
//             address={editAddress}
//           />
//         )}

//       </div>
//     </section>
//   );
// }

// /* ================= ADDRESS FORM ================= */
// function AddressForm({ onClose, onSave, address }) {
//   const [form, setForm] = useState({
//     fullName: address?.fullName || "",
//     phone: address?.phone || "",
//     houseNo: address?.houseNo || "",
//     area: address?.area || "",
//     city: address?.city || "",
//     state: address?.state || "",
//     pincode: address?.pincode || "",
//   });

//   return (
//     <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
//       <div className="bg-white p-6 rounded-xl w-[420px]">

//         <h2 className="text-xl font-bold mb-4">
//           {address ? "Update" : "Add"} Address
//         </h2>

//         <form
//           onSubmit={(e) => {
//             e.preventDefault();
//             onSave(form);
//           }}
//           className="space-y-3"
//         >
//           {Object.keys(form).map((key) => (
//             <input
//               key={key}
//               className="w-full p-2 border rounded"
//               placeholder={key}
//               value={form[key]}
//               onChange={(e) =>
//                 setForm({ ...form, [key]: e.target.value })
//               }
//             />
//           ))}

//           <div className="flex justify-end gap-3">
//             <button type="button" onClick={onClose}>
//               Cancel
//             </button>

//             <button className="bg-black text-white px-4 py-2 rounded">
//               Save
//             </button>
//           </div>

//         </form>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaUserCircle,
  FaSignOutAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaUserShield,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../BASEURL";

export default function Profile() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editAddress, setEditAddress] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ ADMIN CHECK
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  // ================= LOAD PROFILE =================
  const loadProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      // ======================================================
      // ✅ ADMIN PROFILE
      // ======================================================
      if (isAdmin) {
        const adminData = JSON.parse(
          localStorage.getItem("currentUser")
        );

        setProfile(adminData);

        // ✅ OPTIONAL ADMIN ADDRESS
        setAddresses([
          {
            _id: "admin-address",
            fullName: "Admin",
            houseNo: "D-211",
            area: " Adishwar Nagar Nikol Road Naroda",
            city: "Ahmedabad",
            state: "Gujarat",
            pincode: "380001",
            phone: "+91 9909511961",
          },
        ]);

        setLoading(false);
        return;
      }

      // ======================================================
      // ✅ NORMAL USER PROFILE API
      // ======================================================
      const res = await fetch(`${BASE_URL}/api/auth/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      console.log("API RESPONSE:", data);

      if (!res.ok) {
        localStorage.removeItem("token");
        localStorage.removeItem("currentUser");
        localStorage.removeItem("isAdmin");

        navigate("/login");
        return;
      }

      // ✅ SUPPORT BOTH STRUCTURES
      const userData = data.user || data;

      setProfile(userData || null);
      setAddresses(userData?.addresses || []);

    } catch (err) {
      console.error("Profile error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  // ================= SAVE ADDRESS =================
  const saveAddress = async (formData) => {

    // ✅ ADMIN ADDRESS SAVE LOCAL ONLY
    if (isAdmin) {
      const newAddress = {
        _id: Date.now().toString(),
        ...formData,
      };

      setAddresses((prev) => [...prev, newAddress]);

      setShowForm(false);
      setEditAddress(null);

      return;
    }

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${BASE_URL}/api/auth/add-address`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to save address");
        return;
      }

      const updatedUser = data.user || data;

      setProfile(updatedUser);
      setAddresses(updatedUser?.addresses || []);

      setShowForm(false);
      setEditAddress(null);

    } catch (err) {
      console.error("Save error:", err);
    }
  };

  // ================= DELETE ADDRESS =================
  const deleteAddress = async (id) => {
    if (!window.confirm("Delete this address?")) return;

    // ✅ ADMIN DELETE LOCAL
    if (isAdmin) {
      setAddresses((prev) =>
        prev.filter((addr) => addr._id !== id)
      );
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `${BASE_URL}/api/auth/delete-address/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (res.ok) {
        const updatedUser = data.user || data;
        setAddresses(updatedUser?.addresses || []);
      }

    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // ================= LOGOUT =================
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("isAdmin");

    navigate("/login");
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        Loading...
      </div>
    );
  }

  return (
    <section className="bg-[#FCFBFA] py-16 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 space-y-12">

        {/* ================= PROFILE HEADER ================= */}
        <div className="bg-black rounded-3xl p-8 text-white flex justify-between items-center">

          <div className="flex items-center gap-6">
            <FaUserCircle className="text-7xl text-orange-500 bg-white rounded-full" />

            <div>
              <h2 className="text-3xl font-bold flex items-center gap-3">

                {profile?.name || "No Name"}

                {/* ✅ ADMIN BADGE */}
                {isAdmin && (
                  <span className="bg-orange-500 text-xs px-3 py-1 rounded-full flex items-center gap-2">
                    <FaUserShield />
                    ADMIN
                  </span>
                )}
              </h2>

              <div className="text-gray-300 flex gap-4 mt-2 flex-wrap">

                <span className="flex items-center gap-2">
                  <FaEnvelope />
                  {profile?.email || "No Email"}
                </span>

              </div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded flex items-center gap-2"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>

        {/* ================= ADDRESS SECTION ================= */}
        <div className="bg-white p-8 rounded-2xl border">

          <div className="flex justify-between mb-6">
            <h3 className="text-xl font-bold">
              Addresses
            </h3>

            <button
              onClick={() => {
                setEditAddress(null);
                setShowForm(true);
              }}
              className="bg-black text-white px-4 py-2 rounded flex items-center gap-2"
            >
              <FaPlus />
              Add
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">

            {addresses?.length > 0 ? (
              addresses.map((addr) => (
                <div
                  key={addr._id}
                  className="border p-4 rounded-xl"
                >

                  <div className="flex justify-between">
                    <h4 className="font-bold">
                      {addr.fullName}
                    </h4>

                    <div className="flex gap-3">

                      <button
                        onClick={() => {
                          setEditAddress(addr);
                          setShowForm(true);
                        }}
                      >
                        <FaEdit />
                      </button>

                      <button
                        onClick={() =>
                          deleteAddress(addr._id)
                        }
                      >
                        <FaTrash />
                      </button>

                    </div>
                  </div>

                  <p>
                    {addr.houseNo}, {addr.area}
                  </p>

                  <p>
                    {addr.city}, {addr.state}
                  </p>

                  <p>{addr.pincode}</p>

                  <p className="flex items-center gap-2 mt-2">
                    <FaPhoneAlt />
                    {addr.phone}
                  </p>

                </div>
              ))
            ) : (
              <p>No addresses found</p>
            )}

          </div>
        </div>

        {/* ================= FORM ================= */}
        {showForm && (
          <AddressForm
            onClose={() => setShowForm(false)}
            onSave={saveAddress}
            address={editAddress}
          />
        )}

      </div>
    </section>
  );
}

/* ================= ADDRESS FORM ================= */
function AddressForm({
  onClose,
  onSave,
  address,
}) {
  const [form, setForm] = useState({
    fullName: address?.fullName || "",
    phone: address?.phone || "",
    houseNo: address?.houseNo || "",
    area: address?.area || "",
    city: address?.city || "",
    state: address?.state || "",
    pincode: address?.pincode || "",
  });

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

      <div className="bg-white p-6 rounded-xl w-[420px]">

        <h2 className="text-xl font-bold mb-4">
          {address ? "Update" : "Add"} Address
        </h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave(form);
          }}
          className="space-y-3"
        >

          {Object.keys(form).map((key) => (
            <input
              key={key}
              className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-orange-500"
              placeholder={key}
              value={form[key]}
              onChange={(e) =>
                setForm({
                  ...form,
                  [key]: e.target.value,
                })
              }
            />
          ))}

          <div className="flex justify-end gap-3 pt-3">

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>

            <button className="bg-black text-white px-4 py-2 rounded">
              Save
            </button>

          </div>
        </form>
      </div>
    </div>
  );
}