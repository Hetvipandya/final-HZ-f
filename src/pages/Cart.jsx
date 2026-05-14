import { useState, useEffect } from "react";
import {
  FaTrash,
  FaPlus,
  FaMinus,
  FaArrowRight,
  FaShoppingBag,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getImageUrl } from "../BASEURL";

export default function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  const toastStyle = {
    position: "top-center",
    style: { 
      background: "#374151",
      color: "#fff",
      borderRadius: "10px",
    },
  };

  // LOAD CART
  useEffect(() => {
    const stored =
      JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(stored);
  }, []);

  // SAVE CART
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    window.dispatchEvent(new Event("cartUpdated"));
  }, [cartItems]);

  // ➕ INCREASE
  const increaseQty = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // ➖ DECREASE
  const decreaseQty = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === id
          ? {
              ...item,
              quantity: Math.max(1, item.quantity - 1),
            }
          : item
      )
    );
  };

  // ❌ DELETE
  const removeItem = (id) => {
    const updated = cartItems.filter((item) => item._id !== id);

    setCartItems(updated);
    localStorage.setItem("cartItems", JSON.stringify(updated));

    toast.success("Item removed ❌", toastStyle);
  };

  // TOTAL
  const cartTotal = cartItems.reduce(
    (total, item) => {
      const itemPrice = item.discountPrice ?? item.price ?? 0;
      return total + itemPrice * item.quantity;
    },
    0
  );

  // CHECKOUT
  const proceedToCheckout = () => {
    const user = JSON.parse(localStorage.getItem("currentUser"));

    if (!user) {
      toast.error("Please login first", toastStyle);
      navigate("/login");
      return;
    }

    navigate("/checkout");
  };

  // EMPTY
  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <FaShoppingBag className="text-gray-300 text-5xl mb-4" />

        <h2 className="text-2xl font-bold">
          Your Cart is <span className="text-orange-600">Empty</span>
        </h2>

        <p className="text-gray-500 mt-2">
          Add products to continue shopping
        </p>

        <Link
          to="/shop"
          className="mt-6 bg-black text-white px-6 py-3 rounded-xl"
        >
          Explore Shop
        </Link>
      </div>
    );
  }

  return (
    <section className="py-10 bg-[#FCFBFA] min-h-screen">
      <div className="max-w-7xl mx-auto px-4">

        <h1 className="text-3xl md:text-5xl font-bold mb-8">
          Shopping <span className="text-orange-600">Cart</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ITEMS */}
          <div className="lg:col-span-2 space-y-5">

            {cartItems.map((item) => {
              const itemPrice = item.discountPrice ?? item.price ?? 0;
              return (
                <div
                  key={item._id}
                  className="bg-white p-4 md:p-6 rounded-2xl shadow-sm flex flex-col sm:flex-row gap-4"
                >

                {/* IMAGE FIX 🔥 */}
                <img
                  src={getImageUrl(item.images?.[0] || item.image)}
                  className="w-full sm:w-28 h-40 sm:h-28 object-cover rounded-xl"
                  alt={item.name}
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/300?text=No+Image";
                  }}
                />

                {/* INFO */}
                <div className="flex-1">

                  <h3 className="font-bold text-lg">
                    {item.name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    Size: {item.selectedSize || "N/A"}
                  </p>

                  <p className="font-bold mt-1">
                    ₹{itemPrice}
                  </p>

                  {/* QTY */}
                  <div className="flex items-center mt-3 border rounded-lg w-fit">
                    <button
                      onClick={() => decreaseQty(item._id)}
                      className="p-2"
                    >
                      <FaMinus size={10} />
                    </button>

                    <span className="px-3 font-bold">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => increaseQty(item._id)}
                      className="p-2"
                    >
                      <FaPlus size={10} />
                    </button>
                  </div>

                </div>

                {/* PRICE + DELETE */}
                <div className="flex sm:flex-col justify-between items-center sm:items-end">
                  <p className="font-bold text-lg">
                    ₹{itemPrice * item.quantity}
                  </p>

                  <button
                    onClick={() => removeItem(item._id)}
                    className="text-red-500 mt-2"
                  >
                    <FaTrash />
                  </button>

                </div>

              </div>
            )})}

          </div>

          {/* SUMMARY */}
          <div className="bg-white p-6 rounded-2xl shadow-md h-fit">

            <h2 className="text-2xl font-bold mb-5">
              Order Summary
            </h2>

            <div className="space-y-3">

              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold">₹{cartTotal}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>

              <div className="border-t pt-3 flex justify-between font-bold">
                <span>Total</span>
                <span>₹{cartTotal}</span>
              </div>

            </div>

            <button
              onClick={proceedToCheckout}
              className="w-full mt-6 bg-black text-white py-3 rounded-xl"
            >
              Checkout <FaArrowRight className="inline ml-2" />
            </button>

          </div>

        </div>
      </div>
    </section>
  );
}
