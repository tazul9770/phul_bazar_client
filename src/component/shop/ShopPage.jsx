import FlowerList from "./FlowerList";
import Pagination from "./Pagination";
import useFetchProduct from "../../hooks/useFetchProducts";
import { useState } from "react";
import FilterSection from "./FilterSection";
import useFetchCategories from "../../hooks/useFetchCategories";

const ShopPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [showFilter, setShowFilter] = useState(false);

  const { products, loading, totalPage } = useFetchProduct(
    currentPage,
    priceRange,
    selectedCategory,
    searchQuery,
    sortOrder
  );
  const {categories} = useFetchCategories();

  const handlePriceChange = (index, value) => {
    setPriceRange((prev) => {
      const newRange = [...prev];
      newRange[index] = value;
      return newRange;
    });
    setCurrentPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-4">Shop Our Flowers</h1>

      {/* Mobile Filter Toggle Button */}
      <div className="lg:hidden mb-4">
  <button
    onClick={() => setShowFilter(!showFilter)}
    className={`w-full px-4 py-2 font-semibold rounded-lg border-2 transition-all duration-300
      ${showFilter 
        ? "bg-primary text-white border-primary shadow-md hover:shadow-lg" 
        : "bg-white text-primary border-primary hover:bg-primary hover:text-white shadow-sm hover:shadow-md"}`}
  >
    {showFilter ? "Hide Filter" : "Filter Flowers"}
  </button>
</div>


      {/* Filter Section */}
      <div className={`${showFilter ? "block" : "hidden"} lg:block mb-6`}>
        <FilterSection
          priceRange={priceRange}
          handlePriceChange={handlePriceChange}
          categories={categories}
          selectedCategory={selectedCategory}
          handleCategoryChange={setSelectedCategory}
          searchQuery={searchQuery}
          handleSearchQuery={setSearchQuery}
          sortOrder={sortOrder}
          handleSorting={setSortOrder}
        />
      </div>

      {/* Products & Pagination */}
      <FlowerList products={products} loading={loading} />
      <Pagination
        totalPage={totalPage}
        currentPage={currentPage}
        handlePageChange={setCurrentPage}
      />
    </div>
  );
};

export default ShopPage;
