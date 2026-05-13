import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  FaBoxOpen,
  FaChevronRight,
  FaRegClock,
  FaTruck,
} from "react-icons/fa";
import { client } from "../../lib/sanity";
import BASE_URL from "../../BASEURL";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  // ✅ FETCH FROM SANITY
useEffect(() => {
  const fetchOrders = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("currentUser"));

      if (!user) return;

      const res = await fetch(
        `${BASE_URL}/api/order/user/${user._id}`
      );

      const data = await res.json();

      if (!data.success) {
        throw new Error("Failed to fetch orders");
      }

      const formatted = data.orders.map((o) => ({
        id: o._id,
        date: new Date(o.createdAt).toLocaleString(),
        status: o.status,
        total: o.totalPrice,
        items: o.products || [],
      }));

      setOrders(formatted);
    } catch (err) {
      console.error("Orders fetch error:", err);
    }
  };

  fetchOrders();
}, []);

  // ✅ STATUS STYLE
  const statusStyle = (status) => {
    switch (status) {
      case "Delivered":
        return "text-green-700 bg-green-50 border-green-200";
      case "Shipped":
        return "text-orange-600 bg-orange-50 border-orange-200";
      case "Placed":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "Cancelled":
        return "text-red-600 bg-red-50 border-red-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  return (
    <section className="py-16 bg-[#FCFBFA] min-h-screen">
      <div className="max-w-5xl mx-auto px-6">

        {/* HEADER */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-black mb-2">
            My <span className="text-orange-600 italic">Orders</span>
          </h1>
          <p className="text-gray-500">
            Track and manage your orders
          </p>
          <div className="h-1 w-20 bg-black mt-4"></div>
        </div>

        {/* LIST */}
        <div className="space-y-4">

          {orders.length > 0 ? (
            orders.map((order) => (
              <div
                key={order.id}
                className="group bg-white rounded-3xl p-6 md:p-8 border shadow-sm hover:shadow-xl transition"
              >

                <div className="flex flex-col md:flex-row justify-between gap-6">

                  {/* LEFT */}
                  <div className="flex gap-5">
                    <div className="hidden sm:flex h-14 w-14 bg-orange-50 text-orange-600 rounded-2xl items-center justify-center text-xl">
                      {order.status === "Delivered" ? (
                        <FaBoxOpen />
                      ) : (
                        <FaTruck />
                      )}
                    </div>

                    <div>
                      <div className="flex gap-2 mb-1">
                        <span className="text-xs font-mono text-gray-400">
                          ID: {order.id}
                        </span>

                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full border font-bold uppercase ${statusStyle(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold">
                        {order.date}
                      </h3>

                      <p className="text-sm text-gray-500 flex items-center gap-1">
                        <FaRegClock />{" "}
                        {order.items?.length || 0} items
                      </p>
                    </div>
                  </div>

                  {/* RIGHT */}
                  <div className="flex justify-between md:justify-end gap-8 items-center">
                    <div>
                      <p className="text-xs text-gray-400">
                        Total
                      </p>
                      <p className="text-xl font-bold">
                        ₹{order.total}
                      </p>
                    </div>

                    <Link
                      to={`/orders/${order.id}`}
                      className="flex items-center gap-2 bg-black text-white px-5 py-2 rounded-xl text-sm font-bold hover:bg-orange-600 transition"
                    >
                      Details <FaChevronRight size={10} />
                    </Link>
                  </div>

                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed">
              <FaBoxOpen className="text-5xl text-gray-200 mx-auto mb-4" />
              <p className="text-gray-500">
                No orders yet
              </p>

              <Link
                to="/shop"
                className="text-orange-600 font-bold underline mt-2 inline-block"
              >
                Start Shopping
              </Link>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
