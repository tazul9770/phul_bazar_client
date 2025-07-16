import { FaStar } from "react-icons/fa";
import EditReviewForm from "./EditReviewForm";

const ReviewCard = ({ 
  review, 
  user, 
  editReview, 
  setEditReview, 
  onEditClick, 
  isEditing,
  onCancelEdit,
  onSave,
  onDelete
}) => {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition duration-300 border border-gray-200 rounded-2xl overflow-hidden">
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <p className="text-base sm:text-lg font-semibold text-gray-800">{review.user.name}</p>
            <div className="flex items-center gap-1 mt-1">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className={i < review.ratings ? "text-yellow-400 text-sm sm:text-base": "text-gray-300 text-sm sm:text-base"} />
              ))}
            </div>
          </div>

          {/* Hide buttons on mobile */}
          {user && user.id === review.user.id && (
              <div className="hidden sm:flex gap-2">
            <button onClick={onEditClick} className="px-3 py-1 text-xs sm:text-sm font-medium text-primary border border-primary rounded-lg hover:bg-primary hover:text-white transition cursor-pointer">
              Edit
            </button>
            <button onClick={onDelete} className="px-3 py-1 text-xs sm:text-sm font-medium text-red-600 border border-red-600 rounded-lg hover:bg-red-600 hover:text-white transition cursor-pointer">
              Delete
            </button>
          </div>
          )}
        </div>

        {/* Show buttons on mobile only */}
        {user && user.id === review.user.id && (
          <div className="flex gap-2 mt-3 sm:hidden">
          <button onClick={onEditClick} className="flex-1 px-3 py-1 text-xs font-medium text-primary border border-primary rounded-lg hover:bg-primary hover:text-white transition cursor-pointer">
            Edit
          </button>
          <button onClick={onDelete} className="flex-1 px-3 py-1 text-xs font-medium text-red-600 border border-red-600 rounded-lg hover:bg-red-600 hover:text-white transition cursor-pointer">
            Delete
          </button>
        </div>
        )}
        {isEditing ? (
          <EditReviewForm 
              editReview={editReview} 
              setEditReview={setEditReview}
              onCancelEdit={onCancelEdit}
              onSave={() => onSave(review.id)}
          />
        ) : (
          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-600 leading-relaxed whitespace-pre-line">
              {review.comment}
          </p>
        )}
      </div>
    </div>
  );
};

export default ReviewCard;
