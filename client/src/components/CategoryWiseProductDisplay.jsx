// // import React, { useEffect, useState } from 'react'
// // import { Link } from 'react-router-dom'
// // import AxiosToastError from '../utils/AxiosToastError'
// // import Axios from '../utils/Axios'
// // import summaryApi from '../common/SummaryApi'
// // import CardLoading from './CardLoading'
// // import CardProduct from './CardProduct'
// // import { FaAngleLeft } from "react-icons/fa";
// // import { FaAngleRight } from "react-icons/fa";



// // const CategoryWiseProductDisplay = ({id,name}) => {
// //     const [data,setData] = useState([])
// //     const [loading,setLoading] = useState(false)
// //     const fetchCategoryWiseProduct = async() =>{
// //       try {
// //         const response =await Axios({
// //           ...summaryApi.getProductByCategory,
// //           data :{
// //             id : id
// //           }
// //         })
// //         const{data : responseData}=response
// //         if(responseData.success){
// //           setData(responseData.data)
// //         }
// //         console.log(responseData);
        
// //       } catch (error) {
// //         AxiosToastError(error)
// //       }finally{
// //           setLoading(false)
// //       }
// //     }
// //     useEffect(()=>{
// //       fetchCategoryWiseProduct()
// //     },[])
// //     const loadingCardNumber =new Array(5).fill(null)
// //  return (
// //   <section className="py-8 bg-gradient-to-b from-white to-gray-50">
    
// //     {/* Header */}
// //     <div className="container mx-auto px-4 flex justify-between items-center mb-6">
      
// //       <div>
// //         <h3 className="text-xl md:text-2xl font-bold text-gray-800 relative inline-block">
// //           {name}
// //           <span className="absolute -bottom-1 left-0 w-10 h-1 bg-green-500 rounded"></span>
// //         </h3>
// //       </div>

// //       <Link
// //         to=""
// //         className="text-sm font-medium px-4 py-2 border border-green-500 text-green-600 rounded-full hover:bg-green-500 hover:text-white transition-all duration-300"
// //       >
// //         See All →
// //       </Link>
// //     </div>

// //     {/* Product Row */}
// //     <div className="container mx-auto px-4">
// //       <div className="flex gap-4 md:gap-6 lg:gap-8 overflow-x-auto scrollbar-hide pb-2">
        
// //         {loading &&
// //           loadingCardNumber.map((_, index) => (
// //             <CardLoading key={"CategorywiseProductDisplay" + index} />
// //           ))}

// //         {!loading &&
// //           data.map((p, index) => (
// //             <div
// //               key={p._id + "CategorywiseProductDisplay" + index}
// //               className="transform hover:-translate-y-2 transition duration-300"
// //             >
// //               <CardProduct data={p} />
// //             </div>
// //           ))}
// //           <div className='w-full  left-0 right-0 container absolute hidden mx-auto px-2 flex justify-between'>
// //             <button className='z-10 relative bg-white hover:bg-gray-100  shadow-lg text-lg p-4 rounded-full'>
// //           <FaAngleLeft />

// //             </button>
// //             <button className='z-10 relative bg-white  hover:bg-gray-100 shadow-lg text-lg p-4 rounded-full'>
// //               <FaAngleRight />
// //             </button>
// //           </div>
// //       </div>
// //     </div>
// //   </section>
// // );

// // }

// // export default CategoryWiseProductDisplay



// import React, { useEffect, useRef, useState } from "react";
// import { Link } from "react-router-dom";
// import AxiosToastError from "../utils/AxiosToastError";
// import Axios from "../utils/Axios";
// import summaryApi from "../common/SummaryApi";
// import CardLoading from "./CardLoading";
// import CardProduct from "./CardProduct";
// import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

// const CategoryWiseProductDisplay = ({ id, name }) => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const scrollRef = useRef();   // 👈 important

//   const fetchCategoryWiseProduct = async () => {
//     try {
//       setLoading(true);
//       const response = await Axios({
//         ...summaryApi.getProductByCategory,
//         data: { id: id },
//       });

//       const { data: responseData } = response;

//       if (responseData.success) {
//         setData(responseData.data);
//       }
//     } catch (error) {
//       AxiosToastError(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCategoryWiseProduct();
//   }, [id]);

//   // 👇 Scroll Functions
//   const scrollLeft = () => {
//     scrollRef.current.scrollBy({
//       left: -300,
//       behavior: "smooth",
//     });
//   };

//   const scrollRight = () => {
//     scrollRef.current.scrollBy({
//       left: 300,
//       behavior: "smooth",
//     });
//   };

