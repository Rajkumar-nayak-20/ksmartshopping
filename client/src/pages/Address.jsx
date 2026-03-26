import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import AddAddress from '../components/AddAddress'
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import EditAddressDetails from '../components/EditAddressDetails';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';
import { useGlobalContext } from '../provider/GlobalProvider';

const Address = () => {
  const addressList = useSelector(state => state.addresses.addressList)
  const [openAddress,setOpenAddress] = useState(false)
  const [OpenEdit,setOpenEdit] = useState(false)
  const [editData,setEditData] = useState({})
  const { fetchAddress} = useGlobalContext()

  const handleDisableAddress = async(id)=>{
    try {
      const response = await Axios({
        ...SummaryApi.disableAddress,
        data : {
          _id : id
        }
      })
      if(response.data.success){
        toast.success("Address Remove")
        if(fetchAddress){
          fetchAddress()
        }
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }
//   return (
//     <div className=''>
//         <div className='bg-white shadow-lg px-2 py-2 flex justify-between gap-4 items-center '>
//             <h2 className='font-semibold text-ellipsis line-clamp-1'>Address</h2>
//             <button onClick={()=>setOpenAddress(true)} className='border border-primary-200 text-primary-200 px-3 hover:bg-primary-200 hover:text-black py-1 rounded-full'>
//                 Add Address
//             </button>
//         </div>
//         <div className='bg-blue-50 p-2 grid gap-4'>
//               {
//                 addressList.map((address,index)=>{
//                   return(
//                       <div className={`border rounded p-3 flex gap-3 bg-white ${!address.status && 'hidden'}`}>
//                           <div className='w-full'>
//                             <p>{address.address_line}</p>
//                             <p>{address.city}</p>
//                             <p>{address.state}</p>
//                             <p>{address.country} - {address.pincode}</p>
//                             <p>{address.mobile}</p>
//                           </div>
//                           <div className=' grid gap-10'>
//                             <button onClick={()=>{
//                               setOpenEdit(true)
//                               setEditData(address)
//                             }} className='bg-green-200 p-1 rounded  hover:text-white hover:bg-green-600'>
//                               <MdEdit/>
//                             </button>
//                             <button onClick={()=>
//                               handleDisableAddress(address._id)
//                             } className='bg-red-200 p-1 rounded hover:text-white hover:bg-red-600'>
//                               <MdDelete size={20}/>  
//                             </button>
//                           </div>
//                       </div>
//                   )
//                 })
//               }
//               <div onClick={()=>setOpenAddress(true)} className='h-16 bg-blue-50 border-2 border-dashed flex justify-center items-center cursor-pointer'>
//                 Add address
//               </div>
//         </div>

//         {
//           openAddress && (
//             <AddAddress close={()=>setOpenAddress(false)}/>
//           )
//         }

//         {
//           OpenEdit && (
//             <EditAddressDetails data={editData} close={()=>setOpenEdit(false)}/>
//           )
//         }
//     </div>
//   )
// }
return (
  <div className="max-w-3xl mx-auto">

    {/* Header */}
    <div className="bg-white shadow-sm rounded-xl px-5 py-4 flex justify-between items-center border">
      <h2 className="font-semibold text-lg">Saved Addresses</h2>
      <button
        onClick={() => setOpenAddress(true)}
        className="bg-primary-200 text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-primary-300 transition"
      >
        + Add Address
      </button>
    </div>

    {/* Address List */}
    <div className="mt-4 grid gap-4">

      {addressList?.length > 0 ? (
        addressList.map((address, index) => {
          if (!address.status) return null;

          return (
            <div
              key={index}
              className="bg-white border rounded-xl p-4 flex justify-between gap-4 shadow-sm hover:shadow-md transition"
            >
              {/* Address Info */}
              <div className="text-sm text-gray-700 leading-6">
                <p className="font-medium">{address.address_line}</p>
                <p>{address.city}, {address.state}</p>
                <p>{address.country} - {address.pincode}</p>
                <p className="text-gray-500 mt-1">📞 {address.mobile}</p>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => {
                    setOpenEdit(true);
                    setEditData(address);
                  }}
                  className="p-2 rounded-full bg-green-100 hover:bg-green-600 hover:text-white transition"
                >
                  <MdEdit size={18} />
                </button>

                <button
                  onClick={() => handleDisableAddress(address._id)}
                  className="p-2 rounded-full bg-red-100 hover:bg-red-600 hover:text-white transition"
                >
                  <MdDelete size={18} />
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <div className="text-center text-gray-500 py-10">
          No address found
        </div>
      )}

      {/* Add New Card */}
      <div
        onClick={() => setOpenAddress(true)}
        className="h-20 border-2 border-dashed rounded-xl flex flex-col justify-center items-center cursor-pointer hover:bg-blue-50 transition"
      >
        <span className="text-2xl">+</span>
        <p className="text-sm text-gray-600">Add New Address</p>
      </div>
    </div>

    {/* Modals */}
    {openAddress && (
      <AddAddress close={() => setOpenAddress(false)} />
    )}

    {OpenEdit && (
      <EditAddressDetails
        data={editData}
        close={() => setOpenEdit(false)}
      />
    )}
  </div>
);
}

export default Address
