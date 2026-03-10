// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import AxiosToastError from "../utils/AxiosToastError";
// import Axios from "../utils/Axios";
// import summaryApi from "../common/SummaryApi";
// import { DisplayPriceInRupees } from "../utils/DisplayPriceRupees";
// import image1 from "../assets/minute_delivery.png";
// import image2 from "../assets/Best_Prices_Offers.png";
// import image3 from "../assets/image.png";
// import { pricewithDiscount } from "../utils/PriceWithDiscount";

// const ProductDisplayPage = () => {

//   const { product } = useParams();
//   const productId = product?.split("-")?.at(-1);

//   const [data,setData] = useState({
//     name:"",
//     image:[]
//   });

//   const [image,setImage] = useState(0);

//   const [loading,setLoading] = useState(false);

//   const [rating,setRating] = useState(0);
//   const [hover,setHover] = useState(null);
//   const [comment,setComment] = useState("");

//   const [reviews,setReviews] = useState([]);



//   const fetchProductDetails = async()=>{

//     if(!productId) return;

//     setLoading(true);

//     try{

//       const response = await Axios({
//         ...summaryApi.getProductDetails,
//         data:{ productId }
//       });

//       const { data:responseData } = response;

//       if(responseData.success){
//         setData(responseData.data);
//         setReviews(responseData.data.reviews || []);
//       }

//     }catch(error){
//       AxiosToastError(error);
//     }finally{
//       setLoading(false);
//     }

//   }



//   useEffect(()=>{
//     fetchProductDetails()
//   },[productId])



//   const submitReview = async()=>{

//     try{

//       const response = await Axios({
//         ...summaryApi.addReview,
        
//         data:{
//           productId:data._id,
//           rating:rating,
//           comment:comment
//         }
//       });

//       console.log(response) 

//       const { data:responseData } = response;

//       if(responseData.success){
//         fetchProductDetails()
//         setComment("")
//         setRating(0)
//       }

//       console.log(responseData)

//     }catch(error){
//       AxiosToastError(error)
//     }

//   }



//   return (

//   <section className="container mx-auto px-4 py-6 grid lg:grid-cols-2 gap-8">

//     {/* LEFT SIDE */}

//     <div>

//       <div className="lg:h-[60vh] h-64 bg-white rounded-xl shadow-md flex items-center justify-center">

//         {
//           data.image.length > 0 && (
//             <img
//               src={data.image[image]}
//               className="w-full h-full object-contain"
//             />
//           )
//         }

//       </div>


//       {/* thumbnails */}

//       <div className="flex gap-3 mt-4 justify-center flex-wrap">

//         {
//           data.image.map((img,index)=>(
//             <div
//               key={index}
//               onClick={()=>setImage(index)}
//               className={`w-16 h-16 border rounded cursor-pointer
//                 ${index===image ? "border-green-600" : "border-gray-200"}
//               `}
//             >
//               <img
//                 src={img}
//                 className="w-full h-full object-cover"
//               />
//             </div>
//           ))
//         }

//       </div>


//       <div className="mt-6">

//         <p className="font-semibold">
//           Description
//         </p>

//         <p className="text-sm text-gray-600">
//           {data.description}
//         </p>

//       </div>

//     </div>



//     {/* RIGHT SIDE */}

//     <div className="bg-white p-6 rounded-xl shadow-md">

//       <p className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded w-fit">
//         ⚡ 10 Min Delivery
//       </p>


//       <h1 className="text-xl font-bold mt-2">
//         {data.name}
//       </h1>


//       <p className="text-gray-500 text-sm">
//         {data.unit}
//       </p>



//       {/* price */}

//       <div className="flex items-center gap-4 mt-4">

//         <span className="text-2xl font-bold text-green-600">
//           {DisplayPriceInRupees(pricewithDiscount(data.price,data.discount))}
//         </span>

//         {
//           data.discount && (
//             <span className="line-through text-gray-400">
//               {DisplayPriceInRupees(data.price)}
//             </span>
//           )
//         }

//       </div>



//       {/* stock */}

//       <div className="mt-3">

//         {
//           data.stock === 0 ? (
//             <span className="text-red-500">
//               Out of Stock
//             </span>
//           ) : (
//             <span className="text-green-600">
//               In Stock
//             </span>
//           )
//         }

//       </div>



//       {/* Add cart */}

//       <button className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg">
//         Add to Cart
//       </button>



//       {/* why shop */}

//       <h2 className="font-semibold mt-6">
//         Why Shop With Us?
//       </h2>

//       <div className="space-y-4 mt-3">

//         <div className="flex gap-3">
//           <img src={image1} className="w-10"/>
//           <div>
//             <p className="font-medium">Superfast Delivery</p>
//             <p className="text-xs text-gray-500">
//               Get delivery in minutes
//             </p>
//           </div>
//         </div>


