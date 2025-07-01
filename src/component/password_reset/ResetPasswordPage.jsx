// src/components/ResetPasswordPage.js
import { useParams, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useState } from "react";
import apiClient from "../../services/api-client";

const ResetPasswordPage = () => {
  const { uid, token } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await apiClient.post("/auth/users/reset_password_confirm/", {
        uid,
        token,
        new_password: data.new_password,
      });
      setMessage("✅ Password reset successfully. Redirecting to login...");
      setTimeout(() => navigate("/login"), 3000);
    } catch {
      setError("❌ Invalid or expired token.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200 px-4">
      <div className="card w-full max-w-md bg-base-100 shadow-lg p-6">
        <h2 className="text-xl font-semibold text-center mb-4">Set New Password</h2>

        {message && <div className="alert alert-success">{message}</div>}
        {error && <div className="alert alert-error">{error}</div>}

        {!message && (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input
              type="password"
              placeholder="New Password"
              {...register("new_password", { required: "Password is required" })}
              className="input input-bordered w-full"
            />
            {errors.new_password && (
              <p className="text-sm text-red-500">{errors.new_password.message}</p>
            )}

            <input
              type="password"
              placeholder="Confirm Password"
              {...register("confirm_password", {
                required: "Please confirm password",
                validate: (val) =>
                  val === watch("new_password") || "Passwords do not match",
              })}
              className="input input-bordered w-full"
            />
            {errors.confirm_password && (
              <p className="text-sm text-red-500">{errors.confirm_password.message}</p>
            )}

            <button className="btn btn-primary w-full" type="submit">
              Reset Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ResetPasswordPage;
