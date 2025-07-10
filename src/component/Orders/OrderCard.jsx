import { FaBox, FaTimesCircle } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";
import OrderTable from "./OrderTable";
import useAuthContext from "../../hooks/useAuthContext";
import { useState } from "react";
import authApiClient from "../../services/auth_apiClient";

const OrderCard = ({ order, onCancel }) => {
  const {user} = useAuthContext();
  const [status, setStatus] = useState(order.status);
  const [loading, setLoading] = useState(false);

  const handleStatusChange = async(event) => {
    const newStatus = event.target.value;
    try{
      const response = await authApiClient.patch(`/orders/${order.id}/update_status/`, {status:newStatus});
      console.log(response);
      if(response.status === 200){
        setStatus(newStatus)
        alert(response.data.status)
      }
    }catch(error) {
      console.log(error);
    }
  }

  const handlePayment = async() => {
    setLoading(true)
    try{
      const response = await authApiClient.post('/payment/initiate/', {amount:order.total_price, orderId:order.id, itemsNum:order.items?.length})
      if(response.data.payment_url){
        setLoading(false)
        window.location.href = response.data.payment_url
      }else{
        alert("Payment failed")
      }
    }catch(error){
      console.log(error);
    }
  }

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-200 mb-8 overflow-hidden">
      {/* Clean Header */}
      <div className="bg-white p-6 border-b flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Order #{order.id}</h2>
          <p className="text-sm text-gray-500">Placed on {order.created_at}</p>
        </div>
        <div className="flex items-center gap-3">
          {user.is_staff ? (
            <select value={status} onChange={handleStatusChange} className="px-3 py-1 rounded-full text-white text-sm font-medium bg-green-500">
              <option value="Not Paid">Not Paid</option>
              <option value="Ready to ship">Ready to ship</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Canceled">Canceled</option>
            </select>
          ) : (
            <span
            className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${
              order.status === "Not Paid" ? "bg-red-500" : "bg-green-500"
            }`}
          >
            {order.status}
          </span>
          )}
          
          {order.status !== "Deliverd" && order.status !== "Canceled" && !user.is_staff && (
            <button onClick={() => onCancel(order.id)} className="flex items-center gap-1 cursor-pointer text-blue-600 text-sm">
              <FaTimesCircle />
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Order Items */}
      <div className="p-6 space-y-5">
        <h3 className="text-gray-800 font-semibold text-lg flex items-center gap-2">
          <FaBox className="text-indigo-600" /> Order Items
        </h3>

        {/* Order table */}
        <OrderTable items={order.items}/>
      </div>

      {/* Summary & Actions */}
      <div className="bg-gray-100 p-6 sm:flex sm:items-center sm:justify-between">
        <div className="space-y-2 text-gray-700 text-sm w-full sm:w-auto mb-4 sm:mb-0">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>${order.total_price.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping:</span>
            <span>$0.00</span>
          </div>
          <div className="flex justify-between font-bold border-t pt-2 text-base text-gray-900">
            <span>Total:</span>
            <span>${order.total_price.toFixed(2)}</span>
          </div>
        </div>
        {!user.is_staff && order.status === "Not Paid" && (
          <button className="mt-4 sm:mt-0 w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-all shadow-sm" onClick={handlePayment} disabled={loading}>
            <MdOutlinePayment className="text-xl"/>
            {loading ? "Processing..." : "Pay Now"}
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderCard;
