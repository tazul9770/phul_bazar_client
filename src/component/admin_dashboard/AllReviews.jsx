import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
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

const AllReviews = () => {
  const [page, setPage] = useState(1)

  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-all-reviews", page],
    queryFn: async () => {
      const res = await authApiClient.get(`/dashboard/admin/recent-reviews/all/?page=${page}`)
      console.log("data:", data)
      console.log("error:", error)
      console.log("isLoading:", isLoading)
      return res.data
    },
  })

  const reviews = data?.results ?? []

  return (
    <div className="mt-6 overflow-hidden rounded-2xl bg-white shadow-md">
      <div className="p-4 md:p-6">
        <h3 className="mb-4 text-xl font-semibold text-gray-800">All Reviews</h3>

        {error && (
          <p role="alert" className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
            Couldn't load reviews. Please refresh the page.
          </p>
        )}

        {isLoading ? (
          <div className="flex justify-center py-16">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-indigo-500"></div>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {reviews.length > 0 ? (
                reviews.map((review) => (
                  <div
                    key={review.id}
                    className="flex items-start justify-between gap-3 border-b border-gray-50 pb-4 last:border-0"
                  >
                    <div className="flex items-start gap-3">
                      <Avatar name={review.customer_name} />
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-sm font-medium text-gray-800">
                            {review.customer_name}
                          </span>
                          <Stars ratings={review.ratings} />
                          <span className="text-xs text-gray-400">on {review.flower_name}</span>
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
                <p className="py-8 text-center text-sm text-gray-400">No reviews found.</p>
              )}
            </div>

            {/* Pagination Controls */}
            <div className="mt-6 flex items-center justify-between px-4">
              <button
                disabled={!data?.previous}
                onClick={() => setPage((prev) => prev - 1)}
                className={`rounded-md px-4 py-2 text-sm ${
                  data?.previous
                    ? "bg-indigo-500 text-white hover:bg-indigo-600"
                    : "cursor-not-allowed bg-gray-200 text-gray-500"
                }`}
              >
                Previous
              </button>

              <span className="text-sm text-gray-600">
                Page {page} | Total: {data?.count ?? 0}
              </span>

              <button
                disabled={!data?.next}
                onClick={() => setPage((prev) => prev + 1)}
                className={`rounded-md px-4 py-2 text-sm ${
                  data?.next
                    ? "bg-indigo-500 text-white hover:bg-indigo-600"
                    : "cursor-not-allowed bg-gray-200 text-gray-500"
                }`}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default AllReviews