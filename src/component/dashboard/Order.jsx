import { useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight, FiTrash2, FiInbox } from "react-icons/fi";
import authApiClient from "../../services/auth_apiClient";
import useAuthContext from "../../hooks/useAuthContext";

const STATUS_STYLES = {
  "Not Paid": "bg-pink-100 text-pink-600",
  "Ready to ship": "bg-orange-100 text-orange-600",
  Shipped: "bg-blue-100 text-blue-600",
  Delivered: "bg-green-100 text-green-600",
  Canceled: "bg-gray-200 text-gray-600",
};

const getStatusBadgeClass = (status) => STATUS_STYLES[status] || "bg-gray-100 text-gray-600";

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
    <div className="mt-6 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
      <div className="p-5 sm:p-7">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900">
              {user?.is_staff ? "Recent Orders" : `${user.first_name}'s Orders`}
            </h3>
            <p className="mt-0.5 text-sm text-gray-400">
              {totalCount} order{totalCount === 1 ? "" : "s"} total
            </p>
          </div>

          {user?.is_staff && (
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700 shadow-sm transition focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-100"
            >
              <option value="All">All statuses</option>
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
          <div className="flex justify-center py-20">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-pink-100 border-t-pink-500"></div>
          </div>
        ) : (
          <>
            {/* Orders Table */}
            <div className="overflow-auto rounded-xl border border-gray-100">
              <table className="min-w-full text-sm">
                <thead className="sticky top-0 bg-gray-50">
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
                    ].map((header) => (
                      <th
                        key={header}
                        className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500"
                      >
                        {header}
                      </th>
                    ))}
                    {filterStatus === "Canceled" && (
                      <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Action
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredOrders.length > 0 ? (
                    filteredOrders.map((order) => {
                      const subtotal = parseFloat(order.total_price) || 0;
                      const hasItems = Array.isArray(order.items) && order.items.length > 0;
                      const shipping = !hasItems || subtotal < 100 ? 0 : 15;
                      const tax = subtotal * 0.1;
                      const total = subtotal + shipping + tax;

                      return (
                        <tr key={order.id} className="transition hover:bg-pink-50/40">
                          <td className="px-4 py-3 font-medium text-gray-900">#{order.id}</td>
                          <td className="px-4 py-3 text-gray-600">{order.user?.id}</td>
                          <td className="px-4 py-3">
                            <span
                              className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusBadgeClass(
                                order.status
                              )}`}
                            >
                              {order.status}
                            </span>
                          </td>
                          <td className="whitespace-nowrap px-4 py-3 text-gray-500">
                            {order.created_at}
                          </td>
                          <td className="px-4 py-3 font-semibold text-gray-900">
                            ${total.toFixed(2)}
                          </td>
                          <td className="px-4 py-3 text-gray-600">{order.user?.email}</td>
                          <td className="px-4 py-3 text-gray-600">{order.user?.address}</td>
                          <td className="px-4 py-3 text-gray-600">{order.user?.phone_num}</td>
                          <td className="px-4 py-3 text-gray-600">
                            {hasItems ? (
                              <ul className="list-disc space-y-0.5 pl-4">
                                {order.items.map((item, idx) => (
                                  <li key={idx}>
                                    {item?.flower?.name || "Unknown"} x {item?.quantity || 0}
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <span className="italic text-gray-400">No items</span>
                            )}
                          </td>
                          {filterStatus === "Canceled" && (
                            <td className="px-4 py-3">
                              <button
                                onClick={() => handleDelete(order.id)}
                                className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-red-500 transition hover:bg-red-50 hover:text-red-600"
                              >
                                <FiTrash2 size={13} />
                                Delete
                              </button>
                            </td>
                          )}
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={filterStatus === "Canceled" ? 10 : 9} className="py-14">
                        <div className="flex flex-col items-center gap-2 text-gray-400">
                          <FiInbox size={28} />
                          <span className="text-sm">No orders found for this filter.</span>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="mt-6 flex items-center justify-between">
              <button
                disabled={!prevPage}
                onClick={() => setPage((prev) => prev - 1)}
                className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-medium transition ${
                  prevPage
                    ? "bg-pink-600 text-white hover:bg-pink-700"
                    : "cursor-not-allowed bg-gray-100 text-gray-400"
                }`}
              >
                <FiChevronLeft size={16} />
                Previous
              </button>

              <span className="text-sm text-gray-500">
                Page <span className="font-semibold text-gray-700">{page}</span> · Total{" "}
                <span className="font-semibold text-gray-700">{totalCount}</span>
              </span>

              <button
                disabled={!nextPage}
                onClick={() => setPage((prev) => prev + 1)}
                className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-medium transition ${
                  nextPage
                    ? "bg-pink-600 text-white hover:bg-pink-700"
                    : "cursor-not-allowed bg-gray-100 text-gray-400"
                }`}
              >
                Next
                <FiChevronRight size={16} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Order;
