import { Link } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";
import useCartContext from "../hooks/useCartContext";
import useFetchCategories from "../hooks/useFetchCategories";

const Navbar = () => {
  const { user, logoutUser } = useAuthContext();
  const { cart } = useCartContext();
  const { categories, loading } = useFetchCategories();

  return (
    <div className="navbar bg-white shadow-md px-4">
      {/* Left: Logo and Mobile Menu */}
      <div className="navbar-start">
        <div className="dropdown lg:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </div>
          <ul className="menu menu-sm dropdown-content mt-3 z-10 p-2 shadow rounded-box w-52 bg-white">
            {user ? (
              <>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li>
                  <details>
                    <summary>Category</summary>
                    <ul className="p-2">
                      {loading ? (
                        <li><span>Loading...</span></li>
                      ) : (
                        categories.map((category) => (
                          <li key={category.id}>
                            <Link to={`/shop_cate_pagi/${category.id}`}>{category.name}</Link>
                          </li>
                        ))
                      )}
                    </ul>
                  </details>
                </li>
                <li><Link to="/shop">Shop</Link></li>
              </>
            ) : (
              <>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
              </>
            )}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl font-semibold text-black">
          Phul_Bazar
        </Link>
      </div>

      {/* Center: Desktop Menu */}
      <div className="navbar-center hidden lg:flex">
        {user && (
          <ul className="menu menu-horizontal px-1 text-base font-medium">
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li>
              <details>
                <summary>Category</summary>
                <ul className="p-2">
                  {loading ? (
                    <li><span>Loading...</span></li>
                  ) : (
                    categories.map((category) => (
                      <li key={category.id}>
                        <Link to={`/shop_cate_pagi/${category.id}`}>{category.name}</Link>
                      </li>
                    ))
                  )}
                </ul>
              </details>
            </li>
            <li><Link to="/shop">Shop</Link></li>
          </ul>
        )}
      </div>

      {/* Right: Cart / Profile or Login/Register */}
      <div className="navbar-end gap-2">
        {user ? (
          <div className="flex items-center gap-2">
            {/* Cart */}
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                <div className="indicator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
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
                  <span className="badge badge-sm badge-primary indicator-item">
                    {cart?.items?.length || 0}
                  </span>
                </div>
              </div>
              <div className="dropdown-content mt-3 z-10 w-64 p-4 bg-white rounded-box shadow">
                <span className="font-semibold text-lg">
                  {cart?.items?.length || 0} Items
                </span>
                <span className="text-sm text-gray-500">
                  ${cart?.total_price || 0}
                </span>
                <div className="mt-2">
                  <Link to="/dashboard/cart/">
                    <button className="btn btn-primary w-full">View Cart</button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Profile */}
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                  <span className="text-lg font-semibold">👤</span>
                </div>
              </div>
              <ul className="menu menu-sm dropdown-content mt-3 z-10 p-2 shadow bg-white rounded-box w-52">
                <li><Link to="/dashboard/profile">Profile</Link></li>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><button onClick={logoutUser}>Logout</button></li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="hidden lg:flex gap-3">
            <Link to="/login" className="btn btn-sm btn-primary">Login</Link>
            <Link to="/register" className="btn btn-sm btn-outline-primary border-primary text-primary hover:bg-primary hover:text-white">Register</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
