import { FaBox, FaTimesCircle } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";
import OrderTable from "./OrderTable";
import useAuthContext from "../../hooks/useAuthContext";
import { useState } from "react";
import authApiClient from "../../services/auth_apiClient";

const OrderCard = ({ order, onCancel }) => {
  const { user } = useAuthContext();
  const [status, setStatus] = useState(order.status);
  const [loading, setLoading] = useState(false);

  const subtotal = parseFloat(order.total_price) || 0;
  const shipping = order.items?.length === 0 || subtotal < 100 ? 0 : 15;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  const handleStatusChange = async (event) => {
    const newStatus = event.target.value;
    try {
      const response = await authApiClient.patch(`/orders/${order.id}/update_status/`, {
        status: newStatus,
      });
      if (response.status === 200) {
        setStatus(newStatus);
        alert(`Order status updated to "${response.data.status}"`);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to update order status");
    }
  };

  const handlePayment = async () => {
    setLoading(true);
    try {
      const response = await authApiClient.post("/payment/initiate/", {
        amount: total,
        orderId: order.id,
        itemsNum: order.items?.length,
      });
      if (response.data.payment_url) {
        window.location.href = response.data.payment_url;
      } else {
        alert("Payment initiation failed");
      }
    } catch (error) {
      console.error(error);
      alert("Payment failed");
    } finally {
      setLoading(false);
    }
  };

  const handleUserCancel = async () => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;
    try {
      await authApiClient.delete(`/orders/${order.id}/`);
      if (onCancel) onCancel(order.id);
      alert("Order canceled successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to cancel the order");
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-200 mb-8 overflow-hidden">
      {/* Header */}
      <div className="bg-white p-6 border-b flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Order #{order.id}</h2>
          <p className="text-sm text-gray-500">Placed on {order.created_at}</p>
        </div>
        <div className="flex items-center gap-3">
          {user.is_staff ? (
            <select
              value={status}
              onChange={handleStatusChange}
              className="px-3 py-1 rounded-full border border-green-500 text-green-600 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            >
              <option value="Not Paid">Not Paid</option>
              <option value="Ready to ship">Ready to ship</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Canceled">Canceled</option>
            </select>
          ) : (
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${
                status === "Not Paid" ? "bg-red-500" : "bg-green-500"
              }`}
            >
              {status}
            </span>
          )}

          {!user.is_staff && status !== "Delivered" && status !== "Canceled" && (
            <button
              onClick={handleUserCancel}
              className="flex items-center gap-1 text-blue-600 text-sm hover:underline cursor-pointer"
            >
              <FaTimesCircle />
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Items */}
      <div className="p-6 space-y-5">
        <h3 className="text-gray-800 font-semibold text-lg flex items-center gap-2">
          <FaBox className="text-indigo-600" /> Order Items
        </h3>
        <OrderTable items={order.items} />
      </div>

      {/* Summary & Actions */}
      <div className="bg-gray-100 p-6 sm:flex sm:items-center sm:justify-between">
        <div className="space-y-2 text-gray-700 text-sm w-full sm:w-auto mb-4 sm:mb-0">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping:</span>
            <span className={shipping === 0 ? "text-green-600" : ""}>
              {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Estimated Tax:</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold border-t pt-2 text-base text-gray-900">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        {!user.is_staff && status === "Not Paid" && (
          <button
            onClick={handlePayment}
            disabled={loading}
            className="mt-4 sm:mt-0 w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-all shadow-sm disabled:opacity-50 cursor-pointer"
          >
            <MdOutlinePayment className="text-xl" />
            {loading ? "Processing..." : "Pay Now"}
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderCard;
