// import React, { useEffect, useState } from 'react'
// import { IoClose } from "react-icons/io5"
// import uploadImage from "../utils/Uploadimage"
// import Axios from '../utils/Axios'
// import SummaryApi from '../common/SummaryApi'
// import toast from 'react-hot-toast'
// import AxiosToastError from '../utils/AxiosToastError'

// const UploadCategoryModel = ({ close, fetchData, editData }) => {

//   const isEdit = Boolean(editData)

//   const [data, setData] = useState({
//     name: "",
//     image: ""
//   })

//   const [loading, setLoading] = useState(false)

//   // 🔥 EDIT MODE: old data fill
//   useEffect(() => {
//     if (editData) {
//       setData({
//         name: editData.name || "",
//         image: editData.image || ""
//       })
//     } else {
//       setData({
//         name: "",
//         image: ""
//       })
//     }
//   }, [editData])

//   // =======================
//   // INPUT CHANGE
//   // =======================
//   const handleOnChange = (e) => {
//     const { name, value } = e.target
//     setData(prev => ({
//       ...prev,
//       [name]: value
//     }))
//   }

//   // =======================
//   // UPLOAD IMAGE
//   // =======================
//   const handleUploadCategoryImage = async (e) => {
//     const file = e.target.files[0]
//     if (!file) return

//     try {
//       setLoading(true)
//       const response = await uploadImage(file)

//       const imageUrl = response?.data?.url
//       if (!imageUrl) {
//         toast.error("Image upload failed")
//         return
//       }

//       setData(prev => ({
//         ...prev,
//         image: imageUrl
//       }))

//     } catch (error) {
//       AxiosToastError(error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   // =======================
//   // SUBMIT (ADD / EDIT)
//   // =======================
//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     try {
//       setLoading(true)

//       const response = await Axios({
//         ...(isEdit ? SummaryApi.updateCategory : SummaryApi.addCategory),
//         data: isEdit
//           ? { ...data, _id: editData._id }
//           : data
//       })

//       const { data: responseData } = response

//       if (responseData.success) {
//         toast.success(
//           isEdit ? "Category updated successfully" : "Category added successfully"
//         )
//         close()
//         fetchData()
//       }

//     } catch (error) {
//       AxiosToastError(error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <section className="
//       fixed inset-0 p-4 z-50
//       bg-black/60 backdrop-blur-sm
//       flex items-center justify-center
//     ">
//       <div className="
//         bg-white max-w-4xl w-full p-6
//         rounded-2xl shadow-2xl
//       ">

//         {/* HEADER */}
//         <div className="flex items-center justify-between pb-3 border-b">
//           <h1 className="text-lg font-semibold text-gray-800">
//             {isEdit ? "Edit Category" : "Add Category"}
//           </h1>

//           <button onClick={close} className="hover:rotate-90 transition">
//             <IoClose size={22} />
//           </button>
//         </div>

//         {/* FORM */}
//         <form className="mt-4 grid gap-4" onSubmit={handleSubmit}>

//           {/* NAME */}
//           <div className="grid gap-1">
//             <label className="text-sm font-medium">Category Name</label>
//             <input
//               type="text"
//               name="name"
//               value={data.name}
//               onChange={handleOnChange}
//               disabled={loading}
//               className="bg-gray-50 px-4 py-2.5 rounded-xl border"
//               placeholder="e.g. Electronics"
//             />
//           </div>

//           {/* IMAGE */}
//           <div className="grid gap-2">
//             <label className="text-sm font-medium">Category Image</label>

//             <div className="flex gap-4 flex-col lg:flex-row items-center">

//               {/* PREVIEW */}
//               <div className="
//                 h-36 w-full lg:w-36
//                 border border-dashed rounded-xl
//                 flex items-center justify-center
//               ">
//                 {loading ? (
//                   <p className="text-sm text-gray-400">Uploading...</p>
//                 ) : data.image ? (
//                   <img
//                     src={data.image}
//                     alt="category"
//                     className="w-full h-full object-contain rounded-xl"
//                   />
//                 ) : (
//                   <p className="text-sm text-gray-400">No Image</p>
//                 )}
//               </div>

