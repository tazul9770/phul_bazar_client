import { Link, useParams } from "react-router"
import { Suspense, useEffect, useState } from "react"
import { FaArrowLeft, FaBoxOpen } from "react-icons/fa"
import AddToCartButton from "../component/product_detail/AddToCartButton"
import ProductImageGallery from "../component/product_detail/ProductImgGallary"
import apiClient from "../services/api-client"
import ReviewSection from "../component/Review/ReviewSection"
import ErrorAlert from "../ErrorAlert"

const ProductDetail = () => {
  const { productId } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    let isMounted = true
    const fetchProduct = async () => {
      try {
        setLoading(true)
        setError("")
        const res = await apiClient.get(`/flowers/${productId}`)
        if (isMounted) setProduct(res.data)
      } catch (err) {
        if (isMounted) setError(err.message || "Failed to load product")
      } finally {
        if (isMounted) setLoading(false)
      }
    }
    fetchProduct()
    return () => { isMounted = false }
  }, [productId])

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16">
        <ErrorAlert error={error} />
        <div className="text-center mt-6">
          <Link to="/shop" className="btn btn-primary rounded-full px-6">
            <FaArrowLeft /> Back to Shop
          </Link>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
        <FaBoxOpen className="text-5xl text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-gray-700">Product Not Found</h2>
        <p className="text-gray-500 mt-2 mb-6">The product you're looking for doesn't exist.</p>
        <Link to="/shop" className="btn btn-primary rounded-full px-6">
          <FaArrowLeft /> Back to Shop
        </Link>
      </div>
    )
  }

  return (
    <main className="bg-base-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="mb-6 sm:mb-8">
          <Link to="/shop" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-primary transition-colors">
            <FaArrowLeft className="text-xs" /> Back to products
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-start">
          <div className="w-full">
            <Suspense fallback={<div className="aspect-square bg-base-300 animate-pulse rounded-2xl" />}>
              <ProductImageGallery images={product.images} productName={product.name} />
            </Suspense>
          </div>

          <div className="flex flex-col h-full">
            <div className="border-b border-base-300 pb-6">
              {product.category?.name && (
                <span className="badge badge-outline border-primary/40 text-primary mb-4 px-4 py-3">
                  {product.category.name}
                </span>
              )}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                {product.name}
              </h1>
            </div>

            <div className="py-6 border-b border-base-300">
              <div className="flex flex-wrap items-end gap-3">
                <span className="text-3xl sm:text-4xl font-bold text-primary">
                  ৳{product.price}
                </span>
                <span className="text-sm text-gray-500 pb-1">
                  ৳{product.price_with_tax} incl. tax
                </span>
              </div>
            </div>

            <div className="py-6 border-b border-base-300">
              <h3 className="font-semibold text-lg mb-3">Description</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-7">
                {product.description || "No description available for this product."}
              </p>
            </div>

            <div className="py-6">
              <div className="flex items-center gap-3">
                <span className="font-semibold text-sm sm:text-base">Availability:</span>
                {product.stock > 0 ? (
                  <span className="badge bg-green-100 text-green-700 border border-green-300 px-3 py-3">
                    In Stock ({product.stock})
                  </span>
                ) : (
                  <span className="badge bg-red-100 text-red-700 border border-red-300 px-3 py-3">
                    Out of Stock
                  </span>
                )}
              </div>

              <div className="mt-6">
                <AddToCartButton product={product} />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 sm:mt-16 border-t border-base-300 pt-10">
          <ReviewSection />
        </div>
      </div>
    </main>
  )
}

export default ProductDetail;
