import { useEffect, useState } from 'react';
import OrderCard from '../component/Orders/OrderCard';
import authApiClient from '../services/auth_apiClient';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await authApiClient.get("/orders/");
      setOrders(res.data.results);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  fetchOrders();
}, []);


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
            {loading && (
              <p className='text-center text-xl mb-4'>Loading orders...</p>
            )}  
            {orders.map((order) => (
                <OrderCard key={order.id} order={order} onCancel={handleCancelOrder}/>
            ))}
        </div>
    );
};

export default Orders;