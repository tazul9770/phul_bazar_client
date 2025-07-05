import { Link } from "react-router";
import defaultImg from "../../assets/image/default_product.jpg";

const ProductItem = ({ product }) => {
  const { name, description, images, price } = product;

  return (
    <Link to={`/shop/${product.id}`}>
      <div className="m-4 bg-white w-full max-w-[220px] rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">
      <div className="aspect-square bg-gray-100">
        <img
          src={images.length > 0 ? images[0].image : defaultImg}
          alt={name}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="p-3 text-gray-800">
        <h2 className="text-base font-semibold text-center">{name}</h2>
        <p className="text-sm text-gray-600 mt-1 text-center line-clamp-2">
          {description}
        </p>
        <div className="flex items-center justify-between mt-3">
          <span className="text-md font-bold text-primary">${price.toFixed(2)}</span>

            <button className="btn btn-sm btn-primary font-medium">Buy Now</button>

        </div>
      </div>
    </div>
    </Link>
  );
};

export default ProductItem;
