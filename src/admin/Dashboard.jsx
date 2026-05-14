import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";

import { useEffect, useState } from "react";
import BASE_URL from "../BASEURL";
import { NavLink } from "react-router-dom";

export default function Dashboard() {
  // =========================================
  // STATES
  // =========================================
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // =========================================
  // FETCH DATA
  // =========================================
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      const [
        categoryRes,
        productRes,
        orderRes,
        userRes,
      ] = await Promise.all([
        fetch(`${BASE_URL}/api/category`),
        fetch(`${BASE_URL}/api/product/all`),
        fetch(`${BASE_URL}/api/order`),
        fetch(`${BASE_URL}/api/auth/all`),
      ]);

      const categoryData = await categoryRes.json();
      const productData = await productRes.json();
      const orderData = await orderRes.json();
      const userData = await userRes.json();

      console.log("ORDER DATA:", orderData);

      // =====================================
      // SAFE RESPONSE HANDLING
      // =====================================
      setCategories(
        Array.isArray(categoryData)
          ? categoryData
          : categoryData.data || []
      );

      setProducts(
        Array.isArray(productData)
          ? productData
          : productData.data || []
      );

      setOrders(
        Array.isArray(orderData)
          ? orderData
          : orderData.orders ||
              orderData.data ||
              []
      );

      setUsers(
        Array.isArray(userData)
          ? userData
          : userData.data || []
      );

    } catch (err) {
      console.error("Dashboard Error:", err);

      setCategories([]);
      setProducts([]);
      setOrders([]);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  // =========================================
  // SAFE ARRAYS
  // =========================================
  const ordersArray = Array.isArray(orders)
    ? orders
    : [];

  const productsArray = Array.isArray(products)
    ? products
    : [];

  const categoriesArray = Array.isArray(categories)
    ? categories
    : [];

  const usersArray = Array.isArray(users)
    ? users
    : [];

  // =========================================
  // STATS
  // =========================================
  const totalRevenue = ordersArray.reduce(
    (acc, item) =>
      acc + Number(item.totalPrice || 0),
    0
  );

  const pendingOrders = ordersArray.filter(
    (item) => item.status === "Pending"
  );

  const bestSellerProducts =
    productsArray.filter(
      (item) => item.isBestSeller
    );

  // =========================================
  // CHART DATA
  // =========================================
  const orderStatusData = [
    {
      name: "Pending",
      value: ordersArray.filter(
        (o) => o.status === "Pending"
      ).length,
    },
    {
      name: "Delivered",
      value: ordersArray.filter(
        (o) => o.status === "Delivered"
      ).length,
    },
    {
      name: "Cancelled",
      value: ordersArray.filter(
        (o) => o.status === "Cancelled"
      ).length,
    },
  ];

  const categoryChartData =
    categoriesArray.map((cat) => ({
      name: cat.name,
      products: productsArray.filter(
        (p) =>
          p.categoryId?._id === cat._id ||
          p.categoryId === cat._id
      ).length,
    }));

  const salesChartData = ordersArray.map(
    (o, i) => ({
      name: `O${i + 1}`,
      amount: Number(
        o.totalPrice || 0
      ),
    })
  );

  // =========================================
  // COLORS
  // =========================================
  const COLORS = [
    "#f97316",
    "#22c55e",
    "#ef4444",
  ];

  // =========================================
  // LOADING
  // =========================================
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-orange-50">
        <h1 className="text-2xl font-bold text-orange-500">
          Loading Dashboard...
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-orange-50 p-3 sm:p-5 lg:p-6">

      {/* ===================================== */}
      {/* HEADER */}
      {/* ===================================== */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-orange-600">
          Admin Dashboard
        </h1>

        <p className="text-gray-500 mt-1 text-sm sm:text-base">
          Live Database Analytics
        </p>
      </div>

      {/* ===================================== */}
      {/* STATS */}
      {/* ===================================== */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">

        {[
          [
            "Categories",
            categoriesArray.length,
          ],
          [
            "Products",
            productsArray.length,
          ],
          [
            "Orders",
            ordersArray.length,
          ],
          [
            "Users",
            usersArray.length,
          ],
          [
            "Pending",
            pendingOrders.length,
          ],
          [
            "Revenue",
            `₹${totalRevenue}`,
          ],
        ].map(([label, value], i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-sm border border-orange-100 p-4"
          >
            <p className="text-gray-500 text-xs sm:text-sm">
              {label}
            </p>

            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-orange-500 mt-2 break-words">
              {value}
            </h2>
          </div>
        ))}

      </div>

      {/* ===================================== */}
      {/* CHARTS */}
      {/* ===================================== */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 mb-6">

        {/* SALES CHART */}
        <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-5">

          <h2 className="text-lg sm:text-xl font-semibold text-orange-500 mb-4">
            Sales Analytics
          </h2>

          <div className="w-full h-[260px] sm:h-[320px]">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <LineChart
                data={salesChartData}
                margin={{
                  top: 10,
                  right: 10,
                  left: -15,
                  bottom: 0,
                }}
              >

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12 }}
                />

                <YAxis
                  tick={{ fontSize: 12 }}
                />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#f97316"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />

              </LineChart>
            </ResponsiveContainer>

          </div>
        </div>

        {/* ORDER STATUS */}
        <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-5">

          <h2 className="text-lg sm:text-xl font-semibold text-orange-500 mb-4">
            Order Status
          </h2>

          <div className="w-full h-[260px] sm:h-[320px]">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <PieChart>

                <Pie
                  data={orderStatusData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius="75%"
                  label
                >

                  {orderStatusData.map(
                    (_, index) => (
                      <Cell
                        key={index}
                        fill={
                          COLORS[
                            index %
                              COLORS.length
                          ]
                        }
                      />
                    )
                  )}

                </Pie>

                <Tooltip />

                <Legend
                  verticalAlign="bottom"
                  height={36}
                />

              </PieChart>

            </ResponsiveContainer>

          </div>
        </div>
      </div>

      {/* ===================================== */}
      {/* CATEGORY + BEST SELLERS */}
      {/* ===================================== */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 mb-6">

        {/* CATEGORY CHART */}
        <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-5">

          <h2 className="text-lg sm:text-xl font-semibold text-orange-500 mb-4">
            Category Products
          </h2>

          <div className="w-full h-[260px] sm:h-[320px]">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <BarChart
                data={categoryChartData}
                margin={{
                  top: 10,
                  right: 10,
                  left: -15,
                  bottom: 10,
                }}
              >

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12 }}
                />

                <YAxis
                  tick={{ fontSize: 12 }}
                />

                <Tooltip />

                <Bar
                  dataKey="products"
                  fill="#f97316"
                  radius={[8, 8, 0, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>
        </div>

        {/* BEST SELLERS */}
        <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-5">

          <div className="flex items-center justify-between mb-4">

            <h2 className="text-lg sm:text-xl font-semibold text-orange-500">
              Best Sellers
            </h2>

            <button className="bg-orange-500 hover:bg-orange-600 transition text-white text-sm px-3 py-2 rounded-lg">
              + Add
            </button>

          </div>

          <div className="max-h-[320px] overflow-y-auto space-y-3 pr-1">

            {bestSellerProducts.length ===
            0 ? (
              <p className="text-gray-500 text-center py-10">
                No Best Seller Products
              </p>
            ) : (
              bestSellerProducts.map((p) => (
                <div
                  key={p._id}
                  className="border border-orange-100 rounded-xl p-3 hover:bg-orange-50 transition"
                >

                  <div className="flex items-center justify-between gap-3">

                    <div className="flex items-center gap-3 min-w-0">

                      <img
                        src={
                          p.images?.[0] ||
                          p.image ||
                          "https://via.placeholder.com/60"
                        }
                        alt={p.productName}
                        className="w-14 h-14 rounded-lg object-cover"
                      />

                      <div className="min-w-0">

                        <h3 className="font-semibold text-sm sm:text-base truncate">
                          {p.productName}
                        </h3>

                        <p className="text-orange-500 font-medium text-sm">
                          ₹{p.price}
                        </p>

                      </div>

                    </div>

                    <button className="bg-orange-500 hover:bg-orange-600 text-white text-xs sm:text-sm px-3 py-2 rounded-lg transition">
                      Edit
                    </button>

                  </div>

                </div>
              ))
            )}

          </div>
        </div>
      </div>

      {/* ===================================== */}
      {/* PRODUCTS TABLE */}
      {/* ===================================== */}
      <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-5 mb-6">

        <h2 className="text-lg sm:text-xl font-semibold text-orange-500 mb-4">
          Products
        </h2>

        <div className="overflow-x-auto">

          <table className="min-w-[750px] w-full">

            <thead className="bg-orange-100 text-orange-700">

              <tr>
                <th className="p-3 text-left">
                  Image
                </th>

                <th className="p-3 text-left">
                  Product
                </th>

                <th className="p-3 text-left">
                  Price
                </th>

                <th className="p-3 text-left">
                  Rating
                </th>

                <th className="p-3 text-left">
                  Sale
                </th>
              </tr>

            </thead>

            <tbody>

              {productsArray.map((p) => (

                <tr
                  key={p._id}
                  className="border-b hover:bg-orange-50"
                >

                  <td className="p-3">

                    <img
                      src={
                        p.images?.[0] ||
                        p.image ||
                        "https://via.placeholder.com/60"
                      }
                      alt={p.productName}
                      className="w-14 h-14 rounded-lg object-cover"
                    />

                  </td>

                  <td className="p-3 font-medium">
                    {p.productName}
                  </td>

                  <td className="p-3">
                    ₹{p.price}
                  </td>

                  <td className="p-3">
                    ⭐ {p.rating || 0}
                  </td>

                  <td className="p-3">

                    {p.isSale ? (
                      <span className="bg-green-100 text-green-600 text-xs px-3 py-1 rounded-full">
                        SALE
                      </span>
                    ) : (
                      <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
                        NORMAL
                      </span>
                    )}

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>
      </div>

      {/* ===================================== */}
      {/* ORDERS TABLE */}
      {/* ===================================== */}
     {/* ===================================== */}
{/* ORDERS TABLE */}
{/* ===================================== */}
<div className="bg-white rounded-2xl shadow-sm p-4 sm:p-5">

  <div className="flex items-center justify-between mb-4">

    <h2 className="text-lg sm:text-xl font-semibold text-orange-500">
      Latest Pending Orders
    </h2>

    <NavLink
      to="/admin/orders"
      className="bg-orange-500 hover:bg-orange-600 transition text-white px-4 py-2 rounded-xl text-sm font-medium"
    >
      View All
    </NavLink>

  </div>

  <div className="overflow-x-auto">

    <table className="min-w-[700px] w-full">

      <thead className="bg-orange-100 text-orange-700">

        <tr>

          <th className="p-3 text-left">
            Order ID
          </th>

          <th className="p-3 text-left">
            Customer
          </th>

          <th className="p-3 text-left">
            Amount
          </th>

          <th className="p-3 text-left">
            Payment
          </th>

          <th className="p-3 text-left">
            Status
          </th>

        </tr>

      </thead>

      <tbody>

        {ordersArray
          .filter(
            (o) => o.status === "Pending"
          )
          .sort(
            (a, b) =>
              new Date(b.createdAt) -
              new Date(a.createdAt)
          )
          .slice(0, 6).length === 0 ? (

          <tr>

            <td
              colSpan="5"
              className="text-center p-5 text-gray-500"
            >
              No Pending Orders Found
            </td>

          </tr>

        ) : (

          ordersArray
            .filter(
              (o) =>
                o.status === "Pending"
            )
            .sort(
              (a, b) =>
                new Date(b.createdAt) -
                new Date(a.createdAt)
            )
            .slice(0, 6)
            .map((o) => (

              <tr
                key={o._id}
                className="border-b hover:bg-orange-50"
              >

                <td className="p-3">
                  {o._id?.slice(0, 8)}
                </td>

                <td className="p-3">
                  {o.userId?.name ||
                    "Unknown"}
                </td>

                <td className="p-3">
                  ₹{o.totalPrice || 0}
                </td>

                <td className="p-3">
                  {o.paymentMethod ||
                    "N/A"}
                </td>

                <td className="p-3">

                  <span className="text-xs px-3 py-1 rounded-full bg-yellow-100 text-yellow-700">
                    {o.status || "Pending"}
                  </span>

                </td>

              </tr>

            ))

        )}

      </tbody>

    </table>

  </div>

</div>

    </div>
  );
}