//               {/* UPLOAD */}
//               <label htmlFor="uploadCategoryImage">
//                 <div className={`
//                   ${!data.name || loading
//                     ? "bg-gray-200 text-gray-400 cursor-not-allowed"
//                     : "bg-primary-200 hover:bg-primary-100"
//                   }
//                   px-5 py-2.5 rounded-xl cursor-pointer font-medium
//                 `}>
//                   {loading ? "Uploading..." : "Upload Image"}
//                 </div>

//                 <input
//                   type="file"
//                   id="uploadCategoryImage"
//                   hidden
//                   disabled={!data.name || loading}
//                   onChange={handleUploadCategoryImage}
//                 />
//               </label>
//             </div>
//           </div>

//           {/* SUBMIT */}
//           <button
//             disabled={!data.name || !data.image || loading}
//             className={`
//               ${data.name && data.image && !loading
//                 ? "bg-gradient-to-r from-primary-200 to-primary-100"
//                 : "bg-gray-200 text-gray-400 cursor-not-allowed"
//               }
//               py-3 rounded-xl font-semibold
//             `}
//           >
//             {loading
//               ? "Please wait..."
//               : isEdit ? "Update Category" : "Add Category"}
//           </button>

//         </form>
//       </div>
//     </section>
//   )
// }

// export default UploadCategoryModel
// import React, { useEffect, useState } from 'react'
// import { IoClose } from "react-icons/io5"
// import uploadImage from "../utils/Uploadimage"
// import Axios from '../utils/Axios'
// import SummaryApi from '../common/SummaryApi'
// import toast from 'react-hot-toast'
// import AxiosToastError from '../utils/AxiosToastError'

// const UploadCategoryModel = ({ close, fetchData, editData }) => {

//   const isEdit = Boolean(editData)

//   const [data, setData] = useState({
//     name: "",
//     image: ""
//   })

//   const [loading, setLoading] = useState(false)

//   // EDIT MODE DATA LOAD
//   useEffect(() => {
//     if (editData) {
//       setData({
//         name: editData.name || "",
//         image: editData.image || ""
//       })
//     } else {
//       setData({ name: "", image: "" })
//     }
//   }, [editData])

//   const handleOnChange = (e) => {
//     const { name, value } = e.target
//     setData(prev => ({ ...prev, [name]: value }))
//   }

//   // IMAGE UPLOAD
//   const handleUploadCategoryImage = async (e) => {
//     const file = e.target.files[0]
//     if (!file) return

//     try {
//       setLoading(true)
//       const response = await uploadImage(file)

//       const imageUrl = response?.data?.url
//       if (!imageUrl) return toast.error("Upload failed")

//       setData(prev => ({ ...prev, image: imageUrl }))
//     } catch (error) {
//       AxiosToastError(error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   // SUBMIT
//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     try {
//       setLoading(true)
//       const response = await Axios({
//         ...(isEdit ? SummaryApi.updateCategory : SummaryApi.addCategory),
//         data: isEdit
//           ? { ...data, _id: editData._id }
//           : data
//       })

//       if (response.data.success) {
//         toast.success(isEdit ? "Category updated" : "Category added")
//         close()
//         fetchData()
//       }
//     } catch (error) {
//       AxiosToastError(error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <section className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
//       <div className="bg-white w-full max-w-4xl rounded-2xl p-6 shadow-2xl">

//         {/* HEADER */}
//         <div className="flex justify-between items-center border-b pb-3">
//           <h1 className="text-lg font-semibold">
//             {isEdit ? "Edit Category" : "Add Category"}
//           </h1>
//           <button onClick={close}>
//             <IoClose size={22} />
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} className="mt-4 grid gap-4">

//           {/* NAME */}
//           <input
//             type="text"
//             name="name"
//             value={data.name}
//             onChange={handleOnChange}
//             placeholder="Category name"
//             className="border rounded-xl px-4 py-2"
//           />

//           {/* IMAGE PREVIEW FIXED */}
//           <div className="flex gap-4 items-center">
//             <div className="h-36 w-36 bg-gray-100 flex items-center justify-center rounded-xl">
//               {data.image ? (
//                 <img
//                   src={data.image}
//                   alt="preview"
//                   className="
//                     max-h-full max-w-full
//                     object-contain
//                   "
//                 />
//               ) : (
//                 <span className="text-sm text-gray-400">No Image</span>
//               )}
//             </div>

