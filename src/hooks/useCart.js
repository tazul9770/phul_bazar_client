import { useCallback,useEffect,useState } from "react";
import authApiClient from "../services/auth_apiClient";

const useCart=()=>{
  const [cart,setCart]=useState(null);
  const [cartId,setCartId]=useState(()=>localStorage.getItem("cartId")||"");
  const [loading,setLoading]=useState(false);

  const fetchCart=useCallback(async(id)=>{
    if(!id) return null;
    try{
      const response=await authApiClient.get(`/carts/${id}/`);
      setCart(response.data);
      return response.data;
    }catch(error){
      console.error("Fetch cart error:",error);
      throw error;
    }
  },[]);

  const createOrGetCart = useCallback(async()=>{
    try{
      const response=await authApiClient.post("/carts/");
      const data=response.data;
      localStorage.setItem("cartId",data.id);
      setCartId(data.id);
      setCart(data);
      return data.id;
    }catch(error){
      console.error("Create cart error:",error);
      throw error;
    }
  },[]);

  const addCartItems=useCallback(async(flower_id,quantity)=>{
    setLoading(true);
    try{
      let currentCartId=cartId||localStorage.getItem("cartId");
      if(!currentCartId) currentCartId=await createOrGetCart();
      if(!currentCartId) throw new Error("Cart ID not found");

      await authApiClient.post(`/carts/${currentCartId}/items/`,{flower_id,quantity});
      await fetchCart(currentCartId);
      return true;
    }catch(error){
      console.error("Add cart item error:",error);
      throw error;
    }finally{
      setLoading(false);
    }
  },[cartId,createOrGetCart,fetchCart]);

  const updateCartItemQuantity=useCallback(async(itemId,quantity)=>{
    try{
      await authApiClient.patch(`/carts/${cartId}/items/${itemId}/`,{quantity});
      await fetchCart(cartId);
    }catch(error){
      console.error("Update cart error:",error);
      throw error;
    }
  },[cartId,fetchCart]);

  const deleteCartItems=useCallback(async(itemId)=>{
    try{
      await authApiClient.delete(`/carts/${cartId}/items/${itemId}/`);
      await fetchCart(cartId);
    }catch(error){
      console.error("Delete cart error:",error);
      throw error;
    }
  },[cartId,fetchCart]);

  useEffect(()=>{
    const initializeCart=async()=>{
      try{
        setLoading(true);
        const savedCartId=localStorage.getItem("cartId");
        if(savedCartId){
          setCartId(savedCartId);
          await fetchCart(savedCartId);
        }else{
          await createOrGetCart();
        }
      }catch(error){
        console.error("Cart initialization error:",error);
      }finally{
        setLoading(false);
      }
    };
    initializeCart();
  },[createOrGetCart,fetchCart]);

  return {cart,loading,cartId,createOrGetCart,addCartItems,updateCartItemQuantity,deleteCartItems};
};

export default useCart;
