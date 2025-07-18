const Pagination = ({ totalPage, currentPage, handlePageChange }) => {
  return (
    <div className="flex justify-center my-4">
      {Array.from({ length: totalPage }, (_, i) => (
        <button
          key={i}
          onClick={() => handlePageChange(i + 1)}
          className={`mx-1 px-3 py-1 rounded transition-colors cursor-pointer ${
            currentPage === i + 1
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-gray-700 hover:bg-gray-400"
          }`}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
