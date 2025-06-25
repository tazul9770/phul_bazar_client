import { useEffect, useState } from "react"
import apiClient from "../services/api-client";

const useFetchProduct = (currentPage, priceRange, selectedCategory, searchQuery, sortOrder) => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [totalPage, setTotalPage] = useState(0)
    useEffect(() => {
        const fetchFlower = async() => {
                const url = `/flowers/?category_id=&price__gt=${priceRange[0]}&price__lt=${priceRange[1]}&page=${currentPage}&category_id=${selectedCategory}&search=${searchQuery}&ordering=${sortOrder}`
                setLoading(true)
                try{
                    const response = await apiClient.get(url)
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
    }, [currentPage, priceRange, selectedCategory, searchQuery, sortOrder])
    return {products, loading, totalPage}
}

export default useFetchProduct;