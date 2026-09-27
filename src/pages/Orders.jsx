import { useEffect, useState } from 'react';
import OrderCard from '../component/Orders/OrderCard';
import authApiClient from '../services/auth_apiClient';

const PAGE_SIZE = 10;

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await authApiClient.get(`/orders/?page=${page}`);
        setOrders(res.data.results);
        setCount(res.data.count);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [page]);

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

  const totalPages = Math.ceil(count / PAGE_SIZE);

    return (
        <div className='container mx-auto py-8 px-4'>
            <h1 className='text-2xl font-bold mb-6'>Order details</h1>
            {loading && (
              <p className='text-center text-xl mb-4'>Loading orders...</p>
            )}
            {orders.map((order, index) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  onCancel={handleCancelOrder}
                  isLast={index === orders.length - 1}
                  currentPage={page}
                  totalPages={totalPages}
                  onPageChange={setPage}
                />
            ))}
        </div>
    );
};

export default Orders;
