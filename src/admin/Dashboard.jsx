import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";




export default function Dashboard() {
  const stats = [
    { title: "Total Orders", value: 245 },
    { title: "Total Products", value: 120 },
    { title: "Total Users", value: 340 },
    { title: "Revenue", value: "₹4,25,000" },
    { title: "Pending Order", value: 340 },
    { title: "Returns", value: "₹4,25,000" },
  ];


  const salesData = [
    { month: "Jan", sales: 120 },
    { month: "Feb", sales: 210 },
    { month: "Mar", sales: 180 },
    { month: "Apr", sales: 260 },
    { month: "May", sales: 320 },
    { month: "Jun", sales: 400 },
  ];

  const revenueByCategory = [
    { name: "Men", value: 400 },
    { name: "Women", value: 300 },
    { name: "Footwear", value: 200 },
    { name: "Accessories", value: 150 },
  ];

  const orderStatusData = [
    { name: "Pending", value: 12 },
    { name: "Shipped", value: 20 },
    { name: "Delivered", value: 45 },
    { name: "Cancelled", value: 5 },
  ];

  const recentOrders = [
    {
      id: "#ORD1021",
      customer: "Rahul Sharma",
      amount: 2499,
      status: "Delivered",
    },
    {
      id: "#ORD1022",
      customer: "Neha Patel",
      amount: 1799,
      status: "Pending",
    },
    {
      id: "#ORD1023",
      customer: "Amit Verma",
      amount: 3599,
      status: "Shipped",
    },
    {
      id: "#ORD1024",
      customer: "Priya Singh",
      amount: 1299,
      status: "Cancelled",
    },
  ];

  const lowStockProducts = [
    {
      id: "PRD-101",
      name: "Men Cotton T-Shirt",
      category: "Men",
      stock: 5,
    },
    {
      id: "PRD-102",
      name: "Women Stylish Dress",
      category: "Women",
      stock: 2,
    },
    {
      id: "PRD-103",
      name: "Running Sneakers",
      category: "Footwear",
      stock: 0,
    },
  ];

  const topSellingProducts = [
    {
      id: "PRD-201",
      name: "Men Cotton T-Shirt",
      category: "Men",
      sold: 320,
      revenue: 447680,
    },
    {
      id: "PRD-202",
      name: "Running Sneakers",
      category: "Footwear",
      sold: 210,
      revenue: 545790,
    },
    {
      id: "PRD-203",
      name: "Women Stylish Dress",
      category: "Women",
      sold: 185,
      revenue: 295815,
    },
    {
      id: "PRD-204",
      name: "Smart Fitness Watch",
      category: "Accessories",
      sold: 150,
      revenue: 299850,
    },
  ];

  const returnsRefunds = [
    {
      id: "ORD-501",
      customer: "Amit Patel",
      type: "Return",
      reason: "Size issue",
      amount: 1399,
      status: "Pending",
    },
    {
      id: "ORD-502",
      customer: "Neha Sharma",
      type: "Refund",
      reason: "Damaged product",
      amount: 2599,
      status: "Approved",
    },
    {
      id: "ORD-503",
      customer: "Rahul Mehta",
      type: "Return",
      reason: "Wrong item delivered",
      amount: 1799,
      status: "Rejected",
    },
    {
      id: "ORD-504",
      customer: "Priya Verma",
      type: "Refund",
      reason: "Order cancelled",
      amount: 1999,
      status: "Refunded",
    },
  ];

  const payments = [
    {
      id: "PAY-1001",
      orderId: "ORD-201",
      customer: "Amit Patel",
      amount: 2499,
      method: "UPI",
      status: "Success",
      date: "12 Sep 2024",
    },
    {
      id: "PAY-1002",
      orderId: "ORD-202",
      customer: "Neha Sharma",
      amount: 1599,
      method: "Card",
      status: "Pending",
      date: "13 Sep 2024",
    },
    {
      id: "PAY-1003",
      orderId: "ORD-203",
      customer: "Rahul Mehta",
      amount: 3299,
      method: "Net Banking",
      status: "Failed",
      date: "13 Sep 2024",
    },
    {
      id: "PAY-1004",
      orderId: "ORD-204", 
      customer: "Priya Verma",
      amount: 1999,
      method: "UPI",
      status: "Success",
      date: "14 Sep 2024",
    },
  ];




  const COLORS = ["#2563eb", "#16a34a", "#f97316", "#dc2626"];
 
  return (
  <div className="p-6 bg-gray-50 min-h-screen">

    {/* 🔥 STATS */}
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white p-4 rounded-xl shadow hover:shadow-md transition">
          <p className="text-xs text-gray-500">{stat.title}</p>
          <h2 className="text-xl font-bold text-primary mt-1">{stat.value}</h2>
        </div>
      ))}
    </div>

    {/* 🔥 CHARTS */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

      {/* SALES */}
      <div className="bg-white p-5 rounded-xl shadow">
        <h3 className="font-semibold mb-4 text-gray-700">Monthly Sales</h3>
        <ResponsiveContainer height={250}>
          <BarChart data={salesData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="sales" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* PIE COMBINED */}
      <div className="bg-white p-5 rounded-xl shadow">
        <h3 className="font-semibold mb-4 text-gray-700">Order Status</h3>
        <ResponsiveContainer height={250}>
          <PieChart>
            <Pie data={orderStatusData} dataKey="value" outerRadius={90}>
              {orderStatusData.map((_, i) => (
                <Cell key={i} fill={COLORS[i]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>

    {/* 🔥 TABLE SECTION */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

      {/* RECENT ORDERS */}
      <div className="bg-white p-5 rounded-xl shadow">
        <h3 className="font-semibold mb-4">Recent Orders</h3>
        <div className="overflow-auto max-h-[300px]">
          <table className="w-full text-sm">
            <thead className="text-gray-500">
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>₹</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((o) => (
                <tr key={o.id} className="border-t">
                  <td>{o.id}</td>
                  <td>{o.customer}</td>
                  <td>{o.amount}</td>
                  <td>
                    <span className="text-xs px-2 py-1 rounded bg-gray-100">
                      {o.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* LOW STOCK */}
      <div className="bg-white p-5 rounded-xl shadow">
        <h3 className="font-semibold mb-4">Low Stock</h3>
        <div className="overflow-auto max-h-[300px]">
          <table className="w-full text-sm">
            <thead className="text-gray-500">
              <tr>
                <th>Product</th>
                <th>Stock</th>
              </tr>
            </thead>
            <tbody>
              {lowStockProducts.map((p) => (
                <tr key={p.id} className="border-t">
                  <td>{p.name}</td>
                  <td className="font-bold text-red-500">{p.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>

    {/* 🔥 TOP PRODUCTS */}
    <div className="bg-white p-5 rounded-xl shadow mt-6">
      <h3 className="font-semibold mb-4">Top Selling Products</h3>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {topSellingProducts.map((p, i) => (
          <div key={p.id} className="border rounded-lg p-4 hover:shadow">
            <p className="text-sm text-gray-500">#{i + 1}</p>
            <h4 className="font-semibold">{p.name}</h4>
            <p className="text-xs text-gray-500">{p.category}</p>
            <p className="mt-2 font-bold">{p.sold} sold</p>
            <p className="text-green-600 text-sm">
              ₹{p.revenue.toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>

  </div>
);
}

