import React from 'react';

const Cart = ({cartItems, onClear, onRemove}) => {
    return (
        <div>
            <ul className='m-5 list-disc'>
                {cartItems.map(item => (
                    <li onClick={() => onRemove(item)} key={item}>{item}</li>
                ))}
            </ul>
            <button onClick={onClear} className='m-4 px-3 py-2 bg-teal-500 text-white rounded-lg'>Click here</button>
        </div>
    );
};

export default Cart;