import { Link, useParams } from "react-router";
import { Suspense, useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

import AddToCartButton from "../component/product_detail/AddToCartButton";
import ProductImageGallery from "../component/product_detail/ProductImgGallary";
import apiClient from "../services/api-client";

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState()
  const {productId} = useParams()

  useEffect(() => {
    setLoading(true)
    apiClient.get(`/flowers/${productId}`)
    .then((res) => {
      setProduct(res.data)
      setLoading(false)
    })
  }, [productId])

  if(loading) return (
        <div className='flex justify-center items-center py-7'>
          <span className="loading loading-spinner loading-xl text-primary"></span>
        </div>
    )

  if(!product) return <div>Product not found</div>

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Back Link */}
      <div className="mb-6">
        <Link
          to="/shop"
          className="inline-flex items-center text-sm text-gray-500 hover:text-blue-500 transition-colors"
        >
          <FaArrowLeft className="mr-2 h-4 w-4" />
          Back to products
        </Link>
      </div>

      {/* Product Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Product Image */}
        <Suspense
          fallback={
            <div className="aspect-square bg-base-300 animate-pulse rounded-lg" />
          }
        >
          <ProductImageGallery
            images={product.images}
            productName={product.name}
          />
        </Suspense>

        {/* Product Info */}
        <div className="flex flex-col justify-between">
          <div>
            {/* Category Badge */}
            <div className="badge badge-outline mb-4 px-3 py-1 text-sm">
              Category: {product.category.name}
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

            {/* Price */}
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-3xl font-semibold text-primary">
                ${product.price}
              </span>
              <span className="text-sm text-gray-500">
                (${product.price_with_tax} incl. tax)
              </span>
            </div>

            {/* Description */}
            <div className="text-sm text-gray-700 leading-relaxed mb-6">
              {product.description}
            </div>

            {/* Stock Info */}
            <div className="flex items-center mb-6">
              <span className="text-sm font-medium mr-2">Availability:</span>
              {product.stock > 0 ? (
                <span className="badge bg-green-100 text-green-700 border border-green-300">
                  In Stock ({product.stock})
                </span>
              ) : (
                <span className="badge bg-red-100 text-red-700 border border-red-300">
                  Out of Stock
                </span>
              )}
            </div>
          </div>

          {/* Add to Cart Button */}
          <div className="pt-4">
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
