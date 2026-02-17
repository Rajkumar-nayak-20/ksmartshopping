// import React from 'react'
// import { DisplayPriceInRupees } from '../utils/DisplayPriceRupees'

// const CardProduct = ({data}) => {
//   return (
//    <div className="border p-2 grid gap-3 max-w-52 rounded">
//       <div className="min-h-20 max-h-20 bg-blue-50">
//         <img src={data.image[0]}
//         className=' ' />
//       </div>
        
//       <div className="p-3 bg-blue-50  rounded w-20">10 min
//       </div>
//       <div className="p-3 bg-blue-50 rounded">
//         {data.name}
//       </div>
//       <div className="p-3 bg-blue-50 rounded w-14">{data.unit}</div>
//       <div className="flex items-center justify-between gap-3">
//         <div className="p-3 bg-blue-50  rounded w-20">{DisplayPriceInRupees(data.price)}</div>
     
//       <div className="">
//         <button className=''>
//             Add
//         </button>
//        </div>
//       </div>
//     </div>
//   )
// }

// export default CardProduct



import React from 'react'
import { DisplayPriceInRupees } from '../utils/DisplayPriceRupees'

const CardProduct = ({ data }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 p-3 w-56">

      {/* Image Section */}
      <div className="bg-gray-50 rounded-xl h-36 flex items-center justify-center overflow-hidden">
        <img
          src={data.image?.[0]}
          alt={data.name}
          className="h-full object-contain transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Delivery Time */}
      <div className="mt-3">
        <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full font-medium">
          10 min
        </span>
      </div>

      {/* Product Name */}
      <div className="mt-2">
        <h2 className="text-sm font-semibold text-gray-800 line-clamp-2">
          {data.name}
        </h2>
      </div>

      {/* Unit */}
      <div className="text-xs text-gray-500 mt-1">
        {data.unit}
      </div>

      {/* Price + Button */}
      <div className="flex items-center justify-between mt-3">
        <div className="text-base font-bold text-gray-900">
          {DisplayPriceInRupees(data.price)}
        </div>

        <button className="bg-green-700 hover:bg-green-700 text-white text-xs px-4 py-1.5 rounded-lg transition-all duration-200">
          Add
        </button>
      </div>

    </div>
  )
}

export default CardProduct
