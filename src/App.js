import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import "./App.css"
import Checkout from "./pages/Checkout";
import Wishlist from "./pages/Wishlist";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Orders from "./pages/orders/Orders";
import OrderDetails from "./pages/orders/OrderDetails";

import AdminLayout from "./admin/AdminLayout"; 
import Dashboard from "./admin/Dashboard";
import Products from "./admin/products/Products";

import AdminOrders from "./admin/order/Orders";
import Users from "./admin/users/Users";
import Categories from "./admin/categories/Categories";
import ScrollToTop from "./components/ScrollToTop";
import Profile from "./pages/profile/Profile";
import Footer from "./components/Footer";
import About from "./pages/About";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import FAQ from "./pages/FAQ";
import ReturnPolicy from "./pages/ReturnPolicy";
import ProductAdd from "./admin/products/ProductAdd";
import ProductEdit from "./admin/products/ProductEdit";
import CategoryAdd from "./admin/categories/CategoryAdd";
import CategoryEdit from "./admin/categories/CategoryEdit";
import Coupons from "./admin/coupons/Coupons";
import CouponAdd from "./admin/coupons/CouponAdd";
import CouponEdit from "./admin/coupons/CouponEdit";
import ReturnsRefunds from "./admin/returns/ReturnsRefunds";
import Payments from "./admin/payments/Payments";
import Reviews from "./admin/reviews/Reviews";
import AdminLogin from "./admin/auth/AdminLogin";


function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsConditions />} />
        <Route path="/returns" element={<ReturnPolicy />} />
        <Route path="/faq" element={<FAQ />} />



        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/:orderId" element={<OrderDetails />} />

        <Route path="/adminlogin" element={<AdminLogin />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="products/add" element={<ProductAdd />} />
          <Route path="products/edit/:id" element={<ProductEdit />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="users" element={<Users />} />
          <Route path="categories" element={<Categories />} />
          <Route path="categories/add" element={<CategoryAdd />} />
          <Route path="categories/edit/:id" element={<CategoryEdit />} />
          <Route path="coupons" element={<Coupons />} />
          <Route path="coupons/add" element={<CouponAdd />} />
          <Route path="coupons/edit/:id" element={<CouponEdit />} />
          <Route path="returns" element={<ReturnsRefunds />} />
          <Route path="payments" element={<Payments />} />
          <Route path="reviews" element={<Reviews />} />
        


        </Route>

      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
