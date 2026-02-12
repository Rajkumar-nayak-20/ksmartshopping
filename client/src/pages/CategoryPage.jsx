// import React, { useEffect, useState } from 'react'
// import UploadCategoryModel from '../components/UploadCategoryModel'
// import DeleteCategory from '../components/DeleteCategory'
// import Loading from '../components/Loading'
// import NoData from '../components/NoData'
// import Axios from '../utils/Axios'
// import SummaryApi from '../common/SummaryApi'
// import AxiosToastError from '../utils/AxiosToastError'
// import { Edit2, Trash2, Plus, FolderOpen } from 'lucide-react'

// const CategoryPage = () => {
//   const [openUploadCategory, setOpenUploadCategory] = useState(false)
//   const [editData, setEditData] = useState(null)

//   const [openDelete, setOpenDelete] = useState(false)
//   const [deleteData, setDeleteData] = useState(null)

//   const [loading, setLoading] = useState(false)
//   const [categoryData, setCategoryData] = useState([])

//   // ======================
//   // FETCH CATEGORY
//   // ======================
//   const fetchCategory = async () => {
//     try {
//       setLoading(true)
//       const response = await Axios({ ...SummaryApi.getCategory })

//       if (response.data.success) {
//         setCategoryData(response.data.data)
//       }
//     } catch (error) {
//       AxiosToastError(error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     fetchCategory()
//   }, [])

//   return (
//     <section className="min-h-screen bg-gray-50">

//       {/* HEADER */}
//       <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-xl border-b px-6 py-4 flex justify-between items-center">
//         <div className="flex items-center gap-3">
//           <FolderOpen className="text-amber-600" />
//           <h1 className="text-xl font-semibold">Category Collection</h1>
//         </div>

//         {/* ADD BUTTON */}
//         <button
//           onClick={() => {
//             setEditData(null)
//             setOpenUploadCategory(true)
//           }}
//           className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600"
//         >
//           <Plus size={18} /> Add Category
//         </button>
//       </div>

