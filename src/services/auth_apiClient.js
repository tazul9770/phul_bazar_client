import axios from "axios"

const authApiClient = axios.create({
    baseURL : 'https://phul-bazar.vercel.app/api/v1'
})

export default authApiClient;

authApiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("authTokens")
        if (token) {
            config.headers.Authorization = `JWT ${JSON.parse(token).access}`
        }
        return config
    },
    (error) => Promise.reject(error)
)