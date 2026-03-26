import React from 'react'
import { useForm } from "react-hook-form"
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'
import { IoClose } from "react-icons/io5";
import { useGlobalContext } from '../provider/GlobalProvider'

const AddAddress = ({close}) => {
    const { register, handleSubmit,reset } = useForm()
    const { fetchAddress } = useGlobalContext()

    const onSubmit = async(data)=>{
        console.log("data",data)
    
        try {
            const response = await Axios({
                ...SummaryApi.createAddress,
                data : {
                    address_line :data.addressline,
                    city : data.city,
                    state : data.state,
                    country : data.country,
                    pincode : data.pincode,
                    mobile : data.mobile
                }
            })

            const { data : responseData } = response
            
            if(responseData.success){
                toast.success(responseData.message)
                if(close){
                    close()
                    reset()
                    fetchAddress()
                }
            }
        } catch (error) {
            AxiosToastError(error)
        }
    }
 return (
  <section className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-3">

    {/* Modal Card */}
    <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-6 animate-fadeIn">

      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-lg font-semibold">Add New Address</h2>
        <button
          onClick={close}
          className="p-2 rounded-full hover:bg-red-100 hover:text-red-500 transition"
        >
          <IoClose size={22} />
        </button>
      </div>

      {/* Form */}
      <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>

        {[
          { label: "Address Line", name: "addressline" },
          { label: "City", name: "city" },
          { label: "State", name: "state" },
          { label: "Pincode", name: "pincode" },
          { label: "Country", name: "country" },
          { label: "Mobile No.", name: "mobile" },
        ].map((field, index) => (
          <div key={index} className="flex flex-col gap-1">
            <label className="text-sm text-gray-600">
              {field.label}
            </label>

            <input
              type="text"
              className="border rounded-lg px-3 py-2 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-200 transition"
              {...register(field.name, { required: true })}
            />
          </div>
        ))}

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-primary-200 text-black py-2.5 rounded-lg font-semibold mt-3 hover:bg-primary-300 transition shadow-sm"
        >
          Save Address
        </button>
      </form>
    </div>
  </section>
);
}

export default AddAddress
