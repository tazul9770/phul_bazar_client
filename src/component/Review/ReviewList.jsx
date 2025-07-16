import ReviewCard from './ReviewCard';

const ReviewList = ({
    reviews, 
    user, 
    editReview, 
    setEditReview, 
    editingId, 
    setEditingId, 
    handleUpdateReview,
    handleDeleteReview
}) => {
    return (
        <div>
            {reviews.map((review) => (
                <ReviewCard 
                    key={review.id} 
                    review={review}
                    isEditing={editingId === review.id}
                    user={user}
                    editReview={editReview}
                    setEditReview={setEditReview}
                    onEditClick={() => {
                        setEditingId(review.id)
                        setEditReview({
                            ratings:review.ratings,
                            comment:review.comment
                        })
                    }}
                    onCancelEdit={() => setEditingId(null)}
                    onSave={handleUpdateReview}
                    onDelete={() => handleDeleteReview(review.id)}
                />
            ))}
        </div>
    );
};
 
export default ReviewList;