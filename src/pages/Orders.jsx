import { useEffect, useState } from 'react';
import OrderCard from '../component/Orders/OrderCard';
import authApiClient from '../services/auth_apiClient';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    authApiClient.get("/orders/")
    .then((res) => {
      setOrders(res.data)
    })
  }, [])

  const handleCancelOrder = async(orderId) => {
    try{
      const response = await authApiClient.post(`/orders/${orderId}/cancel/`);
      if(response.status === 200) {
        setOrders((prev) => prev.map((order) => order.id === orderId ? {...order, status:"Canceled"} : order))
      }
      console.log("Order cancel done");
    }catch(error) {
      console.log(error);
    }
  }
    return (
        <div className='container mx-auto py-8 px-4'>
            <h1 className='text-2xl font-bold mb-6'>Order details</h1>   
            {orders.map((order) => (
                <OrderCard key={order.id} order={order} onCancel={handleCancelOrder}/>
            ))}
        </div>
    );
};

export default Orders;