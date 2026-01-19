// // import React, { useEffect, useState } from 'react'
// // import UploadCategoryModel from '../components/UploadCategoryModel'
// // import Loading from '../components/Loading'
// // import NoData from '../components/NoData'
// // import Axios from '../utils/Axios'
// // import SummaryApi from '../common/SummaryApi'


// // const CategoryPage = () => {
// //     const [openUploadCategory,setOpenUploadCategory] = useState(false)
// //     const [loading,setLoading] = useState(false)
// //     const [categoryData,setCategoryData] = useState([])
// //     const [openEdit,setOpenEdit] = useState(false)
// //     const [editData,setEditData] = useState({
// //         name : "",
// //         image : "",
// //     })
// //     const [openConfimBoxDelete,setOpenConfirmBoxDelete] = useState(false)
// //     const [deleteCategory,setDeleteCategory] = useState({
// //         _id : ""
// //     })
// //     // const allCategory = useSelector(state => state.product.allCategory)


// //     // useEffect(()=>{
// //     //     setCategoryData(allCategory)
// //     // },[allCategory])
    
// //     const fetchCategory = async()=>{
// //         try {
// //             setLoading(true)
// //             const response = await Axios({
// //                 ...SummaryApi.getCategory
// //             })
// //             const { data : responseData } = response

// //             if(responseData.success){
// //                 setCategoryData(responseData.data)
// //             }
// //         } catch (error) {
            
// //         }finally{
// //             setLoading(false)
// //         }
// //     }

// //     useEffect(()=>{
// //         fetchCategory()
// //     },[])

// //     const handleDeleteCategory = async()=>{
// //         try {
// //             const response = await Axios({
// //                 ...SummaryApi.deleteCategory,
// //                 data : deleteCategory
// //             })

// //             const { data : responseData } = response

// //             if(responseData.success){
// //                 toast.success(responseData.message)
// //                 fetchCategory()
// //                 setOpenConfirmBoxDelete(false)
// //             }
// //         } catch (error) {
// //             AxiosToastError(error)
// //         }
// //     }

// //   return (
// //     <section className=''>
// //         <div className='p-2   bg-white shadow-md flex items-center justify-between'>
// //             <h2 className='font-semibold'>Category</h2>
// //             <button onClick={()=>setOpenUploadCategory(true)} className='text-sm border border-primary-200 hover:bg-primary-200 px-3 py-1 rounded'>Add Category</button>
// //         </div>
// //         {
// //             !categoryData[0] && !loading && (
// //                 <NoData/>
// //             )
// //         }

// //         <div className='p-4 grid  grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2'>
// //             {
// //                 categoryData.map((category,index)=>{
// //                     return(
// //                         <div className='w-32 h-56 rounded shadow-md' key={category._id}>
// //                             <img 
// //                                 alt={category.name}
// //                                 src={category.image}
// //                                 className='w-full object-scale-down'
// //                             />
// //                             <div className='items-center h-9 flex gap-2'>
// //                                 <button onClick={()=>{
// //                                     setOpenEdit(true)
// //                                     setEditData(category)
// //                                 }} className='flex-1 bg-green-100 hover:bg-green-200 text-green-600 font-medium py-1 rounded'>
// //                                     Edit
// //                                 </button>
// //                                 <button onClick={()=>{
// //                                     setOpenConfirmBoxDelete(true)
// //                                     setDeleteCategory(category)
// //                                 }} className='flex-1 bg-red-100 hover:bg-red-200 text-red-600 font-medium py-1 rounded'>
// //                                     Delete
// //                                 </button>
// //                             </div>
// //                         </div>
// //                     )
// //                 })
// //             }
// //         </div>

// //         {
// //             loading && (
// //                 <Loading/>
// //             )
// //         }

// //         {
// //             openUploadCategory && (
// //                 <UploadCategoryModel fetchData={fetchCategory} close={()=>setOpenUploadCategory(false)}/>
// //             )
// //         }

// //         {/* {
// //             openEdit && (
// //                 <EditCategory data={editData} close={()=>setOpenEdit(false)} fetchData={fetchCategory}/>
// //             )
// //         } */}

// //         {/* {
// //            openConfimBoxDelete && (
// //             <CofirmBox close={()=>setOpenConfirmBoxDelete(false)} cancel={()=>setOpenConfirmBoxDelete(false)} confirm={handleDeleteCategory}/>
// //            ) 
// //         } */}
// //     </section>
// //   )
// // }

// // export default CategoryPage


// import React, { useEffect, useState } from 'react'
// import UploadCategoryModel from '../components/UploadCategoryModel'
// import Loading from '../components/Loading'
// import NoData from '../components/NoData'
// import Axios from '../utils/Axios'
// import SummaryApi from '../common/SummaryApi'
// import toast from 'react-hot-toast'
// import AxiosToastError from '../utils/AxiosToastError'

// const CategoryPage = () => {

//   const [openUploadCategory, setOpenUploadCategory] = useState(false)
//   const [loading, setLoading] = useState(false)
//   const [categoryData, setCategoryData] = useState([])

