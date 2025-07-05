import { useCallback, useEffect, useState } from "react";
import authApiClient from "../services/auth_apiClient";

const useCart = () => {
    const [authToken] = useState(
        () => JSON.parse(localStorage.getItem("authTokens")).access
     );
     const [cart, setCart] = useState(null);
     const [cartId, setCartId] = useState(() => localStorage.getItem("cartId"));
     const [loading, setLoading] = useState(false)

    // Create cart
    const createOrGetCart = useCallback(async() => {
        setLoading(true)
        try{
            const response = await authApiClient.post("/carts/")
            if(!cartId) {
                localStorage.setItem("cartId", response.data.id)
                setCartId(response.data.id)
            }
            setCart(response.data)
        } catch(error) {
            console.log("Catch errro",error);
        }finally{
            setLoading(false)
        }
    }, [cartId, authToken])

    // addCartItems
    const addCartItems = useCallback(async (flower_id, quantity) => {
        setLoading(true)
    let currentCartId = cartId;

    if (!currentCartId) {
        currentCartId = await createOrGetCart();
    }

    if (!currentCartId) {
        console.log("No cart ID found.");
        return;
    }

    try {
        const response = await authApiClient.post(
            `/carts/${currentCartId}/items/`,
            { flower_id, quantity },
        );
        console.log("add", response.data);
        return response.data;
    } catch (error) {
        console.log("Add cart item error", error);
    }finally{
        setLoading(false)
    }
}, [cartId, createOrGetCart])

    // Cart item quantity update

    const updateCartItemQuantity = useCallback(async(itemId, quantity) =>{
        try{
            await authApiClient.patch(`carts/${cartId}/items/${itemId}/`, {quantity})
        } catch(error) {
            console.log("Error updating cart items", error);
        }
    }, [cartId])

    // delete cart items
    const deleteCartItems = useCallback(async(itemId) => {
        try{
            await authApiClient.delete(`/carts/${cartId}/items/${itemId}/`)
        }catch(error) {
            console.log(error);
        }
    }, [cartId])

    useEffect(() => {
    const initializeCart = async () => {
      setLoading(true);
      await createOrGetCart();
      setLoading(false);
    };
    initializeCart();
  }, [createOrGetCart]);

    return {cart, loading, createOrGetCart, addCartItems, updateCartItemQuantity, deleteCartItems}
};

export default useCart;