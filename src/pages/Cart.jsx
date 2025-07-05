import { Suspense, useEffect, useState } from 'react';
import useCartContext from '../hooks/useCartContext';
import CartItemList from '../component/cart/CartItemsList';
import CartSummary from '../component/cart/CartSummary';

const Cart = () => {
  const {
    cart,
    loading,
    createOrGetCart,
    updateCartItemQuantity,
    deleteCartItems,
  } = useCartContext();

  const [localCart, setLocalCart] = useState(cart);

  // Fetch cart if not already loaded
  useEffect(() => {
    if (!cart && !loading) {
      createOrGetCart();
    }
  }, [cart, loading, createOrGetCart]);

  // Sync localCart with global cart when updated
  useEffect(() => {
    setLocalCart(cart);
  }, [cart]);

  // Update item quantity
  const handleUpdateQuantity = async (itemId, newQuantity) => {
    const prevCart = localCart;

    setLocalCart((prev) => {
      const updatedItems = prev.items.map((item) =>
        item.id === itemId
          ? {
              ...item,
              quantity: newQuantity,
              total_price: item.flower.price * newQuantity,
            }
          : item
      );

      const newTotalPrice = updatedItems.reduce(
        (sum, item) => sum + item.total_price,
        0
      );

      return { ...prev, items: updatedItems, total_price: newTotalPrice };
    });

    try {
      await updateCartItemQuantity(itemId, newQuantity);
    } catch (error) {
      console.error(error);
      setLocalCart(prevCart); // rollback if error
    }
  };

  // Remove item from cart
  const handleRemoveItem = async (itemId) => {
    setLocalCart((prev) => {
      const updatedItems = prev.items.filter((item) => item.id !== itemId);
      const newTotalPrice = updatedItems.reduce(
        (sum, item) => sum + item.total_price,
        0
      );
      return { ...prev, items: updatedItems, total_price: newTotalPrice };
    });

    try {
      await deleteCartItems(itemId);
    } catch (error) {
      console.error(error);
    }
  };

  // Loading / empty cart fallback
  if (loading) return <p></p>;
  if (!localCart) return <p>No Cart Found</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Suspense fallback={<p>Loading items...</p>}>
            <CartItemList
              items={localCart.items}
              handleUpdateQuantity={handleUpdateQuantity}
              handleRemoveItem={handleRemoveItem}
            />
          </Suspense>
        </div>
        <div>
          <CartSummary
            totalPrice={localCart.total_price}
            itemCount={localCart.items.length}
          />
        </div>
      </div>
    </div>
  );
};

export default Cart;
