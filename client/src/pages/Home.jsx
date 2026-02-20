// import React, { use } from "react";
// import banner from "../assets/banner.jpg";
// import bannerMobile from "../assets/banner-mobile.jpg";
// import { useSelector } from "react-redux";

// const Home = () => {
//   const loadingCategory = useSelector((state) => state.product.loadingCategory)
//   const categoryData =useSelector((state)=>state.product.allCategory)
//   return (
//     <section className="bg-white">
//       <div className="container mx-auto   ">
//         <div
//           className={`min-h-48 bg-blue-100 w-full h-full rounded ${!banner && "animate-pulse"}
//          my-2`}
//         >
//           <img
//             src={banner}
//             className=" w-full h-full hidden lg:block "
//             alt=""
//           />
//           <img
//             src={bannerMobile}
//             className=" w-full h-full  lg:hidden "
//             alt=""
//           />
//         </div>
//       </div>
//       <div className="container mx-auto  px-4 my-2 grid grid-cols-2  md:grid-cols-4 lg:grid-cols-6 gap-5">
//         {
//           loadingCategory ? (
//              new Array(12).fill(null).map((c, index) => {
//           return (
//             <div className="bg-white rounded p-4 min-h-36 grid  gap-2 shadow animate-pulse " >
//               <div className="bg-blue-100 min-h-24 rounded"></div>

//               <div className="bg-blue-100 h-8 rounded"></div>

//             </div>

//           )
//         })
//           ) :(

//             categoryData.map((cat)=>{
//               return (
//                  <div>
//                 <div>
//                   <img
//                    src={cat.image}
//                   />
//                 </div>
//             </div>
//               )
//             })

//           )
//        }
//       </div>
//     </section>
//   );
// };

// export default Home;

import React from "react";
import banner from "../assets/banner.jpg";
import bannerMobile from "../assets/banner-mobile.jpg";
import { useSelector } from "react-redux";
import { valideURLConvert } from "../utils/valideURLConvert";
import { Link, useNavigate } from "react-router-dom";
import CategoryWiseProductDisplay from "../components/CategoryWiseProductDisplay";

const Home = () => {
  const loadingCategory = useSelector(
    (state) => state.product?.loadingCategory,
  );
  const categoryData = useSelector((state) => state.product?.allCategory || []);
  const subcategoryData = useSelector(
    (state) => state.product?.allSubCategory || [],
  );
  const navigate = useNavigate();
  const handleRedirectProductListpage = (id, cat) => {
    console.log("redirect to product list page with category id ", id, cat);
    // const subcategory =subcategoryData.find(sub =>{
    //    const filterData = sub.category.some(c =>{
    //     return c._id == id
    //    })
    //    return filterData ? true : null
    // })
    const subcategory = subcategoryData.find((sub) => {
      if (Array.isArray(sub.category)) {
        return sub.category.some((c) => c._id === id);
      }

      return sub.category?._id === id;
    })
    
    const url = `/${valideURLConvert(cat)}-${id}/${valideURLConvert(subcategory.name)}-${subcategory._id}`;
      navigate(url);
    console.log(url);
  }
  
   
  return (
    <section className="bg-gray-50 min-h-screen">
      {/* Banner Section */}
      <div className="container mx-auto px-4">
        <div className="rounded-xl overflow-hidden my-4 shadow-md">
          <img src={banner} className="w-full hidden lg:block" alt="banner" />
          <img
            src={bannerMobile}
            className="w-full lg:hidden"
            alt="banner mobile"
          />
        </div>
      </div>

      {/* Category Section */}
      {/* <div className="container mx-auto px-4 my-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {loadingCategory
            ? new Array(12).fill(null).map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-4 shadow animate-pulse"
                >
                  <div className="bg-gray-200 h-24 rounded-lg mb-3"></div>
                  <div className="bg-gray-200 h-6 rounded"></div>
                </div>
              ))
            : categoryData.map((cat) => (
                <div
                  key={cat._id}
                  className="bg-white rounded-xl p-4 shadow hover:shadow-lg transition duration-300 cursor-pointer text-center"
                  onClick={() =>
                    handleRedirectProductListpage(cat._id, cat.name)
                  }
                >
                  <div className="flex justify-center items-center">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="h-24 object-contain transition-transform duration-300 hover:scale-105"
                    />
                  </div>

                  <h3 className="mt-3 text-sm font-medium text-gray-700">
                    {cat.name}
                  </h3>
                </div>
              ))}
        </div>
      </div> */}
      
      
      {/* Unique Category Section */}
<div className="container mx-auto px-4 my-8">
  <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-9 gap-4">

    {categoryData.map((cat) => (
      <div
        key={cat._id}
        onClick={() =>
          handleRedirectProductListpage(cat._id, cat.name)
        }
        className="group relative flex flex-col items-center justify-center 
                   bg-gradient-to-br from-white to-gray-50 
                   rounded-2xl p-3 
                   shadow-sm hover:shadow-xl 
                   transition-all duration-300 
                   cursor-pointer 
                   overflow-hidden"
      >

        {/* Soft Glow Background */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 
                        bg-gradient-to-br from-green-100 to-emerald-50 
                        transition duration-300 rounded-2xl"></div>

        {/* Image */}
        <div className="relative z-10 flex items-center justify-center h-20">
          <img
            src={cat.image}
            alt={cat.name}
            className="h-16 object-contain 
                       transition-transform duration-300 
                       group-hover:scale-110"
          />
        </div>

        {/* Title */}
        <h3 className="relative z-10 mt-2 text-xs font-semibold text-gray-700 text-center">
          {cat.name}
        </h3>

      </div>
    ))}
  </div>
</div>
{/* 
      display category product */}
      {
        categoryData.map((c,index)=>{
          return(
            
                <CategoryWiseProductDisplay  key={c?._id+"categoryWiseProduct"} id={c._id}name={c.name}/>

          )
        })
      }
    </section>
  );
};

export default Home;

//42:00
