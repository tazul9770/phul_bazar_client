import { useForm } from "react-hook-form";
import apiClient from "../services/api-client";

const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await apiClient.post("/contact/", data);
      if (response.status === 200 || response.status === 201) {
        alert("✅ Your message has been sent successfully!");
        reset();
      }
    } catch {
      alert("❌ Something went wrong. Please try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 sm:p-8">
      <div className="bg-white shadow-lg rounded-xl p-6 sm:p-10">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Contact Us</h2>
        <p className="text-center text-gray-500 mb-8">
          Have questions or feedback? Send us a message and we will get back to you shortly.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              placeholder="you@example.com"
              className={`w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              type="text"
              {...register("phone_number", {
                required: "Phone number is required",
                pattern: { value: /^\d{11}$/, message: "Phone number must be exactly 11 digits" },
              })}
              placeholder="01xxxxxxxxx"
              maxLength={11}
              className={`w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 ${errors.phone_number ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.phone_number && <p className="text-red-600 text-sm mt-1">{errors.phone_number.message}</p>}
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea
              rows={5}
              {...register("write_something", { required: "Message is required" })}
              placeholder="Write your message here..."
              className={`w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 ${errors.write_something ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.write_something && <p className="text-red-600 text-sm mt-1">{errors.write_something.message}</p>}
          </div>

          {/* Submit Button with Spinner */}
          <button
            type="submit"
            disabled={isSubmitting}
            className=" cursor-pointer w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg flex justify-center items-center space-x-2 transition disabled:opacity-50"
          >
            {isSubmitting && (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
              </svg>
            )}
            <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;