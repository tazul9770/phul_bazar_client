import { useState } from "react";
import authApiClient from "../services/auth_apiClient";
import useAuthContext from "../hooks/useAuthContext";

const Users = () => {
    const [users, setUsers] = useState([]);

    const {user} = useAuthContext();
    console.log(user);

    const fetchUser = async() => {
        try{
            const res = await authApiClient.get("/auth/users/")
            console.log(res.data);
        }catch(err){
            console.log(err);
        }
    }

    return (
        <div>
            <button onClick={fetchUser}>click</button>
        </div>
    );
};

export default Users;