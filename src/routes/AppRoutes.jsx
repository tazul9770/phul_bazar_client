
import { Route, Routes } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/home/Home";
import Products from "../pages/products/Products";
import About from "../pages/About";

const AppRoutes = () => {
    return (
        <div>
            <Routes>
                <Route element={<MainLayout/>}>
                    <Route path="/" element={<Home/>}/>
                    <Route path="products" element={<Products/>}/>
                    <Route path="about" element={<About/>}/>
                </Route>
            </Routes>
        </div>
    );
};

export default AppRoutes;