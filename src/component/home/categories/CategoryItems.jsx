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
      className="cursor-pointer w-full sm:w-60 rounded-3xl bg-gray-200 border border-gray-200 shadow-lg hover:shadow-2xl hover:border-pink-400 transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 m-3 p-5 flex flex-col justify-between group"
    >
      <div className="flex flex-col justify-between flex-grow">
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-pink-500 to-rose-400 text-white flex items-center justify-center text-xl font-bold shadow-lg group-hover:scale-110 transition-transform">
              {category.name?.charAt(0)}
            </div>
            <span className="text-xs bg-pink-100 text-pink-700 px-2 py-0.5 rounded shadow-sm group-hover:shadow-md transition-all">
              {category.flower_count} Items
            </span>
          </div>

          <h3 className="text-lg font-bold text-gray-900 mb-1 truncate">
            {category.name}
          </h3>

          <p className="text-gray-700 text-sm mb-4 line-clamp-2">
            {category.description || "Check out our exclusive flowers collection!"}
          </p>
        </div>

        <div className="flex items-center gap-2 text-pink-600 text-sm font-semibold hover:translate-x-1 transition-transform">
          Discover <FaRegArrowAltCircleRight />
        </div>
      </div>

      {user?.is_staff && (
        <button
          onClick={(e) => {
            e.stopPropagation(); // prevent category card click
            handleDelete();
          }}
          className="text-red-500 text-xs font-medium hover:underline mt-2 cursor-pointer"
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default CategoryItems;
