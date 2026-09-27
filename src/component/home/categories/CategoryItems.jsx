import { FaRegArrowAltCircleRight, FaTrashAlt } from "react-icons/fa";
import useAuthContext from "../../../hooks/useAuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import authApiClient from "../../../services/auth_apiClient";

const CategoryItems = ({ category }) => {
  const { user } = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();

  const linkPath = location.pathname.includes("/dashboard/categories")
    ? `/dashboard/categories/shop_cate_pagi/${category.id}`
    : `/shop_cate_pagi/${category.id}`;

  const handleDelete = async () => {
    try {
      await authApiClient.delete(`/category/${category.id}`);
      alert("Category deleted successfully");
    } catch (err) {
      console.error(err);
    }
  };

  const handleCategoryClick = () => {
    if (!user) navigate("/login");
    else navigate(linkPath);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleCategoryClick();
    }
  };

  return (
    <div
      onClick={handleCategoryClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      className="group relative flex min-h-[240px] w-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
    >
      {/* Decorative petal-glow, brand colored */}
      <div className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 transition-transform duration-500 ease-out group-hover:scale-150" />

      <div className="relative flex flex-grow flex-col">
        <div className="mb-5 flex items-start justify-between">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-2xl font-bold uppercase text-white shadow-lg shadow-primary/20 transition-transform duration-300 group-hover:scale-105">
            {category.name?.charAt(0)}
          </div>

          <span className="rounded-full border border-primary/10 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">
            {category.flower_count || 0} Items
          </span>
        </div>

        <div className="flex-grow">
          <h3 className="mb-2 truncate text-lg font-bold capitalize text-gray-900 transition-colors group-hover:text-primary sm:text-xl">
            {category.name}
          </h3>

          <p className="line-clamp-2 text-sm leading-6 text-gray-500">
            {category.description || "Explore our beautiful flower collections curated especially for you."}
          </p>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
          <span className="flex items-center gap-2 text-sm font-semibold text-secondary transition-all duration-300 group-hover:gap-3">
            Discover
            <FaRegArrowAltCircleRight className="text-base transition-transform duration-300 group-hover:translate-x-0.5" />
          </span>

          {user?.is_staff && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
              }}
              className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-red-500 transition-all hover:bg-red-50 hover:text-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-300"
            >
              <FaTrashAlt className="text-[11px]" />
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryItems;
