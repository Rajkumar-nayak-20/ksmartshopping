// // import React, { useEffect, useState } from "react";
// // import { useParams } from "react-router-dom";
// // import Axios from "../utils/Axios";
// // import summaryApi from "../common/SummaryApi";
// // import AxiosToastError from "../utils/AxiosToastError";
// // import Loading from "../components/Loading";
// // import CardProduct from "../components/CardProduct";
// // import { useSelector } from "react-redux";

// // const ProductListPage = () => {
// //   const [data, setData] = useState([]);
// //   const [page, setpage] = useState(1);
// //   const [loading, setLoading] = useState(false);
// //   const [totalPage, setTotalPage] = useState(0);
// //   const parms = useParams()
// //   const AllsubCategory =useSelector(state => state.product.allSubCategory)
// //   // console.log(AllsubCategory);

// //   const subCategory = parms?.subCategory?.split("-");
// //   const subcategoryName = subCategory
// //     ?.slice(0, subCategory?.length - 1)
// //     ?.join("-");
// //      const categoryId = parms?.category?.split("-")?.slice(-1)[0];
// //     const subCategoryId = parms?.subCategory?.split("-")?.slice(-1)[0];
// //   console.log(categoryId, subCategoryId);

// //   const fetchProductdata = async () => {

// //     try {
// //       setLoading(true);
// //       const response = await Axios({
// //         ...summaryApi.getProductByCategoryAndSubCategory,
// //         data: {
// //           categoryId: categoryId,
// //           subCategoryId: subCategoryId,
// //           page: page,
// //           limit: 10,
// //         },
// //       });
// //       const { data: responseData } = response;
// //       if (responseData?.success) {
// //         if (responseData.page == 1) {
// //           setData(responseData?.data);
// //         } else {
// //           setData([...data, ...responseData?.data]);
// //         }

// //         // setData(responseData?.data)
// //         setTotalPage(responseData?.totalPage);
// //       }
// //     } catch (error) {
// //       AxiosToastError(error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };
// //   useEffect(() => {
// //     fetchProductdata();
// //   }, [parms])
// //   useEffect(()=>{
// //     const sub =AllsubCategory.filter(s=>{
// //       const filterData =s.category.some(el=>{
// //         return el._id === categoryId
// //       })
// //       return filterData ? filterData : false

// //     })
// //     console.log(sub);

// //   },[parms])
// //   return (
// //     <section className="sticky top-24 lg:top-20">
// //       <div className="container sticky top-24 mx-auto  grid grid-cols-[90px_1fr] md:grid-cols-[200px_1fr] lg:grid-cols-[280px_1fr]">
// //         {/* subcategory  */}
// //         <div className="min-h-[79vh] bg-amber-300">sub</div>

// //         {/* product */}
// //         <div className=" ">
// //           <div className="bg-white  shadow-md p-4">
// //             <h3 className="font-semibold">{subcategoryName}</h3>
// //           </div>
// //           <div>
// //             <div>
// //               {data.map((p, index) => {
// //                 return (
// //                   <CardProduct
// //                     data={p}
// //                     key={p._id + "productsubcategory" + index}
// //                   />
// //                 );
// //               })}
// //             </div>
// //             {loading && <Loading />}
// //           </div>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // };
// // export default ProductListPage;
// import React, { useEffect, useState } from "react";
// import Axios from "../utils/Axios";
// import SummaryApi from "../common/SummaryApi";
// import { Link, useParams } from "react-router-dom";
// import AxiosToastError from "../utils/AxiosToastError";
// import Loading from "../components/Loading";
// import CardProduct from "../components/CardProduct";
// import { useSelector } from "react-redux";
// import { valideURLConvert } from "../utils/valideURLConvert";

// const ProductListPage = () => {
//   const [data, setData] = useState([]);
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [totalPage, setTotalPage] = useState(1);
//   const [DisplaySubCategory, setDisplaySubCategory] = useState([]);

