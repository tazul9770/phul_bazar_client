import { useNavigate } from "react-router";
import defaultImg from "../../assets/image/default_product.jpg";
import useAuthContext from "../../hooks/useAuthContext";
import authApiClient from "../../services/auth_apiClient";

const ProductItem = ({ product }) => {
  const { name, description, images, price, id } = product;
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await authApiClient.delete(`/flowers/${id}/`);
      alert("This product deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to delete product!");
    }
  };

  const handleViewProduct = () => {
    if (!user) {
      navigate("/login");
    } else {
      navigate(`/shop/${id}`);
    }
  };

  const handleBuyNow = () => {
    handleViewProduct(); // Same logic as view
  };

  return (
    <div className="m-4 bg-white w-full max-w-[220px] rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">
      <div
        onClick={handleViewProduct}
        className="cursor-pointer aspect-square bg-gray-100"
      >
        <img
          src={images.length > 0 ? images[0].image : defaultImg}
          alt={name}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="p-3 text-gray-800">
        <h2
          onClick={handleViewProduct}
          className="text-base font-semibold text-center cursor-pointer hover:underline"
        >
          {name}
        </h2>

        <p className="text-sm text-gray-600 mt-1 text-center line-clamp-2">
          {description}
        </p>

        <div className="flex items-center justify-between mt-3">
          <span className="text-md font-bold text-primary">
            ${price.toFixed(2)}
          </span>

          {user?.is_staff ? (
            <button
              onClick={handleDelete}
              className="px-2 py-1 text-xs sm:text-sm bg-red-600 hover:bg-red-700 rounded text-white font-semibold transition cursor-pointer"
            >
              Delete
            </button>
          ) : (
            <button
              onClick={handleBuyNow}
              className="px-2 py-1 text-xs sm:text-sm bg-blue-600 hover:bg-blue-700 rounded text-white font-semibold transition cursor-pointer"
            >
              Buy Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
