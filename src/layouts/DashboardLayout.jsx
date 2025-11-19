import { useState } from "react";
import Navbar from "../component/dashboard/Navbar";
import Sidebar from "../component/dashboard/Sidebar";
import { Outlet } from "react-router";
import { Link } from "react-router-dom"; 

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      {/* Drawer Layout (Sidebar + Content) */}
      <div className="drawer lg:drawer-open flex-1">
        <input
          id="drawer-toggle"
          type="checkbox"
          className="drawer-toggle"
          checked={sidebarOpen}
          onChange={toggleSidebar}
        />

        {/* Page Content */}
        <div className="drawer-content flex flex-col">
          <Navbar toggleSidebar={toggleSidebar} />

          <main className="p-6">
            <Outlet />
          </main>
        </div>

        {/* Sidebar Panel */}
        <Sidebar />
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 pt-10 pb-6 px-6 sm:px-10 md:px-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 border-b border-gray-700 pb-8">

          {/* Brand */}
          <div>
            <Link to="/" className="text-2xl font-bold text-white">
              🌸 Phul_Bazar
            </Link>
            <p className="mt-3 text-sm text-gray-400">
              Your one-stop shop for fresh, beautiful flowers delivered straight to your door.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h6 className="text-lg font-semibold text-white mb-3">Quick Links</h6>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-pink-400 transition">Home</Link></li>
              <li><Link to="/shop" className="hover:text-pink-400 transition">Shop</Link></li>
              <li><Link to="/about" className="hover:text-pink-400 transition">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-pink-400 transition">Contact</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h6 className="text-lg font-semibold text-white mb-3">Customer Service</h6>
            <ul className="space-y-2 text-sm">
              <li><Link to="/faq" className="hover:text-pink-400 transition">FAQ</Link></li>
              <li><Link to="/returns" className="hover:text-pink-400 transition">Returns & Refunds</Link></li>
              <li><Link to="/privacy" className="hover:text-pink-400 transition">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-pink-400 transition">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h6 className="text-lg font-semibold text-white mb-3">Follow Us</h6>
            <div className="flex gap-4 text-gray-300 text-sm">
              <a href="https://www.facebook.com/tazul.islam.229952?mibextid=ZbWKwL" target="_blank" rel="noreferrer" className="hover:text-pink-400 transition">Facebook</a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-pink-400 transition">Twitter</a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-pink-400 transition">Instagram</a>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 text-sm text-gray-400">
          <p>© {new Date().getFullYear()} Phul_Bazar. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">
            Made with ❤️ by <span className="text-pink-400 font-semibold">Phul_Bazar Team</span>
          </p>
        </div>
      </footer>

    </div>
  );
};

export default DashboardLayout;
