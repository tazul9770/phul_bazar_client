import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FiMail, FiUser, FiMapPin, FiPhone, FiLock, FiLoader, FiCheckCircle } from "react-icons/fi";
import useAuthContext from "../hooks/useAuthContext";
import ErrorAlert from "../ErrorAlert";

const fieldClass = (hasError) =>
  `w-full rounded-xl border bg-white py-2.5 pl-10 pr-4 text-sm shadow-sm transition focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400 ${
    hasError
      ? "border-red-400 focus:ring-red-200"
      : "border-gray-200 focus:border-pink-400 focus:ring-pink-100"
  }`;

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const { registerUser, errorMsg } = useAuthContext();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    if (loading) return; // guard: ignore any accidental double-fire
    setLoading(true);
    delete data.confirm_password;
    try {
      const response = await registerUser(data);
      if (response.success) {
        setSuccessMsg(response.message);
        setTimeout(() => navigate("/login"), 3000);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error("Registration error:", error);
      setLoading(false); 
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 px-4 py-12">
      <div className="w-full max-w-3xl rounded-2xl bg-white p-8 shadow-xl shadow-pink-900/5 ring-1 ring-pink-100 sm:p-10">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Create an account</h2>
          <p className="mt-2 text-sm text-gray-500">
            Join phul_bazar and get your flowers delivered fresh
          </p>
        </div>

        {errorMsg && (
          <div className="mb-5">
            <ErrorAlert error={errorMsg} />
          </div>
        )}

        {successMsg && (
          <div
            role="alert"
            className="mb-5 flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700"
          >
            <FiCheckCircle className="shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
          {/* Email */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Email</label>
            <div className="relative">
              <FiMail className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                disabled={loading}
                placeholder="you@example.com"
                className={fieldClass(errors.email)}
                {...register("email", { required: "Email is required" })}
              />
            </div>
            {errors.email && <p className="mt-1.5 text-xs font-medium text-red-500">{errors.email.message}</p>}
          </div>

          {/* First Name & Last Name */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">First name</label>
              <div className="relative">
                <FiUser className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  disabled={loading}
                  placeholder="John"
                  className={fieldClass(errors.first_name)}
                  {...register("first_name", { required: "First name is required" })}
                />
              </div>
              {errors.first_name && (
                <p className="mt-1.5 text-xs font-medium text-red-500">{errors.first_name.message}</p>
              )}
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Last name</label>
              <div className="relative">
                <FiUser className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  disabled={loading}
                  placeholder="Doe"
                  className={fieldClass(errors.last_name)}
                  {...register("last_name", { required: "Last name is required" })}
                />
              </div>
              {errors.last_name && (
                <p className="mt-1.5 text-xs font-medium text-red-500">{errors.last_name.message}</p>
              )}
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Address</label>
            <div className="relative">
              <FiMapPin className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                disabled={loading}
                placeholder="123 Main Street"
                className={fieldClass(errors.address)}
                {...register("address")}
              />
            </div>
          </div>

          {/* Phone Number */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Phone number</label>
            <div className="relative">
              <FiPhone className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="tel"
                disabled={loading}
                placeholder="01XXXXXXXXX"
                className={fieldClass(errors.phone_num)}
                {...register("phone_num", { required: "Phone number is required" })}
              />
            </div>
            {errors.phone_num && (
              <p className="mt-1.5 text-xs font-medium text-red-500">{errors.phone_num.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <FiLock className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                disabled={loading}
                placeholder="••••••••"
                className={fieldClass(errors.password)}
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 8, message: "Password must be at least 8 characters" },
                })}
              />
            </div>
            {errors.password && (
              <p className="mt-1.5 text-xs font-medium text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Confirm password</label>
            <div className="relative">
              <FiLock className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                disabled={loading}
                placeholder="••••••••"
                className={fieldClass(errors.confirm_password)}
                {...register("confirm_password", {
                  required: "Confirm your password",
                  validate: (value) => value === watch("password") || "Passwords do not match",
                })}
              />
            </div>
            {errors.confirm_password && (
              <p className="mt-1.5 text-xs font-medium text-red-500">{errors.confirm_password.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            aria-disabled={loading}
            aria-busy={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-pink-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-pink-600/20 transition hover:bg-pink-700 disabled:cursor-not-allowed disabled:bg-pink-300 disabled:shadow-none"
          >
            {loading ? (
              <>
                <FiLoader className="animate-spin" />
                Registering...
              </>
            ) : (
              "Register"
            )}
          </button>

          {/* Login Link */}
          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-pink-600 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
