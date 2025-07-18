import { Route, Routes } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import About from "../pages/About";
import Shop from "../pages/Shop";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import PrivateRoute from "../component/PrivateRoute";
import ActivateAcount from "../component/registration/ActivateAcount";
import DashboardLayout from "../layouts/DashboardLayout";
import Profile from "../pages/Profile";
import RequestResetForm from "../component/password_reset/RequestResetForm";
import ResetPasswordPage from "../component/password_reset/ResetPasswordPage";
import ProductDetail from "../pages/ProductDetail";
import Cart from "../pages/Cart";
import Orders from "../pages/Orders";
import PaymentSuccess from "../pages/PaymentSuccess";
import AddProducts from "../pages/AddProducts";
import ShowCategory from "../component/dashboard/ShowCategory";
import AddCategoryForm from "../component/home/categories/AddCategoryForm";
import ShowFlower from "../component/dashboard/ShowFlower";
import ShopByCategory from "../component/shop/ShopByCategory";
import Users from "../pages/Users";

const AppRoutes = () => {
    return (
        <div>
            <Routes>
                {/* Public Routes */}
                <Route element={<MainLayout/>}>
                    <Route path="/" element={<Home/>}/>
                    <Route path="about" element={<About/>}/>
                    <Route path="shop" element={<Shop/>}/>
                    <Route path="login" element={<Login/>}/>
                    <Route path="register" element={<Register/>}/>
                    <Route path="activate/:uid/:token" element={<ActivateAcount/>}/>
                    <Route path="password/reset/confirm/:uid/:token"element={<ResetPasswordPage />}/>
                    <Route path="shop/:productId" element={<ProductDetail/>}/>
                    <Route path="shop_cate_pagi/:id" element={<ShopByCategory />} />
                    <Route path="dashboard/categories/shop_cate_pagi/:id" element={<ShopByCategory />} />
                </Route>

                {/* Private Route */}
                <Route path="dashboard" element={
                    <PrivateRoute>
                        <DashboardLayout/>
                    </PrivateRoute>}>
                    <Route index element={<Dashboard/>}/>
                    <Route path="profile" element={<Profile/>}/>
                    <Route path="profile/forgot_password" element={<RequestResetForm/>}/>
                    <Route path="cart" element={<Cart/>}/>
                    <Route path="orders" element={<Orders/>}/>
                    <Route path="payment/success" element={<PaymentSuccess/>}/>
                    <Route path="products/add" element={<AddProducts/>}/>
                    <Route path="categories" element={<ShowCategory/>}/>
                    <Route path="categories/add" element={<AddCategoryForm/>}/>
                    <Route path="flowers" element={<ShowFlower/>}/>
                    <Route path="users" element={<Users/>}/>
                </Route>

            </Routes>
        </div>
    );
};

export default AppRoutes;