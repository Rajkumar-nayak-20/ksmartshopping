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
        ...SummaryApi.CashOnDeliveryOrder,
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
}

export default CheckoutPage