
// import React, { useState } from 'react'
// import { IoClose } from "react-icons/io5";
// import uploadImage from "../utils/Uploadimage"
// import Axios from '../utils/Axios';
// import SummaryApi from '../common/SummaryApi';
// import toast from 'react-hot-toast'
// import AxiosToastError from '../utils/AxiosToastError';
// import Uploadimage from '../utils/Uploadimage';

// const UploadCategoryModel = ({close, fetchData}) => {
//     const [data,setData] = useState({
//         name : "",
//         image : ""
//     })
//     const [loading,setLoading] = useState(false)

//     const handleOnChange = (e)=>{
//         const { name, value} = e.target

//         setData((preve)=>{
//             return{
//                 ...preve,
//                 [name] : value
//             }
//         })
//     }

//     const handleSubmit = async(e)=>{
//         e.preventDefault()


//         try {
//             setLoading(true)
//             const response = await Axios({
//                 ...SummaryApi.addCategory,
//                 data : data
//             })
//             const { data : responseData } = response

//             if(responseData.success){
//                 toast.success(responseData.message)
//                 close()
//                 fetchData()
//             }
//         } catch (error) {
//             AxiosToastError(error)
//         }finally{
//             setLoading(false)
//         }
//     }

//     // const handleUploadCategoryImage = async(e)=>{
//     //     const file = e.target.files[0]

//     //     if(!file){
//     //         return
//     //     }

//     //     const response = await uploadImage(file)
//     //     const { data : ImageResponse } = response

//     //     setData((preve)=>{
//     //         return{
//     //             ...preve,
//     //             image : ImageResponse.data.url
//     //         }
//     //     })
//     // }
//     const handleUploadCategoryImage = async (e) => {
//   const file = e.target.files[0]
//   if (!file) return

//   const response = await uploadImage(file)

//   setData((preve) => {
//     return {
//       ...preve,
//       image: response?.data?.url || ""
//     }
//   })
// }
//   return (
//     <section className='fixed top-0 bottom-0 left-0 right-0 p-4 bg-neutral-800/60 flex items-center justify-center'>
//         <div className='bg-white max-w-4xl w-full p-4 rounded'>
//             <div className='flex items-center justify-between'>
//                 <h1 className='font-semibold'>Category</h1>
//                 <button onClick={close} className='w-fit block ml-auto'>
//                     <IoClose size={25}/>
//                 </button>
//             </div>
//             <form className='my-3 grid gap-2' onSubmit={handleSubmit}>
//                 <div className='grid gap-1'>
//                     <label id='categoryName'>Name</label>
//                     <input
//                         type='text'
//                         id='categoryName'
//                         placeholder='Enter category name'
//                         value={data.name}
//                         name='name'
//                         onChange={handleOnChange}
//                         className='bg-blue-50 p-2 border border-blue-100 focus-within:border-primary-200 outline-none rounded'
//                     />
//                 </div>
//                 <div className='grid gap-1'>
//                     <p>Image</p>
//                     <div className='flex gap-4 flex-col lg:flex-row items-center'>
//                         <div className='border bg-blue-50 h-36 w-full lg:w-36 flex items-center justify-center rounded'>
//                             {
//                                 data.image ? (
//                                     <img
//                                         alt='category'
//                                         src={data.image}
//                                         className='w-full h-full object-scale-down'
//                                     />
//                                 ) : (
//                                     <p className='text-sm text-neutral-500'>No Image</p>
//                                 )
//                             }
                            
//                         </div>
//                         <label htmlFor='uploadCategoryImage'>
//                             <div  className={`
//                             ${!data.name ? "bg-gray-300" : "border-primary-200 hover:bg-primary-100" }  
//                                 px-4 py-2 rounded cursor-pointer border font-medium
//                             `}>Upload Image</div>

//                             <input disabled={!data.name} onChange={handleUploadCategoryImage} type='file' id='uploadCategoryImage' className='hidden'/>
//                         </label>
                        
//                     </div>
//                 </div>

//                 <button
//                     className={`
//                     ${data.name && data.image ? "bg-primary-200 hover:bg-primary-100" : "bg-gray-300 "}
//                     py-2    
//                     font-semibold 
//                     `}
//                 >Add Category</button>
//             </form>
//         </div>
//     </section>
//   )
// }

// export default UploadCategoryModel

import React, { useState } from 'react'
import { IoClose } from "react-icons/io5"
import uploadImage from "../utils/Uploadimage"
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'

