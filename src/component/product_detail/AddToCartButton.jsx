import { useState, useEffect } from "react";
import { FaCheck, FaShoppingCart, FaMinus, FaPlus } from "react-icons/fa";
import useCartContext from "../../hooks/useCartContext";

const AddToCartButton = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const { addCartItems } = useCartContext();

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increaseQuantity = () => {
    if (quantity < product.stock) setQuantity(quantity + 1);
  };

  const addToCart = async () => {
    setIsAdding(true);
    try {
      await addCartItems(product.id, quantity);
      setIsAdded(true);
    } catch (error) {
      console.error(error);
      alert("Something went wrong! Try again.");
    } finally {
      setIsAdding(false);
    }
  };

  // Reset "Added" after 2 seconds
  useEffect(() => {
    if (isAdded) {
      const timer = setTimeout(() => setIsAdded(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isAdded]);

  if (!product) return null;

  return (
    <div className="space-y-4 max-w-sm w-full mx-auto">
      <div className="flex items-center justify-center gap-2">
        <button
          type="button"
          onClick={decreaseQuantity}
          disabled={quantity <= 1}
          className="btn btn-outline rounded-full p-2 disabled:opacity-50"
          aria-label="Decrease quantity"
        >
          <FaMinus className="h-4 w-4" />
        </button>

        <input
          type="number"
          value={quantity}
          min={1}
          max={product.stock}
          readOnly
          className="input input-bordered text-center w-16 font-semibold"
        />

        <button
          type="button"
          onClick={increaseQuantity}
          disabled={quantity >= product.stock}
          className="btn btn-outline rounded-full p-2 disabled:opacity-50"
          aria-label="Increase quantity"
        >
          <FaPlus className="h-4 w-4" />
        </button>
      </div>

      <button
        type="button"
        onClick={addToCart}
        disabled={isAdding || isAdded || product.stock === 0}
        className="btn btn-primary w-full transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isAdding ? (
          <span className="flex items-center justify-center">
            <span className="loading loading-spinner loading-sm mr-2"></span>
            Adding...
          </span>
        ) : isAdded ? (
          <span className="flex items-center justify-center">
            <FaCheck className="mr-2 h-4 w-4" />
            Added to Cart
          </span>
        ) : (
          <span className="flex items-center justify-center">
            <FaShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </span>
        )}
      </button>

      {product.stock === 0 && (
        <p className="text-sm text-red-500 text-center font-medium">
          Out of stock
        </p>
      )}
    </div>
  );
};

export default AddToCartButton;
