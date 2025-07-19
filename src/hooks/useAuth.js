import { useEffect, useState } from "react";
import apiClient from "../services/api-client";

const useAuth = () => {

    const [user, setUser] = useState(null);
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("")

    const getToken = () => {
        const token = localStorage.getItem("authTokens");
        return token ? JSON.parse(token) : null; 
    }

    const [authToken, setAuthToken] = useState(getToken());

    useEffect(() => {
        if (authToken) fetchUserProfile()
    }, [authToken])

    const handleAPIError = (error, defaultMsg = "Something went wrong!") => {
      if (error.response && error.response.data) {
        const errorMessage = Object.values(error.response.data)
          .flat()
          .join("\n");
        setErrorMsg(errorMessage);
        return { success: false, message: errorMessage };
      }
      setErrorMsg(defaultMsg);
      return {
        success: false,
        message: defaultMsg
      };
    }

    //Fetch user profile
    const fetchUserProfile = async () => {
        try{
            const response = await apiClient.get("auth/users/me", {
                headers:{Authorization:`JWT ${authToken?.access}`}
            })
            setUser(response.data);
        }catch(error) {
            console.log("Error fetching user", error);
        }
    }

    //Update User profile
    const updateUserProfile = async(data) => {
      setErrorMsg("")
      setSuccessMsg("")
      try{
        await apiClient.put("/auth/users/me/", data, {headers : {Authorization : `JWT ${authToken?.access}`}})
        setSuccessMsg("Profile updated successfully")
      }catch(error) {
        return handleAPIError(error)
      }
    }

    // Change password
    const changePassword = async(data) => {
      setErrorMsg("")
      setSuccessMsg("")
      try{
        await apiClient.post("/auth/users/set_password/", data, {headers : {Authorization : `JWT ${authToken?.access}`}})
        setSuccessMsg("Password changed successfully.")
      }catch(error) {
        return handleAPIError(error)
      }
    }

    // Login user
    const loginUser = async(userData) => {
        setErrorMsg("");
        try{
            const response = await apiClient.post("/auth/jwt/create/", userData);
            setAuthToken(response.data)
            localStorage.setItem("authTokens", JSON.stringify(response.data))
            // after login set user
            await fetchUserProfile()
        } catch(error) {
            setErrorMsg(error.response.data?.detail);
        }
    }

    // Register User
  const registerUser = async (userData) => {
    setErrorMsg("");
    try {
      await apiClient.post("/auth/users/", userData);
      return {
        success: true,
        message:
          "Registration successfull. Check your email to activate your account.",
      };
    } catch (error) {
      return handleAPIError(error, "Registration failed. Try again!")
    }
  };

    //Logout User
    const logoutUser = () => {
        setAuthToken(null)
        setUser(null)
        localStorage.removeItem("authTokens")
        localStorage.removeItem("cartId")
    };

    return {user, errorMsg,successMsg ,loginUser, registerUser, logoutUser, updateUserProfile, changePassword}

}
export default useAuth;