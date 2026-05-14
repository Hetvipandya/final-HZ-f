// import { NavLink } from "react-router-dom";

// export default function AdminSidebar({ sidebarOpen, setSidebarOpen }) {

//   const linkClass = ({ isActive }) =>
//     `block p-2 rounded transition 
//      ${
//        isActive
//          ? "bg-white text-primary"
//          : "text-white hover:bg-white hover:text-primary"
//      }`;
 
//   return (
//     <>
//       {/* OVERLAY (mobile only) */}
//       {sidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black/40 z-40 md:hidden"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}

//       <aside 
//         className={`
//           fixed md:static z-[9999]
//           top-0 left-0 md:h-[100vh] h-full w-full md:w-64
//           bg-primary shadow-lg 
//           transform transition-transform duration-300
//           ${sidebarOpen ? "translate-x-0 top-[85px]" : "-translate-x-full"}
//           md:translate-x-0
//         `}
//       >
//         {/* HEADER */}
//         <div className="flex items-center justify-between p-4  border-b border-white/20 ">
//           <h2 className="text-xl font-bold text-white">Admin Panel</h2>
//           <button
//             className="md:hidden text-white border border-white p-2 pr-[6px] rounded-full"
//             onClick={() => setSidebarOpen(false)}
//           >
//            ❌
//           </button> 
//         </div>

//         {/* MENU */}
//         <nav className="p-4 space-y-2 font-bold">
//           <NavLink to="/admin/dashboard" onClick={() => setSidebarOpen(false)} className={linkClass}>
//             Dashboard
//           </NavLink>

//           <NavLink to="/admin/categories" onClick={() => setSidebarOpen(false)} className={linkClass}>
//             Categories
//           </NavLink>
//           <NavLink to="/admin/products" onClick={() => setSidebarOpen(false)} className={linkClass}>
//             Products
//           </NavLink>


//           <NavLink to="/admin/orders" onClick={() => setSidebarOpen(false)} className={linkClass}>
//             Orders
//           </NavLink>

//           {/* <NavLink to="/admin/users" onClick={() => setSidebarOpen(false)} className={linkClass}>
//             Users
//           </NavLink> */}

//           {/* <NavLink to="/admin/coupons" onClick={() => setSidebarOpen(false)} className={linkClass}>
//             Coupons
//           </NavLink> */}

//           {/* <NavLink to="/admin/returns" onClick={() => setSidebarOpen(false)} className={linkClass}>
//             Return & Refund
//           </NavLink> */}

//           {/* <NavLink to="/admin/payments" onClick={() => setSidebarOpen(false)} className={linkClass}>
//             Payment 
//           </NavLink>

//           <NavLink to="/admin/reviews" onClick={() => setSidebarOpen(false)} className={linkClass}>
//             Reviews
//           </NavLink> */}

//           <NavLink
//   to="/"
//   onClick={() => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("currentUser");
//     localStorage.removeItem("isAdmin"); // 🔥 IMPORTANT

//     window.dispatchEvent(new Event("authChanged")); // 🔥 navbar update

//     setSidebarOpen(false);
//   }}
//   className={linkClass}
// >
//   LogOut
// </NavLink>

//         </nav>
//       </aside>
//     </>
//   );
// }


import { NavLink } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

export default function AdminSidebar({
  sidebarOpen,
  setSidebarOpen,
}) {
  const linkClass = ({ isActive }) =>
    `block w-full px-4 py-3 rounded-xl transition-all duration-200 text-sm md:text-base font-medium
    ${
      isActive
        ? "bg-white text-primary shadow-md"
        : "text-white hover:bg-white hover:text-primary"
    }`;

  return (
    <>
      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed md:sticky
          top-0 md:top-0
          left-0
          z-50
          h-screen
          w-[270px] sm:w-[290px] md:w-64
          bg-primary
          shadow-2xl
          flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/20 shrink-0">
          <h2 className="text-lg md:text-xl font-bold text-white mt-3 tracking-wide">
            Admin Panel
          </h2>

          {/* MOBILE CLOSE BUTTON */}
          {/* <button
            className="md:hidden text-white border border-white/40 p-2 rounded-full hover:bg-white hover:text-primary transition"
            onClick={() => setSidebarOpen(false)}
          >
            <FaTimes size={14} />
          </button> */}
        </div>

        {/* MENU */}
        <nav className="flex-1 overflow-y-auto px-4 py-5 space-y-3">
          <NavLink
            to="/admin/dashboard"
            onClick={() => setSidebarOpen(false)}
            className={linkClass}
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/categories"
            onClick={() => setSidebarOpen(false)}
            className={linkClass}
          >
            Categories
          </NavLink>

          <NavLink
            to="/admin/products"
            onClick={() => setSidebarOpen(false)}
            className={linkClass}
          >
            Products
          </NavLink>

          <NavLink
            to="/admin/orders"
            onClick={() => setSidebarOpen(false)}
            className={linkClass}
          >
            Orders
          </NavLink>
        </nav>

        {/* FOOTER / LOGOUT */}
        <div className="p-4 border-t border-white/20 shrink-0">
          <NavLink
            to="/"
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("currentUser");
              localStorage.removeItem("isAdmin");

              window.dispatchEvent(new Event("authChanged"));

              setSidebarOpen(false);
            }}
            className={linkClass}
          >
            Logout
          </NavLink>
        </div>
      </aside>
    </>
  );
}