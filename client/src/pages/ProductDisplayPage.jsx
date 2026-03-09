import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import summaryApi from "../common/SummaryApi";
import { DisplayPriceInRupees } from "../utils/DisplayPriceRupees";
import Divider from "../components/Divider";
import image1 from "../assets/minute_delivery.png"
import image2 from "../assets/Best_Prices_Offers.png"
import image3 from "../assets/image.png"
import { pricewithDiscount } from "../utils/PriceWithDiscount";
const ProductDisplayPage = () => {
  const { product } = useParams();

  const productId = product?.split("-")?.at(-1);

  const [data, setData] = useState({
    name: "",
    image: [],
  });
  const [rating, setRating] = useState(0);
const [hover, setHover] = useState(null);
  const [image, setImage] = useState(0);

  const [loading, setLoading] = useState(false);

  const fetchProductDetails = async () => {
    if (!productId) {
      return;
    }

    setLoading(true);

    try {
      const response = await Axios({
        ...summaryApi.getProductDetails,
        data: { productId },
      });

      console.log("Full Response:", response);

      const { data: responseData } = response;

      if (responseData.success) {
        setData(responseData.data);
      } else {
        // console.log("API returned success false");
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [productId]);

  useEffect(() => {
  const savedRating = localStorage.getItem(`rating-${data._id}`);
  if (savedRating) {
    setRating(Number(savedRating));
  }
}, [data._id]);

  console.log("product details page", data);

  // return (
  //   <section className="container mx-auto p-4 grid lg:grid-cols-2 ">
  //     <div clssName="">
  //       <div className=" lg:min-h-[65vh] lg:max-h-[65vh] rounded min-h-56 max-h-56 h-full w-full">
  //         <img
  //           src={data.image[image]}
  //           className="w-full h-full object-scale-down"
  //         />
  //       </div>
  //       <div className="flex items-center justify-center gap-3">
  //         {data.image.map((img, index) => {
  //           return (
  //             <div key={img+index+"point"}
  //               className={`bg-slate-200  w-5 h-5 rounded-full ${index === image && "bg-slate-200"}`}
  //             ></div>
  //           );
  //         })}
  //       </div>
  //       <div>
  //         <div className="flex gap-4">
  //           {data.image.map((img, index) => {
  //             return (
  //               <div className="w-20 h-20" key={img+index}>
  //                 <img src={img}
  //                 alt="min-product"
  //                 onclick={() => setImage(index)}
  //                 className="w-full h-full object-cover rounded cursor-pointer"
                  
  //                 />
  //               </div>
  //             );
  //           })}
  //         </div>
  //       </div>
  //     </div>
  //   </section>
  // );
return (
  <section className="container mx-auto px-4 py-4 grid lg:grid-cols-2 gap-6">

    {/* LEFT SIDE */}
    <div>

      {/* Main Image */}
      <div className="lg:h-[55vh] h-56 bg-white rounded-xl shadow-sm overflow-hidden flex items-center justify-center">
        {data.image.length > 0 && (
          <img
            src={data.image[image]}
            alt="product"
            className="w-full h-full object-contain transition duration-300"
          />
        )}
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-3">
        {data.image.map((_, index) => (
          <div
            key={index}
            onClick={() => setImage(index)}
            className={`w-2.5 h-2.5 rounded-full cursor-pointer transition ${
              index === image ? "bg-green-600" : "bg-gray-300"
            }`}
          />
        ))}
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2 mt-3 justify-center flex-wrap">
        {data.image.map((img, index) => (
          <div
            key={img + index}
            onClick={() => setImage(index)}
            className={`w-14 h-14 rounded-lg overflow-hidden cursor-pointer border transition ${
              index === image
                ? "border-green-600"
                : "border-gray-200"
            }`}
          >
            <img
              src={img}
              alt="thumbnail"
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
      <div className="my-6 grid gap-3">
        <div>
          <p className="font-semibold">Description</p>
        <p className="text-base tex">{data.description}</p>
        </div>
         <div>
          <p className="font-semibold">Unit</p>
        <p className="text-base tex">{data.unit}</p>
        </div>
      </div>
    </div>

    {/* RIGHT SIDE */}
    <div className="lg:p-5 p-3 bg-white rounded-xl shadow-sm">

      {/* Delivery Badge */}
      <p className="bg-green-100 text-green-700 text-xs font-medium w-fit px-2 py-1 rounded-full mb-2">
        ⚡ 10 Min
      </p>

      {/* Product Name */}
      <h2 className="text-lg lg:text-xl font-semibold text-gray-800 mb-1">
        {data.name}
      </h2>

      {/* Unit */}
      <p className="text-sm text-gray-500 mb-3">
        {data.unit}
      </p>
      {/* Price */}
      {/* <div className="mb-4">
        <p className="text-xs text-gray-500">Price</p>
       <div className="flex items-center gap-4">
         <p className="text-xl font-bold text-green-600">
          {DisplayPriceInRupees(data.price)}
        </p>
        {
          data.discount &&(
            <p>
              {
                DisplayPriceInRupees(data.price)
              }
            </p>
          )
        }
         {
          data.discount  && (
            <p className="font-bold text-green-600 lg:text-2xl">
          {pricewithDiscount(data.discount)}%discount
        </p>
          )
       }
        
       </div>
      
       
      </div> */}
      <div className="mb-4">
  <p className="text-xs text-gray-500">Price</p>

  <div className="flex items-center gap-4">

    {/* Discounted Price */}
    <p className="text-xl font-bold text-green-600">
      {DisplayPriceInRupees(pricewithDiscount(data.price, data.discount))}
    </p>

    {/* Original Price */}
    {
      data.discount && (
        <p className="line-through text-gray-500">
          {DisplayPriceInRupees(data.price)}
        </p>
      )
    }

    {/* Discount Percentage */}
    {
      data.discount && (
        <p className="font-bold text-red-500 lg:text-xl">
          {data.discount}% OFF
        </p>
      )
    }

  </div>
</div>
        {
          data.stock === 0 ?(
            <p className="text-lg text-red-50">Out of Stock</p>
          ):(
 <button className="w-20 h-10 bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2 rounded-lg transition">
        Add 
      </button>
          )
        }
      {/* Add Button */}
     

      {/* Why Shop */}
      <h2 className="text-base font-semibold mt-6 mb-3">
        Why Shop?
      </h2>

      <div className="space-y-4 text-sm">

        <div className="flex gap-3 items-start">
          <img src={image1} alt="" className="w-10 h-10 object-contain" />
          <div>
            <div className="font-medium">Superfast Delivery</div>
            <p className="text-gray-500 text-xs">
              Fast doorstep delivery from nearby stores.
            </p>
          </div>
        </div>

        <div className="flex gap-3 items-start">
          <img src={image2} alt="" className="w-10 h-10 object-contain" />
          <div>
            <div className="font-medium">Best Prices</div>
            <p className="text-gray-500 text-xs">
              Direct manufacturer offers.
            </p>
          </div>
        </div>




        <div className="flex gap-3 items-start">
          <img src={image3} alt="Wide Assortment" className="w-10 h-10 object-contain" />
          <div>
            <div className="font-medium">Wide Assortment</div>
            <p className="text-gray-500 text-xs">
              Choose from 5000+  product across food personal care , household &  other categories.
            </p>
          </div>
        </div>

      </div>
      <div className="mb-4">
  <p className="text-xs text-gray-500 mb-1">Rate this product</p>

  <div className="flex items-center gap-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <button
        key={star}
        onClick={() => setRating(star)}
        onMouseEnter={() => setHover(star)}
        onMouseLeave={() => setHover(null)}
        className="text-lg transition"
      >
        <span
          className={
            star <= (hover || rating)
              ? "text-yellow-400"
              : "text-gray-300"
          }
        >
          ★
        </span>
      </button>
    ))}
  </div>

  {/* Show Given Rating */}
  {rating > 0 && (
    <p className="text-xs text-gray-500 mt-1">
      You rated this product {rating} out of 5 ⭐
    </p>
  )}
</div>

    </div>

    {/* Price */}


{/* Rating Section */}

  </section>
)

//4:25
};




export default ProductDisplayPage;
