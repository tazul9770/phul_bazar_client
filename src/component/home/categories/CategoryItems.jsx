import { FaRegArrowAltCircleRight } from "react-icons/fa";
import useAuthContext from "../../../hooks/useAuthContext";
import { Link, useLocation } from "react-router-dom";
import authApiClient from "../../../services/auth_apiClient";

const CategoryItems = ({ index, category }) => {
  const { user } = useAuthContext();
  const location = useLocation();

  const cardColors = [
    "bg-gradient-to-r from-pink-200 to-pink-100",
    "bg-gradient-to-r from-blue-200 to-blue-100",
    "bg-gradient-to-r from-yellow-200 to-yellow-100",
    "bg-gradient-to-r from-green-200 to-green-100",
  ];

  const linkPath = location.pathname.includes("/dashboard/categories")
    ? `/dashboard/categories/shop_cate_pagi/${category.id}`
    : `/shop_cate_pagi/${category.id}`;

    const handleDelete = () => {
      try{
        authApiClient.delete(`/category/${category.id}`)
        alert("This category delete sucessfull")
      }catch(err){
        console.log(err);
      }
    }


  return (
    <div
      className={`rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 p-5 flex flex-col items-start justify-between h-64 w-56 m-8 ${
        cardColors[index % cardColors.length]
      }`}
    >
      <Link to={linkPath} className="w-full h-full flex flex-col justify-between">
        <div>
          <div className="flex items-center w-full mb-4">
            <div className="h-10 w-10 rounded-full bg-pink-500 text-white flex items-center justify-center text-lg font-bold shadow-md">
              {category.name?.charAt(0)}
            </div>
            <span className="ml-auto text-xs bg-white text-gray-700 px-2 py-0.5 rounded-full shadow-sm">
              {category.flower_count} Items
            </span>
          </div>

          <h3 className="text-lg font-bold text-gray-800 mb-2 truncate w-full">
            {category.name}
          </h3>

          <p className="text-gray-700 text-sm mb-4 line-clamp-2">
            {category.description || "Check out our exclusive flowers collection!"}
          </p>

          <div className="flex items-center justify-between w-full">
            <span className="flex items-center gap-2 text-pink-600 text-sm font-semibold hover:translate-x-1 transition-transform">
              Discover <FaRegArrowAltCircleRight />
            </span>
          </div>
        </div>
      </Link>

      {user?.is_staff && (
        <button
          type="button"
          className="text-red-500 text-xs font-medium hover:underline mt-2 cursor-pointer"
          onClick={handleDelete}
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default CategoryItems;
