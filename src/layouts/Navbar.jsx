import { NavLink, Link } from "react-router-dom";
import { useState } from "react";
import useAuthContext from "../hooks/useAuthContext";
import useCartContext from "../hooks/useCartContext";
import useFetchCategories from "../hooks/useFetchCategories";

const Navbar = () => {
  const { user, logoutUser } = useAuthContext();
  const { cart } = useCartContext();
  const { categories, loading } = useFetchCategories();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const MenuLink = ({ to, children }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? "text-secondary font-semibold"
          : "text-gray-700 hover:text-primary transition-colors"
      }
    >
      {children}
    </NavLink>
  );

  return (
    <header className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 lg:px-8 flex justify-between items-center h-16">
        {/* LEFT: Logo & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition"
            aria-label="Toggle Menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <Link
            to="/"
            className="text-2xl lg:text-3xl font-bold text-primary hover:text-secondary transition-colors"
          >
            Phul<span className="text-secondary">Bazar</span>
          </Link>
        </div>

        {/* CENTER: Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-8 font-medium text-gray-700">
          {user ? (
            <>
              <MenuLink to="/dashboard">Dashboard</MenuLink>
              <div className="relative group">
                <span className="cursor-pointer hover:text-primary transition">Category</span>
                <ul className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  {loading ? (
                    <li className="px-4 py-2 text-gray-500">Loading...</li>
                  ) : (
                    categories.map((category) => (
                      <li
                        key={category.id}
                        className="px-4 py-2 hover:bg-gray-50 rounded transition"
                      >
                        <Link
                          to={`/shop_cate_pagi/${category.id}`}
                          className="block font-medium text-gray-700 hover:text-primary"
                        >
                          {category.name}
                        </Link>
                      </li>
                    ))
                  )}
                </ul>
              </div>
              <MenuLink to="/shop">Shop</MenuLink>
              <MenuLink to="/about">About Us</MenuLink>
            </>
          ) : (
            <>
              <MenuLink to="/">Home</MenuLink>
              <MenuLink to="/about">About Us</MenuLink>
              <MenuLink to="/shop">Shop</MenuLink>
            </>
          )}
        </nav>

        {/* RIGHT: Cart / Profile / Auth */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              {/* CART */}
              <div className="dropdown dropdown-end relative">
                <button
                  className="relative p-2 rounded-full hover:bg-gray-100 transition"
                  aria-label="Cart"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  {cart?.items?.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cart.items.length}
                    </span>
                  )}
                </button>
                <div className="dropdown-content mt-3 p-4 w-64 bg-white shadow-xl rounded-xl transition-all">
                  <span className="font-semibold text-lg">{cart?.items?.length || 0} Items</span>
                  <span className="block text-sm text-gray-500 mb-2">${cart?.total_price || 0}</span>
                  <Link to="/dashboard/cart">
                    <button className="btn btn-primary w-full">View Cart</button>
                  </Link>
                </div>
              </div>

              {/* PROFILE */}
              <div className="dropdown dropdown-end relative">
                <button className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xl">
                    👤
                  </div>
                </button>
                <ul className="menu menu-sm dropdown-content mt-3 z-10 p-3 shadow-xl bg-white rounded-xl w-52">
                  <li><Link to="/dashboard/profile">Profile</Link></li>
                  <li><Link to="/dashboard">Dashboard</Link></li>
                  <li><button onClick={logoutUser}>Logout</button></li>
                </ul>
              </div>
            </>
          ) : (
            <div className="hidden lg:flex gap-3">
              <Link to="/login" className="btn btn-sm btn-primary px-5">Login</Link>
              <Link
                to="/register"
                className="btn btn-sm border-primary text-primary hover:bg-primary hover:text-white px-5"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`lg:hidden bg-white shadow-lg border-t border-gray-200 transition-all duration-300 overflow-hidden ${
          mobileMenuOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col p-4 gap-2 text-gray-700 font-medium">
          {user ? (
            <>
              <li>
                <Link
                  to="/dashboard"
                  className="block px-3 py-2 rounded hover:bg-gray-100 transition"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <details className="group">
                  <summary className="px-3 py-2 rounded hover:bg-gray-100 cursor-pointer transition">
                    Category
                  </summary>
                  <ul className="pl-4 mt-2 space-y-1">
                    {loading ? (
                      <li>Loading...</li>
                    ) : (
                      categories.map((cat) => (
                        <li
                          key={cat.id}
                          className="px-2 py-1 hover:bg-gray-100 rounded transition"
                        >
                          <Link to={`/shop_cate_pagi/${cat.id}`} className="block">
                            {cat.name}
                          </Link>
                        </li>
                      ))
                    )}
                  </ul>
                </details>
              </li>
              <li>
                <Link
                  to="/shop"
                  className="block px-3 py-2 rounded hover:bg-gray-100 transition"
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="block px-3 py-2 rounded hover:bg-gray-100 transition"
                >
                  About Us
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/"
                  className="block px-3 py-2 rounded hover:bg-gray-100 transition"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="block px-3 py-2 rounded hover:bg-gray-100 transition"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/shop"
                  className="block px-3 py-2 rounded hover:bg-gray-100 transition"
                >
                  Shop
                </Link>
              </li>
              <li className="mt-2 flex flex-col gap-2 px-3">
                <Link
                  to="/login"
                  className="text-center text-primary font-semibold border-b-2 border-primary py-2 rounded hover:bg-primary hover:text-white transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-center text-white bg-primary font-semibold py-2 rounded hover:bg-secondary transition"
                >
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
