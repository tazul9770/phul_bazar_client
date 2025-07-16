import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import apiClient from "../services/api-client";
import authApiClient from "../services/auth_apiClient";

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

  // Fetch categories
  useEffect(() => {
    apiClient.get("/category/").then((res) => setCategories(res.data));
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
    } catch (error) {
      console.error(error);
      alert("Image upload failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 md:p-8 bg-white shadow-xl rounded-2xl mt-6">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6">
        🌸 Add New Flower
      </h2>

      {!productId ? (
        <form onSubmit={handleSubmit(handleProductAdd)} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Flower Name</label>
            <input
              {...register("name", { required: true })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Rose, Tulip, etc."
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">This field is required</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              {...register("description", { required: true })}
              className="w-full px-4 py-2 border rounded-lg resize-none h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter product description"
            />
            {errors.description && <p className="text-red-500 text-xs mt-1">This field is required</p>}
          </div>

          {/* Price & Stock */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price (BDT)</label>
              <input
                type="text"
                {...register("price", {
                  required: "This field is required",
                  validate: (value) =>
                    !isNaN(parseFloat(value)) || "Enter a valid number",
                })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.price && (
                <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
              <input
                type="number"
                {...register("stock", { required: true })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. 20"
              />
              {errors.stock && (
                <p className="text-red-500 text-xs mt-1">This field is required</p>
              )}
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              {...register("category", { required: true })}
              className="w-full px-4 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-500 text-xs mt-1">This field is required</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200 cursor-pointer"
          >
            ➕ Add Product
          </button>
        </form>
      ) : (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-700">Upload Product Images</h3>
          <input
            type="file"
            multiple
            accept="image/*"
            className="w-full file-input file-input-bordered"
            onChange={handleImgChange}
          />

          {previewImg.length > 0 && (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mt-4">
              {previewImg.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt="Preview"
                  className="w-full h-20 object-cover rounded-lg border"
                />
              ))}
            </div>
          )}

          <button
            onClick={handleImgUpload}
            className={`mt-4 w-full py-3 text-white font-semibold rounded-lg transition duration-200 ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
            }`}
            disabled={loading}
          >
            {loading ? "Uploading Images..." : "✅ Upload Images"}
          </button>
        </div>
      )}
    </div>
  );
};

export default AddProducts;
