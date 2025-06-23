const Pagination = ({totalPage, currentPage, handlePageChange}) => {
    return (
        <div className="flex justify-center">
            {Array.from({length : totalPage}, (_, i) => (
                <button 
                    key={i} 
                    onClick={() => handlePageChange(i+1)}
                    className={`mb-5 mx-1 px-3 py-1 rounded bg-blue-400 ${ currentPage === i+1 ? "bg-blue-500 text-white" : "bg-gray-300"}`}>{i+1}
                </button>
            ))}
        </div>
    );
};

export default Pagination;