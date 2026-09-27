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
import Img from "../../assets/avatar/flower.png"

const PetalMark = () => (
  <svg viewBox="0 0 32 32" className="h-6 w-6" aria-hidden="true">
    <g>
      <path d="M16 16C16 16 13 8 16 3C19 8 16 16 16 16Z" fill="currentColor" className="text-secondary" />
      <path d="M16 16C16 16 24 14 29 17C24 20 16 16 16 16Z" fill="currentColor" className="text-primary" />
      <path d="M16 16C16 16 19 24 16 29C13 24 16 16 16 16Z" fill="currentColor" className="text-primary/80" />
      <path d="M16 16C16 16 8 18 3 15C8 12 16 16 16 16Z" fill="currentColor" className="text-secondary/80" />
      <circle cx="16" cy="16" r="3" fill="currentColor" className="text-primary" />
    </g>
  </svg>
);

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

// badges = { "/dashboard/orders": 12 } dile oi item-er pashe badge dekhabe
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
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10">
              <PetalMark />
            </span>
            <span className="leading-tight">
              <span className="block font-serif text-lg italic text-gray-900">
                Phul<span className="text-primary not-italic font-sans font-extrabold">Bazar</span>
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
            className="btn btn-square btn-ghost btn-sm text-gray-500 hover:bg-gray-100 hover:text-primary lg:hidden"
          >
            <FiX className="h-5 w-5" />
          </label>
        </div>

        {/* Menu */}
        <nav className="flex-1 overflow-y-auto px-3" aria-label="Dashboard menu">
          <p className="px-4 pb-2 pt-1 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
            {user?.is_staff ? "Admin menu" : "My account"}
          </p>
          <ul className="space-y-1">
            {items.map(({ to, icon: Icon, label, end }) => {
              const badge = badges[to];
              return (
                <li key={to || label}>
                  <NavLink
                    to={to}
                    end={end}
                    onClick={closeSidebar}
                    className={({ isActive }) =>
                      `group flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <Icon
                          className={`h-[18px] w-[18px] shrink-0 ${
                            isActive ? "text-primary" : "text-gray-400 group-hover:text-gray-600"
                          }`}
                        />
                        <span className="flex-1">{label}</span>
                        {badge > 0 && (
                          <span className="grid h-5 min-w-5 place-items-center rounded-full bg-secondary/15 px-1.5 text-xs font-semibold text-secondary">
                            {badge}
                          </span>
                        )}
                      </>
                    )}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Promo card */}
        <div className="m-4 mt-6 shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/15 p-4">
          <div className="overflow-hidden rounded-xl shadow-sm">
            <img
              src={Img}
              alt="Fresh bouquet"
              className="h-28 w-full object-cover"
            />
          </div>
          <p className="mt-3 text-sm leading-snug text-gray-700">
            Make the world <span className="font-bold text-gray-900">more beautiful</span> with flowers
          </p>
          <FiHeart className="mt-2 h-4 w-4 fill-secondary text-secondary" />
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
