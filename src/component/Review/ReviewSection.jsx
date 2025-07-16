import { useParams } from "react-router";
import ReviewForm from "./ReviewForm";
import authApiClient from "../../services/auth_apiClient";
import { useEffect, useState } from "react";
import ReviewList from "./ReviewList";
import apiClient from "../../services/api-client";
import useAuthContext from "../../hooks/useAuthContext";

const ReviewSection = () => {
  const { productId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [userCanReview, setUserCanReview] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editReview, setEditReview] = useState({ratings: 0, comment : ""});
  const [editingId, setEditingId] = useState(null);

  const {user} = useAuthContext();

  // Fetch reviews
  const fetchReview = async () => {
    setIsLoading(true);
    try {
      const response = await apiClient.get(`/flowers/${productId}/reviews/`);
      setReviews(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Submit review
  const onSubmit = async (data) => {
    try {
      await authApiClient.post(`/flowers/${productId}/reviews/`, data);
      fetchReview();
    } catch (error) {
      console.log(error);
    }
  };

  // Check if user can review
  const userPermission = async () => {
    try {
      const response = await authApiClient.get(`/orders/has_ordered/${productId}/`);
      setUserCanReview(response.data.has_ordered);
    } catch (error) {
      console.log(error);
    }
  };

  // Update review
  const handleUpdateReview = async(reviewId) => {
    try{
      await authApiClient.put(`/flowers/${productId}/reviews/${reviewId}/`, editReview)
      setEditingId(null)
      fetchReview()
    }catch(error){
      console.log(error);
    }
  }

  // delete review
  const handleDeleteReview = async(reviewId) => {
    try{
      await authApiClient.delete(`/flowers/${productId}/reviews/${reviewId}/`)
      fetchReview()
    }catch(error){
      console.log(error);
    }
  }

  useEffect(() => {
    userPermission();
    fetchReview();
  }, []);

  return (
    <div className="space-y-8 mt-10 max-w-5xl mx-auto px-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Customer Reviews</h2>
        <div className=" text-xl">
          {reviews.length} {reviews.length === 1 ? "Review" : "Reviews"}
        </div>
      </div>

      {userCanReview && (
        <div className="card bg-base-100 shadow-lg border border-base-200 rounded-2xl overflow-hidden transition hover:shadow-xl">
          <div className="card-body space-y-4">
            <h3 className="card-title text-lg text-gray-700">Write a Review</h3>
            <ReviewForm onSubmit={onSubmit} />
          </div>
        </div>
      )}

      <div className="divider"></div>

      {isLoading ? (
        <div className="flex justify-center items-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-8 space-y-2">
          <div className="text-5xl mb-2">📝</div>
          <h3 className="text-xl font-semibold text-gray-700">No Reviews Yet</h3>
          <p className="text-base-content/70">
            Be the first to review this product!
          </p>
        </div>
      ) : (
        <ReviewList 
            reviews={reviews} 
            user={user}
            editReview={editReview}
            setEditReview={setEditReview}
            editingId={editingId}
            setEditingId={setEditingId}
            handleUpdateReview={handleUpdateReview}
            handleDeleteReview={handleDeleteReview}
        />
      )}
    </div>
  );
};

export default ReviewSection;
