import { useForm } from "react-hook-form";
import { useState } from "react";
import { HiOutlineMail, HiOutlinePhone, HiOutlineChat } from "react-icons/hi";
import apiClient from "../services/api-client";

const Contact = () => {
  const [message, setMessage] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await apiClient.post("/contact/", data);
      if (res.status === 200 || res.status === 201) {
        setMessage({ type: "success", text: "Your message has been sent successfully." });
        reset();
      }
    } catch {
      setMessage({ type: "error", text: "Something went wrong. Please try again." });
    }
    setTimeout(() => setMessage(null), 4000);
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-80 to-cyan-50 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-12">

        {/* Left Info */}
        <div className="hidden md:flex flex-col justify-center">
          <h2 className="text-4xl font-extrabold text-gray-900 leading-tight">
            Let’s talk about <br /> your questions
          </h2>
          <p className="mt-4 text-gray-600 max-w-md">
            Whether you have a question, feedback, or need support — our team is ready to help you.
          </p>

          <div className="mt-8 space-y-4 text-sm text-gray-700">
            <p>📧 tazulislam42609770@gmail.com</p>
            <p>📞 +880 1842609770</p>
            <p>🏢 Bangladesh</p>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200 p-8 sm:p-10">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Contact Us
          </h3>
          <p className="text-sm text-gray-500 mb-8">
            Fill out the form below and we’ll get back to you shortly.
          </p>

          {/* Message */}
          {message && (
            <div
              className={`mb-6 rounded-lg px-4 py-3 text-sm font-medium text-center
                ${
                  message.type === "success"
                    ? "bg-green-50 text-green-700 border border-green-200"
                    : "bg-red-50 text-red-700 border border-red-200"
                }`}
            >
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <div className="relative">
                <HiOutlineMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  className={`w-full pl-10 pr-3 py-2.5 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500
                    ${errors.email ? "border-red-500" : "border-gray-300"}`}
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone number
              </label>
              <div className="relative">
                <HiOutlinePhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  maxLength={11}
                  {...register("phone_number", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^\d{11}$/,
                      message: "Must be exactly 11 digits",
                    },
                  })}
                  className={`w-full pl-10 pr-3 py-2.5 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500
                    ${errors.phone_number ? "border-red-500" : "border-gray-300"}`}
                  placeholder="01XXXXXXXXX"
                />
              </div>
              {errors.phone_number && (
                <p className="text-xs text-red-500 mt-1">{errors.phone_number.message}</p>
              )}
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <div className="relative">
                <HiOutlineChat className="absolute left-3 top-3 text-gray-400" />
                <textarea
                  rows={5}
                  {...register("comment", { required: "Message is required" })}
                  className={`w-full pl-10 pr-3 py-2.5 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500
                    ${errors.comment ? "border-red-500" : "border-gray-300"}`}
                  placeholder="Write your message..."
                />
              </div>
              {errors.comment && (
                <p className="text-xs text-red-500 mt-1">{errors.comment.message}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-lg transition disabled:opacity-60"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