//   const loadingCardNumber = new Array(5).fill(null);

//   return (
//     <section className="py-8 bg-gradient-to-b from-white to-gray-50 relative">
      
//       {/* Header */}
//       <div className="container mx-auto px-4 flex justify-between items-center mb-6">
//         <h3 className="text-xl md:text-2xl font-bold text-gray-800 relative inline-block">
//           {name}
//           <span className="absolute -bottom-1 left-0 w-10 h-1 bg-green-500 rounded"></span>
//         </h3>

//         <Link
//           to=""
//           className="text-sm font-medium px-4 py-2 border border-green-500 text-green-600 rounded-full hover:bg-green-500 hover:text-white transition-all duration-300"
//         >
//           See All →
//         </Link>
//       </div>

//       {/* Product Row */}
//       <div className="container mx-auto px-4 relative">

//         {/* Left Button */}
//         <button
//           onClick={scrollLeft}
//           className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-lg p-3 rounded-full z-10 hover:bg-gray-100"
//         >
//           <FaAngleLeft />
//         </button>

//         {/* Right Button */}
//         <button
//           onClick={scrollRight}
//           className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-lg p-3 rounded-full z-10 hover:bg-gray-100"
//         >
//           <FaAngleRight />
//         </button>

//         {/* Scroll Container */}
//         <div
//           ref={scrollRef}
//           className="flex gap-4 md:gap-6 lg:gap-8 overflow-x-auto scrollbar-hide scroll-smooth"
//         >
//           {loading &&
//             loadingCardNumber.map((_, index) => (
//               <CardLoading key={"loading" + index} />
//             ))}

//           {!loading &&
//             data.map((p) => (
//               <div
//                 key={p._id}
//                 className="min-w-[200px] transform hover:-translate-y-2 transition duration-300"
//               >
//                 <CardProduct data={p} />
//               </div>
//             ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default CategoryWiseProductDisplay;

import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import summaryApi from "../common/SummaryApi";
import CardLoading from "./CardLoading";
import CardProduct from "./CardProduct";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useSelector } from "react-redux";

const CategoryWiseProductDisplay = ({ id, name }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const scrollRef = useRef(null);

  const fetchCategoryWiseProduct = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...summaryApi.getProductByCategory,
        data: { id },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        setData(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false)
    }
  }
  useEffect(()=> {
    fetchCategoryWiseProduct();
  }, [id]);
  const scrollLeft = () => {
    scrollRef.current.scrollBy({

      left: -300,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({
      left: 300,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    const el = scrollRef.current;
    setShowLeft(el.scrollLeft > 0);
    setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 5);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", handleScroll);
      handleScroll();
    }
    return () => el?.removeEventListener("scroll", handleScroll);
  }, [data]);

  const loadingCardNumber = new Array(5).fill(null);

  return (
    <section className="py-8 bg-gradient-to-b from-white to-gray-50">
      
      {/* Header */}
      <div className="container mx-auto px-4 flex justify-between items-center mb-6">
        <h3 className="text-xl md:text-2xl font-bold text-gray-800 relative inline-block">
          {name}
          <span className="absolute -bottom-1 left-0 w-10 h-1 bg-green-500 rounded"></span>
        </h3>

        <Link
          to=""
          className="text-sm font-medium px-4 py-2 border border-green-500 text-green-600 rounded-full hover:bg-green-500 hover:text-white transition-all duration-300"
        >
          See All →
        </Link>
      </div>

      {/* Product Row */}
      <div className="container mx-auto px-4 relative">

        {/* Left Arrow */}
        {showLeft && (
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-md p-3 rounded-full z-10 hover:bg-blue-100"
          >
            <FaAngleLeft />
          </button>
        )}

        {/* Right Arrow */}
        {showRight && (
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md p-3 rounded-full z-10 hover:bg-blue-100"
          >
            <FaAngleRight />
          </button>
        )}

        {/* Scroll Container */}
        <div
          ref={scrollRef}
          className="flex   gap-4 overflow-x-scroll scrollbar-hide scroll-smooth"
        >
          {loading &&
            loadingCardNumber.map((_, index) => (
              <CardLoading key={"loading" + index} />
            ))}

          {!loading &&
            data.map((p,index) => (
              <div
              data={p}
                key={p._id+"CategoryWiseProductDisplay"+index}
                className="min-w-[220px] flex-shrink-0 transform hover:-translate-y-2 transition duration-300"
              >
                <CardProduct data={p} />
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryWiseProductDisplay;
