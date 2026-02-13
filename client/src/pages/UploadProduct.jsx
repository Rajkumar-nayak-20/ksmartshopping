// import React, { useState, useEffect } from "react"
// import { FaCloudUploadAlt } from "react-icons/fa"
// import { MdDelete } from "react-icons/md"
// import { IoClose } from "react-icons/io5"
// import { useSelector, useDispatch } from "react-redux"

// import uploadImage from "../utils/UploadImage"
// import ViewImage from "../components/ViewImage"
// import AddFieldComponent from "../components/AddFieldComponent"
// import Axios from "../utils/Axios"
// import SummaryApi from "../common/SummaryApi"
// import AxiosToastError from "../utils/AxiosToastError"
// import successAlert from "../utils/SuccessAlert"

// import { fetchCategory, fetchSubCategory } from "../store/productAction"

// const UploadProduct = () => {

//   const dispatch = useDispatch()

//   const allCategory = useSelector(
//     (state) => state.product?.allCategory || []
//   )

//   const allSubCategory = useSelector(
//     (state) => state.product?.allSubCategory || []
//   )

//   const [data, setData] = useState({
//     name: "",
//     image: [],
//     category: [],
//     subCategory: [],
//     unit: "",
//     stock: "",
//     price: "",
//     discount: "",
//     description: "",
//     more_details: {},
//   })

//   const [selectCategory, setSelectCategory] = useState("")
//   const [selectSubCategory, setSelectSubCategory] = useState("")
//   const [ViewImageURL, setViewImageURL] = useState("")
//   const [openAddField, setOpenAddField] = useState(false)
//   const [fieldName, setFieldName] = useState("")

//   // ================= FETCH CATEGORY & SUBCATEGORY =================
//   useEffect(() => {
//     fetchCategory(dispatch)
//     fetchSubCategory(dispatch)
//   }, [dispatch])

//   // ================= HANDLE CHANGE =================
//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setData((prev) => ({
//       ...prev,
//       [name]: value,
//     }))
//   }

//   // ================= IMAGE UPLOAD =================
//   const handleUploadImage = async (e) => {
//     const file = e.target.files[0]
//     if (!file) return

//     try {
//       const response = await uploadImage(file)
//       const imageUrl =
//         response?.data?.url || response?.data?.data?.url

//       if (!imageUrl) return

//       setData((prev) => ({
//         ...prev,
//         image: [...prev.image, imageUrl],
//       }))
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   const handleDeleteImage = (index) => {
//     const newImages = [...data.image]
//     newImages.splice(index, 1)
//     setData({ ...data, image: newImages })
//   }

//   // ================= CATEGORY SELECT =================
//   const handleCategorySelect = (value) => {
//     if (!value) return
//     setData((prev) => ({
//       ...prev,
//       category: [...prev.category, value],
//     }))
//   }

//   const handleSubCategorySelect = (value) => {
//     if (!value) return
//     setData((prev) => ({
//       ...prev,
//       subCategory: [...prev.subCategory, value],
//     }))
//   }

//   const handleRemoveCategory = (index) => {
//     const updated = [...data.category]
//     updated.splice(index, 1)
//     setData({ ...data, category: updated })
//   }

//   const handleRemoveSubCategory = (index) => {
//     const updated = [...data.subCategory]
//     updated.splice(index, 1)
//     setData({ ...data, subCategory: updated })
//   }

//   // ================= ADD CUSTOM FIELD =================
//   const handleAddField = () => {
//     if (!fieldName) return

//     setData((prev) => ({
//       ...prev,
//       more_details: {
//         ...prev.more_details,
//         [fieldName]: "",
//       },
//     }))

//     setFieldName("")
//     setOpenAddField(false)
//   }

//   // ================= SUBMIT =================
//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     try {
//       const response = await Axios({
//         ...SummaryApi.createProduct,
//         data: data,
//       })

//       if (response.data.success) {
//         successAlert(response.data.message)
//         setData({
//           name: "",
//           image: [],
//           category: [],
//           subCategory: [],
//           unit: "",
//           stock: "",
//           price: "",
//           discount: "",
//           description: "",
//           more_details: {},
//         })
//       }
//     } catch (error) {
//       AxiosToastError(error)
//     }

//     console.log("Submitted Data:", data)
//   }

//   // ================= UI =================
//   return (
//     <section>
//       <div className="p-2 bg-white shadow-md">
//         <h2 className="font-semibold">Upload Product</h2>
//       </div>

//       <div className="p-3">
//         <form className="grid gap-4" onSubmit={handleSubmit}>

//           <input
//             type="text"
//             name="name"
//             placeholder="Product Name"
//             value={data.name}
//             onChange={handleChange}
//             className="bg-blue-50 p-2 border rounded"
//             required
//           />

//           <textarea
//             name="description"
//             placeholder="Description"
//             value={data.description}
//             onChange={handleChange}
//             className="bg-blue-50 p-2 border rounded"
//             rows={3}
//             required
//           />

//           {/* IMAGE */}
//           <label className="bg-blue-50 h-24 border rounded flex justify-center items-center cursor-pointer">
//             <div className="text-center">
//               <FaCloudUploadAlt size={35} />
//               <p>Upload Image</p>
//             </div>
//             <input
//               type="file"
//               hidden
//               accept="image/*"
//               onChange={handleUploadImage}
//             />
//           </label>

//           <div className="flex gap-3 flex-wrap">
//             {data.image.map((img, index) => (
//               <div key={index} className="relative w-20 h-20 border">
//                 <img
//                   src={img}
//                   alt=""
//                   className="w-full h-full object-cover"
//                   onClick={() => setViewImageURL(img)}
//                 />
//                 <div
//                   onClick={() => handleDeleteImage(index)}
//                   className="absolute bottom-0 right-0 bg-red-600 text-white p-1 cursor-pointer"
//                 >
//                   <MdDelete />
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* CATEGORY */}
//           <select
//             value={selectCategory}
//             onChange={(e) => {
//               handleCategorySelect(e.target.value)
//               setSelectCategory("")
//             }}
//             className="bg-blue-50 p-2 border rounded"
//           >
//             <option value="">Select Category</option>
//             {allCategory.map((c) => (
//               <option key={c._id} value={c._id}>
//                 {c.name}
//               </option>
//             ))}
//           </select>

