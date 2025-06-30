const Order = () => {
  return (
    <div className="mt-6 bg-white rounded-2xl shadow-md">
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Orders</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full"> {/* <-- No divide or border here */}
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  id: "#ORD-7245",
                  customer: "John Smith",
                  status: "Completed",
                  badge: "bg-green-100 text-green-700",
                  date: "Mar 8, 2025",
                  amount: "$125.00",
                },
                {
                  id: "#ORD-7244",
                  customer: "Sarah Johnson",
                  status: "Processing",
                  badge: "bg-yellow-100 text-yellow-700",
                  date: "Mar 7, 2025",
                  amount: "$89.99",
                },
                {
                  id: "#ORD-7243",
                  customer: "Michael Brown",
                  status: "Shipped",
                  badge: "bg-blue-100 text-blue-700",
                  date: "Mar 7, 2025",
                  amount: "$245.50",
                },
                {
                  id: "#ORD-7242",
                  customer: "Emily Davis",
                  status: "Completed",
                  badge: "bg-green-100 text-green-700",
                  date: "Mar 6, 2025",
                  amount: "$112.75",
                },
              ].map((order, i) => (
                <tr key={i} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3 text-sm font-medium text-gray-800">{order.id}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{order.customer}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${order.badge}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{order.date}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-gray-900">{order.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Order;
