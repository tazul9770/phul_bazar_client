import {
  FiPackage,
  FiShoppingCart,
  FiStar,
  FiUsers,
  FiTag
} from "react-icons/fi";
import Card from "../component/dashboard/Card";
import Order from "../component/dashboard/Order";
import { useEffect, useState } from "react";
import authApiClient from "../services/auth_apiClient";
import useAuthContext from "../hooks/useAuthContext";
import apiClient from "../services/api-client";

export default function Dashboard() {
  const [totalUser, setTotalUser] = useState([]);
  const [orders, setOrders] = useState([]);
  const [flower, setFlower] = useState([]);
  const [categories, setCategories] = useState([]);

  const {user} = useAuthContext();

  useEffect(() => {
    apiClient.get("/category/").then((res) => setCategories(res.data));
  }, []);

  useEffect(() => {
    authApiClient.get("/flowers/")
    .then((res) => {
      setFlower(res.data)
    })
  }, [])

  useEffect(() => {
    authApiClient.get("/orders/")
    .then((res) => {
      setOrders(res.data)
    })
  }, [])

  useEffect(() => {
    authApiClient.get("/auth/users/")
    .then((res) => {
      setTotalUser(res.data)
    })
  }, [])
  
  return (
    <div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card icon={FiPackage} title="Total Flowers" value={flower.count}/>
            <Card icon={FiShoppingCart} title="Total Orders" value={orders.length}/>
            {user?.is_staff ? (
              <Card icon={FiUsers} title="Total Users" value={totalUser.length}/>
            ) : (
              <Card icon={FiTag} title="Total Categories" value={categories.length}/>
            )}
            <Card icon={FiStar} title="Average Rating" value="5.9"/>
          </div>
          <Order/>
    </div>
  );
}