import axios from "axios"

const apiClient = axios.create({
    baseURL : 'https://phul-bazar.vercel.app/api/v1'
})

export default apiClient;
