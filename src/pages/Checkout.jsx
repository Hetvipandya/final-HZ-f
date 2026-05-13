import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaChevronLeft,
  FaCheckCircle,
} from "react-icons/fa";
import toast from "react-hot-toast";
import { client } from "../lib/sanity";
import BASE_URL from "../BASEURL";

export default function Checkout() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedKey, setSelectedKey] = useState(null);

  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  const formatSavedAddress = (addr) => {
    const parts = [addr.houseNo, addr.area, addr.city, addr.state, addr.pincode].filter(Boolean);
    return parts.join(", ");
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // 🔥 FETCH SAVED ADDRESSES
useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/login");
    return;
  }

  const fetchProfile = async () => {
    try {
      const res = await fetch(
        `${BASE_URL}/api/auth/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      const userData = data.user || data;

      // ✅ SET USER DATA
      setFormData((prev) => ({
        ...prev,
        name: userData?.name || "",
        email: userData?.email || "",
        phone: userData?.phone || "",
      }));

      // ✅ SET ADDRESSES (same as profile page)
      const addr = userData?.addresses || [];

      setSavedAddresses(addr);

      // ✅ AUTO SELECT FIRST ADDRESS
      if (addr.length > 0) {
        handleSelectAddress(addr[0]);
      }

    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  fetchProfile();
}, []);
  // ✅ SELECT ADDRESS
const handleSelectAddress = (addr) => {
  setSelectedKey(addr._id || addr._key || null);

  setFormData((prev) => ({
    ...prev,
    name: addr.fullName || "",
    phone: addr.phone || "",
    address: `${addr.houseNo || ""}${addr.houseNo && addr.area ? ", " : ""}${addr.area || ""}`,
    city: addr.city || "",
    pincode: addr.pincode || "",
  }));

  toast.success(`Selected address`);
};

  // ✍️ INPUT CHANGE
  const handleInputChange = (e) => {
    let { name, value } = e.target;

    if (name === "phone") value = value.replace(/\D/g, "").slice(0, 10);
    if (name === "pincode") value = value.replace(/\D/g, "").slice(0, 6);

    setFormData({ ...formData, [name]: value });
    setSelectedKey(null);
  };

  // 🚀 PLACE ORDER (SANITY FIXED)
const handlePlaceOrder = async (e) => {
  e.preventDefault();

  const user = JSON.parse(localStorage.getItem("currentUser"));
  const token = localStorage.getItem("token");

  if (!user) {
    toast.error("Please login first");
    navigate("/login");
    return;
  }

  if (!formData.name || !formData.phone || !formData.address) {
    toast.error("Please fill all required fields");
    return;
  }

  const orderPayload = {
    userId: user._id,

    products: cartItems.map((item) => ({
      productId: item._id,
      quantity: item.quantity,
    })),

    totalPrice: total,
    paymentMethod: "COD",

    address: {
      fullName: formData.name,
      phone: formData.phone,
      pincode: formData.pincode,
      state: "",
      city: formData.city,
      houseNo: "",
      area: formData.address,
      landmark: "",
    },
  };

  try {
    const res = await fetch(`${BASE_URL}/api/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderPayload),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Order failed");
    }

    // 🟢 CLEAR CART
    localStorage.removeItem("cartItems");
    window.dispatchEvent(new Event("cartUpdated"));

    // 🟢 WHATSAPP MESSAGE
    const message = `
 *New Order Placed*

 Name: ${formData.name}
 Phone: ${formData.phone}
 Address: ${formData.address}, ${formData.city} - ${formData.pincode}

 Items:
${cartItems
  .map((item) => `- ${item.name} x ${item.quantity}`)
  .join("\n")}

 Total: ₹${total}
`;

    const whatsappURL = `https://wa.me/9904444990?text=${encodeURIComponent(
      message
    )}`;

    toast.success("Order placed successfully!");

    // 🔥 OPEN WHATSAPP
    window.open(whatsappURL, "_blank");

    // 🔥 GO TO ORDERS PAGE
    setTimeout(() => {
      navigate("/orders");
    }, 1000);

  } catch (err) {
    console.error(err);
    toast.error(err.message || "Failed to place order");
  }
};

  return (
    <section className="py-16 bg-[#FCFBFA] min-h-screen">
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="mb-12">
          <button
            onClick={() => navigate("/cart")}
            className="flex items-center gap-2 text-gray-400 hover:text-black mb-4"
          >
            <FaChevronLeft size={12} /> Back to Cart
          </button>

          <h1 className="text-4xl font-bold text-black">
            Secure <span className="text-orange-600 italic">Checkout</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* LEFT */}
          <div className="lg:col-span-2 space-y-8">

            {/* SAVED ADDRESSES */}
            {savedAddresses.length > 0 && (
              <div className="bg-white rounded-3xl p-8 border shadow-sm">
                <h3 className="font-bold text-xl mb-6 flex items-center gap-3">
                  <FaMapMarkerAlt className="text-orange-600" />
                  Select Saved Address
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {savedAddresses.map((addr, index) => {
                    const key = addr._id || addr._key || index;
                    const title = addr.title || addr.fullName || "Saved Address";

                    return (
                      <div
                        key={key}
                        onClick={() => handleSelectAddress(addr)}
                        className={`cursor-pointer p-4 rounded-2xl border-2 transition ${
                          selectedKey === key
                            ? "border-orange-500 bg-orange-50"
                            : "border-gray-100"
                        }`}
                      >
                        <div className="flex justify-between">
                          <span className="font-bold text-orange-600 text-sm">
                            {title}
                          </span>

                          {selectedKey === key && (
                            <FaCheckCircle className="text-orange-600" />
                          )}
                        </div>

                        <p className="text-sm text-gray-600 mt-2">
                          {formatSavedAddress(addr)}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* FORM */}
            <div className="bg-white rounded-3xl p-8 border shadow-sm">
              <h3 className="font-bold text-xl mb-6">
                Delivery Details
              </h3>

              <form
                onSubmit={handlePlaceOrder}
                className="grid grid-cols-1 md:grid-cols-2 gap-5"
              >
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Full Name"
                  className="input-style"
                />

                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Phone"
                  className="input-style"
                />

                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Address"
                  className="input-style md:col-span-2 h-28"
                />

                <input
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="City"
                  className="input-style"
                />

                <input
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  placeholder="Pincode"
                  className="input-style"
                />
              </form>
            </div>
          </div>

          {/* RIGHT */}
          <aside>
            <div className="bg-black text-white rounded-3xl p-8 sticky top-24">
              <h3 className="text-2xl font-bold mb-6">
                Order Summary
              </h3>

              <div className="space-y-4 mb-6">
                {cartItems.map((item, index) => (
                  <div
                    key={item.id || index}
                    className="flex justify-between text-sm"
                  >
                    <span>
                      {item.name} x {item.quantity}
                    </span>
                    <span className="text-orange-400">
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span className="text-orange-500">₹{total}</span>
              </div>

              <button
                onClick={handlePlaceOrder}
                className="w-full mt-6 bg-orange-600 py-3 rounded-xl font-bold"
              >
                Place Order
              </button>
            </div>
          </aside>
        </div>
      </div>

      {/* STYLE (React safe) */}
      <style>{`
        .input-style {
          width: 100%;
          background: #f9fafb;
          border-radius: 14px;
          padding: 12px 16px;
          border: 1px solid #eee;
          outline: none;
        }
        .input-style:focus {
          border: 1px solid #ea580c;
          background: white;
        }
      `}</style>
    </section>
  );
}
