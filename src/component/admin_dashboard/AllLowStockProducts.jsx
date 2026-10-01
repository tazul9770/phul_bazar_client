import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import authApiClient from "../../services/auth_apiClient"

const getStockBadgeClass = (stock) => {
  if (stock <= 5) return "bg-red-100 text-red-600"
  if (stock <= 10) return "bg-orange-100 text-orange-600"
  return "bg-yellow-100 text-yellow-600"
}

const AllLowStockProducts = () => {
  const [page, setPage] = useState(1)

  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-low-stock-all", page],
    queryFn: async () => {
      const res = await authApiClient.get(`/dashboard/admin/low-stock/all/?page=${page}`)
      return res.data
    },
  })

  const products = data?.results ?? []

  return (
    <div className="mt-6 overflow-hidden rounded-2xl bg-white shadow-md">
      <div className="p-4 md:p-6">
        <h3 className="mb-4 text-xl font-semibold text-gray-800">Low Stock Products</h3>

        {error && (
          <p role="alert" className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
            Couldn't load low stock products. Please refresh the page.
          </p>
        )}

        {isLoading ? (
          <div className="flex justify-center py-16">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-indigo-500"></div>
          </div>
        ) : (
          <>
            <div className="overflow-auto">
              <table className="min-w-full text-sm">
                <thead className="sticky top-0 bg-gray-100">
                  <tr>
                    {["Image", "Name", "Stock"].map((header) => (
                      <th
                        key={header}
                        className="whitespace-nowrap px-4 py-3 text-left font-semibold uppercase text-gray-700"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {products.length > 0 ? (
                    products.map((product) => (
                      <tr key={product.id} className="transition hover:bg-gray-50">
                        <td className="px-4 py-3">
                          {product.image ? (
                            <img
                              src={product.image}
                              alt={product.name}
                              className="h-10 w-10 rounded-lg object-cover"
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-lg bg-gray-100" />
                          )}
                        </td>
                        <td className="px-4 py-3 font-medium text-gray-800">{product.name}</td>
                        <td className="px-4 py-3">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${getStockBadgeClass(
                              product.stock
                            )}`}
                          >
                            {product.stock}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} className="py-8 text-center text-gray-500">
                        No low stock products found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
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

export default AllLowStockProducts