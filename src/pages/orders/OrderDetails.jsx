import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import DeliveryTracking from "../../components/DeliveryTracking";
import {
  FaMapMarkerAlt,
  FaReceipt,
  FaBox,
  FaPhoneAlt, 
  FaTrash,
} from "react-icons/fa";
import BASE_URL, { getImageUrl } from "../../BASEURL";


export default function OrderDetails() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [actionType, setActionType] = useState("");
  const [selectedItemId, setSelectedItemId] = useState(null);

  // 🔥 backend url
  const backendUrl = BASE_URL;

  // ✅ IMAGE HELPER (MAIN FIX)
  const getOrderImageUrl = (img) => {
    if (!img) return "https://via.placeholder.com/150";
    return getImageUrl(img, "https://via.placeholder.com/150");
  };

  // FETCH ORDER
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await fetch(
          `${backendUrl}/api/order/${orderId}`
        );

        const data = await res.json();

        if (!data.success) throw new Error("Order not found");

        const o = data.order;

        setOrder({
          id: o._id,
          date: new Date(o.createdAt).toLocaleString(),
          status: o.status,
       total: o.products.reduce((acc, p) => {

  const product = p.productId || {};

  const finalPrice =
    Number(product.discountPrice) ||
    Number(product.price) ||
    0;

  return acc + finalPrice * p.quantity;

}, 0),

items: o.products.map((p) => {

  const product = p.productId || {};

  // ✅ FORCE DISCOUNT PRICE
 const finalPrice =
  Number(p.productId?.discountPrice) ||
  Number(p.productId?.price) ||
  0;

  const originalPrice =
    Number(product.price || 0);

  const imageSource =
    product.images?.[0] ||
    product.image;

  return {
    id: product._id,

    name:
      product.productName ||
      product.name ||
      "Product",

    // ✅ FINAL PRICE
    price: finalPrice,

    discountPrice: finalPrice,

    originalPrice: originalPrice,

    quantity: p.quantity,

    image: getOrderImageUrl(imageSource),
  };
}),

          address: {
            name: o.address.fullName,
            address: `${o.address.area}, ${o.address.city}`,
            phone: o.address.phone,
          },
        });
      } catch (err) {
        console.error(err);
        navigate("/orders");
      }
    };

    fetchOrder();
  }, [orderId, navigate]);

  if (!order) return null;

  const orderStatus = order.status?.toLowerCase().replace(/\s/g, "-");

  const openCancelOrder = () => {
    setActionType("order");
    setShowModal(true);
  };

  const openRemoveItem = (itemId) => {
    setActionType("item");
    setSelectedItemId(itemId);
    setShowModal(true);
  };

