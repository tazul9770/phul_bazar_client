import { useState } from "react";
import { Link } from "react-router";

const PassChangeForm = ({ register, errors, watch, isEditing}) => {

    const [passSecOpen, setPassSecOpen] = useState(false);
    const [showPass, setShowPass] = useState(false)

  return (
    <div>
        {/* Change pass button */}
        <button 
            type="button"
            className="btn btn-link justify-start text-primary font-semibold mt-5"
            onClick={() => {
              setPassSecOpen(!passSecOpen)
            }}
        >
            Change Password
        </button>

        {passSecOpen && (
            <div className="mt-6 pl-4 border-primary/30 space-y-6">
      {/* Current Password */}
      <div className="form-control w-full">
        <label className="label font-medium text-gray-700">Current Password</label>
        <input
          type={showPass ? "text" : "password"}
          className="input input-bordered w-full bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary"
          disabled={!isEditing}
          {...register("current_password", {
            required: "Current password is required",
          })}
        />
        {errors.current_password && (
          <p className="text-sm text-red-500 mt-1">
            {errors.current_password.message}
          </p>
        )}
      </div>

      {/* New Password */}
      <div className="form-control w-full">
        <label className="label font-medium text-gray-700">New Password</label>
        <input
          type={showPass ? "text" : "password"}
          className="input input-bordered w-full bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary"
          disabled={!isEditing}
          {...register("new_password", {
            required: "New password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
        />
        {errors.new_password && (
          <p className="text-sm text-red-500 mt-1">
            {errors.new_password.message}
          </p>
        )}
      </div>

      {/* Confirm New Password */}
      <div className="form-control w-full">
        <label className="label font-medium text-gray-700">Confirm New Password</label>
        <input
          type={showPass ? "text" : "password"}
          className="input input-bordered w-full bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary"
          disabled={!isEditing}
          {...register("confirm_new_password", {
            validate: (value) =>
              value === watch("new_password") || "Passwords do not match",
          })}
        />
        {errors.confirm_new_password && (
          <p className="text-sm text-red-500 mt-1">
            {errors.confirm_new_password.message}
          </p>
        )}
      </div>

      {/* Show password */}
      {isEditing && (
        <div className="form-control">
            <label className="label cursor-pointer">
                <span className="text-md">Show password</span>
                <input type="checkbox" checked={showPass} onChange={() => setShowPass(!showPass)}/>
            </label>
        </div>
      )}
      {/* Forgot password */}
        {isEditing && (
            <div>
              <Link to="forgot_password" className="text-blue-500 hover:underline text-sm">
                Forgot password?
              </Link>
            </div>
        )}

    </div>
    
        )}
        
    </div>
  );
};

export default PassChangeForm;
