const ProfileEditButton = ({ isEditing, setIsEditing, isSubmitting }) => {
  return (
    <div className="flex justify-end mt-8">
      {isEditing ? (
        <div className="space-x-3">
            <button
                type="submit"
                className="bg-blue-600 cursor-pointer hover:bg-blue-800 text-white font-medium px-6 py-2 rounded-lg shadow transition duration-200 mb-4"
                disabled={isSubmitting}
             >
                 {isSubmitting ? "Saving" : "Save Changes"}
            </button>

            <button
                type="submit"
                className="bg-blue-600 cursor-pointer hover:bg-blue-800 text-white font-medium px-6 py-2 rounded-lg shadow transition duration-200"
                onClick={() => setIsEditing(false)}
            >
                Cancel
            </button>
        </div>
      ) : (
        <button
        type="button"
        className="bg-blue-600 cursor-pointer hover:bg-blue-800 text-white font-medium px-6 py-2 rounded-lg shadow transition duration-200"
        onClick={() => setIsEditing(true)}
      >
        Edit Profile
      </button>
      )}
    </div>
  );
};

export default ProfileEditButton;
