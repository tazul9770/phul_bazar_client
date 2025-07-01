import {
  FiPackage,
  FiShoppingCart,
  FiStar,
  FiUsers
} from "react-icons/fi";
import Card from "../component/dashboard/Card";
import Order from "../component/dashboard/Order";

export default function Dashboard() {
  return (
    <div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card icon={FiPackage} title="Total Products" value="745"/>
            <Card icon={FiShoppingCart} title="Total Orders" value="130"/>
            <Card icon={FiUsers} title="Total Users" value="681"/>
            <Card icon={FiStar} title="Average Rating" value="5.9"/>
          </div>
          <Order/>
    </div>
  );
}