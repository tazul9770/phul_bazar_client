import { Link, useParams } from "react-router"
import { Suspense, useEffect, useState } from "react"
import { FaArrowLeft, FaBoxOpen } from "react-icons/fa"
import { FiCheckCircle, FiXCircle, FiTruck, FiShield } from "react-icons/fi"
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
    return () => {
      isMounted = false
    }
  }, [productId])

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-pink-100 border-t-pink-500" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16">
        <ErrorAlert error={error} />
        <div className="mt-6 text-center">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 rounded-full bg-pink-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-pink-600/20 transition hover:bg-pink-700"
          >
            <FaArrowLeft className="text-xs" /> Back to Shop
          </Link>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <FaBoxOpen className="mb-4 text-5xl text-gray-300" />
        <h2 className="text-2xl font-bold text-gray-800">Product not found</h2>
        <p className="mb-6 mt-2 text-gray-500">The product you're looking for doesn't exist.</p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 rounded-full bg-pink-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-pink-600/20 transition hover:bg-pink-700"
        >
          <FaArrowLeft className="text-xs" /> Back to Shop
        </Link>
      </div>
    )
  }

  return (
    <main className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mb-6 sm:mb-8">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-pink-600"
          >
            <FaArrowLeft className="text-xs" /> Back to products
          </Link>
        </div>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-14">
          {/* Image gallery */}
          <div className="w-full">
            <Suspense fallback={<div className="aspect-square animate-pulse rounded-2xl bg-gray-100" />}>
              <ProductImageGallery images={product.images} productName={product.name} />
            </Suspense>
          </div>

          {/* Info */}
          <div className="flex h-full flex-col">
            <div className="border-b border-gray-100 pb-6">
              {product.category?.name && (
                <span className="mb-4 inline-block rounded-full bg-pink-50 px-4 py-1.5 text-xs font-semibold text-pink-600 ring-1 ring-pink-100">
                  {product.category.name}
                </span>
              )}
              <h1 className="text-2xl font-bold leading-tight text-gray-900 sm:text-3xl lg:text-4xl">
                {product.name}
              </h1>
            </div>

            <div className="border-b border-gray-100 py-6">
              <div className="flex flex-wrap items-end gap-3">
                <span className="text-3xl font-bold text-pink-600 sm:text-4xl">
                  ৳{product.price}
                </span>
                <span className="pb-1 text-sm text-gray-400">
                  ৳{product.price_with_tax} incl. tax
                </span>
              </div>
            </div>

            <div className="border-b border-gray-100 py-6">
              <h3 className="mb-3 text-base font-semibold text-gray-900">Description</h3>
              <p className="text-sm leading-7 text-gray-600 sm:text-base">
                {product.description || "No description available for this product."}
              </p>
            </div>

            <div className="py-6">
              <div className="flex items-center gap-2.5">
                <span className="text-sm font-semibold text-gray-700 sm:text-base">
                  Availability:
                </span>
                {product.stock > 0 ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700 ring-1 ring-green-200">
                    <FiCheckCircle /> In Stock ({product.stock})
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 ring-1 ring-red-200">
                    <FiXCircle /> Out of Stock
                  </span>
                )}
              </div>

              <div className="mt-6">
                <AddToCartButton product={product} />
              </div>

              {/* Trust row */}
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs text-gray-500">
                <span className="flex items-center gap-1.5">
                  <FiTruck className="text-pink-400" /> Same-day delivery
                </span>
                <span className="flex items-center gap-1.5">
                  <FiShield className="text-pink-400" /> Freshness guaranteed
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-100 pt-10 sm:mt-16">
          <ReviewSection />
        </div>
      </div>
    </main>
  )
}

export default ProductDetail
