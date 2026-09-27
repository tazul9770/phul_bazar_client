import { useQuery } from "@tanstack/react-query"
import { FiShoppingBag, FiShoppingCart, FiStar } from "react-icons/fi"
import Card from "../component/dashboard/Card"
import WelcomeBanner from "../component/dashboard/WelcomeBanner"
import authApiClient from "../services/auth_apiClient"
import OrderTracker from "../component/dashboard/OrderTracker"
import MyReviews from "../component/dashboard/MyReviews"
import Order from "../component/dashboard/Order"

const TakaIcon = ({ className = "" }) => (
  <span className={`${className} inline-flex items-center justify-center text-lg font-semibold leading-none`}>
    ৳
  </span>
)

const formatTaka = (n) => `৳${Number(n || 0).toLocaleString("en-BD")}`
const plural = (n, word) => `${n} ${word}${n === 1 ? "" : "s"}`

const Dashboard = () => {
  const {
    data: stats,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async () => {
      const res = await authApiClient.get("/dashboard/stats/")
      return res.data
    },
  })

  const s = stats ?? {}
  const change = s.spent_change_percent

  return (
    <div className="space-y-6">
      <WelcomeBanner />

      {error && (
        <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          Couldn't load your numbers. Please refresh the page.
        </p>
      )}

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <Card
          icon={FiShoppingBag}
          title="Total orders"
          value={s.total_orders}
          subtitle={s.orders_this_month > 0 ? `↑ ${s.orders_this_month} this month` : "No orders this month"}
          tone={s.orders_this_month > 0 ? "up" : "muted"}
          loading={isLoading}
        />

        <Card
          icon={FiShoppingCart}
          title="Items in cart"
          value={s.items_in_cart}
          subtitle={s.items_in_cart > 0 ? "Go to checkout" : "Your cart is empty"}
          tone={s.items_in_cart > 0 ? "action" : "muted"}
          loading={isLoading}
        />

        <Card
          icon={TakaIcon}
          title="Total spent"
          value={stats ? formatTaka(s.total_spent) : undefined}
          subtitle={
            change == null
              ? "Paid orders only"
              : `${change >= 0 ? "↑" : "↓"} ${Math.abs(change)}% vs last month`
          }
          tone={change == null ? "muted" : change >= 0 ? "up" : "down"}
          loading={isLoading}
        />

        <Card
          icon={FiStar}
          title="Reviews given"
          value={s.reviews_given}
          subtitle={
            s.reviews_given > 0
              ? `Across ${plural(s.reviewed_flowers, "flower")}`
              : "Review your first flower"
          }
          loading={isLoading}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        <OrderTracker />
        <MyReviews />
      </div>

      <Order />
    </div>
  )
}

export default Dashboard