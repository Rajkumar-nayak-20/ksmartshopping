// // // import React, { useEffect, useState } from "react";
// // // import SummaryApi from "../common/SummaryApi";
// // // import AxiosToastError from "../utils/AxiosToastError";
// // // import Axios from "../utils/Axios";
// // // import Loading from "../components/Loading";
// // // import ProductCardAdmin from "../components/ProductCardAdmin";
// // // const ProductAdmin = () => {
// // //   const [productData, setProductData] = useState([]);
// // //   const [page, setpage] = useState(1);

// // //   const [loading,setLoading] = useState(false)

// // //   const fetchproductData = async () => {
// // //     try {
// // //       setLoading(true)
// // //       const response = await Axios({
// // //         ...SummaryApi.getProduct,
// // //         data: {
// // //           page: page,
// // //         },
// // //       });

// // //       const { data: responseData } = response;
// // //       if (responseData.success) {
// // //         setProductData(responseData.data);
// // //       }
// // //     } catch (error) {
// // //       AxiosToastError(error);
// // //     }finally{
// // //       setLoading(false)
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchproductData();
// // //   }, [page])
// // //   console.log(productData);
  

// // //   return (
// // // <section>
// // //    <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 p-3 mb-3 sticky top-0 z-10">
// // //           <div className="flex items-center gap-2">
// // //             <div className="p-1.5 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
// // //             </div>
// // //             <h2 className="text-base font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
// // //                Product
// // //             </h2>
// // //           </div>
// // //         </div>
// // //         {
// // //           loading && (
// // //             <Loading/>

// // //           )
// // //         }
// // //         {/* {
// // //           productData.map((p,index)=>{
// // //             return (
// // //               <ProductCardAdmin data={p}/>
// // //             )
// // //           })
// // //         } */}

// // //         {
// // //   productData.map((p) => {
// // //     return (
// // //       <ProductCardAdmin key={p._id} data={p} />
// // //     )
// // //   })
// // // }


// // // </section>
// // //   )
 
// // // }

// // // export default ProductAdmin;




// // import React, { useEffect, useState } from 'react'
// // import SummaryApi from '../common/SummaryApi'
// // import AxiosToastError from '../utils/AxiosToastError'
// // import Axios from '../utils/Axios'
// // import Loading from '../components/Loading'
// // import ProductCardAdmin from '../components/ProductCardAdmin'
// // import { IoSearchOutline } from "react-icons/io5";

// // const ProductAdmin = () => {
// //   const [productData,setProductData] = useState([])
// //   const [page,setPage] = useState(1)
// //   const [loading,setLoading] = useState(false)
// //   const [totalPageCount,setTotalPageCount] = useState(1)
// //   const [search,setSearch] = useState("")
  
// //   const fetchProductData = async()=>{
// //     try {
// //         setLoading(true)
// //         const response = await Axios({
// //            ...SummaryApi.getProduct,
// //            data : {
// //               page : page,
// //               limit : 12,
// //               search : search 
// //            }
// //         })

// //         const { data : responseData } = response 

// //         if(responseData.success){
// //           setTotalPageCount(responseData.totalNoPage)
// //           setProductData(responseData.data)
// //         }

// //     } catch (error) {
// //       AxiosToastError(error)
// //     }finally{
// //       setLoading(false)
// //     }
// //   }
  
// //   useEffect(()=>{
// //     fetchProductData()
// //   },[page])

// //   const handleNext = ()=>{
// //     if(page !== totalPageCount){
// //       setPage(preve => preve + 1)
// //     }
// //   }
// //   const handlePrevious = ()=>{
// //     if(page > 1){
// //       setPage(preve => preve - 1)
// //     }
// //   }

// //   const handleOnChange = (e)=>{
// //     const { value } = e.target
// //     setSearch(value)
// //     setPage(1)
// //   }

// //   useEffect(()=>{
// //     let flag = true 

// //     const interval = setTimeout(() => {
// //       if(flag){
// //         fetchProductData()
// //         flag = false
// //       }
// //     }, 300);

