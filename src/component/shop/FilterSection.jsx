import { FiSearch, FiTag, FiSliders } from "react-icons/fi";

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-3 text-sm shadow-sm transition focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-100";

const FilterSection = ({
  priceRange,
  handlePriceChange,
  categories,
  selectedCategory,
  handleCategoryChange,
  searchQuery,
  handleSearchQuery,
  sortOrder,
  handleSorting,
}) => {
  return (
    <div className="mb-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
      {/* Price Range */}
      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <label className="mb-4 block text-sm font-semibold text-gray-800">Price Range</label>

        {/* Min Range */}
        <div className="mb-4">
          <div className="mb-1.5 flex items-center justify-between text-xs text-gray-400">
            <span>Min</span>
            <span className="font-semibold text-pink-600">${priceRange[0]}</span>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="number"
              min="0"
              max={priceRange[1]}
              value={priceRange[0]}
              onChange={(e) => handlePriceChange(0, Number(e.target.value))}
              placeholder="Min"
              className="w-20 rounded-lg border border-gray-200 px-2.5 py-1.5 text-sm shadow-sm focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-100"
            />
            <input
              type="range"
              min="0"
              max={priceRange[1]}
              value={priceRange[0]}
              onChange={(e) => handlePriceChange(0, Number(e.target.value))}
              step="10"
              className="w-full cursor-pointer accent-pink-500"
            />
          </div>
        </div>

        {/* Max Range */}
        <div>
          <div className="mb-1.5 flex items-center justify-between text-xs text-gray-400">
            <span>Max</span>
            <span className="font-semibold text-pink-600">${priceRange[1]}</span>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="number"
              min={priceRange[0]}
              max="1000"
              value={priceRange[1]}
              onChange={(e) => handlePriceChange(1, Number(e.target.value))}
              className="w-20 rounded-lg border border-gray-200 px-2.5 py-1.5 text-sm shadow-sm focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-100"
            />
            <input
              type="range"
              min={priceRange[0]}
              max="1000"
              value={priceRange[1]}
              onChange={(e) => handlePriceChange(1, Number(e.target.value))}
              step="10"
              className="w-full cursor-pointer accent-pink-500"
            />
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <label className="mb-3 block text-sm font-semibold text-gray-800">Category</label>
        <div className="relative">
          <FiTag className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <select
            className={`${inputClass} appearance-none`}
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Search */}
      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <label className="mb-3 block text-sm font-semibold text-gray-800">Search</label>
        <div className="relative">
          <FiSearch className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearchQuery(e.target.value)}
            placeholder="Search flowers..."
            className={inputClass}
          />
        </div>
      </div>

      {/* Sorting */}
      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <label className="mb-3 block text-sm font-semibold text-gray-800">Sort by price</label>
        <div className="relative">
          <FiSliders className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <select
            className={`${inputClass} appearance-none`}
            value={sortOrder}
            onChange={(e) => handleSorting(e.target.value)}
          >
            <option value="">Default</option>
            <option value="price">Price: Low to High</option>
            <option value="-price">Price: High to Low</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
