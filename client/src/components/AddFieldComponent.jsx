// import React from 'react'
// import { IoClose } from "react-icons/io5";

// const AddFieldComponent = ({close,value,onChange,submit}) => {
//   return (
//    <section className='fixed top-0 bottom-0 right-0 left-0 bg-neutral-900/70
//  z-50 flex justify-center items-center p-4'>
//         <div className='bg-white rounded p-4 w-full max-w-md'>
//             <div className='flex items-center justify-between gap-3'>
//                 <h1 className='font-semibold'>Add Field</h1>
//                 <button onClick={close}>
//                     <IoClose size={25}/>
//                 </button>
//             </div>
//             <input
//                  className='bg-blue-50 my-3 p-2 border outline-none focus-within:border-primary-100 rounded w-full '
//                  placeholder='Enter field name'
//                  value={value}
//                  onChange={onChange}
//             />
//             <button
//                 onClick={submit}
//                 className='bg-primary-200 hover:bg-primary-100 px-4 py-2 rounded mx-auto w-fit block'
//             >Add Field</button>
//         </div>
//    </section>
//   )
// }

// export default AddFieldComponent



import React from 'react'
import { IoClose } from "react-icons/io5";

const AddFieldComponent = ({close,value,onChange,submit}) => {
  return (
    <section className='fixed top-0 bottom-0 right-0 left-0 bg-black/50 backdrop-blur-sm
      z-50 flex justify-center items-center p-4 animate-in fade-in duration-200'>
      <div className='bg-white rounded-xl shadow-2xl w-full max-w-md 
        animate-in slide-in-from-bottom-4 duration-300'>
        
        {/* Header */}
        <div className='flex items-center justify-between gap-3 px-6 py-4 border-b'>
          <h1 className='font-semibold text-lg text-gray-800'>Add New Field</h1>
          <button 
            onClick={close}
            className='text-gray-500 hover:text-gray-700 hover:bg-gray-100 
              rounded-lg p-1.5 transition-colors duration-200'
          >
            <IoClose size={22}/>
          </button>
        </div>
        
        {/* Content */}
        <div className='p-6'>
          <label className='text-sm font-medium text-gray-600 mb-1.5 block'>
            Field Name
          </label>
          <input
            className='w-full px-4 py-2.5 border border-gray-200 rounded-lg 
              focus:border-blue-400 focus:ring-4 focus:ring-blue-50 
              outline-none transition-all duration-200
              placeholder:text-gray-400 text-gray-700'
            placeholder='e.g., Email Address'
            value={value}
            onChange={onChange}
            autoFocus
          />
        </div>
        
        {/* Footer */}
        <div className='flex items-center justify-end gap-3 px-6 py-4 bg-gray-50 rounded-b-xl'>
          <button
            onClick={close}
            className='px-5 py-2 text-gray-600 hover:text-gray-800 
              hover:bg-gray-200 rounded-lg font-medium transition-all duration-200'
          >
            Cancel
          </button>
          <button
            onClick={submit}
            className='px-5 py-2 bg-blue-600 hover:bg-blue-700 
              text-white font-medium rounded-lg shadow-lg 
              shadow-blue-200 hover:shadow-xl hover:shadow-blue-200
              transform hover:-translate-y-0.5 transition-all duration-200'
          >
            Add Field
          </button>
        </div>
      </div>
    </section>
  )
}

export default AddFieldComponent