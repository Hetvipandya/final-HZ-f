import { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./components/AdminSidebar";
import AdminTopbar from "./components/AdminTopbar";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen mt-8 bg-gray-100 overflow-hidden">
      {/* SIDEBAR */}
      <AdminSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col min-w-0">
        <AdminTopbar setSidebarOpen={setSidebarOpen} />

        {/* 👇 IMPORTANT FIX */}
        <main className="p-4 mt-[68px] md:mt-0 overflow-x-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
