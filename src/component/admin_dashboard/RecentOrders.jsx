import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import authApiClient from "../../services/auth_apiClient"
import useAuthContext from "../../hooks/useAuthContext"   // <-- notun import

const STATUS_STYLES = {
  Delivered: "bg-green-100 text-green-600",
  Shipped: "bg-blue-100 text-blue-600",
  "Ready to ship": "bg-orange-100 text-orange-600",
  "Not Paid": "bg-pink-100 text-pink-600",
  Canceled: "bg-gray-100 text-gray-500",
}

const AVATAR_COLORS = [
  "bg-pink-400", "bg-blue-400", "bg-green-400", "bg-purple-400", "bg-orange-400",
]

const formatTaka = (n) => `৳${Number(n || 0).toLocaleString("en-BD")}`

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })

const Avatar = ({ name }) => {
  const letter = name?.[0]?.toUpperCase() || "?"
  const colorIndex = (name?.charCodeAt(0) || 0) % AVATAR_COLORS.length
  return (
    <span
      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white ${AVATAR_COLORS[colorIndex]}`}
    >
      {letter}
    </span>
  )
}

const RecentOrders = () => {
  const { user } = useAuthContext()   // <-- notun line

  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-recent-orders", user?.id],
    queryFn: async () => {
      const res = await authApiClient.get("/orders/")
      return res.data
    },
    enabled: !!user,   // <-- user na thakle call e jabe na
  })

  const orderItems = (data?.results ?? []).map((order) => ({
    ...order,
    items: Array.isArray(order.items) ? order.items : [],
  }))
  const recentOrders = orderItems.slice(0, 5)

  const totalOrders = data?.count ?? orderItems.length
  const hasMoreOrders = totalOrders > 5

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-gray-900">Recent Orders</h3>
        {hasMoreOrders ? (
          <Link to="/dashboard/all-order" className="text-sm font-medium text-pink-500 hover:underline">
            View All
          </Link>
        ) : (
          <span
            className="cursor-not-allowed text-sm font-medium text-gray-300"
            title="No more orders to show"
          >
            View All
          </span>
        )}
      </div>

      {error && (
        <p role="alert" className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          Couldn't load recent orders. Please refresh the page.
        </p>
      )}

      <div className="mt-4 overflow-x-auto">
        {isLoading ? (
          <div className="h-48 w-full animate-pulse rounded-xl bg-gray-100" />
        ) : (
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-gray-400">
                <th className="pb-3 font-medium">#</th>
                <th className="pb-3 font-medium">Customer</th>
                <th className="pb-3 font-medium">Total Price</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.length > 0 ? (
                recentOrders.map((order) => {
                  const customerName = order.user?.first_name || "Guest"
                  return (
                    <tr key={order.id} className="border-t border-gray-50">
                      <td className="py-3 pr-4 font-medium text-gray-500">
                        #ORD-{String(order.id).slice(0, 4)}
                      </td>
                      <td className="py-3 pr-4">
                        <div className="flex items-center gap-2">
                          <Avatar name={customerName} />
                          <span className="text-gray-700">{customerName}</span>
                        </div>
                      </td>
                      <td className="py-3 pr-4 font-medium text-gray-900">
                        {formatTaka(order.total_price)}
                      </td>
                      <td className="py-3 pr-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${
                            STATUS_STYLES[order.status] || "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 text-gray-500">{formatDate(order.created_at)}</td>
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-400">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default RecentOrders