

import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import {
  FiSearch,
  FiHeart,
  FiShoppingCart,
  FiUser,
} from "react-icons/fi";
import SearchModal from "./SearchModal";
import BASE_URL from "../BASEURL";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [categories, setCategories] = useState([]);
  const backendUrl = BASE_URL;

  // ✅ USER + ADMIN LOAD
  useEffect(() => {
    const loadAuth = () => {
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      const adminStatus = localStorage.getItem("isAdmin") === "true";

      setUser(currentUser);
      setIsAdmin(adminStatus);
    };

    loadAuth();

    window.addEventListener("authChanged", loadAuth);
    return () => window.removeEventListener("authChanged", loadAuth);
  }, []);

  // ✅ LOAD CATEGORIES
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await fetch(`${backendUrl}/api/category`);
        const data = await res.json();
        if (data?.success && Array.isArray(data.data)) {
          setCategories(data.data.map((category) => category.name));
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    loadCategories();
  }, []);

  // ✅ CART COUNT
  useEffect(() => {
    const updateCounts = () => {
      const cart = JSON.parse(localStorage.getItem("cartItems")) || [];
      const totalQty = cart.reduce(
        (sum, item) => sum + Number(item.quantity || 0),
        0
      );
      setCartCount(totalQty);
    };

    updateCounts();
    window.addEventListener("cartUpdated", updateCounts);

    return () => window.removeEventListener("cartUpdated", updateCounts);
  }, []);

  // ✅ BODY SCROLL LOCK
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [open]);

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-black font-semibold border-b-2 border-black pb-1"
      : "text-black hover:text-gray-700";

  return (
    <>
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-[99999] bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          {/* LOGO */}
          <NavLink to="/" onClick={() => setOpen(false)}>
            <img
              src="/image/logo/LOGO.png"
              alt="Logo"
              className="h-14 md:h-16 lg:h-20 object-contain"
            />
          </NavLink>

          {/* DESKTOP MENU */}
          <ul className="hidden md:flex gap-8 items-center font-xl">
            <li><NavLink to="/" className={navLinkClass}>Home</NavLink></li>
            <li><NavLink to="/about" className={navLinkClass}>About</NavLink></li>

            <li className="relative group">
              <NavLink to="/shop" className={navLinkClass}>
                Category
              </NavLink>

              <ul className="absolute left-0 top-full pt-2 w-52 bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-200">
                {categories.map((cat) => (
                  <li key={cat}>
                    <NavLink
                      to={`/shop?category=${encodeURIComponent(cat)}`}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      {cat}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </li>

            <li><NavLink to="/orders" className={navLinkClass}>Orders</NavLink></li>
          </ul>

          {/* ICONS */}
          <div className="hidden md:flex items-center gap-6">

            <button onClick={() => setOpenSearch(true)}>
              <FiSearch size={22} />
            </button>

            <NavLink to="/wishlist">
              <FiHeart size={22} />
            </NavLink>

            <NavLink to="/cart" className="relative">
              <FiShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] px-1 rounded-full">
                  {cartCount}
                </span>
              )}
            </NavLink>

            {/* USER */}
            <NavLink to={user ? "/profile" : "/login"}>
              <FiUser size={22} />
            </NavLink>

            {/* 🔥 ADMIN (A circle) */}
            {isAdmin && (
              <NavLink
                to="/admin"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-red-500 text-white font-bold text-sm hover:bg-red-600 transition"
              >
                A
              </NavLink>
            )}

          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setOpen(true)}
          >
            <FaBars />
          </button>
        </div>
      </nav>

      <div className="h-[90px]" />

      {/* MOBILE MENU */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white z-[99999] transform transition-transform ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 border-b flex justify-between">
          <FaTimes onClick={() => setOpen(false)} />
        </div>

        <ul className="flex flex-col p-4 gap-4">

          <NavLink to="/" onClick={() => setOpen(false)}>Home</NavLink>
          <NavLink to="/about" onClick={() => setOpen(false)}>About</NavLink>

          {/* 🔥 MOBILE ADMIN */}
          {isAdmin && (
            <NavLink
              to="/admin"
              onClick={() => setOpen(false)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-red-500 text-white font-bold"
            >
              A
            </NavLink>
          )}

          <NavLink to="/orders" onClick={() => setOpen(false)}>Orders</NavLink>
        </ul>
      </div>

      {/* SEARCH MODAL */}
      {openSearch && <SearchModal onClose={() => setOpenSearch(false)} />}
    </>
  );
}
