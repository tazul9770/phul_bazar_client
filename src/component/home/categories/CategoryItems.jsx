import { FaRegArrowAltCircleRight, FaTrashAlt } from "react-icons/fa";
import { GiFlowerPot } from "react-icons/gi";
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
      className="group relative flex w-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
    >
      {/* Image / fallback area */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-primary/15 to-secondary/15">
        {category.image ? (
          <img
            src={category.image}
            alt={category.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <GiFlowerPot className="text-5xl text-primary/40" />
          </div>
        )}

        {/* Gradient overlay for legibility + item count badge */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-transparent" />
        <span className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-800 backdrop-blur-sm">
          {category.flower_count || 0} Items
        </span>
        <h3 className="absolute bottom-3 left-4 right-4 truncate text-lg font-bold capitalize text-white drop-shadow-sm sm:text-xl">
          {category.name}
        </h3>
      </div>

      {/* Content area */}
      <div className="flex flex-grow flex-col p-5">
        <p className="line-clamp-2 flex-grow text-sm leading-6 text-gray-500">
          {category.description || "Explore our beautiful flower collections curated especially for you."}
        </p>

        <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
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
