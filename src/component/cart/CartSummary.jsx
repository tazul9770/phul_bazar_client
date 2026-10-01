import { useState } from "react";
import { FaArrowRight, FaCheckCircle, FaTruck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import authApiClient from "../../services/auth_apiClient";
import useAuthContext from "../../hooks/useAuthContext";

const CartSummary=({totalPrice,itemCount,cartId})=>{
  const [loading,setLoading]=useState(false);
  const [orderPlaced,setOrderPlaced]=useState(false);
  const {user}=useAuthContext();
  const navigate=useNavigate();

  const subtotal=Number(totalPrice)||0;
  const shipping=itemCount===0||subtotal<100?0:15;
  const tax=subtotal*0.1;
  const orderTotal=subtotal+shipping+tax;

  const createOrder=async()=>{
    if(!cartId||itemCount===0||user?.is_staff)return;

    setLoading(true);

    try{
      const response=await authApiClient.post("/orders/",{cart_id:cartId});

      if(response.status===201){
        localStorage.removeItem("cartId");
        setOrderPlaced(true);
        alert("Order created successfully");

        setTimeout(()=>{
          navigate("/dashboard/orders");
        },3000);
      }
    }catch(error){
      console.error("Order error:",error);
      alert("Unable to place order. Please try again.");
    }finally{
      setLoading(false);
    }
  };

  return (
    <div className="h-fit rounded-3xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7 lg:sticky lg:top-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>
        <FaTruck className="text-xl text-pink-500"/>
      </div>

      <div className="space-y-4 text-sm">
        <div className="flex justify-between text-gray-500">
          <span>Subtotal</span>
          <span className="font-semibold text-gray-800">${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-gray-500">
          <span>Shipping</span>
          <span className={`font-semibold ${shipping===0?"text-green-600":"text-gray-800"}`}>
            {shipping===0?"Free":`$${shipping.toFixed(2)}`}
          </span>
        </div>

        <div className="flex justify-between text-gray-500">
          <span>Estimated Tax</span>
          <span className="font-semibold text-gray-800">${tax.toFixed(2)}</span>
        </div>
      </div>

      <div className="my-6 border-t border-dashed border-gray-200"></div>

      <div className="flex items-center justify-between">
        <span className="text-base font-bold text-gray-900">Total</span>
        <span className="text-2xl font-extrabold text-pink-600">
          ${orderTotal.toFixed(2)}
        </span>
      </div>

      <button
        type="button"
        disabled={itemCount===0||loading||user?.is_staff||orderPlaced}
        onClick={createOrder}
        className={`mt-7 flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-bold text-white shadow-lg transition ${
          orderPlaced
            ?"bg-green-500"
            :"bg-pink-600 hover:bg-pink-700 hover:shadow-pink-200"
        } disabled:cursor-not-allowed disabled:opacity-60`}
      >
        {loading ? (
          <>
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
            Processing...
          </>
        ) : orderPlaced ? (
          <>
            <FaCheckCircle/>Order Placed
          </>
        ) : user?.is_staff ? (
          "Staff Cannot Order"
        ) : (
          <>
            Proceed to Checkout
            <FaArrowRight/>
          </>
        )}
      </button>

      {shipping===0&&subtotal>0&&(
        <p className="mt-4 text-center text-xs font-medium text-green-600">
          ✓ Free shipping applied
        </p>
      )}
    </div>
  );
};

export default CartSummary;
