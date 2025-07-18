import { useEffect, useState } from "react";
import authApiClient from "../../services/auth_apiClient";
import useAuthContext from "../../hooks/useAuthContext";

const getStatusBadgeClass = (status) => {
  switch (status) {
    case "Not Paid":
      return "bg-red-100 text-red-700";
    case "Ready to ship":
      return "bg-yellow-100 text-yellow-700";
    case "Shipped":
      return "bg-blue-100 text-blue-700";
    case "Delivered":
      return "bg-green-100 text-green-700";
    case "Canceled":
      return "bg-gray-300 text-gray-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const Order = () => {
  const [orderItems, setOrderItems] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const {user} = useAuthContext()

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    authApiClient.get("/orders/").then((res) => {
      setOrderItems(res.data);
    });
  };

  const handleDelete = async (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    try {
      await authApiClient.delete(`/orders/${orderId}/`);
      setOrderItems((prev) => prev.filter((order) => order.id !== orderId));
      alert("Order deleted successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to delete the order");
    }
  };

  const filteredOrders =
    filterStatus === "All"
      ? orderItems
      : orderItems.filter((order) => order.status === filterStatus);

  return (
    <div className="mt-6 bg-white rounded-2xl shadow-md">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-800">Recent Orders</h3>
          {user.is_staff && (
              <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border px-3 py-1 rounded-md text-sm"
          >
            <option value="All">All</option>
            <option value="Not Paid">Not Paid</option>
            <option value="Ready to ship">Ready to ship</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Canceled">Canceled</option>
          </select>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                {filterStatus === "Canceled" && (
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                )}
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3 text-sm font-medium text-gray-800">{order.id}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{order.user}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadgeClass(order.status)}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{order.created_at}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-gray-900">${order.total_price.toFixed(2)}</td>
                  {filterStatus === "Canceled" && (
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleDelete(order.id)}
                        className="text-red-600 hover:underline text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>

          {filteredOrders.length === 0 && (
            <p className="text-center py-4 text-gray-500 text-sm">No orders found for this filter.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Order;
