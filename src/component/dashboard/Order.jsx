import { useEffect, useState } from "react";
import authApiClient from "../../services/auth_apiClient";

const Order = () => {
  const[orderItems, setOrderItems] = useState([]);

  useEffect(() => {
     authApiClient.get("/orders/")
     .then((res) => {
        setOrderItems(res.data) 
      })
  }, [])

  return (
    <div className="mt-6 bg-white rounded-2xl shadow-md">
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Orders</h3>
        <div className="overflow-x-auto">
          {orderItems.map((order) => (
            <table key={order.id} className="min-w-full">

            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">OrderID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">CustomerID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
              </tr>
            </thead>
            <tbody>
                <tr key={order.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3 text-sm font-medium text-gray-800">{order.id}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{order.user}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${order.badge}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{order.created_at}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-gray-900">{order.total_price}</td>
                </tr>
            </tbody>
          
          </table>
          ))}
          
        </div>
      </div>
    </div>
  );
};

export default Order;
