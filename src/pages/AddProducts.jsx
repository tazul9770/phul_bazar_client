import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FiUploadCloud, FiCheck, FiImage } from "react-icons/fi";
import apiClient from "../services/api-client";
import authApiClient from "../services/auth_apiClient";
import { useNavigate } from "react-router";

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm shadow-sm transition focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-100";

const StepDot = ({ active, done, label }) => (
  <div className="flex items-center gap-2">
    <span
      className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${
        done
          ? "bg-pink-600 text-white"
          : active
          ? "bg-pink-100 text-pink-600 ring-2 ring-pink-300"
          : "bg-gray-100 text-gray-400"
      }`}
    >
      {done ? <FiCheck size={14} /> : label}
    </span>
    <span className={`text-sm font-medium ${active || done ? "text-gray-800" : "text-gray-400"}`}>
      {label === "1" ? "Details" : "Images"}
    </span>
  </div>
);

const AddProducts = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [categories, setCategories] = useState([]);
  const [productId, setProductId] = useState(null);
  const [previewImg, setPreviewImg] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Fetch categories
  useEffect(() => {
    apiClient.get("/category/").then((res) => setCategories(res.data.results));
  }, []);

  // Add product
  const handleProductAdd = async (data) => {
    try {
      const payload = {
        ...data,
        price: parseFloat(data.price),
        stock: parseInt(data.stock),
        category: parseInt(data.category),
      };

      const response = await authApiClient.post("/flowers/", payload);
      setProductId(response.data.id);
    } catch (error) {
      console.log(error);
      alert("Failed to add product");
    }
  };

  // Image preview
  const handleImgChange = (e) => {
    const files = Array.from(e.target.files);
    previewImg.forEach((url) => URL.revokeObjectURL(url));
    setPreviewImg(files.map((file) => URL.createObjectURL(file)));
    setImages(files);
  };

  // image upload
  const handleImgUpload = async () => {
    if (!images.length) return alert("Please select images");
    if (!productId) return alert("Product not yet created!");

    setLoading(true);
    try {
      const uploadPromises = images.map((image) => {
        const formData = new FormData();
        formData.append("image", image);
        return authApiClient.post(`/flowers/${productId}/images/`, formData);
      });

      await Promise.all(uploadPromises);

      alert("Images uploaded successfully!");
      setPreviewImg([]);
      setImages([]);
      navigate("/shop");
    } catch (error) {
      console.error(error);
      alert("Image upload failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto mt-6 max-w-2xl rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-8">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">🌸 Add New Flower</h2>
        <p className="mt-1 text-sm text-gray-400">List a new product in your shop</p>
      </div>

      {/* Step indicator */}
      <div className="mb-8 flex items-center justify-center gap-4">
        <StepDot active={!productId} done={!!productId} label="1" />
        <div className="h-px w-10 bg-gray-200" />
        <StepDot active={!!productId} done={false} label="2" />
      </div>

      {!productId ? (
        <form onSubmit={handleSubmit(handleProductAdd)} className="space-y-5">
          {/* Name */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Flower Name</label>
            <input
              {...register("name", { required: true })}
              className={inputClass}
              placeholder="Rose, Tulip, etc."
            />
            {errors.name && <p className="mt-1 text-xs font-medium text-red-500">This field is required</p>}
          </div>

          {/* Description */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Description</label>
            <textarea
              {...register("description", { required: true })}
              className={`${inputClass} h-24 resize-none`}
              placeholder="Enter product description"
            />
            {errors.description && (
              <p className="mt-1 text-xs font-medium text-red-500">This field is required</p>
            )}
          </div>

          {/* Price & Stock */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Price (BDT)</label>
              <input
                type="text"
                {...register("price", {
                  required: "This field is required",
                  validate: (value) => !isNaN(parseFloat(value)) || "Enter a valid number",
                })}
                className={inputClass}
                placeholder="e.g. 450"
              />
              {errors.price && <p className="mt-1 text-xs font-medium text-red-500">{errors.price.message}</p>}
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Stock Quantity</label>
              <input
                type="number"
                {...register("stock", { required: true })}
                className={inputClass}
                placeholder="e.g. 20"
              />
              {errors.stock && <p className="mt-1 text-xs font-medium text-red-500">This field is required</p>}
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Category</label>
            <select {...register("category", { required: true })} className={`${inputClass} bg-white`}>
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            {errors.category && <p className="mt-1 text-xs font-medium text-red-500">This field is required</p>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full rounded-xl bg-pink-600 py-3 text-sm font-semibold text-white shadow-md shadow-pink-600/20 transition hover:bg-pink-700"
          >
            Add Product
          </button>
        </form>
      ) : (
        <div>
          <h3 className="mb-1 text-lg font-semibold text-gray-800">Upload product images</h3>
          <p className="mb-4 text-sm text-gray-400">Add a few clear photos so customers know exactly what they're getting.</p>

          <label
            htmlFor="product-images"
            className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-pink-200 bg-pink-50/40 px-4 py-8 text-center transition hover:border-pink-300 hover:bg-pink-50"
          >
            <FiUploadCloud className="text-2xl text-pink-400" />
            <span className="text-sm font-medium text-gray-700">Click to select images</span>
            <span className="text-xs text-gray-400">PNG, JPG up to a few MB each</span>
            <input
              id="product-images"
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleImgChange}
            />
          </label>

          {previewImg.length > 0 ? (
            <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4">
              {previewImg.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt="Preview"
                  className="h-20 w-full rounded-lg border border-gray-100 object-cover"
                />
              ))}
            </div>
          ) : (
            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400">
              <FiImage /> No images selected yet
            </div>
          )}

          <button
            onClick={handleImgUpload}
            disabled={loading}
            className={`mt-5 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white shadow-md transition ${
              loading
                ? "cursor-not-allowed bg-gray-300 shadow-none"
                : "bg-green-600 shadow-green-600/20 hover:bg-green-700"
            }`}
          >
            {loading ? "Uploading images..." : "Upload Images"}
          </button>
        </div>
      )}
    </div>
  );
};

export default AddProducts;
