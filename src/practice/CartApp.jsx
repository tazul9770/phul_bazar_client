import { Beer } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const CartApp = () => {

  const {register, handleSubmit} = useForm()
  const [cart, setCart] = useState([])

  //add cart item
  const addItem = (data) => {
    const existingItem = cart.find((item) => item.name === data.name)
    if(existingItem) {
      setCart(cart.map(item => item.name === data.name ? { ...item, quantity: item.quantity + 1 } : item))
    } else {
      setCart([...cart,{name:data.name, price:parseFloat(data.price), quantity:1}])
    }
  }


  // Increase quantity
  const increaseQuantity = (name) => {
    setCart(cart.map((item) => item.name === name ? {...item, quantity:item.quantity+1}:item))
  }

  // Decrease quantity
  const decreaseQuantity = (name) => {
    setCart(cart.map((item) => item.name === name ? {...item, quantity:item.quantity-1} : item).filter((item) => item.quantity > 0))
  }

  // Remove Item
  const removeItem = (name) => {
    setCart(cart.filter((item) => item.name !== name))
  }

  // Total price
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity , 0)

  return (
    <div className='w-1/2 mx-auto bg-gray-100 rounded-md p-6 shadow-md'>
        <form onSubmit={handleSubmit(addItem)} className='mb-4 space-y-3'>
          <input 
            {...register("name", {required:true})}
            type="text" 
            placeholder='Item Name'
            className='border focus:outline-none focus:ring-1 focus:ring-blue-500 p-2 rounded w-full'
          />
          <input 
            {...register("price", {required:true})}
            type="number" 
            placeholder='Item Price'
            className='border focus:outline-none focus:ring-1 focus:ring-blue-500 p-2 rounded w-full'
          />
          <button className='cursor-pointer px-3 py-2 bg-green-500 text-white rounded-md w-full'>
            Add Item
          </button>
        </form>

        {/* Cart Items List */}
        {cart.length > 0 ? (
          <div>
            {cart.map((item) => (
              <div key={item.name} className='flex justify-between items-center bg-white p-2 rounded-md mb-2'>
                <p className='font-semibold'>{item.name}</p>
                <p className='text-sm text-gray-600'>{(item.price * item.quantity).toFixed(2)}</p>
                <div className='flex items-center'>
                  <button onClick={() => decreaseQuantity(item.name)} className='bg-orange-500 px-2 py-1 rounded text-white cursor-pointer'>-</button>
                  <span className='mx-2'>{item.quantity}</span>
                  <button onClick={() => increaseQuantity(item.name)} className='bg-blue-500 px-2 py-1 rounded text-white cursor-pointer'>+</button>
                </div>
                <button onClick={() => removeItem(item.name)} className='cursor-pointer'><Beer /></button>
              </div>
            ))}
            <div className='mt-4 font-bold text-lg'>
              Total: ${totalPrice.toFixed(2)}
            </div>
          </div>
        ): (
          <p>No Cart Items</p>
        )}

    </div>
  );
};

export default CartApp;