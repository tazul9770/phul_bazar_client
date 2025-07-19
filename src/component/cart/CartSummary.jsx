import { useState } from "react";
import authApiClient from "../../services/auth_apiClient";
import useAuthContext from "../../hooks/useAuthContext";

const CartSummary = ({ totalPrice, itemCount, cartId }) => {
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const { user } = useAuthContext();

  const shipping = itemCount === 0 || parseFloat(totalPrice) < 100 ? 0 : 15;
  const tax = parseFloat(totalPrice) * 0.1;
  const orderTotal = parseFloat(totalPrice) + shipping + tax;

  const deleteCart = () => {
    localStorage.removeItem("cartId");
  };

  const createOrder = async () => {
    setLoading(true);
    try {
      const order = await authApiClient.post("/orders/", {
        cart_id: cartId,
      });
      if (order.status === 201) {
        deleteCart();
        setOrderPlaced(true);
        alert("Order created successfully");
      }
    } catch (error) {
      console.log("Cart summary error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card bg-base-100 shadow-2xl rounded-2xl">
      <div className="card-body">
        <h2 className="text-2xl font-bold mb-6 text-center text-primary">
          Order Summary
        </h2>

        <div className="space-y-4 text-sm text-gray-700">
          <div className="flex justify-between">
            <span>Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"})</span>
            <span>${parseFloat(totalPrice).toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span className={shipping === 0 ? "text-green-600" : ""}>
              {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Estimated Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>

          <div className="border-t border-gray-200 pt-4 mt-4">
            <div className="flex justify-between text-base font-semibold">
              <span>Total</span>
              <span>${orderTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="card-actions mt-6">
          <button
            disabled={itemCount === 0 || loading || user?.is_staff || orderPlaced}
            onClick={createOrder}
            className="btn btn-primary w-full text-base tracking-wide flex justify-center items-center"
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : user?.is_staff ? (
              "Staff cannot order"
            ) : orderPlaced ? (
              "Order Placed"
            ) : (
              "Proceed"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
