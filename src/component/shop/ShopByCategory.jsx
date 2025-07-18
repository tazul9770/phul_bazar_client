import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useCatePagi from "../../hooks/useCatePagi";
import ProductItem from "../flower/FlowerItems";
import Pagination from "./Pagination";
import apiClient from "../../services/api-client";

const ShopByCategory = () => {
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState(null);

  const { products, loading, totalPage } = useCatePagi(currentPage, id);

  useEffect(() => {
    if (!id) return;

    apiClient
      .get(`/category/${id}/`)
      .then((res) => setCategory(res.data))
      .catch((err) => console.error("Error fetching category:", err));
  }, [id]);


  return (
    <div className="max-w-7xl mx-auto px-4 py-6 m-4">
      <h2 className="text-xl font-bold mb-4 text-center">
            {category ? `${category.name} Category Products` : "Loading Category..."}
      </h2>


      {loading ? (
        <div className="text-center py-10">
          <span className="loading loading-spinner text-primary"></span>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center text-gray-500 py-10">No products found.</div>
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPage > 1 && (
        <div className="mt-6 flex justify-center">
          <Pagination
            totalPage={totalPage}
            currentPage={currentPage}
            handlePageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
};

export default ShopByCategory;
