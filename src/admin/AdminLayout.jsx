// import { useState } from "react";
// import { Outlet } from "react-router-dom";
// import AdminSidebar from "./components/AdminSidebar";
// import AdminTopbar from "./components/AdminTopbar";

// export default function AdminLayout() {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   return (
//     <div className="flex min-h-screen mt-8 bg-gray-100 overflow-hidden">
//       {/* SIDEBAR */}
//       <AdminSidebar
//         sidebarOpen={sidebarOpen}
//         setSidebarOpen={setSidebarOpen}
//       />

//       {/* MAIN CONTENT */}
//       <div className="flex-1 flex flex-col min-w-0">
//         <AdminTopbar setSidebarOpen={setSidebarOpen} />

//         {/* 👇 IMPORTANT FIX */}
//         <main className="p-4 mt-[68px] md:mt-0 overflow-x-auto">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// }
import { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./components/AdminSidebar";
import AdminTopbar from "./components/AdminTopbar";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 relative">
      {/* 🔥 SIDEBAR - Fixed with higher z-index */}
      <div className="fixed  md:mt-0 lg:mt-[20px] left-0  z-[100]">
        <AdminSidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
      </div>

      {/* MAIN CONTENT LAYOUT */}
      <div className="flex flex-col min-h-screen">
        {/* TOPBAR - Fixed position to stay on top */}
        {/* <div className="fixed top-0 right-0 left-0 md:left-64 z-[90] bg-white shadow-md">
          <AdminTopbar setSidebarOpen={setSidebarOpen} />
        </div> */}

        {/* MAIN CONTENT - With proper padding for fixed header and sidebar */}
        <main className="flex-1 mt-0 md:ml-64 p-6 overflow-x-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}