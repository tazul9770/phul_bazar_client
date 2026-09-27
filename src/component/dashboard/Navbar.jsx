import { useState } from "react";
import {
  FiBell,
  FiChevronDown,
  FiHome,
  FiLogOut,
  FiMenu,
  FiSearch,
  FiSettings,
  FiUser,
} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import useAuthContext from "../../hooks/useAuthContext";

// notifications > 0 hole bell-er upor lal dot dekhabe
const Navbar = () => {
  const { user, logoutUser } = useAuthContext();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const fullName =
    [user?.first_name, user?.last_name].filter(Boolean).join(" ") ||
    user?.email ||
    "User";
  const role = user?.is_superuser
    ? "Super Admin"
    : user?.is_staff
    ? "Admin"
    : "Customer";
  const initials = fullName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  // DaisyUI dropdown focus diye khole, tai click-er por focus soriye bondho korte hoy
  const closeDropdown = () => document.activeElement?.blur();

  const handleSearch = (e) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    navigate(`/dashboard/flowers?search=${encodeURIComponent(q)}`);
  };

  const handleLogout = () => {
    closeDropdown();
    logoutUser();
    navigate("/");
  };

  const Avatar = ({ size = "h-10 w-10" }) => (
    <span
      className={`grid ${size} shrink-0 place-items-center rounded-full bg-gradient-to-br from-pink-400 to-rose-500 text-sm font-bold text-white ring-2 ring-white`}
    >
      {initials || <FiUser />}
    </span>
  );

  return (
    <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-gray-100 bg-white/80 px-4 py-3 backdrop-blur sm:px-6">
      {/* Mobile sidebar toggle */}
      <label
        htmlFor="drawer-toggle"
        aria-label="Open sidebar"
        className="btn btn-square btn-ghost btn-sm lg:hidden"
      >
        <FiMenu className="h-5 w-5" />
      </label>

      <div className="ml-auto flex items-center gap-1 sm:gap-3">

        {/* Profile dropdown */}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            aria-label="Open profile menu"
            className="flex cursor-pointer items-center gap-3 rounded-xl p-1 transition hover:bg-gray-50 sm:pr-2"
          >
            <Avatar />
            <span className="hidden text-left leading-tight sm:block">
              <span className="block max-w-32 truncate text-sm font-semibold text-gray-900">
                {fullName}
              </span>
              <span className="block text-xs text-gray-400">{role}</span>
            </span>
            <FiChevronDown className="hidden h-4 w-4 text-gray-400 sm:block" />
          </div>

          <div
            tabIndex={0}
            className="dropdown-content z-50 mt-3 w-60 rounded-2xl border border-gray-100 bg-white p-2 shadow-xl"
          >
            <div className="flex items-center gap-3 border-b border-gray-100 px-3 pb-3 pt-2">
              <Avatar size="h-9 w-9" />
              <div className="min-w-0 leading-tight">
                <p className="truncate text-sm font-semibold text-gray-900">{fullName}</p>
                <p className="truncate text-xs text-gray-400">{user?.email}</p>
              </div>
            </div>

            <ul className="menu menu-sm gap-0.5 p-0 pt-2 text-gray-600">
              <li>
                <Link to="/dashboard/profile" onClick={closeDropdown}>
                  <FiUser className="h-4 w-4" /> Profile
                </Link>
              </li>
              <li>
                <Link to="/settings" onClick={closeDropdown}>
                  <FiSettings className="h-4 w-4" /> Settings
                </Link>
              </li>
              <li>
                <Link to="/" onClick={closeDropdown}>
                  <FiHome className="h-4 w-4" /> Visit store
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="text-rose-600 hover:bg-rose-50"
                >
                  <FiLogOut className="h-4 w-4" /> Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
