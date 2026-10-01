import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { FiMail, FiLock, FiLoader } from "react-icons/fi";
import useAuthContext from "../hooks/useAuthContext";
import ErrorAlert from "../ErrorAlert";
import { useState } from "react";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const { errorMsg, loginUser } = useAuthContext();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    if (loading) return; // guard: ignore any accidental double-fire
    setLoading(true);
    try {
      await loginUser(data);
      setTimeout(() => navigate("/"), 3000);
    } catch (error) {
      console.log("Login error", error);
      setLoading(false); // re-enable on failure so user can retry
    }
    // NOTE: on success we intentionally do NOT reset loading —
    // button stays disabled until navigation happens, so it can't be clicked again.
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 px-4 py-12">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl shadow-pink-900/5 ring-1 ring-pink-100 sm:p-10">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Welcome back</h2>
          <p className="mt-2 text-sm text-gray-500">
            Sign in to continue to your account
          </p>
        </div>

        {errorMsg && (
          <div className="mb-5">
            <ErrorAlert error={errorMsg} />
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-gray-700">
              Email
            </label>
            <div className="relative">
              <FiMail className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                id="email"
                type="email"
                placeholder="name@example.com"
                disabled={loading}
                className={`w-full rounded-xl border bg-white py-2.5 pl-10 pr-4 text-sm shadow-sm transition focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400 ${
                  errors.email
                    ? "border-red-400 focus:ring-red-200"
                    : "border-gray-200 focus:border-pink-400 focus:ring-pink-100"
                }`}
                {...register("email", { required: "Email is required" })}
              />
            </div>
            {errors.email && (
              <p className="mt-1.5 text-xs font-medium text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
            </div>
            <div className="relative">
              <FiLock className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                disabled={loading}
                className={`w-full rounded-xl border bg-white py-2.5 pl-10 pr-4 text-sm shadow-sm transition focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400 ${
                  errors.password
                    ? "border-red-400 focus:ring-red-200"
                    : "border-gray-200 focus:border-pink-400 focus:ring-pink-100"
                }`}
                {...register("password", { required: "Password is required" })}
              />
            </div>
            {errors.password && (
              <p className="mt-1.5 text-xs font-medium text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
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
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Bottom Link */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="font-medium text-pink-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