//   const params = useParams();

//   const AllSubCategory = useSelector(
//     (state) => state.product?.allSubCategory || [],
//   );

//   const categoryId = params?.category?.split("-")?.slice(-1)[0];
//   const subCategoryId = params?.subCategory?.split("-")?.slice(-1)[0];

//   const subCategory = params?.subCategory?.split("-");
//   const subCategoryName = subCategory?.slice(0, -1)?.join(" ");

//   const fetchProductdata = async () => {
//     try {
//       setLoading(true);

//       const response = await Axios({
//         ...SummaryApi.getProductByCategoryAndSubCategory,
//         data: {
//           categoryId,
//           subCategoryId,
//           page,
//           limit: 8,
//         },
//       });

//       const { data: responseData } = response;

//       if (responseData.success) {
//         setData((prev) =>
//           page === 1 ? responseData.data : [...prev, ...responseData.data],
//         );

//         setTotalPage(responseData.totalCount);
//       }
//     } catch (error) {
//       AxiosToastError(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (categoryId && subCategoryId) {
//       setPage(1);
//       fetchProductdata();
//     }
//   }, [categoryId, subCategoryId]);

//   useEffect(() => {
//     if (!categoryId) return;

//     if (!Array.isArray(AllSubCategory)) return;

//     // console.log("Category ID:", categoryId)
//     // console.log("AllSubCategory:", AllSubCategory)

//     const sub = AllSubCategory.filter((s) => {
//       // console.log("Checking:", s)

//       if (Array.isArray(s.category)) {
//         return s.category.some((el) => String(el._id) === String(categoryId));
//       }

//       return String(s.category?._id) === String(categoryId);
//     });

//     console.log("Filtered Sub:", sub);

//     setDisplaySubCategory(sub);
//   }, [categoryId, AllSubCategory]);

//   return (
//     <section className="bg-gray-100 min-h-screen pt-3">
//       <div className="lg:hidden bg-white shadow-sm sticky top-20 z-20 overflow-x-auto">
//         <div className="flex gap-3 px-4 py-3 min-w-max">
//           {DisplaySubCategory.map((s) => {
//             const link = `/${valideURLConvert(
//               s?.category?.name || s?.category?.[0]?.name,
//             )}-${
//               s?.category?._id || s?.category?.[0]?._id
//             }/${valideURLConvert(s.name)}-${s._id}`;

//             const isActive = String(subCategoryId) === String(s._id);

//             return (
//               <Link
//                 key={s._id}
//                 to={link}
//                 className={`px-4 py-2 rounded-full text-sm whitespace-nowrap
//                 ${
//                   isActive
//                     ? "bg-green-600 text-white"
//                     : "bg-gray-100 text-gray-700"
//                 }
//               `}
//               >
//                 {s.name}
//               </Link>
//             );
//           })}
//         </div>
//       </div>

//       <div className="container mx-auto flex gap-4">
//         {/* <aside className="hidden lg:block w-[240px] bg-white rounded-xl shadow-sm 
//                         h-[85vh] overflow-y-auto sticky top-24">

//         <div className="p-4 border-b font-semibold text-gray-700">
//           Sub Categories
//         </div>

//         {DisplaySubCategory.map((s) => {

//           const link = `/${valideURLConvert(
//             s?.category?.name || s?.category?.[0]?.name
//           )}-${s?.category?._id || s?.category?.[0]?._id
//             }/${valideURLConvert(s.name)}-${s._id}`

//           const isActive =
//             String(subCategoryId) === String(s._id)

//           return (
//             <Link
//               key={s._id}
//               to={link}
//               className={`flex items-center gap-3 px-4 py-3 border-b
//                 ${isActive
//                   ? "bg-green-50 border-l-4 border-green-600"
//                   : "hover:bg-gray-50"}
//               `}
//             >
//               <img
//                 src={s.image}
//                 alt={s.name}
//                 className="w-10 h-10 object-contain"
//               />
//               <span className="text-sm font-medium">
//                 {s.name}
//               </span>
//             </Link>
//           )
//         })}

