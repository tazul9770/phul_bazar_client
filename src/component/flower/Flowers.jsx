import React, { useEffect, useState } from 'react';
import ErrorAlert from '../../ErrorAlert';
import ProductItem from './FlowerItems';
import apiClient from '../../services/api-client';
import { Link } from 'react-router-dom';
import useAuthContext from '../../hooks/useAuthContext';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {user} = useAuthContext();

  useEffect(() => {
    setLoading(true);
    apiClient
      .get('/flowers/')
      .then((res) => setProducts(res.data.results))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="px-4 sm:px-6 lg:px-10 py-10 m-14">
      {/* Header Section */}
      <div className="flex items-center justify-between flex-wrap sm:flex-nowrap mb-8 gap-4">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
          Trending Flowers
        </h2>
        <Link to="/shop">
          {user && (
            <button className="btn btn-outline btn-sm sm:btn-md text-primary font-medium hover:bg-primary hover:text-white transition duration-200">
              View All
            </button>
          )}
        </Link>
      </div>

      {/* Loading Spinner */}
      {isLoading && (
        <div className="flex justify-center items-center py-7">
          <span className="loading loading-spinner loading-xl text-primary"></span>
        </div>
      )}

      {/* Error Message */}
      {error && <ErrorAlert error={error} />}

      {/* Product Grid */}
      {!isLoading && !error && products.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* No Products */}
      {!isLoading && !error && products.length === 0 && (
        <p className="text-center text-gray-500 mt-5">No Products Available</p>
      )}
    </div>
    </div>
  );
};

export default Products;
