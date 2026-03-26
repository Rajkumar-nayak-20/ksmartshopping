import React from 'react'
import { useForm } from "react-hook-form"
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'
import { IoClose } from "react-icons/io5";
import { useGlobalContext } from '../provider/GlobalProvider'

const EditAddressDetails = ({close, data}) => {
    const { register, handleSubmit,reset } = useForm({
        defaultValues : {
            _id : data._id,
            userId : data.userId,
            address_line :data.address_line,
            city : data.city,
            state : data.state,
            country : data.country,
            pincode : data.pincode,
            mobile : data.mobile 
        }
    })
    const { fetchAddress } = useGlobalContext()

    const onSubmit = async(data)=>{
        try {
            const response = await Axios({
                ...SummaryApi.updateAddress,
                data : {
                    ...data,
                    address_line :data.address_line,
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
//   return (
//     <section className='bg-black fixed top-0 left-0 right-0 bottom-0 z-50 bg-opacity-70 h-screen overflow-auto'>
//         <div className='bg-white p-4 w-full max-w-lg mt-8 mx-auto rounded'>
//             <div className='flex justify-between items-center gap-4'>
//                 <h2 className='font-semibold'>Edit Address</h2>
//                 <button onClick={close} className='hover:text-red-500'>
//                     <IoClose  size={25}/>
//                 </button>
//             </div>
//             <form className='mt-4 grid gap-4' onSubmit={handleSubmit(onSubmit)}>
//                 <div className='grid gap-1'>
//                     <label htmlFor='addressline'>Address Line :</label>
//                     <input
//                         type='text'
//                         id='addressline' 
//                         className='border bg-blue-50 p-2 rounded'
//                         {...register("address_line",{required : true})}
//                     />
//                 </div>
//                 <div className='grid gap-1'>
//                     <label htmlFor='city'>City :</label>
//                     <input
//                         type='text'
//                         id='city' 
//                         className='border bg-blue-50 p-2 rounded'
//                         {...register("city",{required : true})}
//                     />
//                 </div>
//                 <div className='grid gap-1'>
//                     <label htmlFor='state'>State :</label>
//                     <input
//                         type='text'
//                         id='state' 
//                         className='border bg-blue-50 p-2 rounded'
//                         {...register("state",{required : true})}
//                     />
//                 </div>
//                 <div className='grid gap-1'>
//                     <label htmlFor='pincode'>Pincode :</label>
//                     <input
//                         type='text'
//                         id='pincode' 
//                         className='border bg-blue-50 p-2 rounded'
//                         {...register("pincode",{required : true})}
//                     />
//                 </div>
//                 <div className='grid gap-1'>
//                     <label htmlFor='country'>Country :</label>
//                     <input
//                         type='text'
//                         id='country' 
//                         className='border bg-blue-50 p-2 rounded'
//                         {...register("country",{required : true})}
//                     />
//                 </div>
//                 <div className='grid gap-1'>
//                     <label htmlFor='mobile'>Mobile No. :</label>
//                     <input
//                         type='text'
//                         id='mobile' 
//                         className='border bg-blue-50 p-2 rounded'
//                         {...register("mobile",{required : true})}
//                     />
//                 </div>

//                 <button type='submit' className='bg-primary-200 w-full  py-2 font-semibold mt-4 hover:bg-primary-100'>Submit</button>
//             </form>
//         </div>
//     </section>
//   )
// return (
//   <section className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-3">

//     {/* Modal Card */}
//     <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-6 animate-fadeIn">

//       {/* Header */}
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-lg font-semibold">Edit Address</h2>
//         <button
//           onClick={close}
//           className="p-2 rounded-full hover:bg-red-100 hover:text-red-500 transition"
//         >
//           <IoClose size={22} />
//         </button>
//       </div>

//       {/* Form */}
//       <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>

//         {/* Input Group */}
//         {[
//           { label: "Address Line", name: "address_line" },
//           { label: "City", name: "city" },
//           { label: "State", name: "state" },
//           { label: "Pincode", name: "pincode" },
//           { label: "Country", name: "country" },
//           { label: "Mobile No.", name: "mobile" },
//         ].map((field, index) => (
//           <div key={index} className="flex flex-col gap-1">
//             <label className="text-sm text-gray-600">
//               {field.label}
//             </label>

//             <input
//               type="text"
//               className="border rounded-lg px-3 py-2 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-200 transition"
//               {...register(field.name, { required: true })}
//             />
//           </div>
//         ))}

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="bg-primary-200 text-black py-2.5 rounded-lg font-semibold mt-3 hover:bg-primary-300 transition shadow-sm"
//         >
//           Update Address
//         </button>
//       </form>
//     </div>
//   </section>
// );

return (
  <section className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-3">

    {/* Modal */}
    <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl p-6 animate-fadeIn">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Edit Address</h2>
        <button
          onClick={close}
          className="p-2 rounded-full hover:bg-red-100 hover:text-red-500 transition"
        >
          <IoClose size={22} />
        </button>
      </div>

      {/* Form */}
      <form className="grid gap-5" onSubmit={handleSubmit(onSubmit)}>

        {/* Address Line */}
        <div className="relative">
          <input
            type="text"
            placeholder=" "
            {...register("address_line", { required: "Address is required" })}
            className="peer w-full border rounded-lg px-3 pt-5 pb-2 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary-200 outline-none transition"
          />
          <label className="absolute left-3 top-2 text-xs text-gray-500 transition-all 
            peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm 
            peer-focus:top-2 peer-focus:text-xs">
            Address Line
          </label>
        </div>

        {/* Grid Row */}
        <div className="grid grid-cols-2 gap-4">

          {/* City */}
          <div className="relative">
            <input
              type="text"
              placeholder=" "
              {...register("city", { required: "City required" })}
              className="peer w-full border rounded-lg px-3 pt-5 pb-2 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary-200 outline-none"
            />
            <label className="absolute left-3 top-2 text-xs text-gray-500 
              peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm 
              peer-focus:top-2 peer-focus:text-xs">
              City
            </label>
          </div>

          {/* State */}
          <div className="relative">
            <input
              type="text"
              placeholder=" "
              {...register("state", { required: "State required" })}
              className="peer w-full border rounded-lg px-3 pt-5 pb-2 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary-200 outline-none"
            />
            <label className="absolute left-3 top-2 text-xs text-gray-500 
              peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm 
              peer-focus:top-2 peer-focus:text-xs">
              State
            </label>
          </div>

        </div>

        {/* Grid Row */}
        <div className="grid grid-cols-2 gap-4">

          {/* Pincode */}
          <div className="relative">
            <input
              type="number"
              placeholder=" "
              {...register("pincode", {
                required: "Pincode required",
                minLength: { value: 6, message: "Invalid pincode" },
              })}
              className="peer w-full border rounded-lg px-3 pt-5 pb-2 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary-200 outline-none"
            />
            <label className="absolute left-3 top-2 text-xs text-gray-500 
              peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm 
              peer-focus:top-2 peer-focus:text-xs">
              Pincode
            </label>
          </div>

          {/* Country */}
          <div className="relative">
            <input
              type="text"
              placeholder=" "
              {...register("country", { required: "Country required" })}
              className="peer w-full border rounded-lg px-3 pt-5 pb-2 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary-200 outline-none"
            />
            <label className="absolute left-3 top-2 text-xs text-gray-500 
              peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm 
              peer-focus:top-2 peer-focus:text-xs">
              Country
            </label>
          </div>

        </div>

        {/* Mobile */}
        <div className="relative">
          <input
            type="tel"
            placeholder=" "
            {...register("mobile", {
              required: "Mobile required",
              pattern: {
                value: /^[6-9]\d{9}$/,
                message: "Invalid mobile number",
              },
            })}
            className="peer w-full border rounded-lg px-3 pt-5 pb-2 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary-200 outline-none"
          />
          <label className="absolute left-3 top-2 text-xs text-gray-500 
            peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm 
            peer-focus:top-2 peer-focus:text-xs">
            Mobile Number
          </label>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-2">

          <button
            type="button"
            onClick={close}
            className="w-full py-2.5 border rounded-lg font-medium hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="w-full py-2.5 bg-primary-200 text-black rounded-lg font-semibold hover:bg-orange-400 transition shadow-sm"
          >
            Update Address
          </button>

        </div>

      </form>
    </div>
  </section>
);
}

export default EditAddressDetails