//       </aside> */}
//         <aside
//           className="
//   hidden lg:flex flex-col
//   w-[260px] 
//   bg-white 
//   shadow-lg 
//   border-r
//   h-[calc(100vh-96px)]
//   sticky top-24
// "
//         >
//           {/* Header */}
//           <div className="px-6 py-5 border-b">
//             <h3 className="text-base font-semibold text-gray-800 tracking-wide">
//               Sub Categories
//             </h3>
//           </div>

//           {/* Scroll Area */}
//           <div className="flex-1 overflow-y-auto scrollbar-thin">
//             {DisplaySubCategory.map((s) => {
//               const link = `/${valideURLConvert(
//                 s?.category?.name || s?.category?.[0]?.name,
//               )}-${
//                 s?.category?._id || s?.category?.[0]?._id
//               }/${valideURLConvert(s.name)}-${s._id}`;

//               const isActive = String(subCategoryId) === String(s._id);

//               return (
//                 <Link
//                   key={s._id}
//                   to={link}
//                   className={`
//             group relative flex items-center gap-4 
//             px-5 py-3 transition-all duration-200
//             ${isActive ? "bg-green-50" : "hover:bg-gray-50"}
//           `}
//                 >
//                   {/* Image */}
//                   <div
//                     className="
//             w-11 h-11 
//             bg-gray-100 
//             rounded-xl 
//             flex items-center justify-center
//             group-hover:bg-green-50
//             transition-all duration-200
//           "
//                   >
//                     <img
//                       src={s.image}
//                       alt={s.name}
//                       className="w-8 h-8 object-contain"
//                     />
//                   </div>

//                   {/* Name */}
//                   <span
//                     className={`
//             text-sm font-medium
//             ${
//               isActive
//                 ? "text-green-700"
//                 : "text-gray-700 group-hover:text-gray-900"
//             }
//           `}
//                   >
//                     {s.name}
//                   </span>
//                 </Link>
//               );
//             })}
//           </div>
//         </aside>

//         <main className="flex-1 bg-gray-50 min-h-screen">
//           <div
//             className="
//     hidden lg:flex 
//     items-center 
//     justify-between 
//     bg-white 
//     px-6 
//     py-4 
//     sticky top-20 
//     z-20 
//     border-b
//     backdrop-blur-sm
//   "
//           >
//             <div>
//               <h2 className="text-xl font-semibold text-gray-800 tracking-tight">
//                 {subCategoryName}
//               </h2>
//               <p className="text-sm text-gray-500 mt-1">
//                 {data.length} Products Available
//               </p>
//             </div>

//             <div className="text-sm text-gray-600">
//               Sort by: <span className="font-medium">Popularity</span>
//             </div>
//           </div>
//           <div className="px-4 lg:px-8 py-6">
//             <div
//               className="
//       grid
//       grid-cols-2
//       sm:grid-cols-2
//       md:grid-cols-3
//       lg:grid-cols-4
//       xl:grid-cols-5
//       gap-5
//     "
//             >
//               {data.map((p) => (
//                 <CardProduct key={p._id} data={p} />
//               ))}
//             </div>

