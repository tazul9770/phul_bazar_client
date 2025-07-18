import { FiBarChart2, FiPackage, FiPlusCircle, FiShoppingCart, FiStar, FiTag, FiUsers } from "react-icons/fi";
import { MdBorderColor } from "react-icons/md";
import { Link } from "react-router";
import useAuthContext from "../../hooks/useAuthContext";

const Sidebar = () => {
  const {user} = useAuthContext()
  const customerItems = [
    { to: "/dashboard", icon: FiBarChart2, label: "Dashboard" },
    { to: "/dashboard/flowers", icon: FiPackage, label: "Flowers" },
    { to: "/dashboard/cart", icon: FiShoppingCart, label: "Carts" },
    { to: "/dashboard/orders", icon: MdBorderColor, label: "Orders" },
    { to: "/dashboard/categories", icon: FiTag, label: "Categories" }
  ];

  const adminItems = [
    { to: "/dashboard", icon: FiBarChart2, label: "Dashboard" },
    { to: "/dashboard/flowers", icon: FiPackage, label: "Flowers" },
    { to: "/dashboard/products/add", icon: FiPlusCircle, label: "Add Product" },
    { to: "/dashboard/categories", icon: FiTag, label: "Categories" },
    { to: "/dashboard/categories/add", icon: FiPlusCircle, label: "Add Category" },
    { to: "/dashboard/cart", icon: FiShoppingCart, label: "Carts" },
    { to: "/dashboard/orders", icon: MdBorderColor, label: "Orders" },
    { to: "/users", icon: FiUsers, label: "Users" },
  ];

    const items = user.is_staff ? adminItems : customerItems;
    
    return (
        <div className="drawer-side z-10">
        <label
          htmlFor="drawer-toggle"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <aside className="menu bg-base-200 w-64 min-h-full p-4 text-base-content">
          {/* Sidebar header */}
          <div className="flex items-center gap-2 mb-6 px-2">
            <FiShoppingCart className="h-6 w-6" />
            <Link to="/">
              <h1 className="text-xl font-bold">Phul_Bazar</h1>
            </Link>
          </div>

          {/* Sidebar menu */}
          <ul className="menu menu-md gap-2">
            {items.map((item, index) => (
                <li key={index}>
                    <Link to={item.to} className="flex items-center">
                        <item.icon className="h-4 w-4" />
                          <span>{item.label}</span>
                  </Link>
                </li>
            ))}
    
          </ul>

          {/* Sidebar footer */}
          <div className="mt-auto pt-6 text-xs text-base-content/70">
            © 2025 Phul_Bazar Admin
          </div>
        </aside>
      </div>
    );
};

export default Sidebar;