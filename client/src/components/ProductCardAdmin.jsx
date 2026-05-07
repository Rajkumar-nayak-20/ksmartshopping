
//             <div className='flex gap-3 mt-4'>
//               <button onClick={()=>setOpenDelete(false)}>Cancel</button>
//               <button onClick={handleDelete}>Delete</button>
//             </div>
//           </div>
//         </section>
//       )}
//     </>
//   )
// }

// export default ProductCardAdmin



import React, { useState } from 'react'
import { IoClose } from 'react-icons/io5'
import SummaryApi from '../common/SummaryApi'
import Axios from '../utils/Axios'
import AxiosToastError from '../utils/AxiosToastError'
import toast from 'react-hot-toast'

const ProductCardAdmin = ({ data, fetchProductData, onEdit }) => {

  const [openDelete,setOpenDelete] = useState(false)

  const handleDelete = async()=>{
    try {
      const response = await Axios({
        ...SummaryApi.deleteProduct,
        data : { _id : data._id }
      })

      const { data : responseData } = response

      if(responseData.success){
          toast.success(responseData.message)
          fetchProductData()
          setOpenDelete(false)
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }

  return (
    <>
      <div className='group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100 hover:-translate-y-1'>

        {/* Image */}
        <div className='relative bg-slate-50 h-40 flex items-center justify-center overflow-hidden'>
          <img
            src={data?.image?.[0]}
            alt={data?.name}
            className='h-full object-contain p-4 transition-transform duration-300 group-hover:scale-105'
          />

          {data?.discount > 0 && (
            <span className='absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full shadow'>
              {data.discount}% OFF
            </span>
          )}
        </div>

        {/* Content */}
        <div className='p-4'>

          <p className='font-semibold text-slate-800 line-clamp-2 min-h-[48px]'>
            {data?.name}
          </p>

          <p className='text-sm text-slate-500 mt-1'>
            {data?.unit}
          </p>

          <div className='flex items-center justify-between mt-2'>
            <span className='font-bold text-primary-600 text-lg'>
              ₹{data?.price}
            </span>

            {data?.stock <= 5 && (
              <span className='text-xs text-red-500 font-medium'>
                Low Stock
              </span>
            )}
          </div>

          {/* Buttons */}
          <div className='flex gap-3 mt-4'>
            <button 
              onClick={()=>onEdit(data)}
              className='flex-1 py-2 text-sm font-medium rounded-lg bg-green-100 text-green-700 hover:bg-green-200 transition'
            >
              Edit
            </button>

            <button 
              onClick={()=>setOpenDelete(true)}
              className='flex-1 py-2 text-sm font-medium rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition'
            >
              Delete
            </button>
          </div>

        </div>
      </div>

      {/* Delete Modal */}
      {openDelete && (
        <section className='fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-center items-center p-4'>
          <div className='bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 animate-fadeIn'>
            
            <div className='flex items-center justify-between mb-4'>
              <h3 className='text-lg font-semibold text-slate-800'>
                Delete Product
              </h3>
              <button onClick={()=>setOpenDelete(false)}>
                <IoClose size={24}/>
              </button>
            </div>

            <p className='text-slate-600 mb-6'>
              Are you sure you want to permanently delete this product?
            </p>

            <div className='flex justify-end gap-4'>
              <button 
                onClick={()=>setOpenDelete(false)}
                className='px-4 py-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition'
              >
                Cancel
              </button>
              <button 
                onClick={handleDelete}
                className='px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition'
              >
                Delete
              </button>
            </div>

          </div>
        </section>
      )}
    </>
  )
}

export default ProductCardAdmin
