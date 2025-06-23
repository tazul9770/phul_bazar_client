const FilterSection = ({priceRange, handlePriceChange}) => {
  return (
    <div className="mb-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Price Range */}
      <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-100">
        <label className="block text-sm font-semibold text-gray-800 mb-3">
          Price Range
        </label>

        {/* Min Range */}
        <div className="flex items-center gap-3 mb-3">
          <input
            type="number"
            min="0"
            max={priceRange[1]}
            value={priceRange[0]}
            onChange={(e) => handlePriceChange(0, Number(e.target.value))}
            placeholder="Min"
            className="w-24 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="range"
            min="0"
            max={priceRange[1]}
            value={priceRange[0]}
            onChange={(e) => handlePriceChange(0, Number(e.target.value))}
            step="10"
            className="w-full accent-blue-500 cursor-pointer"
          />
        </div>

        {/* Max Range */}
        <div className="flex items-center gap-3">
          <input
            type="number"
            min={priceRange[0]}
            max="1000"
            value={priceRange[1]}
            onChange={(e) => handlePriceChange(1, Number(e.target.value))}
            className="w-24 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="range"
            min={priceRange[0]}
            max="1000"
            value={priceRange[1]}
            onChange={(e) => handlePriceChange(1, Number(e.target.value))}
            step="10"
            className="w-full accent-blue-500 cursor-pointer"
          />
        </div>

        <div className="flex justify-between text-xs text-gray-600 mt-2">
          <span>${priceRange[0]} (Min)</span>
          <span>${priceRange[1]} (Max)</span>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-100">
        <label className="block text-sm font-semibold text-gray-800 mb-3">
          Category
        </label>
        <select
          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Categories</option>
        </select>
      </div>

      {/* Search */}
      <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-100">
        <label className="block text-sm font-semibold text-gray-800 mb-3">
          Search
        </label>
        <input
          type="text"
          placeholder="Search flowers..."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Sorting */}
      <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-100">
        <label className="block text-sm font-semibold text-gray-800 mb-3">
          Sort By Price
        </label>
        <select
          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Default</option>
          <option value="price">Price: Low to High</option>
          <option value="-price">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
};

export default FilterSection;
