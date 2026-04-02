
// import React, { useEffect, useState } from 'react'
// import { useGlobalContext } from '../provider/GlobalProvider'
// import Axios from '../utils/Axios'
// import SummaryApi from '../common/SummaryApi'
// import toast from 'react-hot-toast'
// import AxiosToastError from '../utils/AxiosToastError'
// import Loading from './Loading'
// import { useSelector } from 'react-redux'
// import { FaMinus, FaPlus } from "react-icons/fa6";
// import { useNavigate } from 'react-router-dom'

// const AddToCartButton = ({ data }) => {
//     const { fetchCartItem, updateCartItem, deleteCartItem } = useGlobalContext()
//     const [loading, setLoading] = useState(false)
//     const cartItem = useSelector(state => state.cartItem.cart)
//     const [isAvailableCart, setIsAvailableCart] = useState(false)
//     const [qty, setQty] = useState(0)
//     const [cartItemDetails,setCartItemsDetails] = useState()
//     const user = useSelector((state) => state.user);

//     // const handleADDTocart = async (e) => {
//     //     e.preventDefault()
//     //     e.stopPropagation()

//     //     try {
//     //         setLoading(true)

//     //         const response = await Axios({
//     //             ...SummaryApi.addTocart,
//     //             data: {
//     //                 productId: data?._id
//     //             }
//     //         })

//     //         const { data: responseData } = response

//     //         if (responseData.success) {
//     //             toast.success(responseData.message)
//     //             if (fetchCartItem) {
//     //                 fetchCartItem()
//     //             }
//     //         }
//     //     } catch (error) {
//     //         AxiosToastError(error)
//     //     } finally {
//     //         setLoading(false)
//     //     }

//     // }

//     //checking this item in cart or not
//    const handleADDTocart = async (e) => {
//   e.preventDefault();
//   e.stopPropagation();

//   // 🔥 LOGIN VALIDATION
//   if (!user || !user?._id) {
//     toast.error("Please login first");
//     return;
//   }

//   try {
//     setLoading(true);

//     const response = await Axios({
//       ...SummaryApi.addTocart,
//       data: {
//         productId: data?._id,
//       },
//     });

//     const { data: responseData } = response;

//     if (responseData.success) {
//       toast.success(responseData.message);

//       if (fetchCartItem) {
//         fetchCartItem();
//       }
//     }
//   } catch (error) {
//     AxiosToastError(error);
//   } finally {
//     setLoading(false);
//   }
// };
// const navigate = useNavigate();

// if (!user?._id) {
//   toast.error("Please login first");
//   navigate("/login");
//   return;
// }
//     useEffect(() => {
//         const checkingitem = cartItem.some(item => item.productId._id === data._id)
//         setIsAvailableCart(checkingitem)

//         const product = cartItem.find(item => item.productId._id === data._id)
//         setQty(product?.quantity)
//         setCartItemsDetails(product)
//     }, [data, cartItem])


//     const increaseQty = async(e) => {
//         e.preventDefault()
//         e.stopPropagation()
    
//        const response = await  updateCartItem(cartItemDetails?._id,qty+1)
        
//        if(response.success){
//         toast.success("Item added")
//        }
//     }

//     const decreaseQty = async(e) => {
//         e.preventDefault()
//         e.stopPropagation()
//         if(qty === 1){
//             deleteCartItem(cartItemDetails?._id)
//         }else{
//             const response = await updateCartItem(cartItemDetails?._id,qty-1)

//             if(response.success){
//                 toast.success("Item remove")
//             }
//         }
//     }
//     return (
//         // <div className='w-full max-w-[150px]'>
//         //     {
//         //         isAvailableCart ? (
//         //             <div className='flex w-full h-full'>
//         //                 <button onClick={decreaseQty} className='bg-green-600 hover:bg-green-700 text-white flex-1 w-full p-1 rounded flex items-center justify-center'><FaMinus /></button>

//         //                 <p className='flex-1 w-full font-semibold px-1 flex items-center justify-center'>{qty}</p>

//         //                 <button onClick={increaseQty} className='bg-green-600 hover:bg-green-700 text-white flex-1 w-full p-1 rounded flex items-center justify-center'><FaPlus /></button>
//         //             </div>
//         //         ) : (
//         //             <button onClick={handleADDTocart} className='bg-green-600 hover:bg-green-700 text-white px-2 lg:px-4 py-1 rounded'>
//         //                 { "Add"}
//         //             </button>
//         //         )
//         //     }

