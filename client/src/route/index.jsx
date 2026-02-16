import React from 'react'
import { createBrowserRouter } from "react-router-dom";
import App from '../App';
import Home from '../pages/Home';
import SearchPage from '../pages/SearchPage';
import Login from '../pages/login';
import Register from '../pages/Register';
import ForgotPassword from '../pages/ForgotPassword';
import Otpverification from '../pages/Otpverification';
import ResetPassword from '../pages/ResetPassword';
import UserMenuMobile from '../pages/UserMenuMobile';
import Dashboard from '../layouts/Dashboard';
import Profile from '../pages/profile';
import Myorders from '../pages/Myorders';
import Address from '../pages/Address';
import CategoryPage from '../pages/CategoryPage';
import SubCategoryPage from '../pages/SubCategoryPage';
import UploadProduct from '../pages/UploadProduct';
import ProductAdmin from '../pages/ProductAdmin';
import AdminPermision from '../layouts/AdminPermision';
import ProductListPage from '../pages/ProductListPage';


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />

            },//home page k liye
            {
                path: "search",

                element: <SearchPage />

            },//ka mtlb search page k liye
            {

                path: "login",
                element: <Login />
            },//ka mtlb login page k liye
            {
                path: "register",
                element: <Register />
            },  //ka mtlb register page k liye
            {
                path: "forgot-password",
                element: <ForgotPassword />
            },
            {
                path: "verification-otp",
                element: <Otpverification />
            },
            {
                path: "reset-password",
                element: <ResetPassword />

            },
            {
                path: "user",
                element: <UserMenuMobile />
            },
            {
                path: "dashboard",
                element: <Dashboard />,
                children: [
                    {
                        path: "profile",
                        element: <Profile />
                    },
                    {
                        path: "myorders",
                        element: <Myorders />
                    },
                    {
                        path: "address",
                        element: <Address />
                    },
                    {
                        path: "Category",
                        element: <AdminPermision>

                        <CategoryPage/> </AdminPermision> 


                    },
                    {
                        path: "Subcategory",
                        element: <AdminPermision><SubCategoryPage /></AdminPermision>
                    },
                    {
                       path: "upload-product",
                       element:  <AdminPermision><UploadProduct /></AdminPermision>
                    },
                    { 
                        path: "Product",
                        element: <AdminPermision><ProductAdmin/></AdminPermision>
                    }
                ]
            },
            {
                path:":category",
                children:[
                    {
                        path: ":subCategory",
                        element:<ProductListPage/>
                    }

                ]
            }


        ]
    }]//ka mtlb ye sare routes hain

)
export default router;