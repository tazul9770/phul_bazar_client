import StarRating from "./RattingStar";

const EditReviewForm = ({ 
    editReview, 
    setEditReview, 
    onCancelEdit,
    onSave
}) => {

  return (
    <div className="mt-4 bg-white p-6 rounded-2xl shadow-md border border-gray-200">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
        <StarRating 
            rating={editReview.ratings}
            onChange={(value) => setEditReview({...editReview, ratings:value})}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Comment</label>
        <textarea
          value={editReview.comment}
          onChange={(e) => setEditReview({...editReview, comment:e.target.value})}
          className="w-full border border-gray-300 rounded-lg p-2 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary min-h-[100px]"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <button onClick={onSave} className="flex-1 sm:flex-none px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition cursor-pointer">
          Save Changes
        </button>
        <button onClick={onCancelEdit} className="flex-1 sm:flex-none px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 hover:bg-gray-100 rounded-lg transition cursor-pointer">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditReviewForm;
