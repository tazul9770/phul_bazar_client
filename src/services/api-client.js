import axios from "axios"

export default axios.create({
    baseURL : 'https://phul-bazar.vercel.app/api/v1'
})