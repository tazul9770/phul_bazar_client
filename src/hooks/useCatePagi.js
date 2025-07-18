import { useEffect, useState } from "react";
import apiClient from "../services/api-client";

const useCatePagi = (currentPage, selectedCategory) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const url = `/flowers/?category_id=${selectedCategory}&page=${currentPage}`;
        const response = await apiClient.get(url);
        const data = response.data;
        setProducts(data.results);
        setTotalPage(Math.ceil(data.count / data.results.length));
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    if (selectedCategory) {
      fetchProducts();
    }
  }, [currentPage, selectedCategory]);

  return { products, loading, totalPage };
};

export default useCatePagi;