//   const [openEdit, setOpenEdit] = useState(false)
//   const [editData, setEditData] = useState({
//     name: "",
//     image: "",
//   })

//   const [openConfirmBoxDelete, setOpenConfirmBoxDelete] = useState(false)
//   const [deleteCategory, setDeleteCategory] = useState({
//     _id: ""
//   })

//   // ==============================
//   // FETCH CATEGORY
//   // ==============================
//   // const fetchCategory = async () => {
//   //   try {
//   //     setLoading(true)

//   //     const response = await Axios({
//   //       ...SummaryApi.getCategory
//   //     })

//   //     const { data: responseData } = response

//   //     if (responseData.success) {
//   //       // ✅ always replace old data
//   //       setCategoryData(responseData.data || [])
//   //     }

//   //   } catch (error) {
//   //     AxiosToastError(error)
//   //   } finally {
//   //     setLoading(false)
//   //   }
//   // }

//   // useEffect(() => {
//   //   fetchCategory()
//   // }, [])
//   const fetchCategory = async () => {
//   try {
//     setLoading(true)

//     const response = await Axios({
//       ...SummaryApi.getCategory
//     })

//     const { data: responseData } = response

//     if (responseData.success) {
//       // ✅ ONLY show categories with VALID image URL
//       const cleanedData = responseData.data.filter(
//         item =>
//           item.image &&
//           typeof item.image === "string" &&
//           item.image.startsWith("http")
//       )

//       setCategoryData(cleanedData)
//     }

//   } catch (error) {
//     AxiosToastError(error)
//   } finally {
//     setLoading(false)
//   }
// }
// useEffect(() => {
//   fetchCategory()
// }, [])



//   // ==============================
//   // DELETE CATEGORY
//   // ==============================
//   const handleDeleteCategory = async () => {
//     try {
//       const response = await Axios({
//         ...SummaryApi.deleteCategory,
//         data: deleteCategory
//       })

//       const { data: responseData } = response

//       if (responseData.success) {
//         toast.success(responseData.message)

//         // 🔥 clear stale UI before refetch
//         setCategoryData([])
//         setOpenConfirmBoxDelete(false)

//         fetchCategory()
//       }

//     } catch (error) {
//       AxiosToastError(error)
//     }
//   }

//   return (
//     <section className='w-full'>

//       {/* HEADER */}
//       <div className='p-2 bg-white shadow-md flex items-center justify-between'>
//         <h2 className='font-semibold'>Category</h2>
//         <button
//           onClick={() => setOpenUploadCategory(true)}
//           className='text-sm border border-primary-200 hover:bg-primary-200 px-3 py-1 rounded'
//         >
//           Add Category
//         </button>
//       </div>

//       {/* NO DATA */}
//       {!categoryData[0] && !loading && (
//         <NoData />
//       )}

//       {/* CATEGORY GRID */}
//       <div className='p-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3'>
//         {
//           categoryData.map((category) => (
//             <div
//               key={category._id}
//               className='w-32 h-56 rounded shadow-md bg-white'
//             >
//               <img
//   src={category.image}
//   alt={category.name}
//   className="w-full h-36 object-contain"
//   onError={(e) => {
//     e.currentTarget.style.display = "none"
//   }}
// />


//               <div className='items-center h-9 flex gap-2 px-1'>
//                 <button
//                   onClick={() => {
//                     setOpenEdit(true)
//                     setEditData(category)
//                   }}
//                   className='flex-1 bg-green-100 hover:bg-green-200 text-green-600 font-medium py-1 rounded text-xs'
//                 >
//                   Edit
//                 </button>

//                 <button
//                   onClick={() => {
//                     setOpenConfirmBoxDelete(true)
//                     setDeleteCategory({ _id: category._id })
//                   }}
//                   className='flex-1 bg-red-100 hover:bg-red-200 text-red-600 font-medium py-1 rounded text-xs'
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))
//         }
//       </div>

//       {/* LOADING */}
//       {loading && <Loading />}

//       {/* UPLOAD MODAL */}
//       {openUploadCategory && (
//         <UploadCategoryModel
//           fetchData={fetchCategory}
//           close={() => {
//             setOpenUploadCategory(false)
//             fetchCategory() // 🔥 force fresh data
//           }}
//         />
//       )}

//       {/* EDIT & CONFIRM BOX intentionally commented (same as your code) */}
//       {/* {openEdit && <EditCategory />} */}
//       {/* {openConfirmBoxDelete && <ConfirmBox confirm={handleDeleteCategory} />} */}

//     </section>
//   )
// }

// export default CategoryPage



import React, { useEffect, useState } from 'react'
import UploadCategoryModel from '../components/UploadCategoryModel'
import Loading from '../components/Loading'
import NoData from '../components/NoData'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'
import { Edit2, Trash2, Plus, FolderOpen, ChevronRight } from 'lucide-react'

