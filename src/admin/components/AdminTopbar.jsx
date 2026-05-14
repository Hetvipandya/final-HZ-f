import { useState } from "react";
import { FiMenu, FiX, FiSearch } from "react-icons/fi";
import { NavLink } from "react-router-dom";

export default function AdminTopbar({
  setSidebarOpen,
  sidebarOpen,
}) {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="h-20 px-4 md:px-6 flex items-center justify-between bg-white shadow-sm border-b relative">

      {/* LEFT SIDE */}
      <div className="flex items-center gap-3">

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden text-gray-700 z-50"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? (
            <FiX size={26} />
          ) : (
            <FiMenu size={26} />
          )}
        </button>

        {/* LOGO */}
        <NavLink
          to="/"
          className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0"
        >
          <img
            src="/image/logo/LOGO.png"
            alt="logo"
            className="h-16 md:h-20 object-contain"
          />
        </NavLink>
      </div>

      {/* DESKTOP SEARCH */}
      <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-2 w-[280px] lg:w-[350px]">
        <FiSearch className="text-gray-500 text-lg" />

        <input
          type="text"
          placeholder="Search here..."
          className="bg-transparent outline-none px-2 text-sm w-full"
        />
      </div>

      {/* MOBILE SEARCH ICON */}
      <button
        className="md:hidden text-gray-700 z-50"
        onClick={() => setSearchOpen(!searchOpen)}
      >
        <FiSearch size={22} />
      </button>

      {/* MOBILE SEARCH BAR */}
      <div
        className={`md:hidden absolute top-full right-4 mt-2 w-[90%] sm:w-[350px] bg-white shadow-lg rounded-xl p-2 flex items-center gap-2 transition-all duration-300 z-40 ${
          searchOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        {/* SEARCH INPUT */}
        <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 flex-1">
          <FiSearch className="text-gray-500 text-lg" />

          <input
            type="text"
            placeholder="Search here..."
            autoFocus
            className="bg-transparent outline-none px-2 text-sm w-full"
          />
        </div>

        {/* CLOSE BUTTON */}
        <button
          className="text-gray-700"
          onClick={() => setSearchOpen(false)}
        >
          <FiX size={22} />
        </button>
      </div>
    </div>
  );
}