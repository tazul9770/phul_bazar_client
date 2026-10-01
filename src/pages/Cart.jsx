import { Suspense,useEffect } from "react";
import { FaShoppingBag } from "react-icons/fa";
import useCartContext from "../hooks/useCartContext";
import CartItemList from "../component/cart/CartItemsList";
import CartSummary from "../component/cart/CartSummary";

const Cart=()=>{
  const {cart,loading,cartId,createOrGetCart,updateCartItemQuantity,deleteCartItems}=useCartContext();

  useEffect(()=>{
    if(!cart&&!loading) createOrGetCart();
  },[cart,loading,createOrGetCart]);

  if(loading) return <div className="flex min-h-[60vh] items-center justify-center"><div className="text-center"><span className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-pink-200 border-t-pink-600"></span><p className="mt-4 font-medium text-gray-500">Loading your cart...</p></div></div>;

  if(!cart) return <div className="flex min-h-[60vh] items-center justify-center text-gray-500">No cart found.</div>;

  const items=cart.items||[];

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-100 text-pink-600"><FaShoppingBag/></div>
          <div><h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Shopping Cart</h1><p className="text-sm text-gray-500">{items.length} {items.length===1?"item":"items"} in your cart</p></div>
        </div>

        {items.length===0 ? (
          <div className="rounded-3xl bg-white px-6 py-20 text-center shadow-sm">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-pink-50 text-3xl text-pink-500">🛒</div>
            <h2 className="mt-5 text-xl font-bold text-gray-800">Your cart is empty</h2>
            <p className="mt-2 text-sm text-gray-500">Looks like you haven't added anything to your cart yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
            <Suspense fallback={<div className="p-10 text-center">Loading items...</div>}>
              <CartItemList items={items} handleUpdateQuantity={updateCartItemQuantity} handleRemoveItem={deleteCartItems}/>
            </Suspense>
            <CartSummary totalPrice={cart.total_price||0} itemCount={items.length} cartId={cartId}/>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
