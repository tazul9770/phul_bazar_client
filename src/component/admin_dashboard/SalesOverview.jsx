import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import authApiClient from "../../services/auth_apiClient"

const RANGE_OPTIONS = [
  { value: "7d", label: "Last 7 days" },
  { value: "30d", label: "Last 30 days" },
  { value: "90d", label: "Last 90 days" },
]

const formatDateShort = (isoDate) =>
  new Date(isoDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })

const formatDateFull = (isoDate) =>
  new Date(isoDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })

const formatTaka = (n) => `৳${Number(n || 0).toLocaleString("en-BD")}`

const formatYAxis = (n) => {
  if (n >= 1000) return `${n / 1000}k`
  return n
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border border-gray-100 bg-white px-3 py-2 shadow-md">
      <p className="text-xs text-gray-500">{formatDateFull(label)}</p>
      <p className="text-sm font-semibold text-pink-500">
        {formatTaka(payload[0].value)}
      </p>
    </div>
  )
}

const SalesOverview = () => {
  const [range, setRange] = useState("7d")

  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-sales-overview", range],
    queryFn: async () => {
      const res = await authApiClient.get("/dashboard/admin/sales-overview/", {
        params: { range },
      })
      return res.data
    },
  })

  const results = data?.results ?? []
  const rangeLabel = RANGE_OPTIONS.find((r) => r.value === range)?.label

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-6">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-base font-semibold text-gray-900">Sales Overview</h3>
          <p className="text-sm text-gray-400">Total sales for the {rangeLabel?.toLowerCase()}</p>
        </div>

        <select
          value={range}
          onChange={(e) => setRange(e.target.value)}
          className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-200"
        >
          {RANGE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {error && (
        <p role="alert" className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          Couldn't load sales data. Please refresh the page.
        </p>
      )}

      <div className="mt-4 h-72 w-full">
        {isLoading ? (
          <div className="h-full w-full animate-pulse rounded-xl bg-gray-100" />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={results} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ec4899" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#ec4899" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" />
              <XAxis
                dataKey="date"
                tickFormatter={formatDateShort}
                tick={{ fontSize: 12, fill: "#9ca3af" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tickFormatter={formatYAxis}
                tick={{ fontSize: 12, fill: "#9ca3af" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="total"
                stroke="#ec4899"
                strokeWidth={2.5}
                fill="url(#salesGradient)"
                activeDot={{ r: 5, fill: "#ec4899", stroke: "#fff", strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  )
}

export default SalesOverview