import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import authApiClient from "../../services/auth_apiClient"

const getStockBadgeClass = (stock) => {
  if (stock <= 5) return "bg-red-100 text-red-600"
  if (stock <= 10) return "bg-orange-100 text-orange-600"
  return "bg-yellow-100 text-yellow-600"
}

const LowStockProducts = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-low-stock"],
    queryFn: async () => {
      const res = await authApiClient.get("/dashboard/admin/low-stock/")
      return res.data
    },
  })

  const products = data ?? []

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-gray-900">Low Stock Products</h3>
        <Link to="/dashboard/all-low-stock-product" className="text-sm font-medium text-pink-500 hover:underline">
          View All
        </Link>
      </div>

      {error && (
        <p role="alert" className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          Couldn't load low stock products. Please refresh the page.
        </p>
      )}

      <div className="mt-4 overflow-x-auto">
        {isLoading ? (
          <div className="h-48 w-full animate-pulse rounded-xl bg-gray-100" />
        ) : (
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-gray-400">
                <th className="pb-3 font-medium">Image</th>
                <th className="pb-3 font-medium">Name</th>
                <th className="pb-3 font-medium">Stock</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((product) => (
                  <tr key={product.id} className="border-t border-gray-50">
                    <td className="py-3 pr-4">
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
                    <td className="py-3 pr-4 text-gray-700">{product.name}</td>
                    <td className="py-3">
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
                  <td colSpan={3} className="py-8 text-center text-gray-400">
                    No low stock products.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default LowStockProducts