//           <div className="flex gap-2 flex-wrap">
//             {data.category.map((id, index) => {
//               const cat = allCategory.find(c => c._id === id)
//               return (
//                 <div key={index} className="bg-blue-100 px-2 py-1 flex items-center gap-1">
//                   {cat?.name}
//                   <IoClose onClick={() => handleRemoveCategory(index)} />
//                 </div>
//               )
//             })}
//           </div>

//           {/* SUBCATEGORY */}
//           <select
//             value={selectSubCategory}
//             onChange={(e) => {
//               handleSubCategorySelect(e.target.value)
//               setSelectSubCategory("")
//             }}
//             className="bg-blue-50 p-2 border rounded"
//           >
//             <option value="">Select SubCategory</option>
//             {allSubCategory.map((c) => (
//               <option key={c._id} value={c._id}>
//                 {c.name}
//               </option>
//             ))}
//           </select>

//           <div className="flex gap-2 flex-wrap">
//             {data.subCategory.map((id, index) => {
//               const sub = allSubCategory.find(s => s._id === id)
//               return (
//                 <div key={index} className="bg-blue-100 px-2 py-1 flex items-center gap-1">
//                   {sub?.name}
//                   <IoClose onClick={() => handleRemoveSubCategory(index)} />
//                 </div>
//               )
//             })}
//           </div>

//         </form>
//       </div>

//       {ViewImageURL && (
//         <ViewImage url={ViewImageURL} close={() => setViewImageURL("")} />
//       )}

//       {openAddField && (
//         <AddFieldComponent
//           value={fieldName}
//           onChange={(e) => setFieldName(e.target.value)}
//           submit={handleAddField}
//           close={() => setOpenAddField(false)}
//         />
//       )}

//                 <div className='grid gap-1'>
//                   <label htmlFor='unit' className='font-medium'>Unit</label>
//                   <input
//                     id='unit'
//                     type='text'
//                     placeholder='Enter product unit'
//                     name='unit'
//                     value={data.unit}
//                     onChange={handleChange}
//                     required
//                     className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
//                   />
//                 </div>

//                 <div className='grid gap-1'>
//                   <label htmlFor='stock' className='font-medium'>Number of Stock</label>
//                   <input
//                     id='stock'
//                     type='number'
//                     placeholder='Enter product stock'
//                     name='stock'
//                     value={data.stock}
//                     onChange={handleChange}
//                     required
//                     className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
//                   />
//                 </div>

//                 <div className='grid gap-1'>
//                   <label htmlFor='price' className='font-medium'>Price</label>
//                   <input
//                     id='price'
//                     type='number'
//                     placeholder='Enter product price'
//                     name='price'
//                     value={data.price}
//                     onChange={handleChange}
//                     required
//                     className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
//                   />
//                 </div>

//                 <div className='grid gap-1'>
//                   <label htmlFor='discount' className='font-medium'>Discount</label>
//                   <input
//                     id='discount'
//                     type='number'
//                     placeholder='Enter product discount'
//                     name='discount'
//                     value={data.discount}
//                     onChange={handleChange}
//                     required
//                     className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
//                   />
//                 </div>

//                 {/**add more field**/}
//                   {
//                     Object?.keys(data?.more_details)?.map((k,index)=>{
//                         return(
//                           <div className='grid gap-1'>
//                             <label htmlFor={k} className='font-medium'>{k}</label>
//                             <input
//                               id={k}
//                               type='text'
//                               value={data?.more_details[k]}
//                               onChange={(e)=>{
//                                   const value = e.target.value
//                                   setData((preve)=>{
//                                     return{
//                                         ...preve,
//                                         more_details : {
//                                           ...preve.more_details,
//                                           [k] : value
//                                         }
//                                     }
//                                   })
//                               }}
//                               required
//                               className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
//                             />
//                           </div>
//                         )
//                     })
//                   }

//                 <div onClick={()=>setOpenAddField(true)} className=' hover:bg-primary-200 bg-white py-1 px-3 w-32 text-center font-semibold border border-primary-200 hover:text-neutral-900 cursor-pointer rounded'>
//                   Add Fields
//                 </div>

//                <button className="bg-blue-500 text-white p-2 rounded">
//             Submit
//           </button>

//         {
//           ViewImageURL && (
//             <ViewImage url={ViewImageURL} close={()=>setViewImageURL("")}/>
//           )
//         }

//         {
//           openAddField && (
//             <AddFieldComponent
//               value={fieldName}
//               onChange={(e)=>setFieldName(e.target.value)}
//               submit={handleAddField}
//               close={()=>setOpenAddField(false)}
//             />
//           )
//         }

//     </section>
//   )
// }

// export default UploadProduct