//         // </div>
//         <div className="w-full max-w-[150px]">
//   {isAvailableCart ? (
//     <div className="flex w-full h-full">
//       <button
//         onClick={decreaseQty}
//         className="bg-green-600 hover:bg-green-700 text-white flex-1 p-1 rounded flex items-center justify-center"
//       >
//         <FaMinus />
//       </button>

//       <p className="flex-1 font-semibold px-1 flex items-center justify-center">
//         {qty}
//       </p>

//       <button
//         onClick={increaseQty}
//         className="bg-green-600 hover:bg-green-700 text-white flex-1 p-1 rounded flex items-center justify-center"
//       >
//         <FaPlus />
//       </button>
//     </div>
//   ) : (
//     <button
//       onClick={(e) => {
//         if (!user || !user?._id) {
//           e.preventDefault();
//           e.stopPropagation();
//           toast.error("Please login first");
//           return;
//         }
//         handleADDTocart(e);
//       }}
//       className="bg-green-600 hover:bg-green-700 text-white px-2 lg:px-4 py-1 rounded w-full"
//     >
//       Add
//     </button>
//   )}
// </div>
//     )
// }

// export default AddToCartButton


import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../provider/GlobalProvider'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'
import { useSelector } from 'react-redux'
import { FaMinus, FaPlus } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom'

const AddToCartButton = ({ data }) => {
    const { fetchCartItem, updateCartItem, deleteCartItem } = useGlobalContext()
    const [loading, setLoading] = useState(false)
    const cartItem = useSelector(state => state.cartItem.cart)
    const [isAvailableCart, setIsAvailableCart] = useState(false)
    const [qty, setQty] = useState(0)
    const [cartItemDetails, setCartItemsDetails] = useState()
    const user = useSelector((state) => state.user)
    const navigate = useNavigate()

    // ✅ ADD TO CART FUNCTION (WITH LOGIN CHECK)
    const handleADDTocart = async (e) => {
        e.preventDefault()
        e.stopPropagation()

        if (!user || !user?._id) {
            toast.error("Please login first")
            navigate("/login")
            return
        }

        try {
            setLoading(true)

            const response = await Axios({
                ...SummaryApi.addTocart,
                data: {
                    productId: data?._id
                }
            })

            const { data: responseData } = response

            if (responseData.success) {
                toast.success(responseData.message)
                if (fetchCartItem) {
                    fetchCartItem()
                }
            }
        } catch (error) {
            AxiosToastError(error)
        } finally {
            setLoading(false)
        }
    }

    // ✅ CHECK ITEM IN CART
    useEffect(() => {
        const checkingitem = cartItem.some(item => item.productId._id === data._id)
        setIsAvailableCart(checkingitem)

        const product = cartItem.find(item => item.productId._id === data._id)
        setQty(product?.quantity || 0)
        setCartItemsDetails(product)
    }, [data, cartItem])

    // ✅ INCREASE QTY
    const increaseQty = async (e) => {
        e.preventDefault()
        e.stopPropagation()

        if (!user || !user?._id) {
            toast.error("Please login first")
            navigate("/login")
            return
        }

        const response = await updateCartItem(cartItemDetails?._id, qty + 1)

        if (response.success) {
            toast.success("Item added")
        }
    }

    // ✅ DECREASE QTY
    const decreaseQty = async (e) => {
        e.preventDefault()
        e.stopPropagation()

        if (!user || !user?._id) {
            toast.error("Please login first")
            navigate("/login")
            return
        }

        if (qty === 1) {
            deleteCartItem(cartItemDetails?._id)
        } else {
            const response = await updateCartItem(cartItemDetails?._id, qty - 1)

            if (response.success) {
                toast.success("Item removed")
            }
        }
    }

    return (
        <div className="w-full max-w-[150px]">
            {
                isAvailableCart ? (
                    <div className="flex w-full h-full">
                        <button
                            onClick={decreaseQty}
                            className="bg-green-600 hover:bg-green-700 text-white flex-1 p-1 rounded flex items-center justify-center"
                        >
                            <FaMinus />
                        </button>

                        <p className="flex-1 font-semibold px-1 flex items-center justify-center">
                            {qty}
                        </p>

                        <button
                            onClick={increaseQty}
                            className="bg-green-600 hover:bg-green-700 text-white flex-1 p-1 rounded flex items-center justify-center"
                        >
                            <FaPlus />
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={handleADDTocart}
                        disabled={loading}
                        className={`bg-green-600 text-white px-2 lg:px-4 py-1 rounded w-full ${
                            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-green-700"
                        }`}
                    >
                        {loading ? "Adding..." : "Add"}
                    </button>
                )
            }
        </div>
    )
}

export default AddToCartButton