//             <label>
//               <div className="px-5 py-2 rounded-xl bg-primary-200 cursor-pointer">
//                 Upload Image
//               </div>
//               <input
//                 type="file"
//                 hidden
//                 onChange={handleUploadCategoryImage}
//               />
//             </label>
//           </div>

//           <button
//             disabled={!data.name || !data.image || loading}
//             className="
//               bg-amber-500 text-white
//               py-3 rounded-xl font-semibold
//               disabled:bg-gray-300
//             "
//           >
//             {loading
//               ? "Please wait..."
//               : isEdit ? "Update Category" : "Add Category"}
//           </button>

//         </form>
//       </div>
//     </section>
//   )
// }

// export default UploadCategoryModel
import React, { useEffect, useState } from 'react'
import { IoClose } from "react-icons/io5"
import uploadImage from "../utils/Uploadimage"
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'

const UploadCategoryModel = ({
  close,
  fetchData,
  editData,
  categoryList // ✅ ADDED (for validation only)
}) => {

  const isEdit = Boolean(editData)

  const [data, setData] = useState({
    name: "",
    image: ""
  })

  const [loading, setLoading] = useState(false)

  // EDIT MODE DATA LOAD
  useEffect(() => {
    if (editData) {
      setData({
        name: editData.name || "",
        image: editData.image || ""
      })
    } else {
      setData({ name: "", image: "" })
    }
  }, [editData])

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setData(prev => ({ ...prev, [name]: value }))
  }

  // IMAGE UPLOAD
  const handleUploadCategoryImage = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    try {
      setLoading(true)
      const response = await uploadImage(file)

      const imageUrl = response?.data?.url
      if (!imageUrl) return toast.error("Upload failed")

      setData(prev => ({ ...prev, image: imageUrl }))
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault()

    // ==========================
    // ✅ DUPLICATE NAME VALIDATION
    // ==========================
    const isDuplicate = categoryList?.some(cat =>
      cat.name.trim().toLowerCase() === data.name.trim().toLowerCase() &&
      cat._id !== editData?._id
    )

    if (isDuplicate) {
      toast.error("Category already exists")
      return
    }
    // ==========================

    try {
      setLoading(true)
      const response = await Axios({
        ...(isEdit ? SummaryApi.updateCategory : SummaryApi.addCategory),
        data: isEdit
          ? { ...data, _id: editData._id }
          : data
      })

      if (response.data.success) {
        toast.success(isEdit ? "Category updated" : "Category added")
        close()
        fetchData()
      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-4xl rounded-2xl p-6 shadow-2xl">

        {/* HEADER */}
        <div className="flex justify-between items-center border-b pb-3">
          <h1 className="text-lg font-semibold">
            {isEdit ? "Edit Category" : "Add Category"}
          </h1>
          <button onClick={close}>
            <IoClose size={22} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 grid gap-4">

          <input
            type="text"
            name="name"
            value={data.name}
            onChange={handleOnChange}
            placeholder="Category name"
            className="border rounded-xl px-4 py-2"
          />

          <div className="flex gap-4 items-center">
            <div className="h-36 w-36 bg-gray-100 flex items-center justify-center rounded-xl">
              {data.image ? (
                <img
                  src={data.image}
                  alt="preview"
                  className="max-h-full max-w-full object-contain"
                />
              ) : (
                <span className="text-sm text-gray-400">No Image</span>
              )}
            </div>

            <label>
              <div className="px-5 py-2 rounded-xl bg-primary-200 cursor-pointer">
                Upload Image
              </div>
              <input
                type="file"
                hidden
                onChange={handleUploadCategoryImage}
              />
            </label>
          </div>

          <button
            disabled={!data.name || !data.image || loading}
            className="
              bg-amber-500 text-white
              py-3 rounded-xl font-semibold
              disabled:bg-gray-300
            "
          >
            {loading
              ? "Please wait..."
              : isEdit ? "Update Category" : "Add Category"}
          </button>

        </form>
      </div>
    </section>
  )
}

export default UploadCategoryModel

