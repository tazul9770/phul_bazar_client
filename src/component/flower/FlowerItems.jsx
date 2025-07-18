import { Link, useNavigate } from "react-router";
import defaultImg from "../../assets/image/default_product.jpg";
import useAuthContext from "../../hooks/useAuthContext";
import authApiClient from "../../services/auth_apiClient";

const ProductItem = ({ product}) => {
  const { name, description, images, price, id } = product;
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleDelete = () => {
    try{
      authApiClient.delete(`/flowers/${product.id}/`)
      alert("This product deleted successfully!")
    }catch(err){
      console.log(err);
    }
  }

  return (
    <div className="m-4 bg-white w-full max-w-[220px] rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">
      <Link to={`/shop/${id}`}>
        <div className="aspect-square bg-gray-100">
          <img
            src={images.length > 0 ? images[0].image : defaultImg}
            alt={name}
            className="h-full w-full object-cover"
          />
        </div>
      </Link>
      <div className="p-3 text-gray-800">
        <h2 className="text-base font-semibold text-center">{name}</h2>
        <p className="text-sm text-gray-600 mt-1 text-center line-clamp-2">
          {description}
        </p>
        <div className="flex items-center justify-between mt-3">
          <span className="text-md font-bold text-primary">${price.toFixed(2)}</span>

          {user?.is_staff ? (
            <button
              onClick={handleDelete}
              className="px-2 py-1 text-xs sm:text-sm bg-red-600 hover:bg-red-700 rounded text-white font-semibold transition cursor-pointer"
            >
              Delete
            </button>
          ) : (
            <button onClick={() => navigate(`/shop/${id}`)} className="px-2 py-1 text-xs sm:text-sm bg-blue-600 hover:bg-blue-700 rounded text-white font-semibold transition cursor-pointer">
              BuyNow
            </button>

          )}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
