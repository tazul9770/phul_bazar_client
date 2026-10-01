import { useQuery } from "@tanstack/react-query"
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"
import authApiClient from "../../services/auth_apiClient"

const OrderStatus = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-order-status"],
    queryFn: async () => {
      const res = await authApiClient.get("/dashboard/admin/order-status/")
      return res.data
    },
  })

  const breakdown = data?.breakdown ?? []
  const total = data?.total ?? 0

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-6">
      <h3 className="text-base font-semibold text-gray-900">Order Status</h3>

      {error && (
        <p role="alert" className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          Couldn't load order status. Please refresh the page.
        </p>
      )}

      {isLoading ? (
        <div className="mt-4 h-64 w-full animate-pulse rounded-xl bg-gray-100" />
      ) : (
        <div className="mt-4 flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          {/* Donut chart */}
          <div className="relative h-56 w-56 shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={breakdown}
                  dataKey="count"
                  nameKey="status"
                  innerRadius="68%"
                  outerRadius="100%"
                  paddingAngle={2}
                  startAngle={90}
                  endAngle={-270}
                  stroke="none"
                >
                  {breakdown.map((entry) => (
                    <Cell key={entry.status} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            {/* Center text */}
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-gray-900">{total}</span>
              <span className="text-xs text-gray-400">Total Orders</span>
            </div>
          </div>

          {/* Legend */}
          <div className="w-full space-y-3 sm:w-auto">
            {breakdown.map((item) => (
              <div key={item.status} className="flex items-center justify-between gap-8 text-sm">
                <div className="flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-gray-600">{item.status}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-900">{item.count}</span>
                  <span className="w-14 text-right text-gray-400">({item.percent}%)</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default OrderStatus