import { useEffect, useState } from "react";
import apiClient from "../../../services/api-client";
import CategoryItems from "./CategoryItems";
import useAuthContext from "../../../hooks/useAuthContext";
import ErrorAlert from '../../../ErrorAlert';

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {user} = useAuthContext();

  useEffect(() => {
    setLoading(true)
    apiClient.get("/category/")
    .then((res) => setCategories(res.data))
    .catch((err) => setError(err.message))
    .finally(() => setLoading(false))
  }, []);
  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      {/* Category Heading  */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-bold">Browse Categories</h2>
        {user && (
          <a
            href="/dashboard/categories/"
            className="btn hover:bg-primary hover:text-white transition px-6 py-6 rounded-full text-lg"
          >
            View All
          </a>
        )}
      </div>

      {isLoading && (
        <div className="flex justify-center items-center py-7">
          <span className="loading loading-spinner loading-xl text-primary"></span>
        </div>
      )}

      {error && <ErrorAlert error={error}/>}

      {/* Category Grid  */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <CategoryItems key={category.id} index={index} category={category} />
        ))}
      </div>
    </section>
  );
};

export default Category;