//       {/* BODY */}
//       <div className="p-6">
//         {loading && <Loading />}
//         {!loading && categoryData.length === 0 && <NoData />}

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {categoryData.map((category) => (
//             <div
//               key={category._id}
//               className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
//             >
//               <div className="h-40 flex items-center justify-center bg-gray-100">
//                 <img
//                   src={category.image}
//                   alt={category.name}
//                   className="h-28 object-contain"
//                 />
//               </div>

//               <div className="p-4">
//                 <h3 className="font-semibold truncate">{category.name}</h3>

//                 <div className="flex justify-end gap-2 mt-3">
//                   {/* EDIT */}
//                   <button
//                     onClick={() => {
//                       setEditData(category)
//                       setOpenUploadCategory(true)
//                     }}
//                     className="p-2 bg-gray-100 rounded hover:bg-gray-200"
//                   >
//                     <Edit2 size={16} />
//                   </button>

//                   {/* DELETE */}
//                   <button
//                     onClick={() => {
//                       setDeleteData(category)
//                       setOpenDelete(true)
//                     }}
//                     className="p-2 bg-red-50 text-red-500 rounded hover:bg-red-100"
//                   >
//                     <Trash2 size={16} />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* ADD / EDIT SAME MODAL */}
//       {openUploadCategory && (
//         <UploadCategoryModel
//           close={() => {
//             setOpenUploadCategory(false)
//             setEditData(null)
//           }}
//           fetchData={fetchCategory}
//           editData={editData}
//         />
//       )}

//       {/* DELETE MODAL */}
//       {openDelete && deleteData && (
//         <DeleteCategory
//           data={deleteData}
//           close={() => setOpenDelete(false)}
//           fetchData={fetchCategory}
//         />
//       )}
//     </section>
//   )
// }

// export default CategoryPage


// import React, { useEffect, useState } from 'react'
// import UploadCategoryModel from '../components/UploadCategoryModel'
// import DeleteCategory from '../components/DeleteCategory'
// import Loading from '../components/Loading'
// import NoData from '../components/NoData'
// import Axios from '../utils/Axios'
// import SummaryApi from '../common/SummaryApi'
// import AxiosToastError from '../utils/AxiosToastError'
// import { Edit2, Trash2, Plus, FolderOpen } from 'lucide-react'

// const CategoryPage = () => {
//   const [openUploadCategory, setOpenUploadCategory] = useState(false)
//   const [editData, setEditData] = useState(null)

//   const [openDelete, setOpenDelete] = useState(false)
//   const [deleteData, setDeleteData] = useState(null)

//   const [loading, setLoading] = useState(false)
//   const [categoryData, setCategoryData] = useState([])

//   // ======================
//   // FETCH CATEGORY
//   // ======================
//   const fetchCategory = async () => {
//     try {
//       setLoading(true)
//       const response = await Axios({ ...SummaryApi.getCategory })

//       if (response.data.success) {
//         setCategoryData(response.data.data)
//       }
//     } catch (error) {
//       AxiosToastError(error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     fetchCategory()
//   }, [])

//   return (
//     <section className="min-h-screen bg-gray-50">

//       {/* HEADER */}
//       <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-xl border-b px-6 py-4 flex justify-between items-center">
//         <div className="flex items-center gap-3">
//           <FolderOpen className="text-amber-600" />
//           <h1 className="text-xl font-semibold">Category Collection</h1>
//         </div>

//         {/* ADD BUTTON */}
//         <button
//           onClick={() => {
//             setEditData(null)
//             setOpenUploadCategory(true)
//           }}
//           className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600"
//         >
//           <Plus size={18} /> Add Category
//         </button>
//       </div>

//       {/* BODY */}
//       <div className="p-6">
//         {loading && <Loading />}
//         {!loading && categoryData.length === 0 && <NoData />}

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {categoryData.map((category) => (
//             <div
//               key={category._id}
//               className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
//             >
//               <div className="h-40 flex items-center justify-center bg-gray-100">
//                 <img
//                   src={category.image}
//                   alt={category.name}
//                   className="h-28 object-contain"
//                 />
//               </div>

//               <div className="p-4">
//                 <h3 className="font-semibold truncate">{category.name}</h3>

//                 <div className="flex justify-end gap-2 mt-3">
//                   {/* EDIT */}
//                   <button
//                     onClick={() => {
//                       setEditData(category)
//                       setOpenUploadCategory(true)
//                     }}
//                     className="p-2 bg-gray-100 rounded hover:bg-gray-200"
//                   >
//                     <Edit2 size={16} />
//                   </button>

//                   {/* DELETE */}
//                   <button
//                     onClick={() => {
//                       setDeleteData(category)
//                       setOpenDelete(true)
//                     }}
//                     className="p-2 bg-red-50 text-red-500 rounded hover:bg-red-100"
//                   >
//                     <Trash2 size={16} />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* ADD / EDIT SAME MODAL */}
//       {openUploadCategory && (
//         <UploadCategoryModel
//           close={() => {
//             setOpenUploadCategory(false)
//             setEditData(null)
//           }}
//           fetchData={fetchCategory}
//           editData={editData}
//         />
//       )}

//       {/* DELETE MODAL */}
//       {openDelete && deleteData && (
//         <DeleteCategory
//           data={deleteData}
//           close={() => setOpenDelete(false)}
//           fetchData={fetchCategory}
//         />
//       )}
//     </section>
//   )
// }

// export default CategoryPage


// import React, { useEffect, useState } from 'react'
// import UploadCategoryModel from '../components/UploadCategoryModel'
// import DeleteCategory from '../components/DeleteCategory'
// import EditCategory from '../components/EditCategory'
// import Loading from '../components/Loading'
// import NoData from '../components/NoData'
// import Axios from '../utils/Axios'
// import SummaryApi from '../common/SummaryApi'
// import AxiosToastError from '../utils/AxiosToastError'
// import { Edit2, Trash2, Plus, FolderOpen } from 'lucide-react'

// const CategoryPage = () => {
//   const [openUploadCategory, setOpenUploadCategory] = useState(false)
//   const [editData, setEditData] = useState(null)

//   const [openDelete, setOpenDelete] = useState(false)
//   const [deleteData, setDeleteData] = useState(null)

//   const [loading, setLoading] = useState(false)
//   const [categoryData, setCategoryData] = useState([])

//   // ======================
//   // FETCH CATEGORY
//   // ======================
//   const fetchCategory = async () => {
//     try {
//       setLoading(true)
//       const response = await Axios({ ...SummaryApi.getCategory })
//       if (response.data.success) {
//         setCategoryData(response.data.data)
//       }
//     } catch (error) {
//       AxiosToastError(error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     fetchCategory()
//   }, [])

//   return (
//     <section className="min-h-screen bg-gray-50">

//       {/* HEADER */}
//       <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-xl border-b px-6 py-4 flex justify-between items-center">
//         <div className="flex items-center gap-3">
//           <FolderOpen className="text-amber-600" />
//           <h1 className="text-xl font-semibold">Category Collection</h1>
//         </div>

//         <button
//           onClick={() => {
//             setEditData(null)
//             setOpenUploadCategory(true)
//           }}
//           className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600"
//         >
//           <Plus size={18} /> Add Category
//         </button>
//       </div>

//       {/* BODY */}
//       <div className="p-6">
//         {loading && <Loading />}
//         {!loading && categoryData.length === 0 && <NoData />}

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {categoryData.map((category) => (
//             <div
//               key={category._id}
//               className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
//             >
//               {/* IMAGE FIXED AREA */}
//               <div className="h-40 w-full bg-gray-100 flex items-center justify-center">
//                 <img
//                   src={category.image}
//                   alt={category.name}
//                   className="
//                     w-full h-full
//                     object-contain
//                     p-4
//                   "
//                 />
//               </div>

//               <div className="p-4">
//                 <h3 className="font-semibold truncate">{category.name}</h3>

//                 <div className="flex justify-end gap-2 mt-3">
//                   <button
//                     onClick={() => {
//                       setEditData(category)
//                       setOpenUploadCategory(true)
//                     }}
//                     className="p-2 bg-gray-100 rounded hover:bg-gray-200"
//                   >
//                     <Edit2 size={16} />
//                   </button>

//                   <button
//                     onClick={() => {
//                       setDeleteData(category)
//                       setOpenDelete(true)
//                     }}
//                     className="p-2 bg-red-50 text-red-500 rounded hover:bg-red-100"
//                   >
//                     <Trash2 size={16} />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* ADD / EDIT MODAL */}
//       {openUploadCategory && (
//         <UploadCategoryModel
//           close={() => {
//             setOpenUploadCategory(false)
//             setEditData(null)
//           }}
//           fetchData={fetchCategory}
//           editData={editData}
//         />
//       )}

//       {/* DELETE MODAL */}
//       {openDelete && deleteData && (
//         <DeleteCategory
//           data={deleteData}
//           close={() => setOpenDelete(false)}
//           fetchData={fetchCategory}
//         />
//       )}
//     </section>
//   )
// }

// export default CategoryPage

import React, { useEffect, useState } from 'react'
import UploadCategoryModel from '../components/UploadCategoryModel'
import DeleteCategory from '../components/DeleteCategory'
import Loading from '../components/Loading'
import NoData from '../components/NoData'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import AxiosToastError from '../utils/AxiosToastError'
import { Edit2, Trash2, Plus, FolderOpen, Search, Filter } from 'lucide-react'

const CategoryPage = () => {
  const [openUploadCategory, setOpenUploadCategory] = useState(false)
  const [editData, setEditData] = useState(null)

  const [openDelete, setOpenDelete] = useState(false)
  const [deleteData, setDeleteData] = useState(null)

  const [loading, setLoading] = useState(false)
  const [categoryData, setCategoryData] = useState([])

  // Search and Filter States
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredData, setFilteredData] = useState([])

  // ======================
  // FETCH CATEGORY
  // ======================
  const fetchCategory = async () => {
    try {
      setLoading(true)
      const response = await Axios({ ...SummaryApi.getCategory })
      if (response.data.success) {
        setCategoryData(response.data.data)
        setFilteredData(response.data.data)
      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  // ======================
  // SEARCH FUNCTIONALITY
  // ======================
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredData(categoryData)
    } else {
      const filtered = categoryData.filter(category =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredData(filtered)
    }
  }, [searchTerm, categoryData])

  useEffect(() => {
    fetchCategory()
  }, [])

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* HEADER */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-xl border-b px-6 py-4 shadow-sm ">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-100 rounded-lg">
              <FolderOpen className="text-amber-600" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Category Collection</h1>
              <p className="text-sm text-gray-500">Manage your product categories</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            {/* SEARCH BAR */}
            <div className="relative flex
            ">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 " size={20} />
              <input
                type="text"
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2.5 w-full sm:w-64 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white"
              />
            </div>

            {/* ADD CATEGORY BUTTON */}
            <button
              onClick={() => {
                setEditData(null)
                setOpenUploadCategory(true)
              }}
              className="flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <Plus size={20} />
              <span className="font-semibold">Add Category</span>
            </button>
          </div>
        </div>
      </div>

      {/* BODY */}
      <div className="p-6 sticky">
        {/* LOADING SKELETON */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-md animate-pulse overflow-hidden">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-5 space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="flex justify-end gap-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
                    <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* NO DATA STATE */}
        {!loading && filteredData.length === 0 && searchTerm === '' && (
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <div className="w-24 h-24 bg-amber-50 rounded-full flex items-center justify-center mb-6">
              <FolderOpen className="w-12 h-12 text-amber-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No Categories Yet</h3>
            <p className="text-gray-600 max-w-md mb-8">
              Start organizing your products by adding categories. This will help customers navigate your store better.
            </p>
            <button
              onClick={() => {
                setEditData(null)
                setOpenUploadCategory(true)
              }}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold"
            >
              <Plus size={20} /> Add Your First Category
            </button>
          </div>
        )}

        {/* NO SEARCH RESULTS */}
        {!loading && filteredData.length === 0 && searchTerm !== '' && (
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <Search className="w-16 h-16 text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Results Found</h3>
            <p className="text-gray-600 mb-6">
              No categories match "<span className="font-medium">{searchTerm}</span>"
            </p>
            <button
              onClick={() => setSearchTerm('')}
              className="px-5 py-2 text-amber-600 hover:text-amber-700 font-medium"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* CATEGORY GRID */}
        {!loading && filteredData.length > 0 && (
          <>
            {/* STATS BAR */}
            <div className="flex items-center justify-between mb-6 px-2">
              <div className="text-sm text-gray-600">
                Showing <span className="font-semibold">{filteredData.length}</span> of{' '}
                <span className="font-semibold">{categoryData.length}</span> categories
                {searchTerm && (
                  <span>
                    {' '}for "<span className="font-medium">{searchTerm}</span>"
                  </span>
                )}
              </div>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="text-sm text-amber-600 hover:text-amber-700 font-medium"
                >
                  Clear Search
                </button>
              )}
            </div>

            {/* CATEGORY CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {filteredData.map((category) => (
                <div
                  key={category._id}
                  className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-amber-100"
                >
                  {/* IMAGE CONTAINER WITH HOVER EFFECT */}
                  <div className="relative h-48 w-full bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden ">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent z-10 px-41">

                      <button
                        onClick={() => {
                          setDeleteData(category)
                          setOpenDelete(true)
                        }}
                        className="
        p-5     bg-red- text-red-600
        rounded-lg
       cursor-pointer
        transition hover:cursor-pointer hover:scale-120
      "
                        title="Delete Category"
                      >
                        <Trash2 size={25} />
                      </button>
                    </div>
                    <img
                      src={category.image}
                      alt={category.name}
                      className="
                        w-full h-full
                        object-contain
                        p-5
                        transition-transform duration-300
                        group-hover:scale-105
                      "
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x200?text=No+Image'
                      }}
                    />
                  </div>

                  
                  {/* CONTENT */}
                  <div className="p-2 flex items-center justify-between gap-5">

                    {/* CATEGORY NAME */}
                    <h3
                      className="
      flex-1
      font-semibold text-gray-800
      text-sm
      leading-snug
      line-clamp-2 
    "
                      title={category.name}
                    >
                      {category.name}
                    </h3>

                    {/* ACTION BUTTONS */}
                    <div className="flex items-center gap-8 shrink-0">

                      <button
                        onClick={() => {
                          setEditData(category)
                          setOpenUploadCategory(true)
                        }}
                        className="
        p-2.5
        bg-blue-50 text-blue-600
        rounded-lg
        hover:bg-blue-100
        transition  hover:scale-120
      "
                        title="Edit Category"
                      >
                        <Edit2 size={12} />
                      </button>


                    </div>

                  </div>

                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* ADD / EDIT MODAL */}
      {openUploadCategory && (
        <UploadCategoryModel
          close={() => {
            setOpenUploadCategory(false)
            setEditData(null)
          }}
          fetchData={fetchCategory}
          editData={editData}
          categoryList={categoryData}
        />
      )}

      {/* DELETE MODAL */}
      {openDelete && deleteData && (
        <DeleteCategory
          data={deleteData}
          close={() => setOpenDelete(false)}
          fetchData={fetchCategory}
        />
      )}
    </section>
  )
}

export default CategoryPage


//2:55