import React from "react";

import { createContext,useContext, useEffect } from "react";
import Axios from "../utils/Axios";
import summaryApi from "../common/SummaryApi";
import { useDispatch } from "react-redux";
import { handleAddItemCart } from "../store/cartproduct";

export const GlobalContext = createContext(null)

export const useGlobalContext = ()=> useContext(GlobalContext)


const GlobalProvider=({children})=>{


    const dispatch = useDispatch()

     const fetchCartItem =async()=>{
        try {
          const  response =await Axios({
            ...summaryApi.getCartItem
          })
          const{data:responseData} = response
          if(responseData?.success){
            dispatch(handleAddItemCart(responseData?.data))
            console.log(responseData);
          } 
        } catch (error) {
          console.log("Error fetching cart items:", error);
          
        }
    
      }
      useEffect(() => {
        fetchCartItem()
      },[])
    return (
        <GlobalContext.Provider value={{
            fetchCartItem
        }}>
            {children}
        </GlobalContext.Provider>
    )   

}

export default GlobalProvider