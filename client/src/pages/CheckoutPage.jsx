import React, { useState } from 'react'
import { useGlobalContext } from '../provider/GlobalProvider'
import AddAddress from '../components/AddAddress'
import { useSelector } from 'react-redux'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { loadStripe } from '@stripe/stripe-js'
import { DisplayPriceInRupees } from '../utils/DisplayPriceRupees'

const CheckoutPage = () => {

  const { notDiscountTotalPrice, totalPrice, totalQty, fetchCartItem, fetchOrder } = useGlobalContext()

  const [openAddress, setOpenAddress] = useState(false)

  // ✅ FIXED (safe redux access)
  const addressList = useSelector(state => state.addresses?.addressList || [])

  const [selectAddress, setSelectAddress] = useState(0)

  const cartItemsList = useSelector(state => state.cartItem?.cart || [])

  const navigate = useNavigate()

  // ✅ CASH ON DELIVERY
  const handleCashOnDelivery = async () => {

    if (!addressList[selectAddress]) {
      toast.error("Please select address")
      return
    }

    try {
      const response = await Axios({
        ...SummaryApi.CashOnDeliveryOrderController,
        data: {
          list_items: cartItemsList,
          addressId: addressList[selectAddress]?._id,
          subTotalAmt: totalPrice,
          totalAmt: totalPrice,
        }
      })

      const { data: responseData } = response

      if (responseData.success) {
        toast.success(responseData.message)

        fetchCartItem && fetchCartItem()
        fetchOrder && fetchOrder()

        navigate('/success', {
          state: { text: "Order" }
        })
      }

    } catch (error) {
      AxiosToastError(error)
    }
  }

  // ✅ ONLINE PAYMENT
  const handleOnlinePayment = async () => {

    if (!addressList[selectAddress]) {
      toast.error("Please select address")
      return
    }

    try {
      toast.loading("Redirecting to payment...")

      const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY
      const stripePromise = await loadStripe(stripePublicKey)

      const response = await Axios({
        ...SummaryApi.payment_url,
        data: {
          list_items: cartItemsList,
          addressId: addressList[selectAddress]?._id,
          subTotalAmt: totalPrice,
          totalAmt: totalPrice,
        }
      })

      const { data: responseData } = response

      await stripePromise.redirectToCheckout({
        sessionId: responseData.id
      })

      fetchCartItem && fetchCartItem()
      fetchOrder && fetchOrder()

    } catch (error) {
      AxiosToastError(error)
    }
  }

  return (
    <section className='bg-blue-50 min-h-screen'>
      <div className='container mx-auto p-4 flex flex-col lg:flex-row w-full gap-5 justify-between'>

        {/* LEFT SIDE - ADDRESS */}
        <div className='w-full'>

          <h3 className='text-lg font-semibold mb-2'>Choose your address</h3>

          <div className='bg-white p-3 rounded-lg grid gap-4 shadow-sm'>

            {
              addressList.length > 0 ? (
                addressList.map((address, index) => (
                  <label
                    key={index}
                    htmlFor={"address" + index}
                    className={!address.status ? "hidden" : ""}
                  >
                    <div className='border rounded p-3 flex gap-3 hover:bg-blue-50 cursor-pointer'>

                      <input
                        id={"address" + index}
                        type='radio'
                        value={index}
                        checked={selectAddress === index}
                        onChange={(e) => setSelectAddress(Number(e.target.value))}
                        name='address'
                      />

                      <div className='text-sm'>
                        <p>{address.address_line}</p>
                        <p>{address.city}</p>
                        <p>{address.state}</p>
                        <p>{address.country} - {address.pincode}</p>
                        <p>{address.mobile}</p>
                      </div>
                    </div>
                  </label>
                ))
              ) : (
                <p className='text-gray-400 text-center'>No Address Found</p>
              )
            }

            <div
              onClick={() => setOpenAddress(true)}
              className='h-16 bg-blue-50 border-2 border-dashed flex justify-center items-center cursor-pointer rounded'
            >
              + Add address
            </div>

          </div>
        </div>

        {/* RIGHT SIDE - SUMMARY */}
        <div className='w-full max-w-md bg-white py-4 px-3 rounded-lg shadow-sm'>

          <h3 className='text-lg font-semibold mb-2'>Summary</h3>

          <div className='bg-white p-3'>

            <h3 className='font-semibold mb-2'>Bill details</h3>

            <div className='flex justify-between text-sm'>
              <p>Items total</p>
              <p className='flex gap-2'>
                <span className='line-through text-neutral-400'>
                  {DisplayPriceInRupees(notDiscountTotalPrice)}
                </span>
                <span>{DisplayPriceInRupees(totalPrice)}</span>
              </p>
            </div>

            <div className='flex justify-between text-sm'>
              <p>Quantity total</p>
              <p>{totalQty} item</p>
            </div>

            <div className='flex justify-between text-sm'>
              <p>Delivery Charge</p>
              <p className='text-green-600'>Free</p>
            </div>

            <div className='font-semibold flex justify-between mt-2'>
              <p>Grand total</p>
              <p>{DisplayPriceInRupees(totalPrice)}</p>
            </div>
          </div>

          {/* BUTTONS */}
          <div className='w-full flex flex-col gap-3 mt-3'>

            <button
              className='py-2 px-4 bg-green-600 hover:bg-green-700 rounded text-white font-semibold transition'
              onClick={handleOnlinePayment}
            >
              Online Payment
            </button>

            <button
              className='py-2 px-4 border-2 border-green-600 font-semibold text-green-600 hover:bg-green-600 hover:text-white rounded transition'
              onClick={handleCashOnDelivery}
            >
              Cash on Delivery
            </button>

          </div>
        </div>
      </div>

      {/* ADDRESS MODAL */}
      {
        openAddress && (
          <AddAddress close={() => setOpenAddress(false)} />
        )
      }

    </section>
  )
//   return (
//   <section className="bg-gray-50 min-h-screen py-6">

//     <div className="max-w-6xl mx-auto px-4 flex flex-col lg:flex-row gap-6">

//       {/* LEFT - ADDRESS */}
//       <div className="w-full">

//         <h3 className="text-xl font-semibold mb-3">Select Delivery Address</h3>

//         <div className="bg-white rounded-xl shadow-sm p-4 grid gap-4">

//           {addressList?.length > 0 ? (
//             addressList.map((address, index) => {
//               if (!address.status) return null;

//               const isSelected = selectAddress === index;

//               return (
//                 <label key={index} htmlFor={"address" + index}>

//                   <div
//                     className={`border rounded-xl p-4 flex gap-4 cursor-pointer transition 
//                     ${isSelected ? "border-primary-200 bg-blue-50 shadow-sm" : "hover:bg-gray-50"}`}
//                   >

//                     <input
//                       id={"address" + index}
//                       type="radio"
//                       value={index}
//                       checked={isSelected}
//                       onChange={(e) => setSelectAddress(Number(e.target.value))}
//                       name="address"
//                       className="mt-1 accent-primary-200"
//                     />

//                     <div className="text-sm text-gray-700 leading-6 w-full">

//                       <div className="flex justify-between">
//                         <p className="font-medium">{address.address_line}</p>
//                         {isSelected && (
//                           <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
//                             Selected
//                           </span>
//                         )}
//                       </div>

//                       <p>{address.city}, {address.state}</p>
//                       <p>{address.country} - {address.pincode}</p>
//                       <p className="text-gray-500">📞 {address.mobile}</p>
//                     </div>
//                   </div>

//                 </label>
//               );
//             })
//           ) : (
//             <p className="text-gray-400 text-center py-6">
//               No Address Found
//             </p>
//           )}

//           {/* ADD ADDRESS CARD */}
//           <div
//             onClick={() => setOpenAddress(true)}
//             className="h-20 border-2 border-dashed rounded-xl flex flex-col justify-center items-center cursor-pointer hover:bg-blue-50 transition"
//           >
//             <span className="text-2xl">+</span>
//             <p className="text-sm text-gray-600">Add New Address</p>
//           </div>

//         </div>
//       </div>

//       {/* RIGHT - SUMMARY */}
//       <div className="w-full max-w-md">

//         <div className="bg-white rounded-xl shadow-sm p-5 sticky top-6">

//           <h3 className="text-xl font-semibold mb-4">Order Summary</h3>

//           {/* BILL */}
//           <div className="text-sm text-gray-700 grid gap-2">

//             <div className="flex justify-between">
//               <p>Items Total</p>
//               <p className="flex gap-2">
//                 <span className="line-through text-gray-400">
//                   {DisplayPriceInRupees(notDiscountTotalPrice)}
//                 </span>
//                 <span className="font-medium">
//                   {DisplayPriceInRupees(totalPrice)}
//                 </span>
//               </p>
//             </div>

//             <div className="flex justify-between">
//               <p>Quantity</p>
//               <p>{totalQty} item</p>
//             </div>

//             <div className="flex justify-between">
//               <p>Delivery</p>
//               <p className="text-green-600 font-medium">FREE</p>
//             </div>

//             <div className="border-t pt-3 mt-2 flex justify-between font-semibold text-base">
//               <p>Total</p>
//               <p>{DisplayPriceInRupees(totalPrice)}</p>
//             </div>
//           </div>

//           {/* BUTTONS */}
//           <div className="mt-5 flex flex-col gap-3">

//             <button
//               className="py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition shadow-sm"
//               onClick={handleOnlinePayment}
//             >
//               Pay Online
//             </button>

//             <button
//               className="py-3 border-2 border-green-600 text-green-600 rounded-xl font-semibold hover:bg-green-600 hover:text-white transition"
//               onClick={handleCashOnDelivery}
//             >
//               Cash on Delivery
//             </button>

//           </div>

//         </div>
//       </div>

//     </div>

//     {/* MODAL */}
//     {openAddress && (
//       <AddAddress close={() => setOpenAddress(false)} />
//     )}

//   </section>
// );

// return (
//   <section className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen py-8">
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
//       {/* Page Header */}
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
//         <p className="text-gray-600 mt-1">Complete your purchase securely</p>
//       </div>

//       <div className="flex flex-col lg:flex-row gap-8">
        
//         {/* LEFT - ADDRESS SECTION */}
//         <div className="flex-1">
//           <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
//             <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
//               <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
//                 <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                 </svg>
//                 Select Delivery Address
//               </h3>
//             </div>
            
//             <div className="p-6 space-y-4">
//               {addressList?.length > 0 ? (
//                 addressList.map((address, index) => {
//                   if (!address.status) return null;
//                   const isSelected = selectAddress === index;
                  
//                   return (
//                     <label key={index} htmlFor={`address-${index}`} className="block cursor-pointer group">
//                       <div
//                         className={`relative rounded-xl border-2 transition-all duration-200 overflow-hidden
//                           ${isSelected 
//                             ? 'border-blue-500 bg-blue-50/30 shadow-md' 
//                             : 'border-gray-200 hover:border-gray-300 hover:shadow-sm bg-white'
//                           }`}
//                       >
//                         <div className="p-5">
//                           <div className="flex gap-4">
//                             <div className="flex-shrink-0">
//                               <input
//                                 id={`address-${index}`}
//                                 type="radio"
//                                 value={index}
//                                 checked={isSelected}
//                                 onChange={(e) => setSelectAddress(Number(e.target.value))}
//                                 name="address"
//                                 className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 focus:ring-2"
//                               />
//                             </div>
                            
//                             <div className="flex-1">
//                               <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
//                                 <p className="font-semibold text-gray-900 text-lg">
//                                   {address.address_line}
//                                 </p>
//                                 {isSelected && (
//                                   <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
//                                     <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
//                                       <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                                     </svg>
//                                     Selected
//                                   </span>
//                                 )}
//                               </div>
                              
//                               <div className="space-y-1 text-sm text-gray-600">
//                                 <p className="flex items-center gap-2">
//                                   <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
//                                   </svg>
//                                   {address.city}, {address.state}
//                                 </p>
//                                 <p className="flex items-center gap-2">
//                                   <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                                   </svg>
//                                   {address.country} - {address.pincode}
//                                 </p>
//                                 <p className="flex items-center gap-2">
//                                   <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                                   </svg>
//                                   {address.mobile}
//                                 </p>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </label>
//                   );
//                 })
//               ) : (
//                 <div className="text-center py-12">
//                   <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                   </svg>
//                   <p className="text-gray-500">No addresses found</p>
//                   <p className="text-sm text-gray-400 mt-1">Add a new address to continue</p>
//                 </div>
//               )}
              
//               {/* ADD ADDRESS CARD */}
//               <button
//                 onClick={() => setOpenAddress(true)}
//                 className="w-full border-2 border-dashed border-gray-300 rounded-xl p-5 hover:border-blue-400 hover:bg-blue-50/30 transition-all duration-200 group"
//               >
//                 <div className="flex flex-col items-center gap-2">
//                   <div className="w-10 h-10 rounded-full bg-gray-100 group-hover:bg-blue-100 transition-colors flex items-center justify-center">
//                     <svg className="w-5 h-5 text-gray-600 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
//                     </svg>
//                   </div>
//                   <p className="text-sm font-medium text-gray-600 group-hover:text-blue-600">
//                     Add New Address
//                   </p>
//                 </div>
//               </button>
//             </div>
//           </div>
//         </div>
        
//         {/* RIGHT - ORDER SUMMARY */}
//         <div className="lg:w-96">
//           <div className="sticky top-8">
//             <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
//               <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
//                 <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
//                   <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
//                   </svg>
//                   Order Summary
//                 </h3>
//               </div>
              
//               <div className="p-6 space-y-4">
//                 {/* Price Breakdown */}
//                 <div className="space-y-3">
//                   <div className="flex justify-between text-sm">
//                     <span className="text-gray-600">Items Total</span>
//                     <div className="flex gap-2 items-center">
//                       <span className="text-gray-400 line-through">
//                         {DisplayPriceInRupees(notDiscountTotalPrice)}
//                       </span>
//                       <span className="font-semibold text-gray-900">
//                         {DisplayPriceInRupees(totalPrice)}
//                       </span>
//                     </div>
//                   </div>
                  
//                   <div className="flex justify-between text-sm">
//                     <span className="text-gray-600">Quantity</span>
//                     <span className="font-medium text-gray-900">
//                       {totalQty} {totalQty === 1 ? 'item' : 'items'}
//                     </span>
//                   </div>
                  
//                   <div className="flex justify-between text-sm">
//                     <span className="text-gray-600">Delivery</span>
//                     <span className="text-green-600 font-medium flex items-center gap-1">
//                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                       </svg>
//                       FREE
//                     </span>
//                   </div>
                  
//                   <div className="border-t border-gray-200 pt-3 mt-2">
//                     <div className="flex justify-between items-center">
//                       <span className="text-base font-semibold text-gray-900">Total Amount</span>
//                       <span className="text-2xl font-bold text-gray-900">
//                         {DisplayPriceInRupees(totalPrice)}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
                
//                 {/* Payment Buttons */}
//                 <div className="space-y-3 pt-2">
//                   <button
//                     onClick={handleOnlinePayment}
//                     className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-semibold transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
//                   >
//                     <div className="flex items-center justify-center gap-2">
//                       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
//                       </svg>
//                       Pay Online
//                     </div>
//                   </button>
                  
//                   <button
//                     onClick={handleCashOnDelivery}
//                     className="w-full py-3.5 px-4 border-2 border-blue-600 text-blue-600 rounded-xl font-semibold hover:bg-blue-600 hover:text-white transition-all duration-200"
//                   >
//                     <div className="flex items-center justify-center gap-2">
//                       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
//                       </svg>
//                       Cash on Delivery
//                     </div>
//                   </button>
//                 </div>
                
//                 {/* Secure Payment Badge */}
//                 <div className="flex items-center justify-center gap-2 pt-4 text-xs text-gray-500">
//                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6-4h12a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6a2 2 0 012-2zm10-4V7a4 4 0 00-8 0v4h8z" />
//                   </svg>
//                   <span>100% Secure Payments</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
    
//     {/* MODAL */}
//     {openAddress && (
//       <AddAddress close={() => setOpenAddress(false)} />
//     )}
//   </section>
// );
}

export default CheckoutPage