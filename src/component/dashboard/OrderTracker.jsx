import { useQuery } from "@tanstack/react-query"
import { FiCheck, FiPackage } from "react-icons/fi"
import authApiClient from "../../services/auth_apiClient"

const STEP_LABELS = {
  "Not Paid": "Not paid",
  "Ready to ship": "Ready to ship",
  Shipped: "Shipped",
  Delivered: "Delivered",
}

const formatDate = (iso) =>
  iso ? new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short" }) : null

const OrderTracker = () => {
  const {
    data: order,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["latest-order"],
    queryFn: async () => {
      const res = await authApiClient.get("dashboard/orders/latest/")
      return res.data
    },
  })

  if (error) {
    return (
      <div className="rounded-2xl border border-rose-100 bg-white p-5">
        <p className="text-sm text-red-600">Couldn't load your latest order.</p>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-rose-100 bg-white p-5">
        <div className="h-4 w-48 animate-pulse rounded bg-rose-100" />
        <div className="mt-6 h-10 animate-pulse rounded bg-rose-50" />
      </div>
    )
  }

  if (!order) {
    return (
      <div className="rounded-2xl border border-rose-100 bg-white p-5 text-center text-sm text-gray-500">
        No recent orders yet.
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-rose-100 bg-white p-5">
      <h3 className="text-sm text-gray-600">
        Track your latest order{" "}
        <span className="font-semibold text-gray-900">#ORD-{order.id.slice(0, 4)}</span>,
        currently <span className="text-rose-700">{order.status}</span>
      </h3>

      <div className="mt-6 flex items-start">
        {order.steps.map((step, i) => (
          <div key={step.status} className="flex flex-1 items-start last:flex-none">
            <div className="flex flex-col items-center text-center">
              <span
                className={[
                  "flex h-9 w-9 items-center justify-center rounded-full border-2 text-sm",
                  step.completed
                    ? "border-rose-500 bg-rose-500 text-white"
                    : step.current
                    ? "border-rose-500 bg-white text-rose-600"
                    : "border-gray-200 bg-white text-gray-300",
                ].join(" ")}
              >
                {step.completed ? <FiCheck className="h-4 w-4" /> : i + 1}
              </span>

              <span
                className={[
                  "mt-2 w-20 text-xs",
                  step.current ? "font-medium text-gray-900" : "text-gray-500",
                ].join(" ")}
              >
                {STEP_LABELS[step.status] ?? step.status}
              </span>

              <span className="text-[11px] text-gray-400">
                {step.date
                  ? `${step.is_estimated ? "Expected " : ""}${formatDate(step.date)}`
                  : "—"}
              </span>
            </div>

            {i < order.steps.length - 1 && (
              <div
                className={[
                  "mt-4 h-0.5 flex-1",
                  step.completed ? "bg-rose-500" : "bg-gray-200",
                ].join(" ")}
              />
            )}
          </div>
        ))}
      </div>

      {order.preview_item && (
        <div className="mt-6 flex items-center justify-between border-t border-rose-50 pt-4">
          <div className="flex items-center gap-3">
            {order.preview_item.image && (
              <img
                src={order.preview_item.image}
                alt={order.preview_item.flower_name}
                className="h-12 w-12 rounded-lg object-cover"
              />
            )}

            <div>
              <p className="text-sm font-medium text-gray-900">
                {order.preview_item.flower_name}
              </p>

              {order.preview_item.price != null && (
                <p className="text-sm text-gray-500">
                  ৳{order.preview_item.price}
                </p>
              )}
            </div>
          </div>

          <button
            type="button"
            className="rounded-full bg-rose-500 px-4 py-2 text-sm font-medium text-white hover:bg-rose-600"
          >
            <FiPackage className="mr-1 inline h-4 w-4" />
            Track order
          </button>
        </div>
      )}
    </div>
  )
}

export default OrderTracker;