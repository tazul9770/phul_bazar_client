import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import { FiStar } from "react-icons/fi"
import authApiClient from "../../services/auth_apiClient"

const AVATAR_COLORS = [
  "bg-pink-400", "bg-blue-400", "bg-green-400", "bg-purple-400", "bg-orange-400",
]

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })

const Avatar = ({ name }) => {
  const letter = name?.[0]?.toUpperCase() || "?"
  const colorIndex = (name?.charCodeAt(0) || 0) % AVATAR_COLORS.length
  return (
    <span
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white ${AVATAR_COLORS[colorIndex]}`}
    >
      {letter}
    </span>
  )
}

const Stars = ({ ratings }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((i) => (
      <FiStar
        key={i}
        className={i <= ratings ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}
        size={13}
      />
    ))}
  </div>
)

const RecentReviews = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-recent-reviews"],
    queryFn: async () => {
      const res = await authApiClient.get("/dashboard/admin/recent-reviews/")
      return res.data
    },
  })

  const reviews = data ?? []

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-gray-900">Recent Reviews</h3>
        <Link to="/dashboard/all-reviews/" className="text-sm font-medium text-pink-500 hover:underline">
          View All
        </Link>
      </div>

      {error && (
        <p role="alert" className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          Couldn't load recent reviews. Please refresh the page.
        </p>
      )}

      <div className="mt-4 space-y-4">
        {isLoading ? (
          <div className="h-48 w-full animate-pulse rounded-xl bg-gray-100" />
        ) : reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <Avatar name={review.customer_name} />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-800">
                      {review.customer_name}
                    </span>
                    <Stars ratings={review.ratings} />
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">"{review.comment}"</p>
                </div>
              </div>
              <span className="shrink-0 whitespace-nowrap text-xs text-gray-400">
                {formatDate(review.date)}
              </span>
            </div>
          ))
        ) : (
          <p className="py-8 text-center text-sm text-gray-400">No reviews yet.</p>
        )}
      </div>
    </div>
  )
}

export default RecentReviews