import React, { useState } from 'react'
import { useGlobalContext } from '../provider/GlobalProvider.jsX';
import Axios from '../utils/Axios';

const AddToCartButton = ({data}) => {
  const { fetchCartItem } = useGlobalContext();
  const [loading, setLoading] =useState(false);

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
  };
  return (
    <div> <button
                onClick={handleAddToCart}
                className="bg-green-700 hover:bg-green-800 text-white text-xs px-4 py-1.5 rounded-lg transition-all duration-200"
              >
                Add
              </button></div>
  )
}

export default AddToCartButton