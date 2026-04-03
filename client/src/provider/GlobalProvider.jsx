// import React, { useState } from "react";

// import { createContext, useContext, useEffect } from "react";
// import Axios from "../utils/Axios";
// import summaryApi from "../common/SummaryApi"
// import { useDispatch, useSelector } from "react-redux"
// import { handleAddItemCart } from "../store/cartproduct";
// import AxiosToastError from "../utils/AxiosToastError";
// import toast from "react-hot-toast";
// import { pricewithDiscount } from "../utils/PriceWithDiscount";

// export const GlobalContext = createContext(null);

// export const useGlobalContext = () => useContext(GlobalContext);

// const GlobalProvider = ({ children }) => {
//   const dispatch = useDispatch();
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [totalQty, setTotalQty] = useState(0);
//   const [notDiscountTotalPrice, setNotDiscountTotalPrice] = useState(0);
//   const cartItem = useSelector((state) => state?.cartItem.cart);
//   const fetchCartItem = async () => {
//     try {
//       const response = await Axios({
//         ...summaryApi.getCartItem,
//       });
//       const { data: responseData } = response;
//       if (responseData?.success) {
//         dispatch(handleAddItemCart(responseData?.data));
//         console.log(responseData);
//       }
//     } catch (error) {
//       console.log("Error fetching cart items:", error);
//     }
//   };

//   const updateCartItem = async (id, qty) => {
//     try {
//       const response = await Axios({
//         ...summaryApi.updateCartItemQty,
//         data: {
//           _id: id,
//           qty: qty,
//         },
//       });
//       const { data: responseData } = response;
//       if (responseData?.success) {
//         toast.success(responseData?.message);
//         fetchCartItem();
//         console.log(responseData);
//       }
//     } catch (error) {
//       AxiosToastError(error);
//     }
//   };
//   const deleteCartItem = async (cartId) => {
//     try {
//       const response = await Axios({
//         ...summaryApi.deleteCartItem,
//         data: {
//           _id: cartId,
//         },
//       });
//       const { data: responseData } = response;
//       if (responseData?.success) {
//         toast.success(responseData?.message);
//         fetchCartItem();
//       }
//     } catch (error) {
//       AxiosToastError(error);
//     }
//   };

//   useEffect(() => {
//     fetchCartItem();
//   }, []);
//   useEffect(() => {
//     const qty = cartItem.reduce((preve, curr) => {
//       return preve + curr.quantity;
//     }, 0);
//     setTotalQty(qty);
//     const tprice = cartItem.reduce((preve, curr) => {
//      const priceAfterDiscount = pricewithDiscount(curr?.productId?.price,curr?.productId?.discount)
      
      
//           return preve + (priceAfterDiscount * curr.quantity)
      
//       // return  preve +(Number(
//       //   pricewithDiscount(curr.productId.price, curr, curr.productId.discount)) *
//       //     curr.quantity)
      
//     }, 0);
//     setTotalPrice(tprice);
//     const notDiscountPrice = cartItem.reduce((preve, curr) => {
     
      
      
//           return preve + (curr?.productId?.price * curr.quantity)
      
//       // return  preve +(Number(
//       //   pricewithDiscount(curr.productId.price, curr, curr.productId.discount)) *
//       //     curr.quantity)
      
//     }, 0);
//     setNotDiscountTotalPrice(notDiscountPrice);

//     // console.log("total price", tprice);
//   }, [cartItem]);
//   return (
//     <GlobalContext.Provider
//       value={{
//         fetchCartItem,
//         updateCartItem,
//         deleteCartItem,
//         totalPrice,
//         totalQty,
//         notDiscountTotalPrice
//         }}
//     >
//       {children}
//     </GlobalContext.Provider>
//   );
// };

// export default GlobalProvider;

import React from "react";
import { createContext,useContext, useEffect, useState } from "react";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { useDispatch, useSelector } from "react-redux";
import { handleAddItemCart } from "../store/cartslice";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import { pricewithDiscount } from "../utils/PriceWithDiscount";
import { handleAddAddress } from "../store/addressSlice";
import { setOrder } from "../store/orderSlice";

export const GlobalContext = createContext(null)

export const useGlobalContext = ()=> useContext(GlobalContext)

const GlobalProvider = ({children}) => {
     const dispatch = useDispatch()
     const [totalPrice,setTotalPrice] = useState(0)
     const [notDiscountTotalPrice,setNotDiscountTotalPrice] = useState(0)
    const [totalQty,setTotalQty] = useState(0)
    const cartItem = useSelector(state => state.cartItem.cart)
    const user = useSelector(state => state?.user)

    const fetchCartItem = async()=>{
        try {
          const response = await Axios({
            ...SummaryApi.getCartItem
          })
          const { data : responseData } = response
    
          if(responseData.success){
            dispatch(handleAddItemCart(responseData.data))
            console.log(responseData)
          }
    
        } catch (error) {
          console.log(error)
        }
    }

    const updateCartItem = async(id,qty)=>{
      try {
          const response = await Axios({
            ...SummaryApi.updateCartItemQty,
            data : {
              _id : id,
              qty : qty
            }
          })
          const { data : responseData } = response

          if(responseData.success){
              // toast.success(responseData.message)
              fetchCartItem()
              return responseData
          }
      } catch (error) {
        AxiosToastError(error)
        return error
      }
    }
    const deleteCartItem = async(cartId)=>{
      try {
          const response = await Axios({
            ...SummaryApi.deleteCartItem,
            data : {
              _id : cartId
            }
          })
          const { data : responseData} = response

          if(responseData.success){
            toast.success(responseData.message)
            fetchCartItem()
          }
      } catch (error) {
         AxiosToastError(error)
      }
    }

    useEffect(()=>{
      const qty = cartItem.reduce((preve,curr)=>{
          return preve + curr.quantity
      },0)
      setTotalQty(qty)
      
      const tPrice = cartItem.reduce((preve,curr)=>{
          const priceAfterDiscount = pricewithDiscount(curr?.productId?.price,curr?.productId?.discount)

          return preve + (priceAfterDiscount * curr.quantity)
      },0)
      setTotalPrice(tPrice)

      const notDiscountPrice = cartItem.reduce((preve,curr)=>{
        return preve + (curr?.productId?.price * curr.quantity)
      },0)
      setNotDiscountTotalPrice(notDiscountPrice)
  },[cartItem])

    const handleLogoutOut = ()=>{
        localStorage.clear()
        dispatch(handleAddItemCart([]))
    }

    const fetchAddress = async()=>{
      try {
        const response = await Axios({
          ...SummaryApi.getAddress
        })
        const { data : responseData } = response

        if(responseData.success){
          dispatch(handleAddAddress(responseData.data))
        }
      } catch (error) {
          // AxiosToastError(error)
      }
    }
    const fetchOrder = async()=>{
      try {
        const response = await Axios({
          ...SummaryApi.getorderItems,
        })
        const { data : responseData } = response

        if(responseData.success){
            dispatch(setOrder(responseData.data))
        }
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(()=>{
      fetchCartItem()
      handleLogoutOut()
      fetchAddress()
      fetchOrder()
    },[user])
    
    return(
        <GlobalContext.Provider value={{
            fetchCartItem,
            updateCartItem,
            deleteCartItem,
            fetchAddress,
            totalPrice,
            totalQty,
            notDiscountTotalPrice,
            fetchOrder
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider