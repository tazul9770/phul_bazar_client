import React, { useEffect, useState } from 'react';
import ProductItem from './FlowerItems';
import ErrorAlert from '../../ErrorAlert';
import apiClient from '../../services/api-client';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    setLoading(true)
    apiClient
      .get('/flowers/')
      .then((res) => setProducts(res.data.results))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, []);

  return (
    <div className="p-4 m-14">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-3">
        <h2 className="text-2xl font-bold text-gray-800">Trending Products</h2>
        <button className="btn btn-outline btn-sm sm:btn-md text-primary font-medium hover:bg-primary hover:text-white transition">
          View All
        </button>
      </div>
      {/* spinner */}
      {isLoading && (
        <div className='flex justify-center items-center py-7'>
          <span className="loading loading-spinner loading-xl text-primary"></span>
        </div>
      )}
      {/* Eroor message */}
      {error && <ErrorAlert error={error}/>}
      {/* Product show */}
      {!isLoading && !error && products.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-items-center">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
      )}
      {!isLoading && !error && products.length === 0 && (
        <p className='text-center text-gray-500 mt-5'>No Products Available</p>
      )}
    </div>
  );
};

export default Products;
