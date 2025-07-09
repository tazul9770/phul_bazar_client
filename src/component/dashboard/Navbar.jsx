import { FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";

const Navbar = ({ sidebarOpen }) => {
  const avatarUrl =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2ci45lDsJ5gEB2_-lHyyzjvSA08XAgz52uQ&s";

  return (
    <div className="navbar bg-white shadow-sm px-4 sticky top-0 z-50">
      {/* Sidebar toggle button */}
      <div className="flex-none lg:hidden">
        <label htmlFor="drawer-toggle" className="btn btn-square btn-ghost">
          {sidebarOpen ? (
            <FiX className="h-6 w-6" />
          ) : (
            <FiMenu className="h-6 w-6" />
          )}
        </label>
      </div>

      {/* Logo / Title */}
      <div className="flex-1">
        <h2 className="text-xl font-bold text-gray-800">Dashboard</h2>
      </div>

      {/* Avatar Dropdown */}
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                alt="User Avatar"
                src={avatarUrl}
                onError={(e) =>
                  (e.target.src = "https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff")
                }
              />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[10] p-2 shadow-lg bg-white rounded-box w-52"
          >
            <li>
              <Link to="/dashboard/profile" className="justify-between">
                Profile
                <span className="badge badge-primary text-white">New</span>
              </Link>
            </li>
            <li>
              <Link to="/settings">Settings</Link>
            </li>
            <li>
              <button className="text-left w-full">Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
