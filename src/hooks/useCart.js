import { useCallback,useEffect,useState } from "react";
import authApiClient from "../services/auth_apiClient";
import useAuthContext from "./useAuthContext";

const useCart=()=>{
  const {user}=useAuthContext();
  const [cart,setCart]=useState(null);
  const [cartId,setCartId]=useState("");
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

  const createOrGetCart=useCallback(async()=>{
    try{
      const response=await authApiClient.post("/carts/");
      const data=response.data;
      setCartId(data.id);
      setCart(data);
      localStorage.setItem(`cartId_${user.id}`,data.id);
      return data.id;
    }catch(error){
      console.error("Create cart error:",error);
      throw error;
    }
  },[user]);

  const addCartItems=useCallback(async(flower_id,quantity)=>{
    setLoading(true);
    try{
      let currentCartId=cartId;

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
    if(!cart) return;
    const previousCart=cart;

    setCart(currentCart=>{
      const items=currentCart.items.map(item=>
        item.id===itemId?{...item,quantity}:item
      );
      const total_price=items.reduce(
        (total,item)=>total+Number(item.flower.price)*item.quantity,
        0
      );
      return {...currentCart,items,total_price};
    });

    try{
      await authApiClient.patch(`/carts/${cartId}/items/${itemId}/`,{quantity});
    }catch(error){
      console.error("Update cart error:",error);
      setCart(previousCart);
      throw error;
    }
  },[cart,cartId]);

  const deleteCartItems=useCallback(async(itemId)=>{
    if(!cart) return;
    const previousCart=cart;

    setCart(currentCart=>({
      ...currentCart,
      items:currentCart.items.filter(item=>item.id!==itemId),
    }));

    try{
      await authApiClient.delete(`/carts/${cartId}/items/${itemId}/`);
    }catch(error){
      console.error("Delete cart error:",error);
      setCart(previousCart);
      throw error;
    }
  },[cart,cartId]);

  useEffect(()=>{
    if(!user){
      setCart(null);
      setCartId("");
      setLoading(false);
      return;
    }

    const initializeCart=async()=>{
      try{
        setLoading(true);

        const savedCartId=localStorage.getItem(`cartId_${user.id}`);

        if(savedCartId){
          setCartId(savedCartId);
          await fetchCart(savedCartId);
        }else{
          await createOrGetCart();
        }
      }catch(error){
        console.error("Cart initialization error:",error);
        setCart(null);
      }finally{
        setLoading(false);
      }
    };

    setCart(null);
    setCartId("");
    initializeCart();
  },[user,fetchCart,createOrGetCart]);

  return {cart,loading,cartId,createOrGetCart,addCartItems,updateCartItemQuantity,deleteCartItems};
};

export default useCart;
