import { useEffect, useState } from "react"
import apiClient from "../services/api-client";

const useFetchProduct = (currentPage) => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [totalPage, setTotalPage] = useState(0)
    useEffect(() => {
        const fetchFlower = async() => {
                setLoading(true)
                try{
                    const response = await apiClient.get(`/flowers/?page=${currentPage}`)
                    const data = await response.data
                    setProducts(data.results)
                    setTotalPage(Math.ceil(data.count/data.results.length))
                }catch(error) {
                    console.log(error);
                }finally {
                    setLoading(false)
                }
            }
            fetchFlower()
    }, [currentPage])
    return {products, loading, totalPage}
}

export default useFetchProduct;