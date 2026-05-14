import { NavLink } from "react-router-dom";

export default function AdminSidebar({ sidebarOpen, setSidebarOpen }) {

  const linkClass = ({ isActive }) =>
    `block p-2 rounded transition 
     ${
       isActive
         ? "bg-white text-primary"
         : "text-white hover:bg-white hover:text-primary"
     }`;
 
  return (
    <>
      {/* OVERLAY (mobile only) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside 
        className={`
          fixed md:static z-[9999]
          top-0 left-0 md:h-[100vh] h-full w-full md:w-64
          bg-primary shadow-lg 
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0 top-[85px]" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between p-4  border-b border-white/20 ">
          <h2 className="text-xl font-bold text-white">Admin Panel</h2>
          <button
            className="md:hidden text-white border border-white p-2 pr-[6px] rounded-full"
            onClick={() => setSidebarOpen(false)}
          >
           ❌
          </button> 
        </div>

        {/* MENU */}
        <nav className="p-4 space-y-2 font-bold">
          <NavLink to="/admin/dashboard" onClick={() => setSidebarOpen(false)} className={linkClass}>
            Dashboard
          </NavLink>

          <NavLink to="/admin/categories" onClick={() => setSidebarOpen(false)} className={linkClass}>
            Categories
          </NavLink>
          <NavLink to="/admin/products" onClick={() => setSidebarOpen(false)} className={linkClass}>
            Products
          </NavLink>


          <NavLink to="/admin/orders" onClick={() => setSidebarOpen(false)} className={linkClass}>
            Orders
          </NavLink>

          {/* <NavLink to="/admin/users" onClick={() => setSidebarOpen(false)} className={linkClass}>
            Users
          </NavLink> */}

          {/* <NavLink to="/admin/coupons" onClick={() => setSidebarOpen(false)} className={linkClass}>
            Coupons
          </NavLink> */}

          {/* <NavLink to="/admin/returns" onClick={() => setSidebarOpen(false)} className={linkClass}>
            Return & Refund
          </NavLink> */}

          {/* <NavLink to="/admin/payments" onClick={() => setSidebarOpen(false)} className={linkClass}>
            Payment 
          </NavLink>

          <NavLink to="/admin/reviews" onClick={() => setSidebarOpen(false)} className={linkClass}>
            Reviews
          </NavLink> */}

          <NavLink
  to="/"
  onClick={() => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("isAdmin"); // 🔥 IMPORTANT

    window.dispatchEvent(new Event("authChanged")); // 🔥 navbar update

    setSidebarOpen(false);
  }}
  className={linkClass}
>
  LogOut
</NavLink>

        </nav>
      </aside>
    </>
  );
}