const handleConfirm = async () => {

  // CANCEL FULL ORDER
  if (actionType === "order") {

    await fetch(`${backendUrl}/api/order/${order.id}`, {
      method: "DELETE",
    });

    navigate("/orders");
  }

  // REMOVE SINGLE ITEM
 if (actionType === "item") {

  try {

    // ✅ REMOVE ITEM FROM BACKEND
    const res = await fetch(
      `${backendUrl}/api/order/${order.id}/remove-item`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: selectedItemId,
        }),
      }
    );

    const data = await res.json();

    // ✅ ERROR HANDLE
    if (!data.success) {
      alert(data.message || "Failed to remove item");
      return;
    }

    // ✅ UPDATE FRONTEND STATE
    setOrder((prev) => ({
      ...prev,

      // updated total from backend
      total: data.order.totalPrice,

      // remove item from UI
      items: prev.items.filter(
        (item) => item.id !== selectedItemId
      ),
    }));

  } catch (err) {

    console.error(err);

    alert("Something went wrong");
  }
}

  setShowModal(false);
};

  return (
    <section className="py-10 md:py-16 bg-gradient-to-b from-[#FCFBFA] to-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
            Order <span className="text-orange-600 italic">Details</span>
          </h1>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <span className="bg-black text-white px-3 py-1 rounded-md text-xs sm:text-sm font-mono w-fit">
              #{order.id}
            </span>

            <span className="text-gray-400 text-xs sm:text-sm">
              {order.date}
            </span>

            <div className="sm:ml-auto flex flex-wrap gap-2">
              <span className="bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-xs font-bold uppercase">
                {order.status}
              </span>

              {order.status !== "Delivered" && (
                <button
                  onClick={openCancelOrder}
                  className="bg-red-50 text-red-600 px-3 py-1 rounded-full text-xs font-bold hover:bg-red-600 hover:text-white transition"
                >
                  Cancel Order
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 md:gap-10">

          {/* LEFT */}
          <div className="lg:col-span-2 space-y-6">

            {/* ITEMS */}
            <div className="bg-white rounded-2xl md:rounded-3xl p-5 md:p-8 shadow-sm border">

              <div className="flex items-center gap-3 mb-5">
                <FaBox className="text-orange-600" />
                <h3 className="text-lg md:text-xl font-bold">
                  Order Items
                </h3>
              </div>

              <div className="space-y-5">

                {order.items?.map((item, index) => (
                  <div
                    key={item.id || index}
                    className="flex flex-col sm:flex-row gap-4 border-b pb-4"
                  >
                    <img
                      src={item.image}
                      className="w-full sm:w-24 h-40 sm:h-24 object-cover rounded-xl"
                      alt={item.name}
                    />

                    <div className="flex-1">
                      <h4 className="font-bold text-base md:text-lg">
                        {item.name}
                      </h4>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                      <p className="text-orange-600 font-bold mt-1">
  ₹{item.price}
</p>
                  {item.originalPrice > item.price && (
  <p className="text-sm text-gray-400 line-through">
    ₹{item.originalPrice}
  </p>
)}
                    <p className="text-gray-900 font-bold mt-1">
  Total: ₹{item.price * item.quantity}
</p>
                    </div>

                    {order.status !== "Delivered" && (
                      <button
                        onClick={() => openRemoveItem(item.id || index)}
                        className="flex items-center gap-2 text-red-500 text-sm font-bold hover:underline"
                      >
                        <FaTrash size={12} /> Remove
                      </button>
                    )}
                  </div>
                ))}

              </div>
            </div>

            {/* TRACKING */}
            <div className="bg-white rounded-2xl md:rounded-3xl p-5 md:p-8 shadow-sm border">
              <DeliveryTracking status={orderStatus} />
            </div>

            {/* ADDRESS */}
            <div className="bg-white rounded-2xl md:rounded-3xl p-5 md:p-8 shadow-sm border">

              <div className="flex items-center gap-3 mb-3">
                <FaMapMarkerAlt className="text-orange-600" />
                <h3 className="font-bold text-lg md:text-xl">
                  Shipping Address
                </h3>
              </div>

              <p className="font-bold text-sm md:text-base">
                {order.address?.name}
              </p>
              <p className="text-gray-600 text-sm">
                {order.address?.address}
              </p>

              <div className="flex items-center gap-2 mt-3 text-orange-600 font-bold text-sm">
                <FaPhoneAlt size={12} />
                {order.address?.phone}
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <aside className="space-y-6 lg:sticky lg:top-24 h-fit">

            <div className="bg-black text-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg">
              <div className="flex items-center gap-3 mb-3">
                <FaReceipt />
                <h3 className="text-lg md:text-xl font-bold">
                  Order Summary
                </h3>
              </div>

              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span className="text-orange-500">
                  ₹{order.total}
                </span>
              </div>
            </div>

            <div className="bg-white rounded-2xl md:rounded-3xl p-5 md:p-6 border text-center">
              <p className="text-sm text-gray-500 mb-2">
                Need help?
              </p>
              <Link
                to="/contact"
                className="text-orange-600 font-bold underline text-sm"
              >
                Contact Support
              </Link>
            </div>
          </aside>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl p-5 md:p-6 w-full max-w-md text-center">

            <h2 className="text-lg md:text-xl font-bold mb-2">
              {actionType === "order"
                ? "Cancel this Order?"
                : "Remove this Item?"}
            </h2>

            <p className="text-gray-500 text-sm mb-5">
              Are you sure?
            </p>

            <div className="flex gap-3 justify-center">

              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-200"
              >
                No
              </button>

              <button
                onClick={handleConfirm}
                className="px-4 py-2 rounded-lg bg-red-600 text-white"
              >
                Yes
              </button>

            </div>
          </div>
        </div>
      )}
    </section>
  );
}
