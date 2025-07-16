import { useForm } from "react-hook-form";
import RattingStar from "./RattingStar";

const ReviewForm = ({onSubmit}) => {
  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const ratingValue = watch("ratings", 0);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 p-4 md:p-6 bg-white shadow-md rounded-lg"
    >

      {/* Rating */}
      <div>
        <label className="block font-medium text-gray-700 mb-3">Rating</label>
        <RattingStar 
            onChange={(value) => setValue("ratings", value)} 
            rating={ratingValue}
        />
        <input type="hidden" {...register("ratings", { required: true })} />
        {errors.ratings && (
          <p className="text-red-500 text-sm mt-1">Rating is required</p>
        )}
      </div>

      {/* Comment */}
      <div>
        <label className="block font-medium text-gray-700 mb-1">Your Review</label>
        <textarea
          {...register("comment", { required: true })}
          rows={4}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Share your experience with this flower..."
        />
        {errors.comment && (
          <p className="text-red-500 text-sm mt-1">Comment is required</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition disabled:opacity-50 cursor-pointer"
      >
        {isSubmitting ? (
          <span className="flex items-center">
            <span className="loading loading-spinner loading-xs mr-2"></span>
            Submitting...
          </span>
        ) : (
          "Submit Review"
        )}
      </button>
    </form>
  );
};

export default ReviewForm;