// //     return ()=>{
// //       clearTimeout(interval)
// //     }
// //   },[search])
  
// //   return (
// //     <section className=''>
// //         <div className='p-2  bg-white shadow-md flex items-center justify-between gap-4'>
// //                 <h2 className='font-semibold'>Product</h2>
// //                 <div className='h-full min-w-24 max-w-56 w-full ml-auto bg-blue-50 px-4 flex items-center gap-3 py-2 rounded  border focus-within:border-primary-200'>
// //                   <IoSearchOutline size={25}/>
// //                   <input
// //                     type='text'
// //                     placeholder='Search product here ...' 
// //                     className='h-full w-full  outline-none bg-transparent'
// //                     value={search}
// //                     onChange={handleOnChange}
// //                   />
// //                 </div>
// //         </div>
     


// //         <div className='p-4 bg-blue-50'>


// //             <div className='min-h-[55vh]'>
// //               <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4'>
// //                 {
// //                   productData.map((p,index)=>{
// //                     return(
// //                       <ProductCardAdmin data={p} fetchProductData={fetchProductData}  />
// //                     )
// //                   })
// //                 }
// //               </div>
// //             </div>
            
// //             <div className='flex justify-between my-4'>
// //               <button onClick={handlePrevious} className="border border-primary-200 px-4 py-1 hover:bg-primary-200">Previous</button>
// //               <button className='w-full bg-slate-100'>{page}/{totalPageCount}</button>
// //               <button onClick={handleNext} className="border border-primary-200 px-4 py-1 hover:bg-primary-200">Next</button>
// //             </div>

// //         </div>
          

      
// //     </section>
// //   )
// // }

// // export default ProductAdmin



// // import React, { useEffect, useState } from 'react'
// // import SummaryApi from '../common/SummaryApi'
// // import AxiosToastError from '../utils/AxiosToastError'
// // import Axios from '../utils/Axios'
// // import Loading from '../components/Loading'
// // import ProductCardAdmin from '../components/ProductCardAdmin'
// // import { IoSearchOutline } from "react-icons/io5";


// // const ProductAdmin = () => {
// //   const [productData,setProductData] = useState([])
// //   const [page,setPage] = useState(1)
// //   const [loading,setLoading] = useState(false)
// //   const [totalPageCount,setTotalPageCount] = useState(1)
// //   const [search,setSearch] = useState("")
  
// //   const fetchProductData = async()=>{
// //     try {
// //         setLoading(true)
// //         const response = await Axios({
// //            ...SummaryApi.getProduct,
// //            data : {
// //               page : page,
// //               limit : 12,
// //               search : search 
// //            }
// //         })

// //         const { data : responseData } = response 

// //         if(responseData.success){
// //           setTotalPageCount(responseData.totalNoPage)
// //           setProductData(responseData.data)
// //         }

// //     } catch (error) {
// //       AxiosToastError(error)
// //     }finally{
// //       setLoading(false)
// //     }
// //   }
  
// //   useEffect(()=>{
// //     fetchProductData()
// //   },[page])

// //   const handleNext = ()=>{
// //     if(page !== totalPageCount){
// //       setPage(preve => preve + 1)
// //     }
// //   }
// //   const handlePrevious = ()=>{
// //     if(page > 1){
// //       setPage(preve => preve - 1)
// //     }
// //   }

// //   const handleOnChange = (e)=>{
// //     const { value } = e.target
// //     setSearch(value)
// //     setPage(1)
// //   }

// //   useEffect(()=>{
// //     let flag = true 

// //     const interval = setTimeout(() => {
// //       if(flag){
// //         fetchProductData()
// //         flag = false
// //       }
// //     }, 300);

// //     return ()=>{
// //       clearTimeout(interval)
// //     }
// //   },[search])
  
// //   return (
// //     <section className='min-h-screen bg-gradient-to-br from-slate-50 to-blue-50'>
      
// //       {/* Header */}
// //       <div className='sticky top-0 z-10 backdrop-blur-md bg-white/80 border-b shadow-sm'>
// //         <div className='max-w-7xl mx-auto px-6 py-4 flex items-center justify-between'>
          
