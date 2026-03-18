import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../provider/GlobalProvider.jsX';
import Axios from '../utils/Axios';
import summaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import toast from 'react-hot-toast';
import Loading from './Loading';
import { useSelector } from 'react-redux';
import { FaMinus } from "react-icons/fa";
      
import { FaPlus } from "react-icons/fa";



const AddToCartButton = ({data}) => {
  const { fetchCartItem } = useGlobalContext();
  const [loading, setLoading] =useState(false);
   const cartItem = useSelector(state => state.cartItem.cart)
  const[isAvailableCart, setIsAvailableCart] = useState(false) 
  const [qty,setQty] =useState(0)
  console.log(cartItem);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      setLoading(true);
      const response = await Axios({
        ...summaryApi.addTocart,
        data: {
          productId: data?._id,
          // price : discountedPrice,
          // quantity : 1
        },
      });
      const { data: responseData } = response;
      if (responseData?.success) {
        toast.success(responseData?.message);
        if (fetchCartItem) {
          fetchCartItem();
        }
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  }
 useEffect(()=>{
 const checkingitem =cartItem.some(item => item.productId._id === data._id)
 setIsAvailableCart(checkingitem)
 const product = cartItem.find(item => item.productId._id === data._id)
setQty(product?.quantity )
 
 },[data,cartItem])
  
 const increaseQty =(e)=>{
  e.preventDefault();

  e.stopPropagation();
 }
 const decreaseQty =(e)=>{

   e.preventDefault();

  e.stopPropagation();
 }
  return (
    <div>
      {
        isAvailableCart ?(
        <div>
          <button className='cursor-pointer' onClick={decreaseQty}>
          <FaMinus/>
            <p>{qty}</p>
            <button className='cursor-pointer' onClick={increaseQty}> <FaPlus/></button>
          </button>
        </div>
        ):(
<button
                onClick={handleAddToCart}
                className="bg-green-700 hover:bg-green-800 text-white text-xs px-4 py-1.5 rounded-lg transition-all duration-200"
              >
                Add
              
              </button>
        )
      } </div>
  )
}

export default AddToCartButton