const CategoryPage = () => {
  const [openUploadCategory, setOpenUploadCategory] = useState(false)
  const [loading, setLoading] = useState(false)
  const [categoryData, setCategoryData] = useState([])
  const [openEdit, setOpenEdit] = useState(false)
  const [editData, setEditData] = useState({ name: "", image: "" })
  const [openConfirmBoxDelete, setOpenConfirmBoxDelete] = useState(false)
  const [deleteCategory, setDeleteCategory] = useState({ _id: "" })

  const fetchCategory = async () => {
    try {
      setLoading(true)
      const response = await Axios({ ...SummaryApi.getCategory })
      const { data: responseData } = response

      if (responseData.success) {
        const cleanedData = responseData.data.filter(
          item => item.image && typeof item.image === "string" && item.image.startsWith("http")
        )
        setCategoryData(cleanedData)
      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategory()
  }, [])

  const handleDeleteCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteCategory,
        data: deleteCategory
      })

      const { data: responseData } = response
      if (responseData.success) {
        toast.success(responseData.message)
        setCategoryData([])
        setOpenConfirmBoxDelete(false)
        fetchCategory()
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      
      {/* Luxury Header */}
      <div className="sticky top-0 z-10 px-8 py-6 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-gradient-to-r from-amber-100 to-yellow-100">
              <FolderOpen className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Category Collection</h1>
              <p className="text-sm text-gray-500 flex items-center gap-1">
                <span>Manage your product categories</span>
                <ChevronRight className="w-4 h-4" />
                <span className="text-amber-600">{categoryData.length} categories</span>
              </p>
            </div>
          </div>
          
          <button
            onClick={() => setOpenUploadCategory(true)}
            className="group relative px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-medium hover:from-amber-600 hover:to-yellow-600 transition-all duration-300 shadow-lg shadow-amber-200 hover:shadow-xl hover:shadow-amber-300 flex items-center gap-2 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <Plus className="w-5 h-5" />
            <span>Add Category</span>
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border border-gray-200/50 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Categories</p>
                <p className="text-3xl font-bold text-gray-900">{categoryData.length}</p>
              </div>
              <div className="p-3 rounded-xl bg-amber-50">
                <FolderOpen className="w-6 h-6 text-amber-500" />
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border border-gray-200/50 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Status</p>
                <p className="text-lg font-semibold text-green-600">Active</p>
              </div>
              <div className="p-3 rounded-xl bg-green-50">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Grid */}
      <div className="px-8 pb-12">
        {!categoryData[0] && !loading && (
          <div className="py-20">
            <NoData />
          </div>
        )}

        {categoryData.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">All Categories</h2>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {categoryData.map((category) => (
            <div
              key={category._id}
              className="group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl overflow-hidden border border-gray-200/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Image Container */}
              <div className="relative h-48 bg-gradient-to-br from-amber-50 to-yellow-50 flex items-center justify-center overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-32 h-32 object-contain transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    e.currentTarget.style.display = "none"
                  }}
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-white/50 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-semibold text-gray-900 mb-2 truncate">{category.name}</h3>
                
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-700">
                      Active
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setOpenEdit(true)
                        setEditData(category)
                      }}
                      className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-amber-600 transition-colors group/edit"
                    >
                      <Edit2 className="w-4 h-4 group-hover/edit:scale-110 transition-transform" />
                    </button>
                    
                    <button
                      onClick={() => {
                        setOpenConfirmBoxDelete(true)
                        setDeleteCategory({ _id: category._id })
                      }}
                      className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 hover:text-red-600 transition-colors group/delete"
                    >
                      <Trash2 className="w-4 h-4 group-hover/delete:scale-110 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Hover Border Effect */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-amber-200 rounded-2xl transition-colors pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Add New Category Card */}
        {!loading && (
          <div className="mt-6">
            <div 
              onClick={() => setOpenUploadCategory(true)}
              className="group cursor-pointer bg-gradient-to-br from-gray-50 to-white rounded-2xl border-2 border-dashed border-gray-300 hover:border-amber-400 hover:bg-amber-50/30 transition-all duration-300 p-8 text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-amber-100 to-yellow-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Plus className="w-8 h-8 text-amber-500" />
              </div>
              <h3 className="font-semibold text-gray-700 mb-2">Add New Category</h3>
              <p className="text-sm text-gray-500">Click to create a new product category</p>
            </div>
          </div>
        )}
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="text-center">
            <Loading />
            <p className="mt-4 text-gray-600 font-medium">Loading categories...</p>
          </div>
        </div>
      )}

      {/* Modals */}
      {openUploadCategory && (
        <UploadCategoryModel
          fetchData={fetchCategory}
          close={() => {
            setOpenUploadCategory(false)
            fetchCategory()
          }}
        />
      )}

      {/* Edit & Delete Confirm Modals (commented as per original) */}
      {/* {openEdit && <EditCategory />} */}
      {/* {openConfirmBoxDelete && <ConfirmBox confirm={handleDeleteCategory} />} */}
    </section>
  )
}

export default CategoryPage
