import { useForm } from "react-hook-form";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import authApiClient from "../../../services/auth_apiClient";

const AddCategoryForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (data) => {
    setLoading(true);
    setSuccess(false);
    setError("");
    try {
      await authApiClient.post("/category/", data);
      setSuccess(true);
      reset();
    } catch (err) {
      setError("Failed to add category!", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow max-w-md mx-auto space-y-4">
      <h2 className="text-xl font-semibold text-center text-gray-700">Add New Category</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Category Name"
            {...register("name", { required: "Category name is required" })}
            className="border border-gray-500 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full flex justify-center items-center gap-2 px-4 py-2 rounded text-white font-semibold transition duration-300 cursor-pointer ${
            loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading && <FaSpinner className="animate-spin" />} Add Category
        </button>
      </form>

      {success && <p className="text-green-500 text-center">Category Added Successfully!</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}
    </div>
  );
};

export default AddCategoryForm;
