import { useEffect, useState } from "react";
import apiClient from "../../services/api-client";
import FlowerList from "./FlowerList";

const ShopPage = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        apiClient.get("/flowers")
        .then((res) => setProducts(res.data.results))
        .catch((err) => console.log(err))
        .finally(() => setLoading(false))
    }, [])

    return (
        <div>
            <FlowerList products={products} loading={loading}/>
        </div>
    );
};

export default ShopPage;