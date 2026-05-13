import { FiMenu } from "react-icons/fi";

export default function AdminTopbar({ setSidebarOpen }) {
  return (
    <header className="bg-white z-[999] fixed top-[88px] md:static w-full shadow p-4 flex items-center gap-4 justify-between pr-6 ">
      {/* MOBILE MENU BUTTON */}
      <h1 className="text-lg font-semibold text-primary">Admin Dashboard</h1>
      <button
        className="md:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <FiMenu size={22} />
      </button>

    </header>
  );
}
