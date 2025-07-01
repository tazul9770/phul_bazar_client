import { useForm } from "react-hook-form";
import apiClient from "../../services/api-client";
import { useState } from "react";

const RequestResetForm = () => {
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const {register, handleSubmit, formState:{errors}} = useForm();

    const onSubmit = async(data) => {
        setSuccessMsg("")
        try{
            await apiClient.post("/auth/users/reset_password/", {email:data.email})
            setSuccessMsg("✅ Reset email sent! Please check your inbox.");
        }catch(error) {
            console.log(error);
            setErrorMsg(error)
        }
    }
    return (
            <div className="flex items-center justify-center min-h-screen bg-base-200">
            <div className="card w-full max-w-md bg-base-100 shadow-lg p-6">
                {/* Messages */}
                        {errorMsg && <ErrorAlert error={errorMsg} />}
                        {successMsg && (
                          <div role="alert" className="alert alert-success">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span>{successMsg}</span>
                          </div>
                        )}

                <h2 className="text-2xl font-semibold text-center mb-4">Reset Password</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <input 
                        type="email"
                        placeholder="Enter your email"
                        {...register("email", {required:"Email is required"})} 
                        className="input input-bordered w-full bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary mb-4"
                    />
                    {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}

                    <button type="submit" className="px-3 py-2 bg-blue-500 text-white rounded-md w-full cursor-pointer hover:bg-blue-600">Send Reset Link</button>
                </form>
            </div>
        </div>
    );
};

export default RequestResetForm;