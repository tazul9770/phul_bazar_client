const ProfileForm = ({ register, errors, isEditing }) => {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* First Name */}
      <div className="flex flex-col">
        <label htmlFor="first_name" className="mb-1 text-sm font-medium text-gray-700">
          First Name<span className="text-red-500">*</span>
        </label>
        <input
          id="first_name"
          type="text"
          placeholder="Enter your first name"
          className="input input-bordered bg-base-200 w-full transition focus:outline-none focus:ring-2 focus:ring-primary"
          disabled={!isEditing}
          {...register("first_name", { required: "First name is required" })}
        />
        {errors.first_name && (
          <p className="mt-1 text-sm text-red-500">{errors.first_name.message}</p>
        )}
      </div>

      {/* Last Name */}
      <div className="flex flex-col">
        <label htmlFor="last_name" className="mb-1 text-sm font-medium text-gray-700">
          Last Name
        </label>
        <input
          id="last_name"
          type="text"
          placeholder="Enter your last name"
          className="input input-bordered bg-base-200 w-full transition focus:outline-none focus:ring-2 focus:ring-primary"
          disabled={!isEditing}
          {...register("last_name")}
        />
      </div>

      {/* Email */}
      <div className="flex flex-col md:col-span-2">
        <label htmlFor="email" className="mb-1 text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="your@email.com"
          className="input input-bordered bg-base-200 w-full opacity-80 cursor-not-allowed"
          disabled
          {...register("email")}
        />
      </div>

      {/* Address */}
      <div className="flex flex-col md:col-span-2">
        <label htmlFor="address" className="mb-1 text-sm font-medium text-gray-700">
          Address
        </label>
        <input
          id="address"
          type="text"
          placeholder="1234, Dhaka, Mirpur"
          className="input input-bordered bg-base-200 w-full transition focus:outline-none focus:ring-2 focus:ring-primary"
          disabled={!isEditing}
          {...register("address")}
        />
      </div>

      {/* Phone Number */}
      <div className="flex flex-col md:col-span-2">
        <label htmlFor="phone_num" className="mb-1 text-sm font-medium text-gray-700">
          Phone Number
        </label>
        <input
          id="phone_num"
          type="tel"
          placeholder="+8801943563..."
          disabled={!isEditing}
          className="input input-bordered bg-base-200 w-full transition focus:outline-none focus:ring-2 focus:ring-primary"
          {...register("phone_num")}
        />
      </div>
    </div>
  );
};

export default ProfileForm;