//         <div className="flex gap-3">
//           <img src={image2} className="w-10"/>
//           <div>
//             <p className="font-medium">Best Prices</p>
//             <p className="text-xs text-gray-500">
//               Direct manufacturer offers
//             </p>
//           </div>
//         </div>


//         <div className="flex gap-3">
//           <img src={image3} className="w-10"/>
//           <div>
//             <p className="font-medium">Wide Assortment</p>
//             <p className="text-xs text-gray-500">
//               5000+ products available
//             </p>
//           </div>
//         </div>

//       </div>



//       {/* rating */}

//       <div className="mt-6">

//         <p className="text-sm mb-2">
//           Rate this product
//         </p>

//         <div className="flex gap-1">

//           {
//             [1,2,3,4,5].map((star)=>(
//               <button
//                 key={star}
//                 onClick={()=>setRating(star)}
//                 onMouseEnter={()=>setHover(star)}
//                 onMouseLeave={()=>setHover(null)}
//                 className="text-2xl"
//               >
//                 <span className={
//                   star <= (hover || rating)
//                   ? "text-yellow-400"
//                   : "text-gray-300"
//                 }>
//                   ★
//                 </span>
//               </button>
//             ))
//           }

//         </div>


//         {/* comment */}

//         <textarea
//           value={comment}
//           onChange={(e)=>setComment(e.target.value)}
//           placeholder="Write your review..."
//           className="w-full border rounded p-2 text-sm mt-2"
//         />


//         <button
//           onClick={submitReview}
//           className="mt-2 bg-green-600 text-white px-4 py-2 rounded"
//         >
//           Submit Review
//         </button>

//       </div>

//     </div>



//     {/* REVIEWS SECTION */}

//     <div className="lg:col-span-2 mt-10">

//       <h2 className="text-lg font-semibold mb-4">
//         Customer Reviews
//       </h2>

//       {
//         reviews.length === 0 && (
//           <p className="text-gray-500 text-sm">
//             No reviews yet
//           </p>
//         )
//       }


//       {
//         reviews.map((review,index)=>(
//           <div
//             key={index}
//             className="border-b py-4"
//           >

//             <p className="font-medium">
//               {review.userName}
//             </p>

//             <p className="text-yellow-400">
//               {"⭐".repeat(review.rating)}
//             </p>

//             <p className="text-sm text-gray-600">
//               {review.comment}
//             </p>

//           </div>
//         ))
//       }

//     </div>


//   </section>

//   )

// }

// export default ProductDisplayPage




import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import summaryApi from "../common/SummaryApi";
import { DisplayPriceInRupees } from "../utils/DisplayPriceRupees";
import { pricewithDiscount } from "../utils/PriceWithDiscount";
import image1 from "../assets/minute_delivery.png";
import image2 from "../assets/Best_Prices_Offers.png";
import image3 from "../assets/image.png";

