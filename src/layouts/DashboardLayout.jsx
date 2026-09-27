import { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import Navbar from "../component/dashboard/Navbar";
import Sidebar from "../component/dashboard/Sidebar";
import Footer from "../layouts/Footer";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const closeSidebar = () => setSidebarOpen(false);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setSidebarOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <div className="drawer lg:drawer-open flex-1">
        <input
          id="drawer-toggle"
          type="checkbox"
          className="drawer-toggle"
          checked={sidebarOpen}
          onChange={(e) => setSidebarOpen(e.target.checked)}
        />

        <div className="drawer-content flex min-w-0 flex-col">
          <Navbar />

          <main className="min-w-0 flex-1 p-4 sm:p-6">
            <Outlet />
          </main>
        </div>

        <Sidebar closeSidebar={closeSidebar} />
      </div>

      
      <Footer/>
    </div>
  );
};

export default DashboardLayout;