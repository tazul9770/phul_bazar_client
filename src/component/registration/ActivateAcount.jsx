import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import ErrorAlert from "../../ErrorAlert";
import apiClient from "../../services/api-client";

const ActivateAccount = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const { uid, token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    apiClient
      .post("/auth/users/activation/", { uid, token })
      .then(() => {
        setMessage("🎉 Your account has been activated successfully!");
        setTimeout(() => navigate("/login"), 3000);
      })
      .catch(() => {
        setError("❌ Something went wrong. Please check your activation link.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [uid, token, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200 px-4">
      <div className="card w-full max-w-md bg-base-100 shadow-lg p-6">
        <h1 className="text-2xl font-semibold text-center mb-4">Account Activation</h1>

        {loading && (
          <div className="flex justify-center py-6">
            <span className="loading loading-spinner text-primary"></span>
          </div>
        )}

        {!loading && message && (
          <div className="alert alert-success">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{message}</span>
          </div>
        )}

        {!loading && error && (
          <ErrorAlert error={error} />
        )}

        {!loading && !message && !error && (
          <p className="text-center text-sm text-gray-500 mt-4">Awaiting activation response...</p>
        )}
      </div>
    </div>
  );
};

export default ActivateAccount;