// import React, { useState, useEffect } from "react"
// import { FaCloudUploadAlt, FaSpinner, FaCheckCircle, FaBoxOpen, FaTag, FaDollarSign, FaPercent, FaList, FaCubes } from "react-icons/fa"
// import { MdDelete, MdOutlineAddCircleOutline, MdOutlineCategory, MdOutlineInventory } from "react-icons/md"
// import { IoClose, IoPricetagOutline } from "react-icons/io5"
// import { useSelector, useDispatch } from "react-redux"
// import { motion, AnimatePresence } from "framer-motion"

// import uploadImage from "../utils/UploadImage"
// import ViewImage from "../components/ViewImage"
// import AddFieldComponent from "../components/AddFieldComponent"
// import Axios from "../utils/Axios"
// import SummaryApi from "../common/SummaryApi"
// import AxiosToastError from "../utils/AxiosToastError"
// import successAlert from "../utils/SuccessAlert"

// import { fetchCategory, fetchSubCategory } from "../store/productAction"

// const UploadProduct = () => {
//   const dispatch = useDispatch()

//   const allCategory = useSelector((state) => state.product?.allCategory || [])
//   const allSubCategory = useSelector((state) => state.product?.allSubCategory || [])

//   const [data, setData] = useState({
//     name: "",
//     image: [],
//     category: [],
//     subCategory: [],
//     unit: "",
//     stock: "",
//     price: "",
//     discount: "",
//     description: "",
//     more_details: {},
//   })

//   const [selectCategory, setSelectCategory] = useState("")
//   const [selectSubCategory, setSelectSubCategory] = useState("")
//   const [ViewImageURL, setViewImageURL] = useState("")
//   const [openAddField, setOpenAddField] = useState(false)
//   const [fieldName, setFieldName] = useState("")
//   const [uploadingImage, setUploadingImage] = useState(false)
//   const [submitting, setSubmitting] = useState(false)