// //           <div>
// //             <h2 className='text-2xl font-bold text-slate-800'>
// //               Product Management
// //             </h2>
// //             <p className='text-sm text-slate-500'>
// //               Manage and monitor your product inventory
// //             </p>
// //           </div>

// //           {/* Search */}
// //           <div className='relative w-full max-w-md group'>
// //             <div className='absolute -inset-0.5 bg-gradient-to-r from-primary-400 to-primary-600 rounded-xl blur opacity-0 group-hover:opacity-60 transition'></div>
// //             <div className='relative flex items-center bg-white border rounded-xl px-4 py-2 shadow-sm group-hover:border-transparent transition'>
// //               <IoSearchOutline size={20} className='text-slate-400'/>
// //               <input
// //                 type='text'
// //                 placeholder='Search product here...'
// //                 className='w-full ml-3 outline-none bg-transparent text-slate-700 placeholder-slate-400'
// //                 value={search}
// //                 onChange={handleOnChange}
// //               />
// //             </div>
// //           </div>

// //         </div>
// //       </div>

// //       {/* Content */}
// //       <div className='max-w-7xl mx-auto px-6 py-8'>
        
// //         {/* Stats */}
// //         <div className='flex justify-between items-center bg-white rounded-2xl shadow-sm p-4 mb-6'>
// //           <div>
// //             <p className='text-sm text-slate-500'>Total Products</p>
// //             <p className='text-xl font-semibold text-primary-600'>
// //               {productData.length}
// //             </p>
// //           </div>
// //           <div className='text-sm text-slate-500'>
// //             Page {page} of {totalPageCount}
// //           </div>
// //         </div>

// //         {/* Product Grid */}
// //         <div className='min-h-[55vh]'>
// //           {loading ? (
// //             <div className='flex justify-center items-center py-20'>
// //               <Loading />
// //             </div>
// //           ) : (
// //             <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
// //               {productData.map((p,index)=>(
// //                 <ProductCardAdmin 
// //                   key={p._id || index}
// //                   data={p} 
// //                   fetchProductData={fetchProductData}  
// //                 />
// //               ))}
// //             </div>
// //           )}
// //         </div>
        
// //         {/* Pagination */}
// //         <div className='flex items-center justify-between mt-10 bg-white rounded-2xl shadow-sm p-3'>
          
// //           <button 
// //             onClick={handlePrevious} 
// //             disabled={page === 1}
// //             className={`px-6 py-2 rounded-xl font-medium transition ${
// //               page === 1
// //               ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
// //               : 'bg-primary-50 text-primary-600 hover:bg-primary-100'
// //             }`}
// //           >
// //             ← Previous
// //           </button>

// //           <div className='text-sm font-medium text-slate-600'>
// //             {page} / {totalPageCount}
// //           </div>

// //           <button 
// //             onClick={handleNext}
// //             disabled={page === totalPageCount}
// //             className={`px-6 py-2 rounded-xl font-medium transition ${
// //               page === totalPageCount
// //               ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
// //               : 'bg-primary-50 text-primary-600 hover:bg-primary-100'
// //             }`}
// //           >
// //             Next →
// //           </button>

// //         </div>

// //       </div>
// //     </section>
// //   )
// // }

// // export default ProductAdmin
// import React, { useEffect, useState } from 'react'
// import SummaryApi from '../common/SummaryApi'
// import AxiosToastError from '../utils/AxiosToastError'
// import Axios from '../utils/Axios'
// import Loading from '../components/Loading'
// import ProductCardAdmin from '../components/ProductCardAdmin'
// import { IoSearchOutline } from "react-icons/io5";
// import EditProductAdmin from '../components/EditProductAdmin'

// const ProductAdmin = () => {
//   const [productData,setProductData] = useState([])
//   const [page,setPage] = useState(1)
//   const [loading,setLoading] = useState(false)
//   const [totalPageCount,setTotalPageCount] = useState(1)
//   const [search,setSearch] = useState("")
  
