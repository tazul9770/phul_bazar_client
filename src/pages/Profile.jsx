import { useEffect, useState } from "react";
import ProfileForm from "../component/profile/ProfileForm";
import { useForm } from "react-hook-form";
import ProfileEditButton from "../component/profile/ProfileEditButton";
import PassChangeForm from "../component/profile/PassChangeForm";
import useAuthContext from "../hooks/useAuthContext";
import ErrorAlert from "../ErrorAlert";

const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const {user, updateUserProfile, changePassword, errorMsg,successMsg} = useAuthContext();

    const {
        register, 
        handleSubmit,
        watch,
        setValue,
        formState:{errors, isSubmitting},
    } = useForm();

    useEffect(() => {
        Object.keys(user).forEach((key) => setValue(key, user[key]))
    }, [user, setValue])

    const onSubmit = async(data) => {
        try{
            const profilePayLoad = {
                email:data.email,
                first_name:data.first_name,
                last_name:data.last_name,
                address:data.address,
                phone_num:data.phone_num
            }

            await updateUserProfile(profilePayLoad)
            //password change
            if(data.current_password && data.new_password) {
                changePassword({new_password:data.new_password, current_password:data.current_password})
            }
        }catch(error) {
            console.log(error);
        }
    }

    return (
        <div className="card w-full max-w-3xl bg-gray-100 shadow-md rounded-md">
            <div className="card-body">

                {errorMsg && <ErrorAlert error={errorMsg}/>}

                {successMsg && (
          <div role="alert" className="alert alert-success">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{successMsg}</span>
          </div>
        )}

                <h1 className="card-title text-2xl font-sans mb-3 text-center">Profile Information</h1>

                <form onSubmit={handleSubmit(onSubmit)}>

                    <ProfileForm 
                        register={register} 
                        errors={errors} 
                        isEditing={isEditing}
                    />

                    <PassChangeForm 
                        register={register} 
                        errors={errors} 
                        watch={watch} 
                        isEditing={isEditing}
                    />
                    
                    <ProfileEditButton isEditing={isEditing} setIsEditing={setIsEditing} isSubmitting={isSubmitting}/>
                </form>
            </div>
        </div>
    );
};

export default Profile;