//   useEffect(() => {
//     fetchCategory(dispatch)
//     fetchSubCategory(dispatch)
//   }, [dispatch])

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setData((prev) => ({
//       ...prev,
//       [name]: value,
//     }))
//   }

//   const handleUploadImage = async (e) => {
//     const file = e.target.files[0]
//     if (!file) return

//     setUploadingImage(true)
//     try {
//       const response = await uploadImage(file)
//       const imageUrl = response?.data?.url || response?.data?.data?.url

//       if (!imageUrl) return

//       setData((prev) => ({
//         ...prev,
//         image: [...prev.image, imageUrl],
//       }))
//     } catch (error) {
//       console.log(error)
//     } finally {
//       setUploadingImage(false)
//     }
//     e.target.value = null
//   }

//   const handleDeleteImage = (index) => {
//     const newImages = [...data.image]
//     newImages.splice(index, 1)
//     setData({ ...data, image: newImages })
//   }

//   const handleCategorySelect = (value) => {
//     if (!value || data.category.includes(value)) return
//     setData((prev) => ({
//       ...prev,
//       category: [...prev.category, value],
//     }))
//   }

//   const handleSubCategorySelect = (value) => {
//     if (!value || data.subCategory.includes(value)) return
//     setData((prev) => ({
//       ...prev,
//       subCategory: [...prev.subCategory, value],
//     }))
//   }

//   const handleRemoveCategory = (index) => {
//     const updated = [...data.category]
//     updated.splice(index, 1)
//     setData({ ...data, category: updated })
//   }

//   const handleRemoveSubCategory = (index) => {
//     const updated = [...data.subCategory]
//     updated.splice(index, 1)
//     setData({ ...data, subCategory: updated })
//   }

//   const handleAddField = () => {
//     if (!fieldName.trim()) return

//     setData((prev) => ({
//       ...prev,
//       more_details: {
//         ...prev.more_details,
//         [fieldName]: "",
//       },
//     }))

//     setFieldName("")
//     setOpenAddField(false)
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     if (data.image.length === 0) {
//       AxiosToastError({ message: "Please upload at least one image" })
//       return
//     }

//     setSubmitting(true)
//     try {
//       const response = await Axios({
//         ...SummaryApi.createProduct,
//         data: data,
//       })

//       if (response.data.success) {
//         successAlert(response.data.message)
//         setData({
//           name: "",
//           image: [],
//           category: [],
//           subCategory: [],
//           unit: "",
//           stock: "",
//           price: "",
//           discount: "",
//           description: "",
//           more_details: {},
//         })
//       }
//     } catch (error) {
//       AxiosToastError(error)
//     } finally {
//       setSubmitting(false)
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
//       <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200/80">
//         <div className="max-w-7xl mx-auto px-4 py-5">
//           <div className="flex items-center gap-3">
//             <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
//               <FaBoxOpen className="text-white text-xl" />
//             </div>
//             <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
//               Upload New Product
//             </h1>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-5xl mx-auto p-4 md:p-6">
//         <motion.form
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           onSubmit={handleSubmit}
//           className="space-y-8"
//         >
//           {/* Basic Information Card */}
//           <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 p-6 space-y-5">
//             <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
//               <div className="p-2 bg-blue-100 rounded-lg">
//                 <FaBoxOpen className="text-blue-600 text-xl" />
//               </div>
//               <h2 className="text-xl font-semibold text-gray-800">Basic Information</h2>
//             </div>

//             <div className="space-y-5">
//               <div className="relative">
//                 <label className="block text-sm font-semibold text-gray-700 mb-1.5">
//                   Product Name <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   name="name"
//                   placeholder="e.g. Premium Wireless Headphones"
//                   value={data.name}
//                   onChange={handleChange}
//                   className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm hover:border-blue-400"
//                   required
//                 />
//               </div>

//               <div className="relative">
//                 <label className="block text-sm font-semibold text-gray-700 mb-1.5">
//                   Description <span className="text-red-500">*</span>
//                 </label>
//                 <textarea
//                   name="description"
//                   placeholder="Describe your product in detail..."
//                   value={data.description}
//                   onChange={handleChange}
//                   rows={4}
//                   className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm hover:border-blue-400 resize-none"
//                   required
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Images Card */}
//           <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 p-6 space-y-5">
//             <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
//               <div className="p-2 bg-green-100 rounded-lg">
//                 <FaCloudUploadAlt className="text-green-600 text-xl" />
//               </div>
//               <h2 className="text-xl font-semibold text-gray-800">Product Images</h2>
//             </div>

//             <div className="space-y-5">
//               <div className="relative">
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleUploadImage}
//                   className="hidden"
//                   id="imageUpload"
//                   disabled={uploadingImage}
//                 />
//                 <label
//                   htmlFor="imageUpload"
//                   className={`relative group flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 ${
//                     uploadingImage
//                       ? "border-gray-300 bg-gray-50"
//                       : "border-blue-300 bg-blue-50/30 hover:bg-blue-100/50 hover:border-blue-500"
//                   }`}
//                 >
//                   {uploadingImage ? (
//                     <div className="text-center">
//                       <FaSpinner className="mx-auto text-3xl text-blue-600 animate-spin mb-2" />
//                       <p className="text-sm font-medium text-gray-600">Uploading image...</p>
//                     </div>
//                   ) : (
//                     <div className="text-center">
//                       <FaCloudUploadAlt className="mx-auto text-4xl text-blue-500 group-hover:scale-110 transition-transform duration-300" />
//                       <p className="mt-2 text-sm font-medium text-gray-700">Click to upload image</p>
//                       <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</p>
//                     </div>
//                   )}
//                 </label>
//               </div>

//               <AnimatePresence>
//                 {data.image.length > 0 && (
//                   <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -20 }}
//                     className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4"
//                   >
//                     {data.image.map((img, index) => (
//                       <motion.div
//                         key={index}
//                         initial={{ opacity: 0, scale: 0.8 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                         exit={{ opacity: 0, scale: 0.8 }}
//                         whileHover={{ scale: 1.05 }}
//                         className="relative group/image rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
//                       >
//                         <img
//                           src={img}
//                           alt={`Product ${index + 1}`}
//                           className="w-full h-24 object-cover cursor-pointer"
//                           onClick={() => setViewImageURL(img)}
//                         />
//                         <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300" />
//                         <button
//                           type="button"
//                           onClick={() => handleDeleteImage(index)}
//                           className="absolute bottom-1 right-1 bg-red-500 text-white p-1.5 rounded-lg opacity-0 group-hover/image:opacity-100 transition-all duration-300 hover:bg-red-600 shadow-lg"
//                         >
//                           <MdDelete size={16} />
//                         </button>
//                       </motion.div>
//                     ))}
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>
//           </div>

//           {/* Category Card */}
//           <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 p-6 space-y-5">
//             <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
//               <div className="p-2 bg-purple-100 rounded-lg">
//                 <MdOutlineCategory className="text-purple-600 text-xl" />
//               </div>
//               <h2 className="text-xl font-semibold text-gray-800">Categories</h2>
//             </div>

//             <div className="space-y-5">
//               {/* Category */}
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-1.5">Select Category</label>
//                 <select
//                   value={selectCategory}
//                   onChange={(e) => {
//                     handleCategorySelect(e.target.value)
//                     setSelectCategory("")
//                   }}
//                   className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm hover:border-blue-400 appearance-none cursor-pointer"
//                 >
//                   <option value="" disabled>Choose a category</option>
//                   {allCategory.map((c) => (
//                     <option key={c._id} value={c._id}>
//                       {c.name}
//                     </option>
//                   ))}
//                 </select>

//                 <AnimatePresence>
//                   {data.category.length > 0 && (
//                     <motion.div
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       className="flex flex-wrap gap-2 mt-3"
//                     >
//                       {data.category.map((id, index) => {
//                         const cat = allCategory.find(c => c._id === id)
//                         return (
//                           <motion.span
//                             key={index}
//                             initial={{ opacity: 0, scale: 0.8 }}
//                             animate={{ opacity: 1, scale: 1 }}
//                             exit={{ opacity: 0, scale: 0.8 }}
//                             className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-blue-100 to-purple-100 text-gray-700 rounded-lg text-sm font-medium shadow-sm"
//                           >
//                             {cat?.name}
//                             <button
//                               type="button"
//                               onClick={() => handleRemoveCategory(index)}
//                               className="hover:bg-white/50 rounded-full p-0.5 transition-colors"
//                             >
//                               <IoClose size={16} />
//                             </button>
//                           </motion.span>
//                         )
//                       })}
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>

//               {/* SubCategory */}
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-1.5">Select SubCategory</label>
//                 <select
//                   value={selectSubCategory}
//                   onChange={(e) => {
//                     handleSubCategorySelect(e.target.value)
//                     setSelectSubCategory("")
//                   }}
//                   className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm hover:border-blue-400 appearance-none cursor-pointer"
//                 >
//                   <option value="" disabled>Choose a subcategory</option>
//                   {allSubCategory.map((c) => (
//                     <option key={c._id} value={c._id}>
//                       {c.name}
//                     </option>
//                   ))}
//                 </select>

//                 <AnimatePresence>
//                   {data.subCategory.length > 0 && (
//                     <motion.div
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       className="flex flex-wrap gap-2 mt-3"
//                     >
//                       {data.subCategory.map((id, index) => {
//                         const sub = allSubCategory.find(s => s._id === id)
//                         return (
//                           <motion.span
//                             key={index}
//                             initial={{ opacity: 0, scale: 0.8 }}
//                             animate={{ opacity: 1, scale: 1 }}
//                             exit={{ opacity: 0, scale: 0.8 }}
//                             className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-green-100 to-teal-100 text-gray-700 rounded-lg text-sm font-medium shadow-sm"
//                           >
//                             {sub?.name}
//                             <button
//                               type="button"
//                               onClick={() => handleRemoveSubCategory(index)}
//                               className="hover:bg-white/50 rounded-full p-0.5 transition-colors"
//                             >
//                               <IoClose size={16} />
//                             </button>
//                           </motion.span>
//                         )
//                       })}
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>
//             </div>
//           </div>

//           {/* Pricing & Stock Card */}
//           <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 p-6 space-y-5">
//             <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
//               <div className="p-2 bg-yellow-100 rounded-lg">
//                 <IoPricetagOutline className="text-yellow-600 text-xl" />
//               </div>
//               <h2 className="text-xl font-semibold text-gray-800">Pricing & Stock</h2>
//             </div>

//             <div className="grid md:grid-cols-2 gap-5">
//               <div className="relative">
//                 <label className="block text-sm font-semibold text-gray-700 mb-1.5">
//                   Unit <span className="text-red-500">*</span>
//                 </label>
//                 <div className="relative">
//                   <FaCubes className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                   <input
//                     type="text"
//                     placeholder="e.g. piece, kg, liter"
//                     name="unit"
//                     value={data.unit}
//                     onChange={handleChange}
//                     required
//                     className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm hover:border-blue-400"
//                   />
//                 </div>
//               </div>

//               <div className="relative">
//                 <label className="block text-sm font-semibold text-gray-700 mb-1.5">
//                   Stock <span className="text-red-500">*</span>
//                 </label>
//                 <div className="relative">
//                   <MdOutlineInventory className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                   <input
//                     type="number"
//                     placeholder="Available quantity"
//                     name="stock"
//                     value={data.stock}
//                     onChange={handleChange}
//                     required
//                     min="0"
//                     className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm hover:border-blue-400"
//                   />
//                 </div>
//               </div>

//               <div className="relative">
//                 <label className="block text-sm font-semibold text-gray-700 mb-1.5">
//                   Price <span className="text-red-500">*</span>
//                 </label>
//                 <div className="relative">
//                   <FaDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                   <input
//                     type="number"
//                     placeholder="0.00"
//                     name="price"
//                     value={data.price}
//                     onChange={handleChange}
//                     required
//                     min="0"
//                     step="0.01"
//                     className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm hover:border-blue-400"
//                   />
//                 </div>
//               </div>

//               <div className="relative">
//                 <label className="block text-sm font-semibold text-gray-700 mb-1.5">
//                   Discount %
//                 </label>
//                 <div className="relative">
//                   <FaPercent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                   <input
//                     type="number"
//                     placeholder="0"
//                     name="discount"
//                     value={data.discount}
//                     onChange={handleChange}
//                     min="0"
//                     max="100"
//                     className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm hover:border-blue-400"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Additional Details Card */}
//           <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 p-6 space-y-5">
//             <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
//               <div className="p-2 bg-indigo-100 rounded-lg">
//                 <FaList className="text-indigo-600 text-xl" />
//               </div>
//               <h2 className="text-xl font-semibold text-gray-800">Additional Details</h2>
//             </div>

//             <div className="space-y-4">
//               <AnimatePresence>
//                 {Object.entries(data.more_details).map(([key, value], index) => (
//                   <motion.div
//                     key={key}
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     exit={{ opacity: 0, x: 20 }}
//                     transition={{ delay: index * 0.05 }}
//                     className="relative"
//                   >
//                     <label className="block text-sm font-semibold text-gray-700 mb-1.5 capitalize">
//                       {key.replace(/_/g, ' ')}
//                     </label>
//                     <div className="flex gap-2">
//                       <input
//                         type="text"
//                         value={value}
//                         onChange={(e) => {
//                           setData((prev) => ({
//                             ...prev,
//                             more_details: {
//                               ...prev.more_details,
//                               [key]: e.target.value,
//                             },
//                           }))
//                         }}
//                         className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm hover:border-blue-400"
//                         placeholder={`Enter ${key}`}
//                       />
//                       <button
//                         type="button"
//                         onClick={() => {
//                           const { [key]: _, ...rest } = data.more_details
//                           setData((prev) => ({
//                             ...prev,
//                             more_details: rest,
//                           }))
//                         }}
//                         className="px-3 py-3 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-colors"
//                       >
//                         <MdDelete size={20} />
//                       </button>
//                     </div>
//                   </motion.div>
//                 ))}
//               </AnimatePresence>

//               <motion.button
//                 type="button"
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 onClick={() => setOpenAddField(true)}
//                 className="flex items-center justify-center gap-2 w-full py-3 px-4 border-2 border-dashed border-blue-300 rounded-xl text-blue-600 font-medium hover:border-blue-600 hover:bg-blue-50/50 transition-all duration-300"
//               >
//                 <MdOutlineAddCircleOutline size={20} />
//                 Add Custom Field
//               </motion.button>
//             </div>
//           </div>

//           {/* Submit Button */}
//           <motion.button
//             type="submit"
//             disabled={submitting}
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             className={`w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 ${
//               submitting ? "opacity-75 cursor-not-allowed" : ""
//             }`}
//           >
//             {submitting ? (
//               <>
//                 <FaSpinner className="animate-spin" />
//                 Creating Product...
//               </>
//             ) : (
//               <>
//                 <FaCheckCircle />
//                 Create Product
//               </>
//             )}
//           </motion.button>
//         </motion.form>
//       </div>

//       {/* Modals */}
//       <AnimatePresence>
//         {ViewImageURL && (
//           <ViewImage url={ViewImageURL} close={() => setViewImageURL("")} />
//         )}
//       </AnimatePresence>

//       <AnimatePresence>
//         {openAddField && (
//           <AddFieldComponent
//             value={fieldName}
//             onChange={(e) => setFieldName(e.target.value)}
//             submit={handleAddField}
//             close={() => {
//               setOpenAddField(false)
//               setFieldName("")
//             }}
//           />
//         )}
//       </AnimatePresence>
//     </div>
//   )
// }

// export default UploadProduct

import React, { useState, useEffect } from "react";
import { FaCloudUploadAlt, FaSpinner, FaPlus } from "react-icons/fa";
import { MdDelete, MdOutlineAddCircleOutline } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

import uploadImage from "../utils/UploadImage";
import ViewImage from "../components/ViewImage";
import AddFieldComponent from "../components/AddFieldComponent";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import successAlert from "../utils/SuccessAlert";

import { fetchCategory, fetchSubCategory } from "../store/productAction";

const UploadProduct = () => {
  const dispatch = useDispatch();

  const allCategory = useSelector((state) => state.product?.allCategory || []);
  const allSubCategory = useSelector(
    (state) => state.product?.allSubCategory || [],
  );

  const [data, setData] = useState({
    name: "",
    image: [],
    category: [],
    subCategory: [],
    unit: "",
    stock: "",
    price: "",
    discount: "",
    description: "",
    more_details: {},
  });

  const [selectCategory, setSelectCategory] = useState("");
  const [selectSubCategory, setSelectSubCategory] = useState("");
  const [ViewImageURL, setViewImageURL] = useState("");
  const [openAddField, setOpenAddField] = useState(false);
  const [fieldName, setFieldName] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchCategory(dispatch);
    fetchSubCategory(dispatch);
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

<<<<<<< HEAD
  // const handleUploadImage = async (e) => {
  //   const file = e.target.files[0];
  //   if (!file) return;

  //   setUploadingImage(true);
  //   try {
  //     const response = await uploadImage(file);
  //     const imageUrl = response?.data?.url || response?.data?.data?.url;
  //     if (imageUrl) {
  //       setData((prev) => ({ ...prev, image: [...prev.image, imageUrl] }));
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setUploadingImage(false);
  //     e.target.value = null;
  //   }
  // };

 
   const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(true);
=======
  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
>>>>>>> 6497e552f463bcba3079b30abe5755a45bae2d64

    setUploadingImage(true);
    try {
      const response = await uploadImage(file);
<<<<<<< HEAD

      console.log("Upload Response:", response);

      const imageUrl =
        response?.data?.data?.url ||
        response?.data?.url ||
        response?.data?.secure_url ||
        null;

      if (!imageUrl) {
        console.error("Image URL not found");
        return;
      }

      setData((prev) => ({
        ...prev,
        image: [...prev.image, imageUrl],
      }));
    } catch (error) {
      console.log(error);
      AxiosToastError(error);
    } finally {
      setUploadingImage(false);
      e.target.value = ""; // very important
    }
  };

 
  const handleDeleteImage = (index) => {
    const newImages = [...data.image];
    newImages.splice(index, 1);
    setData({ ...data, image: newImages });
  };

  const handleCategorySelect = (value) => {
    if (!value || data.category.includes(value)) return;
    setData((prev) => ({ ...prev, category: [...prev.category, value] }));
    setSelectCategory("");
  };

  const handleSubCategorySelect = (value) => {
    if (!value || data.subCategory.includes(value)) return;
    setData((prev) => ({ ...prev, subCategory: [...prev.subCategory, value] }));
    setSelectSubCategory("");
  };

  const handleRemoveCategory = (index) => {
    const updated = [...data.category];
    updated.splice(index, 1);
    setData({ ...data, category: updated });
  };

  const handleRemoveSubCategory = (index) => {
    const updated = [...data.subCategory];
    updated.splice(index, 1);
    setData({ ...data, subCategory: updated });
  };

  const handleAddField = () => {
    if (!fieldName.trim()) return;
    setData((prev) => ({
      ...prev,
      more_details: { ...prev.more_details, [fieldName]: "" },
    }));
    setFieldName("");
    setOpenAddField(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.image.length === 0) {
      AxiosToastError({ message: "Please upload at least one image" });
      return;
    }

    setSubmitting(true);
    try {
      const response = await Axios({ ...SummaryApi.createProduct, data });
      if (response.data.success) {
        successAlert(response.data.message);
        setData({
          name: "",
          image: [],
          category: [],
          subCategory: [],
          unit: "",
          stock: "",
          price: "",
          discount: "",
          description: "",
          more_details: {},
        });
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section>    <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 min-h-screen p-3">
=======
      const imageUrl = response?.data?.url || response?.data?.data?.url;
      if (imageUrl) {
        setData((prev) => ({ ...prev, image: [...prev.image, imageUrl] }));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setUploadingImage(false);
      e.target.value = null;
    }
  };

  const handleDeleteImage = (index) => {
    const newImages = [...data.image];
    newImages.splice(index, 1);
    setData({ ...data, image: newImages });
  };

  const handleCategorySelect = (value) => {
    if (!value || data.category.includes(value)) return;
    setData((prev) => ({ ...prev, category: [...prev.category, value] }));
    setSelectCategory("");
  };

  const handleSubCategorySelect = (value) => {
    if (!value || data.subCategory.includes(value)) return;
    setData((prev) => ({ ...prev, subCategory: [...prev.subCategory, value] }));
    setSelectSubCategory("");
  };

  const handleRemoveCategory = (index) => {
    const updated = [...data.category];
    updated.splice(index, 1);
    setData({ ...data, category: updated });
  };

  const handleRemoveSubCategory = (index) => {
    const updated = [...data.subCategory];
    updated.splice(index, 1);
    setData({ ...data, subCategory: updated });
  };

  const handleAddField = () => {
    if (!fieldName.trim()) return;
    setData((prev) => ({
      ...prev,
      more_details: { ...prev.more_details, [fieldName]: "" },
    }));
    setFieldName("");
    setOpenAddField(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.image.length === 0) {
      AxiosToastError({ message: "Please upload at least one image" });
      return;
    }

    setSubmitting(true);
    try {
      const response = await Axios({ ...SummaryApi.createProduct, data });
      if (response.data.success) {
        successAlert(response.data.message);
        setData({
          name: "",
          image: [],
          category: [],
          subCategory: [],
          unit: "",
          stock: "",
          price: "",
          discount: "",
          description: "",
          more_details: {},
        });
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 min-h-screen p-3">
>>>>>>> 6497e552f463bcba3079b30abe5755a45bae2d64
      {/* Header - Ultra Compact */}
      <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 p-3 mb-3 sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
            <FaPlus className="text-white text-sm" />
          </div>
          <h1 className="text-base font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            New Product
          </h1>
        </div>
      </div>

      {/* Main Form - Compact */}
      <div className="max-w-2xl mx-auto">
        <motion.form
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="space-y-3"
        >
          {/* Basic Info - Minimal */}
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="space-y-3">
              <input
                type="text"
                name="name"
                placeholder="Product name *"
                value={data.name}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <textarea
                name="description"
                placeholder="Short description *"
                value={data.description}
                onChange={handleChange}
                rows={2}
                className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 resize-none"
                required
              />
            </div>
          </div>

          {/* Images - Compact Grid */}
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 bg-green-100 rounded-lg">
                <FaCloudUploadAlt className="text-green-600 text-sm" />
              </div>
              <span className="text-xs font-medium text-gray-700">
                Product Images
              </span>
            </div>

            <div className="flex gap-2 flex-wrap">
              {/* Upload Button */}
              <label className="relative w-16 h-16 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition-colors">
                {uploadingImage ? (
                  <FaSpinner className="text-blue-500 text-lg animate-spin" />
                ) : (
                  <>
                    <FaCloudUploadAlt className="text-gray-400 text-lg" />
                    <span className="text-[10px] text-gray-500 mt-0.5">
                      Upload
                    </span>
                  </>
                )}
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleUploadImage}
                  disabled={uploadingImage}
                />
              </label>

              {/* Image Previews */}
              <AnimatePresence>
                {data.image.map((img, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="relative w-16 h-16 group"
                  >
                    <img
                      src={img}
                      alt=""
                      className="w-full h-full object-cover rounded-lg cursor-pointer border border-gray-200"
                      onClick={() => setViewImageURL(img)}
                    />
                    <button
                      type="button"
                      onClick={() => handleDeleteImage(index)}
                      className="absolute -top-1 -right-1 bg-red-500 text-white p-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <IoClose size={14} />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Categories - Side by Side */}
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="grid grid-cols-2 gap-2">
              {/* Category */}
              <div>
                <select
                  value={selectCategory}
                  onChange={(e) => handleCategorySelect(e.target.value)}
                  className="w-full px-2 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500"
                >
                  <option value="" disabled>
                    Category
                  </option>
                  {allCategory.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {data.category.map((id, index) => {
                    const cat = allCategory.find((c) => c._id === id);
                    return (
                      <span
                        key={index}
                        className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-blue-50 text-blue-700 rounded text-[10px]"
                      >
                        {cat?.name}
                        <IoClose
                          size={12}
                          onClick={() => handleRemoveCategory(index)}
                          className="cursor-pointer"
                        />
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* SubCategory */}
              <div>
                <select
                  value={selectSubCategory}
                  onChange={(e) => handleSubCategorySelect(e.target.value)}
                  className="w-full px-2 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500"
                >
                  <option value="" disabled>
                    SubCategory
                  </option>
                  {allSubCategory.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {data.subCategory.map((id, index) => {
                    const sub = allSubCategory.find((s) => s._id === id);
                    return (
                      <span
                        key={index}
                        className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-green-50 text-green-700 rounded text-[10px]"
                      >
                        {sub?.name}
                        <IoClose
                          size={12}
                          onClick={() => handleRemoveSubCategory(index)}
                          className="cursor-pointer"
                        />
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Pricing & Stock - Compact Grid */}
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="grid grid-cols-4 gap-2">
              <div>
                <select
                  name="unit"
                  value={data.unit}
                  onChange={handleChange}
                  className="w-full px-2 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Unit</option>
<<<<<<< HEAD

                  <option value="kg">Kilogram (kg)</option>
                  <option value="g">Gram (g)</option>
                  <option value="L">Litre (L)</option>
                  <option value="ml">Millilitre (ml)</option>
                  <option value="pcs">Pieces (pcs)</option>
                  <option value="pack">Pack</option>
                  <option value="box">Box</option>
                  <option value="bottle">Bottle</option>
                  <option value="dozen">Dozen</option>
                </select>
              </div>
              <div>
                <input
                  type="number"
                  placeholder="Stock"
                  name="stock"
                  value={data.stock}
                  onChange={handleChange}
                  className="w-full px-2 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <input
                  type="number"
                  placeholder="Price"
                  name="price"
                  value={data.price}
                  onChange={handleChange}
                  className="w-full px-2 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <input
                  type="number"
                  placeholder="Discount %"
                  name="discount"
                  value={data.discount}
                  onChange={handleChange}
                  className="w-full px-2 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Additional Fields - Minimal */}
          <div className="bg-white/60 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="space-y-2">
              <AnimatePresence>
                {Object.entries(data.more_details).map(([key, value]) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="flex gap-1.5"
                  >
                    <input
                      type="text"
                      placeholder={key.replace(/_/g, " ")}
                      value={value}
                      onChange={(e) =>
                        setData((prev) => ({
                          ...prev,
                          more_details: {
                            ...prev.more_details,
                            [key]: e.target.value,
                          },
                        }))
                      }
                      className="flex-1 px-2 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const { [key]: _, ...rest } = data.more_details;
                        setData((prev) => ({ ...prev, more_details: rest }));
                      }}
                      className="px-2 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
                    >
                      <MdDelete size={14} />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>

              <button
                type="button"
                onClick={() => setOpenAddField(true)}
                className="w-full py-2 px-3 border border-dashed border-gray-300 rounded-lg text-xs text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors flex items-center justify-center gap-1"
              >
                <MdOutlineAddCircleOutline size={14} />
                Add Field
              </button>
            </div>
          </div>

          {/* Submit Button - Compact */}
          <motion.button
            type="submit"
            disabled={submitting}
            whileTap={{ scale: 0.98 }}
            className={`w-full py-2.5 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-lg shadow-sm hover:shadow transition-all flex items-center justify-center gap-1.5 ${
              submitting ? "opacity-75 cursor-not-allowed" : ""
            }`}
          >
            {submitting ? (
              <>
                <FaSpinner className="animate-spin" size={14} />
                Creating...
              </>
            ) : (
              <>
                <FaPlus size={14} />
                Create Product
              </>
            )}
          </motion.button>
        </motion.form>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {ViewImageURL && (
          <ViewImage url={ViewImageURL} close={() => setViewImageURL("")} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {openAddField && (
          <AddFieldComponent
            value={fieldName}
            onChange={(e) => setFieldName(e.target.value)}
            submit={handleAddField}
            close={() => {
              setOpenAddField(false);
              setFieldName("");
            }}
          />
        )}
      </AnimatePresence>
    </div>
    </section>

  );
};


export default UploadProduct;




=======

                  <option value="kg">Kilogram (kg)</option>
                  <option value="g">Gram (g)</option>
                  <option value="L">Litre (L)</option>
                  <option value="ml">Millilitre (ml)</option>
                  <option value="pcs">Pieces (pcs)</option>
                  <option value="pack">Pack</option>
                  <option value="box">Box</option>
                  <option value="bottle">Bottle</option>
                  <option value="dozen">Dozen</option>
                </select>
              </div>
              <div>
                <input
                  type="number"
                  placeholder="Stock"
                  name="stock"
                  value={data.stock}
                  onChange={handleChange}
                  className="w-full px-2 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <input
                  type="number"
                  placeholder="Price"
                  name="price"
                  value={data.price}
                  onChange={handleChange}
                  className="w-full px-2 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <input
                  type="number"
                  placeholder="Discount %"
                  name="discount"
                  value={data.discount}
                  onChange={handleChange}
                  className="w-full px-2 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Additional Fields - Minimal */}
          <div className="bg-white/60 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="space-y-2">
              <AnimatePresence>
                {Object.entries(data.more_details).map(([key, value]) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="flex gap-1.5"
                  >
                    <input
                      type="text"
                      placeholder={key.replace(/_/g, " ")}
                      value={value}
                      onChange={(e) =>
                        setData((prev) => ({
                          ...prev,
                          more_details: {
                            ...prev.more_details,
                            [key]: e.target.value,
                          },
                        }))
                      }
                      className="flex-1 px-2 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const { [key]: _, ...rest } = data.more_details;
                        setData((prev) => ({ ...prev, more_details: rest }));
                      }}
                      className="px-2 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
                    >
                      <MdDelete size={14} />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>

              <button
                type="button"
                onClick={() => setOpenAddField(true)}
                className="w-full py-2 px-3 border border-dashed border-gray-300 rounded-lg text-xs text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors flex items-center justify-center gap-1"
              >
                <MdOutlineAddCircleOutline size={14} />
                Add Field
              </button>
            </div>
          </div>

          {/* Submit Button - Compact */}
          <motion.button
            type="submit"
            disabled={submitting}
            whileTap={{ scale: 0.98 }}
            className={`w-full py-2.5 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-lg shadow-sm hover:shadow transition-all flex items-center justify-center gap-1.5 ${
              submitting ? "opacity-75 cursor-not-allowed" : ""
            }`}
          >
            {submitting ? (
              <>
                <FaSpinner className="animate-spin" size={14} />
                Creating...
              </>
            ) : (
              <>
                <FaPlus size={14} />
                Create Product
              </>
            )}
          </motion.button>
        </motion.form>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {ViewImageURL && (
          <ViewImage url={ViewImageURL} close={() => setViewImageURL("")} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {openAddField && (
          <AddFieldComponent
            value={fieldName}
            onChange={(e) => setFieldName(e.target.value)}
            submit={handleAddField}
            close={() => {
              setOpenAddField(false);
              setFieldName("");
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default UploadProduct;
>>>>>>> 6497e552f463bcba3079b30abe5755a45bae2d64
