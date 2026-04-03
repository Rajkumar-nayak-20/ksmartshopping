// import React, { useEffect } from 'react'
// import './App.css'
// import { Outlet } from 'react-router-dom'
// import Header from './components/Header'
// import Footer from './components/Footer'
// import toast, { Toaster } from 'react-hot-toast';
// import fetchUserDetails from './utils/fetchUserDetails'

// function App () {
//   const fetchUser =async ()=>{
//     const userData = await fetchUserDetails()
//   console.log("user data ", userData);
//   }

//   useEffect(() => {
//     fetchUser()
//   },[]
// )

//   return (
//   <>
//    <Header/>
//     <main className='min-h-[78vh]'>
//       <Outlet/>

//     </main>
//     <Footer/>
//     <Toaster/>
//   </>
//   )
// }

// export default App

import React, { use, useEffect } from "react";
import "./App.css";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import fetchUserDetails from "./utils/fetchUserDetails";

import { setUserDetails } from "./store/userSlice";

import {
  setAllCategory,
  setAllSubCategory,
  setLoadingCategory,
} from "./store/productSlice";
import { useDispatch } from "react-redux";
import { fetchCategory, fetchSubCategory } from "./utils/fetchCategory"; // Import from new file

import GlobalProvider from "./provider/GlobalProvider.jsX";
import { FaShoppingCart } from "react-icons/fa";
import { useGlobalContext } from "./provider/GlobalProvider";
import Cartmobilelink from "./components/cartmobile";

function App() {
  const dispatch = useDispatch();
  const location =useLocation()
 
 
  const fetchUser = async () => {
    const userData = await fetchUserDetails();
    dispatch(setUserDetails(userData.data));
  };

  useEffect(() => {
    fetchUser();
    fetchCategory(dispatch, setLoadingCategory, setAllCategory);
    fetchSubCategory(dispatch, setLoadingCategory, setAllSubCategory);
    // fetchCartItem()
  }, []);


  return (
    <GlobalProvider>
      <Header />
      <main className="min-h-[78vh]">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
      {
location.pathname !== 'checkout' && (

  <Cartmobilelink/>
)
      }

     
    </GlobalProvider>
  );
}

export default App;
