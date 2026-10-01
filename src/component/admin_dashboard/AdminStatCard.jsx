import { useId } from "react"
import { Area, AreaChart, ResponsiveContainer } from "recharts"

const THEMES = {
  pink: {
    card: "from-pink-50 to-white border-pink-100",
    icon: "bg-pink-100 text-pink-500",
    color: "#ec4899",
  },
  blue: {
    card: "from-blue-50 to-white border-blue-100",
    icon: "bg-blue-100 text-blue-500",
    color: "#3b82f6",
  },
  green: {
    card: "from-green-50 to-white border-green-100",
    icon: "bg-green-100 text-green-500",
    color: "#22c55e",
  },
  purple: {
    card: "from-purple-50 to-white border-purple-100",
    icon: "bg-purple-100 text-purple-500",
    color: "#a855f7",
  },
}

const AdminStatCard = ({
  icon: Icon,
  title,
  value,
  change,
  sparkline = [],
  theme = "pink",
  loading = false,
}) => {
  const t = THEMES[theme]
  const gradientId = `grad-${useId().replace(/:/g, "")}`

  if (loading) {
    return (
      <div className="h-40 animate-pulse rounded-2xl border border-gray-100 bg-gray-100" />
    )
  }

  const hasChange = change != null
  const isUp = hasChange && change >= 0

  return (
    <div
      className={`overflow-hidden rounded-2xl border bg-gradient-to-br shadow-sm ${t.card}`}
    >
      <div className="flex items-start gap-3 p-4 pb-0">
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-xl ${t.icon}`}
        >
          <Icon />
        </div>

        <div className="min-w-0">
          <p className="text-sm font-medium text-gray-700">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          <p
            className={`text-xs font-medium ${
              !hasChange
                ? "text-gray-400"
                : isUp
                ? "text-green-600"
                : "text-red-500"
            }`}
          >
            {hasChange ? (
              <>
                {isUp ? "↑" : "↓"} {Math.abs(change)}%{" "}
                <span className="font-normal text-gray-500">from last week</span>
              </>
            ) : (
              <span className="font-normal">No data last week</span>
            )}
          </p>
        </div>
      </div>

      <div className="h-16 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={sparkline} margin={{ top: 8, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={t.color} stopOpacity={0.3} />
                <stop offset="100%" stopColor={t.color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="value"
              stroke={t.color}
              strokeWidth={2}
              fill={`url(#${gradientId})`}
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default AdminStatCard;