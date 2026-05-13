import toast from "react-hot-toast";


export default function OrderDetailsModal({
    order,
    onClose,
    onUpdateStatus,
}) {
    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="absolute top-40 bg-white w-full max-w-lg p-6 rounded shadow">

                <h3 className="text-xl font-heading font-bold mb-4 text-primary">
                    Order Details
                </h3>

                <p className="mb-2">
                    <strong>Order ID:</strong> {order.id}
                </p>
                <p className="mb-2">
                    <strong>Customer:</strong> {order.customer}
                </p>
                <p className="mb-4">
                    <strong>Payment:</strong> {order.payment}
                </p>
                

                {/* ITEMS */}
                <div className="border rounded p-4 mb-4">
                    {order.items.map((item, index) => (
                        <div
                            key={index}
                            className="flex justify-between text-sm mb-2"
                        >
                            <span>
                                {item.name} × {item.qty}
                            </span>
                            <span>₹{item.price}</span>
                        </div>
                    ))}
                </div>

                <p className="mb-4">
                    <strong>Total:</strong> ₹{order.total}
                </p>

                {/* STATUS UPDATE */}
                <div className="mb-4">
                    <label className="block font-semibold mb-2">
                        Update Status
                    </label>
                    <select
                        value={order.status}
                        onChange={(e) => {
                            onUpdateStatus(order.id, e.target.value);
                            toast.success("Order status updated");
                        }}

                        className="w-full border px-3 py-2 rounded"
                    >
                        <option>Pending</option>
                        <option>Shipped</option>
                        <option>Delivered</option>
                        <option>Cancelled</option>
                    </select>
                </div>

                <div className="flex justify-end gap-3">
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
