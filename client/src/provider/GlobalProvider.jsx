import React from "react";

import { createContext,useContext, useEffect } from "react";
import Axios from "../utils/Axios";
import summaryApi from "../common/SummaryApi";
import { useDispatch } from "react-redux";
import { handleAddItemCart } from "../store/cartproduct";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";

export const GlobalContext = createContext(null)

export const useGlobalContext = ()=> useContext(GlobalContext)


const GlobalProvider=({children})=>{


    const dispatch = useDispatch()

     const fetchCartItem = async()=>{
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


      const updateCartItem = async(id,qty)=>{
        try {
          const  response =await Axios({
            ...summaryApi.updateCartItemQty,
            data:{  
              _id: id,
              qty: qty
            } 
          })
          const{data:responseData} = response
          if(responseData?.success){
           toast.success(responseData?.message)
           fetchCartItem()
           console.log(responseData);
          }
          
        } catch (error) {
          AxiosToastError(error)
        }

      }

      
      useEffect(() => {
        fetchCartItem()
      },[])
    return (
        <GlobalContext.Provider value={{
            fetchCartItem,
            updateCartItem
        }}>
            {children}
        </GlobalContext.Provider>
    )   

}

export default GlobalProvider