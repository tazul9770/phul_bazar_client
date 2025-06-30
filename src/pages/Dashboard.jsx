import { useState } from "react";
import {
  FiPackage,
  FiShoppingCart,
  FiStar,
  FiUsers
} from "react-icons/fi";
import Sidebar from "../component/dashboard/Sidebar";
import Navbar from "../component/dashboard/Navbar";
import Card from "../component/dashboard/Card";
import Order from "../component/dashboard/Order";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="drawer lg:drawer-open">
      {/* Mobile drawer checkbox */}
      <input
        id="drawer-toggle"
        type="checkbox"
        className="drawer-toggle"
        checked={sidebarOpen}
        onChange={toggleSidebar}
      />

      {/* Page content */}
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <Navbar sidebarOpen={sidebarOpen}/>

        {/* Main content */}
        <main className="p-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card icon={FiPackage} title="Total Products" value="745"/>
            <Card icon={FiShoppingCart} title="Total Orders" value="130"/>
            <Card icon={FiUsers} title="Total Users" value="681"/>
            <Card icon={FiStar} title="Average Rating" value="5.9"/>
          </div>

          {/* order */}
          <Order/>

        </main>
      </div>

      {/* Sidebar */}
      <Sidebar/>
    </div>
  );
}