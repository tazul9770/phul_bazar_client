import { FaRegArrowAltCircleRight } from "react-icons/fa";
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
    if (!user) {
      navigate("/login");
    } else {
      navigate(linkPath);
    }
  };

  return (
    <div
      onClick={handleCategoryClick}
      className="cursor-pointer w-full max-w-xs sm:max-w-sm md:max-w-md rounded-2xl bg-white border border-gray-200 shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-1 hover:scale-[1.03] m-3 p-5 flex flex-col justify-between group hover:border-pink-400"
    >
      <div className="flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-4">
          <div className="h-14 w-14 rounded-full bg-gradient-to-tr from-pink-500 to-rose-400 text-white flex items-center justify-center text-2xl font-bold shadow-md group-hover:scale-110 transition-transform">
            {category.name?.charAt(0)}
          </div>
          <span className="text-xs bg-pink-100 text-pink-700 px-2 py-0.5 rounded-full shadow group-hover:shadow-md transition">
            {category.flower_count} Items
          </span>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-1 truncate capitalize">
          {category.name}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {category.description || "Explore our beautiful flower collections curated for you!"}
        </p>

        <div className="flex items-center gap-2 text-pink-600 text-sm font-semibold mt-auto hover:translate-x-1 transition-transform">
          Discover <FaRegArrowAltCircleRight />
        </div>
      </div>

      {user?.is_staff && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDelete();
          }}
          className="text-red-500 text-xs font-medium hover:underline mt-4 transition cursor-pointer"
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default CategoryItems;
