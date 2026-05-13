import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import OrderDetailsModal from "../components/OrderDetailsModal";
import BASE_URL from "../../BASEURL";

const backendUrl = BASE_URL;

const normalizeOrder = (order) => ({
  id: order._id || order.id,
  customer: order.userId?.name || order.customer || "Unknown Customer",
  date: order.createdAt
    ? new Date(order.createdAt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : order.date || "",
  total: order.totalPrice || order.total || 0,
  payment: order.paymentMethod || order.payment || "N/A",
  status: order.status || "Pending",
  items:
    order.products?.map((item) => ({
      name: item.productId?.productName || item.name || "Item",
      qty: item.quantity || item.qty || 0,
      price: item.productId?.price || item.price || 0,
    })) || order.items || [],
});

const parseOrderResponse = (data) => {
  if (!data) return [];
  const orders = data.orders || data;
  if (!Array.isArray(orders)) return [];
  return orders.map(normalizeOrder);
};

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);

      const tryFetch = async (path) => {
        const res = await fetch(path);
        if (!res.ok) {
          throw new Error(`${res.status} ${res.statusText}`);
        }
        return res.json();
      };

      try {
        let data;
        try {
          data = await tryFetch(`${backendUrl}/api/orders`);
        } catch (err) {
          data = await tryFetch(`${backendUrl}/api/order`);
        }

        setOrders(parseOrderResponse(data));
      } catch (err) {
        console.error("Fetch orders failed:", err);
        setError("Unable to load orders. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const updateStatus = (id, status) => {
    setOrders(
      orders.map((order) =>
        order.id === id ? { ...order, status } : order
      )
    );
  };

  const statusBadge = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700";
      case "Shipped":
        return "bg-blue-100 text-blue-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  return (
    <>
      {/* HEADER */}
      <h2 className="text-2xl font-heading font-bold mb-6 text-primary">
        Orders Management
      </h2>

      {error && (
        <div className="mb-4 rounded border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {loading ? (
        <div className="mb-4 rounded border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
          Loading orders...
        </div>
      ) : (
        <div className="bg-white rounded shadow overflow-x-auto">
          <table className="w-full text-sm">
          <thead className="bg-primary/70 ">
            <tr className="text-light">
              <th className="p-3 text-left">Order ID</th>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Payment</th>
              <th className="p-3 text-left">Total</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t">
                <td className="p-3 font-semibold">{order.id}</td>
                <td className="p-3">{order.customer}</td>
                <td className="p-3">{order.date}</td>
                <td className="p-3">{order.payment}</td>
                <td className="p-3">₹{order.total}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded text-xs font-semibold ${statusBadge(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="p-3 text-center">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="text-primary"
                  >
                    <FaEye />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      )}

      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onUpdateStatus={updateStatus}
        />
      )}
    </>
  );
}
