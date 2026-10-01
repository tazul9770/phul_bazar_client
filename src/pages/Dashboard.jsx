import { useQuery } from "@tanstack/react-query"
import {
  FiBox,
  FiShoppingBag,
  FiShoppingCart,
  FiStar,
  FiUsers,
} from "react-icons/fi"
import Card from "../component/dashboard/Card"
import WelcomeBanner from "../component/dashboard/WelcomeBanner"
import authApiClient from "../services/auth_apiClient"
import OrderTracker from "../component/dashboard/OrderTracker"
import MyReviews from "../component/dashboard/MyReviews"
import useAuthContext from "../hooks/useAuthContext" 
import AdminStatCard from "../component/admin_dashboard/AdminStatCard"
import SalesOverview from "../component/admin_dashboard/SalesOverview"
import OrderStatus from "../component/admin_dashboard/OrderStatus"
import RecentOrders from "../component/admin_dashboard/RecentOrders"
import LowStockProducts from "../component/admin_dashboard/LowStockProducts"
import RecentReviews from "../component/admin_dashboard/RecentReviews"

const TakaIcon = ({ className = "" }) => (
  <span className={`${className} inline-flex items-center justify-center text-lg font-semibold leading-none`}>
    ৳
  </span>
)

const formatTaka = (n) => `৳${Number(n || 0).toLocaleString("en-BD")}`
const plural = (n, word) => `${n} ${word}${n === 1 ? "" : "s"}`

const Dashboard = () => {
  const { user } = useAuthContext()
  const isStaff = !!user?.is_staff

  // ---- User stats (only non-staff) ----
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
    enabled: !isStaff,
  })

  // ---- Admin stats (only staff) ----
  const {
    data: admin,
    isLoading: adminLoading,
    error: adminError,
  } = useQuery({
    queryKey: ["admin-overview-cards"],
    queryFn: async () => {
      const res = await authApiClient.get("/dashboard/admin/cards/")
      return res.data
    },
    enabled: isStaff,
  })

  const s = stats ?? {}
  const change = s.spent_change_percent

   return (
    <div className="space-y-6">
      <WelcomeBanner />

      {(error || adminError) && (
        <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          Couldn't load your numbers. Please refresh the page.
        </p>
      )}

      {/* ---- Cards: role onujayi alada ---- */}
      {isStaff ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          <AdminStatCard
            icon={TakaIcon}
            title="Total Revenue"
            value={admin ? formatTaka(admin.revenue.total) : undefined}
            change={admin?.revenue.change_percent}
            sparkline={admin?.revenue.sparkline}
            theme="pink"
            loading={adminLoading}
          />
          <AdminStatCard
            icon={FiShoppingCart}
            title="Total Orders"
            value={admin?.orders.total}
            change={admin?.orders.change_percent}
            sparkline={admin?.orders.sparkline}
            theme="blue"
            loading={adminLoading}
          />
          <AdminStatCard
            icon={FiUsers}
            title="Total Customers"
            value={admin?.customers.total?.toLocaleString()}
            change={admin?.customers.change_percent}
            sparkline={admin?.customers.sparkline}
            theme="green"
            loading={adminLoading}
          />
          <AdminStatCard
            icon={FiBox}
            title="Total Products"
            value={admin?.products.total}
            change={admin?.products.change_percent}
            sparkline={admin?.products.sparkline}
            theme="purple"
            loading={adminLoading}
          />
        </div>
      ) : (
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
      )}

      <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2"> 
        {isStaff ? (
          <OrderStatus/>
        ):(
          <OrderTracker />
        )}

        {isStaff ? (
          <SalesOverview/>
        ):(
          <MyReviews />
        )}
      </div>

      <div className={`grid grid-cols-1 gap-3 sm:gap-4 ${isStaff ? "md:grid-cols-2" : "md:grid-cols-1"}`}>
        <RecentOrders/>
        {isStaff && (
          <LowStockProducts/>
        )}
      </div>

      <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-1">
        {isStaff && (
          <RecentReviews/>
        )}
      </div>
      
    </div>
  )
}

export default Dashboard