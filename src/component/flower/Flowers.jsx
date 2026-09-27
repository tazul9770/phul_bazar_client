import { useQuery } from "@tanstack/react-query"
import ErrorAlert from "../../ErrorAlert"
import ProductItem from "./FlowerItems"
import apiClient from "../../services/api-client"
import { Link } from "react-router-dom"
import useAuthContext from "../../hooks/useAuthContext"

const Products = () => {
  const { user } = useAuthContext()

  const { data: products = [], isLoading, error } = useQuery({
    queryKey: ["flowers"],
    queryFn: async () => {
      const res = await apiClient.get("/flowers/")
      return res.data.results
    },
  })

  return (
    <div>
      <div className="px-4 sm:px-6 lg:px-10 py-10 m-14">

        {/* Header Section */}
        <div className="flex items-center justify-between flex-wrap sm:flex-nowrap mb-8 gap-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
            Trending Flowers
          </h2>

          {user && (
            <Link to="/shop">
              <button className="btn btn-outline btn-sm sm:btn-md text-primary font-medium hover:bg-primary hover:text-white transition duration-200">
                View All
              </button>
            </Link>
          )}
        </div>

        {/* Loading Spinner */}
        {isLoading && (
          <div className="flex justify-center items-center py-7">
            <span className="loading loading-spinner loading-xl text-primary"></span>
          </div>
        )}

        {/* Error Message */}
        {error && <ErrorAlert error={error.message} />}

        {/* Product Grid */}
        {!isLoading && !error && products.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {products.map((product) => (
              <ProductItem
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )}

        {/* No Products */}
        {!isLoading && !error && products.length === 0 && (
          <p className="text-center text-gray-500 mt-5">
            No Flowers Available
          </p>
        )}

      </div>
    </div>
  )
}

export default Products;
