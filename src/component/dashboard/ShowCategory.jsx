import CategoryItems from "../home/categories/CategoryItems";
import useFetchCategories from "../../hooks/useFetchCategories";


const ShowCategory = () => {

  const {categories, loading} = useFetchCategories();

  return (
    <div>
      {/* Loading State */}
      {loading ? (
        <div className="text-center py-10 text-gray-500 font-medium">
          Loading categories...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <CategoryItems key={category.id} index={index} category={category} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowCategory;
