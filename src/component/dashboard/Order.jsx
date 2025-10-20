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
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const { user } = useAuthContext();

  useEffect(() => {
    fetchOrders(page);
  }, [page]);

  const fetchOrders = async (pageNumber = 1) => {
    setLoading(true);
    try {
      const res = await authApiClient.get(`/orders/?page=${pageNumber}`);
      const orders = res.data.results.map((order) => ({
        ...order,
        items: Array.isArray(order.items) ? order.items : [],
      }));
      setOrderItems(orders);
      setNextPage(res.data.next);
      setPrevPage(res.data.previous);
      setTotalCount(res.data.count);
    } catch (error) {
      console.error("Failed to fetch orders", error);
    } finally {
      setLoading(false);
    }
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
    <div className="mt-6 bg-white rounded-2xl shadow-md overflow-hidden">
      <div className="p-4 md:p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-2">
          <h3 className="text-xl font-semibold text-gray-800">
            {user?.is_staff ? "Recent Orders" : `${user.first_name}'s Orders`}
          </h3>

          {user?.is_staff && (
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border px-3 py-1 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
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

        {/* Loading Spinner */}
        {loading ? (
          <div className="flex justify-center py-16">
            <div className="animate-spin h-10 w-10 border-4 border-gray-300 border-t-indigo-500 rounded-full"></div>
          </div>
        ) : (
          <>
            {/* Orders Table */}
            <div className="overflow-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-100 sticky top-0">
                  <tr>
                    {[
                      "Order ID",
                      "Customer ID",
                      "Status",
                      "Date",
                      "Total",
                      "Email",
                      "Address",
                      "Phone",
                      "Items",
                    ].map((header, index) => (
                      <th
                        key={index}
                        className="px-4 py-3 text-left font-semibold text-gray-700 uppercase whitespace-nowrap"
                      >
                        {header}
                      </th>
                    ))}
                    {filterStatus === "Canceled" && (
                      <th className="px-4 py-3 text-left font-semibold text-gray-700 uppercase whitespace-nowrap">
                        Action
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredOrders.length > 0 ? (
                    filteredOrders.map((order) => {
                      const subtotal = parseFloat(order.total_price) || 0;
                      const hasItems =
                        Array.isArray(order.items) && order.items.length > 0;
                      const shipping = !hasItems || subtotal < 100 ? 0 : 15;
                      const tax = subtotal * 0.1;
                      const total = subtotal + shipping + tax;

                      return (
                        <tr
                          key={order.id}
                          className="hover:bg-gray-50 transition"
                        >
                          <td className="px-4 py-3 font-medium text-gray-800">
                            {order.id}
                          </td>
                          <td className="px-4 py-3 text-gray-700">
                            {order.user?.id}
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadgeClass(
                                order.status
                              )}`}
                            >
                              {order.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-gray-600">
                            {order.created_at}
                          </td>
                          <td className="px-4 py-3 font-semibold text-gray-900">
                            ${total.toFixed(2)}
                          </td>
                          <td className="px-4 py-3 text-gray-700">
                            {order.user?.email}
                          </td>
                          <td className="px-4 py-3 text-gray-800">
                            {order.user?.address}
                          </td>
                          <td className="px-4 py-3 text-gray-800">
                            {order.user?.phone_num}
                          </td>
                          <td className="px-4 py-3 text-gray-700">
                            {hasItems ? (
                              <ul className="list-disc ml-4">
                                {order.items.map((item, idx) => (
                                  <li key={idx}>
                                    {item?.flower?.name || "Unknown"} x{" "}
                                    {item?.quantity || 0}
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <span className="text-gray-400 italic">
                                No items
                              </span>
                            )}
                          </td>
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
                      );
                    })
                  ) : (
                    <tr>
                      <td
                        colSpan={filterStatus === "Canceled" ? 10 : 9}
                        className="text-center py-8 text-gray-500"
                      >
                        No orders found for this filter.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-6 px-4">
              <button
                disabled={!prevPage}
                onClick={() => setPage((prev) => prev - 1)}
                className={`px-4 py-2 rounded-md text-sm ${
                  prevPage
                    ? "bg-indigo-500 text-white hover:bg-indigo-600"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }`}
              >
                Previous
              </button>

              <span className="text-gray-600 text-sm">
                Page {page} | Total: {totalCount}
              </span>

              <button
                disabled={!nextPage}
                onClick={() => setPage((prev) => prev + 1)}
                className={`px-4 py-2 rounded-md text-sm ${
                  nextPage
                    ? "bg-indigo-500 text-white hover:bg-indigo-600"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }`}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Order;