//   const fetchProductData = async()=>{
//     try {
//         setLoading(true)
//         const response = await Axios({
//            ...SummaryApi.getProduct,
//            data : {
//               page : page,
//               limit : 12,
//               search : search 
//            }
//         })

//         const { data : responseData } = response 

//         if(responseData.success){
//           setTotalPageCount(responseData.totalNoPage)
//           setProductData(responseData.data)
//         }

//     } catch (error) {
//       AxiosToastError(error)
//     }finally{
//       setLoading(false)
//     }
//   }
  
//   useEffect(()=>{
//     fetchProductData()
//   },[page])

//   const handleNext = ()=>{
//     if(page !== totalPageCount){
//       setPage(preve => preve + 1)
//     }
//   }
//   const handlePrevious = ()=>{
//     if(page > 1){
//       setPage(preve => preve - 1)
//     }
//   }

//   const handleOnChange = (e)=>{
//     const { value } = e.target
//     setSearch(value)
//     setPage(1)
//   }

//   useEffect(()=>{
//     let flag = true 

//     const interval = setTimeout(() => {
//       if(flag){
//         fetchProductData()
//         flag = false
//       }
//     }, 300);

//     return ()=>{
//       clearTimeout(interval)
//     }
//   },[search])
  
//   return (
//     <section className=''>
//         <div className='p-2  bg-white shadow-md flex items-center justify-between gap-4'>
//                 <h2 className='font-semibold'>Product</h2>
//                 <div className='h-full min-w-24 max-w-56 w-full ml-auto bg-blue-50 px-4 flex items-center gap-3 py-2 rounded  border focus-within:border-primary-200'>
//                   <IoSearchOutline size={25}/>
//                   <input
//                     type='text'
//                     placeholder='Search product here ...' 
//                     className='h-full w-full  outline-none bg-transparent'
//                     value={search}
//                     onChange={handleOnChange}
//                   />
//                 </div>
//         </div>
//         {
//           loading && (
//             <Loading/>
//           )
//         }


//         <div className='p-4 bg-blue-50'>


//             <div className='min-h-[55vh]'>
//               <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4'>
//                 {
//                   productData.map((p,index)=>{
//                     return(
//                       <ProductCardAdmin data={p} fetchProductData={fetchProductData}  />
//                     )
//                   })
//                 }
//               </div>
//             </div>
            
//             <div className='flex justify-between my-4'>
//               <button onClick={handlePrevious} className="border border-primary-200 px-4 py-1 hover:bg-primary-200">Previous</button>
//               <button className='w-full bg-slate-100'>{page}/{totalPageCount}</button>
//               <button onClick={handleNext} className="border border-primary-200 px-4 py-1 hover:bg-primary-200">Next</button>
//             </div>

//         </div>
          

      
//     </section>
//   )
// }

// export default ProductAdmin



import React, { useEffect, useState } from 'react'
import SummaryApi from '../common/SummaryApi'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import Loading from '../components/Loading'
import ProductCardAdmin from '../components/ProductCardAdmin'
import { IoSearchOutline } from "react-icons/io5";
import EditProductAdmin from '../components/EditProductAdmin'

const ProductAdmin = () => {
  const [productData,setProductData] = useState([])
  const [page,setPage] = useState(1)
  const [loading,setLoading] = useState(false)
  const [totalPageCount,setTotalPageCount] = useState(1)
  const [search,setSearch] = useState("")

  const [openEdit,setOpenEdit] = useState(false)
  const [editData,setEditData] = useState(null)
  
  const fetchProductData = async()=>{
    try {
        setLoading(true)
        const response = await Axios({
           ...SummaryApi.getProduct,
           data : {
              page : page,
              limit : 12,
              search : search 
           }
        })

        const { data : responseData } = response 

        if(responseData.success){
          setTotalPageCount(responseData.totalNoPage)
          setProductData(responseData.data)
        }

    } catch (error) {
      AxiosToastError(error)
    }finally{
      setLoading(false)
    }
  }
  
  useEffect(()=>{
    fetchProductData()
  },[page])

  const handleNext = ()=>{
    if(page !== totalPageCount){
      setPage(preve => preve + 1)
    }
  }

  const handlePrevious = ()=>{
    if(page > 1){
      setPage(preve => preve - 1)
    }
  }

  const handleOnChange = (e)=>{
    const { value } = e.target
    setSearch(value)
    setPage(1)
  }

  useEffect(()=>{
    const interval = setTimeout(() => {
        fetchProductData()
    }, 300);

    return ()=> clearTimeout(interval)

  },[search])

  const handleEdit = (product)=>{
    setEditData(product)
    setOpenEdit(true)
  }

return (
  <section className='min-h-screen bg-gradient-to-br from-slate-50 to-blue-50'>

    {/* ===== HEADER ===== */}
    <div className='sticky top-0 z-10 backdrop-blur bg-white/80 border-b shadow-sm'>
      <div className='px-6 py-4 flex items-center justify-between gap-6 max-w-7xl mx-auto'>

        <div>
          <h2 className='text-2xl font-bold text-slate-800'>Product Management</h2>
          <p className='text-sm text-slate-500'>Manage your product inventory</p>
        </div>

        {/* Search */}
        <div className='relative min-w-[280px]'>
          <IoSearchOutline className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-400'/>
          <input
            type='text'
            placeholder='Search products...'
            value={search}
            onChange={handleOnChange}
            className='w-full pl-10 pr-4 py-2 rounded-xl border bg-white focus:ring-2 focus:ring-primary-200 outline-none shadow-sm'
          />
        </div>

      </div>
    </div>

    {/* ===== LOADING ===== */}
    {loading && (
      <div className='flex justify-center items-center py-10'>
        <Loading/>
      </div>
    )}

    {/* ===== CONTENT ===== */}
    <div className='max-w-7xl mx-auto px-6 py-8'>

      {/* Stats Bar */}
      <div className='mb-6 flex justify-between items-center bg-white rounded-2xl p-4 shadow-sm border'>
        <div>
          <p className='text-sm text-slate-500'>Total Products</p>
          <p className='text-xl font-bold text-slate-800'>{productData.length}</p>
        </div>

        <div className='text-sm text-slate-500'>
          Page {page} of {totalPageCount || 1}
        </div>
      </div>

      {/* Product Grid */}
      <div className='min-h-[55vh]'>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6'>
          {productData.map((p)=>(
            <ProductCardAdmin
              key={p._id}
              data={p}
              fetchProductData={fetchProductData}
              onEdit={handleEdit}
            />
          ))}
        </div>
      </div>

      {/* ===== PAGINATION ===== */}
      <div className='mt-10 flex items-center justify-between bg-white rounded-2xl p-3 shadow-sm border'>

        <button 
          onClick={handlePrevious}
          disabled={page === 1}
          className={`px-5 py-2 rounded-xl font-medium transition ${
            page === 1
              ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
              : 'bg-primary-50 text-primary-600 hover:bg-primary-100'
          }`}
        >
          ← Previous
        </button>

        <div className='flex items-center gap-2 text-sm text-slate-600'>
          <span className='px-3 py-1 bg-slate-100 rounded-lg'>
            {page}
          </span>
          <span>of</span>
          <span className='px-3 py-1 bg-slate-100 rounded-lg'>
            {totalPageCount}
          </span>
        </div>

        <button 
          onClick={handleNext}
          disabled={page === totalPageCount}
          className={`px-5 py-2 rounded-xl font-medium transition ${
            page === totalPageCount
              ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
              : 'bg-primary-50 text-primary-600 hover:bg-primary-100'
          }`}
        >
          Next →
        </button>

      </div>

    </div>

    {/* ===== EDIT MODAL ===== */}
    {openEdit && editData && (
      <EditProductAdmin
        data={editData}
        close={()=>setOpenEdit(false)}
        fetchProductData={fetchProductData}
      />
    )}

  </section>
)
}

export default ProductAdmin