//             {/* Loading */}
//             {loading && (
//               <div className="flex justify-center py-10">
//                 <Loading />
//               </div>
//             )}
//           </div>
//         </main>
//       </div>
//     </section>
//   );
// };
// export default ProductListPage;
import React, { useEffect, useState } from "react";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { Link, useParams } from "react-router-dom";
import AxiosToastError from "../utils/AxiosToastError";
import Loading from "../components/Loading";
import CardProduct from "../components/CardProduct";
import { useSelector } from "react-redux";
import { valideURLConvert } from "../utils/valideURLConvert";
const ProductListPage = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(1);
  const [DisplaySubCategory, setDisplaySubCategory] = useState([]);
  const params = useParams();
  const AllSubCategory = useSelector(
    (state) => state.product?.allSubCategory || []
  );
  const categoryId = params?.category?.split("-")?.slice(-1)[0];
  const subCategoryId = params?.subCategory?.split("-")?.slice(-1)[0] || "all";
  const subCategoryName =
    subCategoryId === "all"
      ? "All Products"
      : params?.subCategory?.split("-")?.slice(0, -1)?.join(" ");
  // 🔥 FETCH PRODUCTS
  const fetchProductdata = async (currentPage = 1) => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getProductByCategoryAndSubCategory,
        data: {
          categoryId,
          subCategoryId,
          page: currentPage,
          limit: 8,
        },
      });
      const { data: responseData } = response;
      if (responseData.success) {
        setData((prev) =>
          currentPage === 1
            ? responseData.data
            : [...prev, ...responseData.data]
        );
        setTotalPage(responseData.totalPage);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };
  // 🔥 When Category or SubCategory Changes
  useEffect(() => {
    if (!categoryId) return;
    setPage(1);
    fetchProductdata(1);
  }, [categoryId, subCategoryId]);
  // 🔥 Load More
  useEffect(() => {
    if (page > 1) {
      fetchProductdata(page);
    }
  }, [page]);
  // 🔥 Filter Subcategories
  useEffect(() => {
    if (!categoryId) return;
    const sub = AllSubCategory.filter((s) => {
      if (Array.isArray(s.category)) {
        return s.category.some(
          (el) => String(el._id) === String(categoryId)
        );
      }
      return String(s.category?._id) === String(categoryId);
    });
    setDisplaySubCategory(sub);
  }, [categoryId, AllSubCategory]);
  return (
    <section className="bg-gray-100 min-h-screen pt-3">
      <div className="container mx-auto flex gap-4">
        {/* ✅ SIDEBAR */}
        <aside className="hidden lg:flex flex-col w-[260px] bg-white shadow-lg border-r h-[calc(100vh-96px)] sticky top-24">
          <div className="px-6 py-5 border-b font-semibold">
            Sub Categories
          </div>
          <div className="flex-1 overflow-y-auto">
            {/* 🔥 ALL OPTION */}
            <Link
              to={`/${params.category}/all`}
              className={`px-5 py-3 block ${
                subCategoryId === "all"
                  ? "bg-green-50 text-green-700"
                  : "hover:bg-gray-50"
              }`}
            >
              All
            </Link>
            {DisplaySubCategory.map((s) => {
              const link = `/${params.category}/${valideURLConvert(
                s.name
              )}-${s._id}`
              const isActive =
                String(subCategoryId) === String(s._id);
              return (
                <Link
                  key={s._id}
                  to={link}
                  className={`px-5 py-3 block ${
                    isActive
                      ? "bg-green-50 text-green-700"
                      : "hover:bg-gray-50"
                  }`}
                >
                  {s.name}
                </Link>
              );
            })}
          </div>
        </aside>
        {/* ✅ MAIN CONTENT */}
        <main className="flex-1 bg-gray-50 min-h-screen">
          <div className="bg-white px-6 py-4 border-b sticky top-20 z-20">
            <h2 className="text-xl font-semibold">
              {subCategoryName}
            </h2>
            <p className="text-sm text-gray-500">
              {data.length} Products
            </p>
          </div>
          <div className="px-6 py-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {data.map((p) => (
              <CardProduct key={p._id} data={p} />
            ))}
          </div>
          {loading && (
            <div className="flex justify-center py-6">
              <Loading />
            </div>
          )}
          {/* LOAD MORE BUTTON */}
          {page < totalPage && (
            <div className="flex justify-center pb-10">
              <button
                onClick={() => setPage((prev) => prev + 1)}
                className="px-6 py-2 bg-green-600 text-white rounded-lg"
              >
                Load More
              </button>
            </div>
          )}
        </main>
      </div>
    </section>
  );
};

export default ProductListPage;