const UploadCategoryModel = ({ close, fetchData }) => {

  const [data, setData] = useState({
    name: "",
    image: ""
  })

  const [loading, setLoading] = useState(false)

  // =======================
  // INPUT CHANGE
  // =======================
  const handleOnChange = (e) => {
    const { name, value } = e.target
    setData((preve) => ({
      ...preve,
      [name]: value
    }))
  }

  // =======================
  // SUBMIT CATEGORY
  // =======================
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)

      const response = await Axios({
        ...SummaryApi.   addCategory,
        data: data
      })

      const { data: responseData } = response

      if (responseData.success) {
        toast.success(responseData.message)
        close()
        fetchData()
      }

    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  // =======================
  // UPLOAD IMAGE
  // =======================
  const handleUploadCategoryImage = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    try {
      setLoading(true)

      const response = await uploadImage(file)

      setData((preve) => ({
        ...preve,
        image: response?.data?.url || ""
      }))

    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    // <section className="fixed inset-0 p-4 bg-neutral-800/60 flex items-center justify-center z-50">
    //   <div className="bg-white max-w-4xl w-full p-4 rounded">

    //     {/* HEADER */}
    //     <div className="flex items-center justify-between">
    //       <h1 className="font-semibold">Category</h1>
    //       <button onClick={close}>
    //         <IoClose size={25} />
    //       </button>
    //     </div>

    //     {/* FORM */}
    //     <form className="my-3 grid gap-2" onSubmit={handleSubmit}>

    //       {/* NAME */}
    //       <div className="grid gap-1">
    //         <label>Name</label>
    //         <input
    //           type="text"
    //           placeholder="Enter category name"
    //           value={data.name}
    //           name="name"
    //           onChange={handleOnChange}
    //           disabled={loading}
    //           className="bg-blue-50 p-2 border border-blue-100 outline-none rounded"
    //         />
    //       </div>

    //       {/* IMAGE */}
    //       <div className="grid gap-1">
    //         <p>Image</p>

    //         <div className="flex gap-4 flex-col lg:flex-row items-center">

    //           {/* PREVIEW */}
    //           <div className="border bg-blue-50 h-36 w-full lg:w-36 flex items-center justify-center rounded">
    //             {
    //               loading ? (
    //                 <p className="text-sm text-neutral-500">Loading...</p>
    //               ) : data.image ? (
    //                 <img
    //                   src={data.image}
    //                   alt="category"
    //                   className="w-full h-full object-scale-down"
    //                 />
    //               ) : (
    //                 <p className="text-sm text-neutral-500">No Image</p>
    //               )
    //             }
    //           </div>

    //           {/* UPLOAD BUTTON */}
    //           <label htmlFor="uploadCategoryImage">
    //             <div
    //               className={`
    //                 ${!data.name || loading
    //                   ? "bg-gray-300 cursor-not-allowed"
    //                   : "border-primary-200 hover:bg-primary-100"
    //                 }
    //                 px-4 py-2 rounded cursor-pointer border font-medium
    //               `}
    //             >
    //               {loading ? "Uploading..." : "Upload Image"}
    //             </div>

    //             <input
    //               disabled={!data.name || loading}
    //               onChange={handleUploadCategoryImage}
    //               type="file"
    //               id="uploadCategoryImage"
    //               className="hidden"
    //             />
    //           </label>

    //         </div>
    //       </div>

    //       {/* SUBMIT BUTTON */}
    //       <button
    //         disabled={loading}
    //         className={`
    //           ${data.name && data.image && !loading
    //             ? "bg-primary-200 hover:bg-primary-100"
    //             : "bg-gray-300 cursor-not-allowed"
    //           }
    //           py-2 font-semibold rounded
    //         `}
    //       >
    //         {loading ? "Please wait..." : "Add Category"}
    //       </button>

    //     </form>
    //   </div>
    // </section>
//     <section className="fixed inset-0 p-4 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
//   <div className="bg-white max-w-4xl w-full p-6 rounded-2xl shadow-2xl border border-gray-100">

//     {/* HEADER */}
//     <div className="flex items-center justify-between pb-3 border-b">
//       <h1 className="text-lg font-semibold text-gray-800">
//         Add Category
//       </h1>
//       <button
//         onClick={close}
//         className="p-1 rounded-full hover:bg-gray-100 transition"
//       >
//         <IoClose size={22} />
//       </button>
//     </div>

//     {/* FORM */}
//     <form className="mt-4 grid gap-4" onSubmit={handleSubmit}>

//       {/* NAME */}
//       <div className="grid gap-1">
//         <label className="text-sm font-medium text-gray-700">
//           Category Name
//         </label>
//         <input
//           type="text"
//           placeholder="e.g. Electronics"
//           value={data.name}
//           name="name"
//           onChange={handleOnChange}
//           disabled={loading}
//           className="
//             bg-gray-50 px-4 py-2.5 rounded-xl
//             border border-gray-200
//             focus:outline-none focus:ring-2 focus:ring-primary-200
//             transition
//           "
//         />
//       </div>

//       {/* IMAGE */}
//       <div className="grid gap-2">
//         <label className="text-sm font-medium text-gray-700">
//           Category Image
//         </label>

//         <div className="flex gap-4 flex-col lg:flex-row items-center">

//           {/* PREVIEW */}
//           <div className="
//             h-36 w-full lg:w-36
//             rounded-xl border border-dashed border-gray-300
//             bg-gray-50 flex items-center justify-center
//           ">
//             {
//               loading ? (
//                 <p className="text-sm text-gray-400">Uploading...</p>
//               ) : data.image ? (
//                 <img
//                   src={data.image}
//                   alt="category"
//                   className="w-full h-full object-contain rounded-xl"
//                 />
//               ) : (
//                 <p className="text-sm text-gray-400">No Image</p>
//               )
//             }
//           </div>

//           {/* UPLOAD BUTTON */}
//           <label htmlFor="uploadCategoryImage">
//             <div
//               className={`
//                 ${!data.name || loading
//                   ? "bg-gray-200 text-gray-400 cursor-not-allowed"
//                   : "bg-primary-200 hover:bg-primary-100 text-gray-900"
//                 }
//                 px-5 py-2.5 rounded-xl cursor-pointer
//                 font-medium transition shadow-sm
//               `}
//             >
//               {loading ? "Uploading..." : "Upload Image"}
//             </div>

//             <input
//               disabled={!data.name || loading}
//               onChange={handleUploadCategoryImage}
//               type="file"
//               id="uploadCategoryImage"
//               className="hidden"
//             />
//           </label>

//         </div>
//       </div>

//       {/* SUBMIT */}
//       <button
//         disabled={loading}
//         className={`
//           ${data.name && data.image && !loading
//             ? "bg-gradient-to-r from-primary-200 to-primary-100 hover:opacity-90"
//             : "bg-gray-200 text-gray-400 cursor-not-allowed"
//           }
//           py-3 rounded-xl font-semibold transition shadow-md
//         `}
//       >
//         {loading ? "Please wait..." : "Add Category"}
//       </button>

//     </form>
//   </div>
// </section>
<section
  className="
    fixed inset-0 p-4
    bg-black/60 backdrop-blur-sm
    flex items-center justify-center
    z-50
    animate-overlayFade
  "
>
  <div
    className="
      bg-white max-w-4xl w-full p-6
      rounded-2xl shadow-2xl
      border border-gray-100
      animate-modalPop
    "
  >

    {/* HEADER */}
    <div className="flex items-center justify-between pb-3 border-b">
      <h1 className="text-lg font-semibold text-gray-800">
        Add Category
      </h1>

      <button
        onClick={close}
        className="
          p-1 rounded-full
          transition-all duration-300
          hover:bg-gray-100
          hover:rotate-90
          active:scale-90
        "
      >
        <IoClose size={22} />
      </button>
    </div>

    {/* FORM */}
    <form className="mt-4 grid gap-4" onSubmit={handleSubmit}>

      {/* NAME */}
      <div className="grid gap-1">
        <label className="text-sm font-medium text-gray-700">
          Category Name
        </label>

        <input
          type="text"
          placeholder="e.g. Electronics"
          value={data.name}
          name="name"
          onChange={handleOnChange}
          disabled={loading}
          className="
            bg-gray-50 px-4 py-2.5 rounded-xl
            border border-gray-200
            focus:outline-none
            focus:ring-2 focus:ring-primary-200
            focus:scale-[1.01]
            transition-all duration-300
          "
        />
      </div>

      {/* IMAGE */}
      <div className="grid gap-2">
        <label className="text-sm font-medium text-gray-700">
          Category Image
        </label>

        <div className="flex gap-4 flex-col lg:flex-row items-center">

          {/* PREVIEW */}
          <div
            className="
              h-36 w-full lg:w-36
              rounded-xl border border-dashed border-gray-300
              bg-gray-50 flex items-center justify-center
              transition-all duration-300
              hover:border-primary-200
              hover:bg-primary-50
            "
          >
            {loading ? (
              <p className="text-sm text-gray-400 animate-pulse">
                Uploading...
              </p>
            ) : data.image ? (
              <img
                src={data.image}
                alt="category"
                className="
                  w-full h-full object-contain rounded-xl
                  animate-imageFade
                "
              />
            ) : (
              <p className="text-sm text-gray-400">
                No Image
              </p>
            )}
          </div>

          {/* UPLOAD BUTTON */}
          <label htmlFor="uploadCategoryImage">
            <div
              className={`
                ${!data.name || loading
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-primary-200 hover:bg-primary-100 text-gray-900"
                }
                px-5 py-2.5 rounded-xl
                cursor-pointer font-medium
                transition-all duration-300
                hover:shadow-lg
                active:scale-95
              `}
            >
              {loading ? "Uploading..." : "Upload Image"}
            </div>

            <input
              disabled={!data.name || loading}
              onChange={handleUploadCategoryImage}
              type="file"
              id="uploadCategoryImage"
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* SUBMIT */}
      <button
        disabled={loading}
        className={`
          ${data.name && data.image && !loading
            ? "bg-gradient-to-r from-primary-200 to-primary-100 hover:opacity-90"
            : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }
          py-3 rounded-xl font-semibold
          transition-all duration-300
          shadow-md
          hover:shadow-xl
          active:scale-[0.98]
        `}
      >
        {loading ? "Please wait..." : "Add Category"}
      </button>

    </form>
  </div>
</section>


  )
}

export default UploadCategoryModel
