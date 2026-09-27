import { useQuery } from "@tanstack/react-query"
import apiClient from "../../services/api-client"

function StarRating({ value }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={`text-base transition-colors ${i <= value ? "text-amber-400" : "text-slate-200"}`}>
          ★
        </span>
      ))}
      <span className="ml-1 text-xs font-semibold text-slate-500">{value}.0</span>
    </div>
  )
}

const MyReviews = () => {
  const token = JSON.parse(localStorage.getItem("authTokens"))

  const {
    data: reviews = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["my-reviews"],
    queryFn: async () => {
      const res = await apiClient.get("/dashboard/my/review/", {
        headers: { Authorization: `JWT ${token?.access}` },
      })
      return res.data
    },
  })

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-100 bg-white p-12 shadow-sm">
        <div className="h-9 w-9 animate-spin rounded-full border-4 border-rose-500 border-t-transparent"></div>
        <span className="mt-3 text-sm font-medium text-slate-500">Loading your reviews...</span>
      </div>
    )
  }

  if (error) {
    const message = error.response?.data?.detail || (error.response ? "Unauthorized request" : "Something went wrong")
    return (
      <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-center">
        <p className="text-sm font-medium text-rose-600">{message}</p>
      </div>
    )
  }

  if (reviews.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-rose-100 bg-white p-10 text-center">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-rose-50 text-2xl">🌸</div>
        <h3 className="text-base font-semibold text-slate-800">No reviews found</h3>
        <p className="mt-1 max-w-xs text-xs text-slate-500">
          You haven't left any reviews yet. Share your experience with the flowers you purchased!
        </p>
      </div>
    )
  }

  const latestReviews = reviews.slice(0, 3)

  return (
    <div className="w-full rounded-2xl border border-slate-100 bg-white p-5 shadow-sm md:p-6">
      <div className="mb-6 flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Recent Reviews</h2>
          <p className="mt-0.5 text-xs text-slate-500">
            Showing latest {latestReviews.length} of {reviews.length} reviews
          </p>
        </div>
        <span className="rounded-full border border-rose-100 bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-600">
          Total: {reviews.length}
        </span>
      </div>

      <div className="flex flex-col gap-4">
        {latestReviews.map((review) => (
          <div
            key={review.id}
            className="group relative rounded-xl border border-slate-200/80 bg-slate-50/50 p-4 transition-all duration-200 hover:border-rose-200 hover:bg-white hover:shadow-md md:p-5"
          >
            <div className="mb-2 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-rose-100 text-sm font-bold text-rose-600">
                  {review.flower_name?.charAt(0).toUpperCase() || "🌺"}
                </div>
                <div>
                  <h4 className="text-base font-semibold capitalize leading-tight text-slate-800">
                    {review.flower_name}
                  </h4>
                  <StarRating value={review.ratings} />
                </div>
              </div>

              <span className="self-start rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-400 transition-colors group-hover:bg-rose-50/50 sm:self-auto">
                {review.date}
              </span>
            </div>

            <p className="mt-3 pl-0 text-sm leading-relaxed text-slate-600 sm:pl-12">
              "{review.comment}"
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyReviews