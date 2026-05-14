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

      // =====================================
      // API CALLS
      // =====================================
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

      // Parse responses
      const categoryData = await categoryRes.json();
      const productData = await productRes.json();
      const orderData = await orderRes.json();
      const userData = await userRes.json();

      console.log("Category Response:", categoryData);
      console.log("Product Response:", productData);
      console.log("Order Response:", orderData);
      console.log("User Response:", userData);

      // =====================================
      // SET DATA - Extract arrays properly
      // =====================================
      const categoriesArray = Array.isArray(categoryData) ? categoryData : (categoryData?.data || []);
      const productsArray = Array.isArray(productData) ? productData : (productData?.data || []);
      const ordersArray = Array.isArray(orderData) ? orderData : (orderData?.data || []);
      const usersArray = Array.isArray(userData) ? userData : (userData?.data || []);

      setCategories(categoriesArray);
      setProducts(productsArray);
      setOrders(ordersArray);
      setUsers(usersArray);

    } catch (error) {
      console.error("Dashboard Error:", error);
      // Set empty arrays on error to prevent UI breaks
      setCategories([]);
      setProducts([]);
      setOrders([]);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  // =========================================
  // ENSURE ARRAYS
  // =========================================
  const ordersArray = Array.isArray(orders) ? orders : [];
  const productsArray = Array.isArray(products) ? products : [];
  const categoriesArray = Array.isArray(categories) ? categories : [];

  // =========================================
  // TOTAL REVENUE
  // =========================================
  const totalRevenue = ordersArray.reduce(
    (acc, item) => acc + Number(item.totalPrice || 0),
    0
  );

  // =========================================
  // PENDING ORDERS
  // =========================================
  const pendingOrders = ordersArray.filter(
    (item) => item.status === "Pending"
  );

  // =========================================
  // BEST SELLERS
  // =========================================
  const bestSellerProducts = productsArray.filter(
    (item) => item.isBestSeller
  );

  // =========================================
  // SALE PRODUCTS
  // =========================================
  const saleProducts = productsArray.filter(
    (item) => item.isSale
  );

  // =========================================
  // LOW STOCK DUMMY
  // =========================================
  const lowStockProducts = productsArray.slice(0, 5);

  // =========================================
  // ORDER STATUS CHART
  // =========================================
  const orderStatusData = [
    {
      name: "Pending",
      value: ordersArray.filter((o) => o.status === "Pending").length,
    },
    {
      name: "Delivered",
      value: ordersArray.filter((o) => o.status === "Delivered").length,
    },
    {
      name: "Cancelled",
      value: ordersArray.filter((o) => o.status === "Cancelled").length,
    },
  ];

  // =========================================
  // CATEGORY CHART
  // =========================================
  const categoryChartData = categoriesArray.map((cat) => ({
    name: cat.name,
    products: productsArray.filter(
      (p) => p.categoryId === cat._id
    ).length,
  }));

  // =========================================
  // SALES CHART
  // =========================================
  const salesChartData = ordersArray.map((order, index) => ({
    name: `Order ${index + 1}`,
    amount: order.totalPrice,
  }));

  // =========================================
  // COLORS
  // =========================================
  const COLORS = [
    "#f97316",
    "#fb923c",
    "#fdba74",
    "#ea580c",
  ];

  // =========================================
  // LOADING
  // =========================================
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-orange-50">
        <h1 className="text-3xl font-bold text-orange-500">
          Loading Dashboard...
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-orange-50 p-6">

      {/* ===================================== */}
      {/* HEADER */}
      {/* ===================================== */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-orange-600">
          Admin Dashboard
        </h1>

        <p className="text-gray-600 mt-2">
          Live Database Analytics
        </p>
      </div>

      {/* ===================================== */}
      {/* STATS */}
      {/* ===================================== */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 mb-8">

        <div className="bg-white rounded-2xl shadow-sm p-5 border border-orange-100">
          <p className="text-sm text-gray-500">
            Categories
          </p>

          <h2 className="text-3xl font-bold text-orange-500 mt-2">
            {categoriesArray.length}
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-5 border border-orange-100">
          <p className="text-sm text-gray-500">
            Products
          </p>

          <h2 className="text-3xl font-bold text-orange-500 mt-2">
            {productsArray.length}
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-5 border border-orange-100">
          <p className="text-sm text-gray-500">
            Orders
          </p>

          <h2 className="text-3xl font-bold text-orange-500 mt-2">
            {ordersArray.length}
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-5 border border-orange-100">
          <p className="text-sm text-gray-500">
            Users
          </p>

          <h2 className="text-3xl font-bold text-orange-500 mt-2">
            {users.length}
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-5 border border-orange-100">
          <p className="text-sm text-gray-500">
            Pending Orders
          </p>

          <h2 className="text-3xl font-bold text-orange-500 mt-2">
            {pendingOrders.length}
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-5 border border-orange-100">
          <p className="text-sm text-gray-500">
            Revenue
          </p>

          <h2 className="text-3xl font-bold text-orange-500 mt-2">
            ₹{totalRevenue}
          </h2>
        </div>

      </div>

      {/* ===================================== */}
      {/* CHARTS */}
      {/* ===================================== */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">

        {/* SALES */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">

          <h2 className="text-xl font-semibold text-orange-500 mb-5">
            Sales Analytics
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesChartData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="amount"
                stroke="#f97316"
                strokeWidth={4}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* ORDER STATUS */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">

          <h2 className="text-xl font-semibold text-orange-500 mb-5">
            Order Status
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>

              <Pie
                data={orderStatusData}
                dataKey="value"
                outerRadius={100}
                label
              >
                {orderStatusData.map((_, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index]}
                  />
                ))}
              </Pie>

              <Tooltip />

              <Legend />

            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ===================================== */}
      {/* CATEGORY + BEST SELLERS */}
      {/* ===================================== */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">

        {/* CATEGORY CHART */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">

          <h2 className="text-xl font-semibold text-orange-500 mb-5">
            Category Products
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryChartData}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="products"
                fill="#f97316"
                radius={[10, 10, 0, 0]}
              />

            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* BEST SELLERS */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">

          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-semibold text-orange-500">
              Best Seller Products
            </h2>

            <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition">
              + Add Product
            </button>
          </div>

          {bestSellerProducts.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No best seller products available</p>
          ) : (
            <div className="space-y-4 max-h-[300px] overflow-auto">

              {bestSellerProducts.map((product) => (
                <div
                  key={product._id}
                  className="border border-orange-100 rounded-xl p-4 hover:bg-orange-50 transition"
                >
                  <div className="flex justify-between">

                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {product.productName || 'N/A'}
                      </h3>

                      <p className="text-sm text-gray-500">
                        ₹{product.discountPrice || product.price || 0}
                      </p>
                    </div>

                    <div className="flex gap-2">

                      <button className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded-lg text-sm transition">
                        Edit
                      </button>

                      <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm transition">
                        Delete
                      </button>

                    </div>

                  </div>
                </div>
              ))}

            </div>
          )}

        </div>
      </div>

      {/* ===================================== */}
      {/* PRODUCTS */}
      {/* ===================================== */}
      <div className="bg-white rounded-2xl p-5 shadow-sm mb-8">

        <h2 className="text-2xl font-semibold text-orange-500 mb-5">
          All Products
        </h2>

        {productsArray.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No products available</p>
        ) : (
          <div className="overflow-auto">

            <table className="w-full">

              <thead className="bg-orange-100 text-orange-700">

                <tr>
                  <th className="p-3 text-left">Image</th>
                  <th className="p-3 text-left">Product</th>
                  <th className="p-3 text-left">Price</th>
                  <th className="p-3 text-left">Discount</th>
                  <th className="p-3 text-left">Rating</th>
                  <th className="p-3 text-left">Sale</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>

              </thead>

              <tbody>

                {productsArray.map((product) => (

                  <tr
                    key={product._id}
                    className="border-b hover:bg-orange-50"
                  >

                    <td className="p-3">

                      <img
                        src={
                          product.images?.[0] ||
                          product.image ||
                          'https://via.placeholder.com/56'
                        }
                        alt={product.productName || 'Product'}
                        className="w-14 h-14 rounded-lg object-cover"
                        onError={(e) => e.target.src = 'https://via.placeholder.com/56'}
                      />

                    </td>

                    <td className="p-3 font-semibold">
                      {product.productName || 'N/A'}
                    </td>

                    <td className="p-3">
                      ₹{product.price || 0}
                    </td>

                    <td className="p-3">
                      ₹
                      {product.discountPrice ||
                        product.price ||
                        0}
                    </td>

                    <td className="p-3">
                      ⭐ {product.rating || 0}
                    </td>

                    <td className="p-3">

                      {product.isSale ? (
                        <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs">
                          ON SALE
                        </span>
                      ) : (
                        <span className="bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-xs">
                          NORMAL
                        </span>
                      )}

                    </td>

                    <td className="p-3 flex gap-2">

                      <button className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded-lg text-sm">
                        Edit
                      </button>

                      <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm">
                        Delete
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>
        )}
      </div>

      {/* ===================================== */}
      {/* ORDERS */}
      {/* ===================================== */}
      <div className="bg-white rounded-2xl p-5 shadow-sm">

        <h2 className="text-2xl font-semibold text-orange-500 mb-5">
          Latest Orders
        </h2>

        {ordersArray.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No orders available</p>
        ) : (
          <div className="overflow-auto">

            <table className="w-full">

              <thead className="bg-orange-100 text-orange-700">

                <tr>
                  <th className="p-3 text-left">Order ID</th>
                  <th className="p-3 text-left">User</th>
                  <th className="p-3 text-left">Amount</th>
                  <th className="p-3 text-left">Payment</th>
                  <th className="p-3 text-left">Status</th>
                </tr>

              </thead>

              <tbody>

                {ordersArray.map((order) => (

                  <tr
                    key={order._id}
                    className="border-b hover:bg-orange-50"
                  >

                    <td className="p-3">
                      {order._id?.slice(0, 8) || 'N/A'}
                    </td>

                    <td className="p-3">
                      {order.userId || 'N/A'}
                    </td>

                    <td className="p-3">
                      ₹{order.totalPrice || 0}
                    </td>

                    <td className="p-3">
                      {order.paymentMethod || 'N/A'}
                    </td>

                    <td className="p-3">

                      <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs">
                        {order.status || 'Pending'}
                      </span>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>
        )}
      </div>

    </div>
  );
}