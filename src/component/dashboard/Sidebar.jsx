import { Link, NavLink } from "react-router-dom";
import {
  FiClipboard,
  FiHeart,
  FiHome,
  FiMail,
  FiPackage,
  FiPlusCircle,
  FiShoppingCart,
  FiTag,
  FiUsers,
  FiX,
} from "react-icons/fi";
import useAuthContext from "../../hooks/useAuthContext";

// `end: true` mane exact match hole-i active hobe
// (/dashboard/categories ar /dashboard/categories/add jate duitai highlight na hoy)
const customerItems = [
  { to: "/dashboard", icon: FiHome, label: "Dashboard", end: true },
  { to: "/dashboard/cart", icon: FiShoppingCart, label: "My Carts" },
  { to: "/dashboard/orders", icon: FiClipboard, label: "My Orders" },
  { to: "", icon: FiClipboard, label: "My Address" },
  { to: "", icon: FiClipboard, label: "My Reviews" },
  { to: "", icon: FiClipboard, label: "Contact us" }
];

const adminItems = [
  { to: "/dashboard", icon: FiHome, label: "Dashboard", end: true },
  { to: "/dashboard/flowers", icon: FiPackage, label: "Flowers" },
  { to: "/dashboard/products/add", icon: FiPlusCircle, label: "Add Product" },
  { to: "/dashboard/categories", icon: FiTag, label: "Categories", end: true },
  { to: "/dashboard/categories/add", icon: FiPlusCircle, label: "Add Category" },
  { to: "/dashboard/cart", icon: FiShoppingCart, label: "Carts" },
  { to: "/dashboard/orders", icon: FiClipboard, label: "Orders" },
  { to: "/dashboard/users", icon: FiUsers, label: "Users" },
  { to: "/dashboard/contact", icon: FiMail, label: "Contact" },
  { to: "/dashboard/reviews", icon: FiPackage, label: "Reviews" },
];

// badges = { "/dashboard/orders": 12 } dile oi item-er pashe pink badge dekhabe
const Sidebar = ({ closeSidebar, badges = {} }) => {
  const { user } = useAuthContext();
  const items = user?.is_staff ? adminItems : customerItems;

  return (
    <div className="drawer-side z-40">
      <label
        htmlFor="drawer-toggle"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>

      <aside className="flex min-h-full w-72 max-w-[85vw] flex-col border-r border-gray-100 bg-white text-gray-600 lg:w-64">
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-5">
          <Link to="/" onClick={closeSidebar} className="flex items-center gap-2.5">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-pink-50 text-xl">
              🌸
            </span>
            <span className="leading-tight">
              <span className="block text-lg font-extrabold text-gray-900">
                Phul_Bazar
              </span>
              <span className="block text-[10px] text-gray-400">
                Fresh Flowers, Happier Moments
              </span>
            </span>
          </Link>

          {/* Mobile close button */}
          <label
            htmlFor="drawer-toggle"
            aria-label="Close sidebar"
            className="btn btn-square btn-ghost btn-sm lg:hidden"
          >
            <FiX className="h-5 w-5" />
          </label>
        </div>

        {/* Menu */}
        <nav className="flex-1 px-3" aria-label="Dashboard menu">
          <ul className="space-y-1">
            {items.map(({ to, icon: Icon, label, end }) => {
              const badge = badges[to];
              return (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={end}
                    onClick={closeSidebar}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-pink-100 text-pink-600"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`
                    }
                  >
                    <Icon className="h-[18px] w-[18px] shrink-0" />
                    <span className="flex-1">{label}</span>
                    {badge > 0 && (
                      <span className="grid h-5 min-w-5 place-items-center rounded-full bg-pink-100 px-1.5 text-xs font-semibold text-pink-600">
                        {badge}
                      </span>
                    )}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Promo card */}
        <div className="m-4 mt-6 shrink-0 rounded-2xl bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 p-4">
          <div className="text-4xl">💐</div>
          <p className="mt-2 text-sm text-gray-600">
            Make the world <span className="font-semibold text-gray-800">more beautiful</span> with flowers
          </p>
          <FiHeart className="mt-2 h-4 w-4 fill-pink-500 text-pink-500" />
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