const ProductDisplayPage = () => {

  const { product } = useParams();
  const productId = product?.split("-")?.at(-1);

  const user = useSelector(state => state.user)

  const [data,setData] = useState({
    name:"",
    image:[]
  })

  const [image,setImage] = useState(0)
  const [loading,setLoading] = useState(false)

  const [rating,setRating] = useState(0)
  const [hover,setHover] = useState(null)
  const [comment,setComment] = useState("")
  const [editReviewId,setEditReviewId] = useState(null)

  const [reviews,setReviews] = useState([])


  const fetchProductDetails = async()=>{

    if(!productId) return

    try{

      const response = await Axios({
        ...summaryApi.getProductDetails,
        data:{ productId }
      })

      const { data:responseData } = response

      if(responseData.success){
        setData(responseData.data)
        setReviews(responseData.data.reviews || [])
      }

    }catch(error){
      AxiosToastError(error)
    }

  }


  useEffect(()=>{
    fetchProductDetails()
  },[productId])



  const submitReview = async()=>{

    try{

      if(editReviewId){

        const response = await Axios({
          ...summaryApi.updateReview,
          data:{
            productId:data._id,
            reviewId:editReviewId,
            rating,
            comment
          }
        })

        if(response.data.success){
          setEditReviewId(null)
        }

      }else{

        const response = await Axios({
          ...summaryApi.addReview,
          data:{
            productId:data._id,
            rating,
            comment
          }
        })

      }

      fetchProductDetails()
      setRating(0)
      setComment("")

    }catch(error){
      AxiosToastError(error)
    }

  }



  const deleteReview = async(reviewId)=>{

    try{

      const response = await Axios({
        ...summaryApi.deleteReview,
        data:{
          productId:data._id,
          reviewId
        }
      })

      if(response.data.success){
        fetchProductDetails()
      }

    }catch(error){
      AxiosToastError(error)
    }

  }



  const editReview = (review)=>{
  setRating(review.rating)
  setComment(review.comment)
  setEditReviewId(review._id)
}



  return (

  <section className="container mx-auto px-4 py-6 grid lg:grid-cols-2 gap-8">

    {/* LEFT SIDE */}

    <div>

      <div className="lg:h-[60vh] h-64 bg-white rounded-xl shadow-md flex items-center justify-center">

        {data.image.length > 0 && (
          <img
            src={data.image[image]}
            className="w-full h-full object-contain"
          />
        )}

      </div>


      <div className="flex gap-3 mt-4 justify-center flex-wrap">

        {data.image.map((img,index)=>(
          <div
            key={index}
            onClick={()=>setImage(index)}
            className={`w-16 h-16 border rounded cursor-pointer
              ${index===image ? "border-green-600" : "border-gray-200"}
            `}
          >
            <img
              src={img}
              className="w-full h-full object-cover"
            />
          </div>
        ))}

      </div>


      <div className="mt-6">
        <p className="font-semibold">Description</p>
        <p className="text-sm text-gray-600">{data.description}</p>
      </div>

    </div>



    {/* RIGHT SIDE */}

    <div className="bg-white p-6 rounded-xl shadow-md">

      <p className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded w-fit">
        ⚡ 10 Min Delivery
      </p>

      <h1 className="text-xl font-bold mt-2">
        {data.name}
      </h1>

      <p className="text-gray-500 text-sm">{data.unit}</p>


      <div className="flex items-center gap-4 mt-4">

        <span className="text-2xl font-bold text-green-600">
          {DisplayPriceInRupees(pricewithDiscount(data.price,data.discount))}
        </span>

        {data.discount && (
          <span className="line-through text-gray-400">
            {DisplayPriceInRupees(data.price)}
          </span>
        )}

      </div>


      <div className="mt-3">

        {data.stock === 0 ? (
          <span className="text-red-500">Out of Stock</span>
        ) : (
          <span className="text-green-600">In Stock</span>
        )}

      </div>


      <button className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg">
        Add to Cart
      </button>



      {/* WHY SHOP */}

      <h2 className="font-semibold mt-6">Why Shop With Us?</h2>

      <div className="space-y-4 mt-3">

        <div className="flex gap-3">
          <img src={image1} className="w-10"/>
          <div>
            <p className="font-medium">Superfast Delivery</p>
            <p className="text-xs text-gray-500">Get delivery in minutes</p>
          </div>
        </div>

        <div className="flex gap-3">
          <img src={image2} className="w-10"/>
          <div>
            <p className="font-medium">Best Prices</p>
            <p className="text-xs text-gray-500">Direct manufacturer offers</p>
          </div>
        </div>

        <div className="flex gap-3">
          <img src={image3} className="w-10"/>
          <div>
            <p className="font-medium">Wide Assortment</p>
            <p className="text-xs text-gray-500">5000+ products available</p>
          </div>
        </div>

      </div>



      {/* REVIEW FORM */}

      <div className="mt-6">

        <p className="text-sm mb-2">
          {editReviewId ? "Edit your review" : "Rate this product"}
        </p>

        <div className="flex gap-1">

          {[1,2,3,4,5].map((star)=>(
            <button
              key={star}
              onClick={()=>setRating(star)}
              onMouseEnter={()=>setHover(star)}
              onMouseLeave={()=>setHover(null)}
              className="text-2xl"
            >
              <span className={
                star <= (hover || rating)
                  ? "text-yellow-400"
                  : "text-gray-300"
              }>
                ★
              </span>
            </button>
          ))}

        </div>


        <textarea
          value={comment}
          onChange={(e)=>setComment(e.target.value)}
          placeholder="Write your review..."
          className="w-full border rounded p-2 text-sm mt-2"
        />


        <button
          onClick={submitReview}
          className="mt-2 bg-green-600 text-white px-4 py-2 rounded"
        >
          {editReviewId ? "Update Review" : "Submit Review"}
        </button>

      </div>

    </div>



    {/* REVIEWS LIST */}

    <div className="lg:col-span-2 mt-10">

      <h2 className="text-lg font-semibold mb-4">
        Customer Reviews
      </h2>

      {reviews.length === 0 && (
        <p className="text-gray-500 text-sm">No reviews yet</p>
      )}

      {reviews.map((review,index)=>(
        <div key={index} className="border-b py-4">

          <p className="font-medium">
            {review.userName}
          </p>

          <p className="text-yellow-400">
            {"⭐".repeat(review.rating)}
          </p>

          <p className="text-sm text-gray-600">
            {review.comment}
          </p>


          {user?._id === review.userId && (

            <div className="flex gap-4 mt-2">

              <button
                onClick={()=>editReview(review)}
                className="text-blue-500 text-xs cursor-"
              >
                Edit
              </button>

              <button
                onClick={()=>deleteReview(review._id)}
                className="text-red-500 text-xs"
              >
                Delete
              </button>

            </div>

          )}

        </div>
      ))}

    </div>

  </section>

  )

}

export default ProductDisplayPage




