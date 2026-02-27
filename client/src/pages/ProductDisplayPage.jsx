import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import summaryApi from "../common/SummaryApi";
import { DisplayPriceInRupees } from "../utils/DisplayPriceRupees";
import Divider from "../components/Divider";
import image1 from "../assets/minute_delivery.png"
import image2 from "../assets/Best_Prices_Offers.png"
const ProductDisplayPage = () => {
  const { product } = useParams();

  const productId = product?.split("-")?.at(-1);

  const [data, setData] = useState({
    name: "",
    image: [],
  });
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
  <section className="container mx-auto p-4 grid lg:grid-cols-2 gap-8">

    {/* LEFT SIDE */}
    <div>

      {/* Main Image */}
      <div className="lg:h-[65vh] h-64 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
        {data.image.length > 0 && (
          <img
            src={data.image[image]}
            alt="product"
            className="w-full h-full object-contain transition duration-300"
          />
        )}
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 mt-3">
        {data.image.map((_, index) => (
          <div
            key={index} onClick={() => setImage(index)}
            className={`w-3 h-3 cursor-pointer rounded-full transition ${
              index === image ? "bg-green-600" : "bg-gray-300"
            }`}
          />
        ))}
      </div>

      {/* Thumbnail Images */}
      <div className="flex gap-3 mt-4 justify-center flex-wrap">
        {data.image.map((img, index) => (
          <div
            key={img + index}
            className={`w-20 h-20 border rounded-md overflow-hidden cursor-pointer ${
              index === image ? "border-green-600" : "border-gray-300"
            }`}
            onClick={() => setImage(index)}
          >
            <img
              src={img}
              alt="thumbnail"
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

    </div>
    <div className=" lg:p1-7 p-4">
      <p className="bg-green-300 w-fit px-2 rounded-full">
        10 Min
      </p>
      <h2 className="text-l font-semibold mb-4 lg:text-3xl">
        {data.name}
      </h2>
      <p className="">
        {
          data.unit
        }
      </p>
      <Divider/>
      <div>
        <p>
          Price
        </p>
       <div>
        <p> {DisplayPriceInRupees(data.price)}
      </p>
         </div>
      </div>
      <button>
        Add
      </button>
      <h2>Why Shop from K`s Mart?</h2>
      <div>
        <div>
          <img 
          src={image1} 
          alt="" 
          className="w-20 h-20 "
          />
        </div>
        <div>
          <div>
            Superfast Delivery
          </div>
          <p>Get your order deliverd to your doorstep at the earliest from dark stores near you. </p>
        </div>
      </div>
       <div>
        <div>
          <img 
          src={image2} 
          alt="Best Prices Offers" 
          className="w-20 h-20 "
          />
        </div>
        <div>
          <div>
            Best Prices & Offers
          </div>
          <p>Best Price destination with offers directly from the manufacturers. </p>
        </div>
      </div>

         <div>
        <div>
          <img 
          src={image2} 
          alt="Best Prices Offers" 
          className="w-20 h-20 "
          />
        </div>
        <div>
          <div>
            Best Prices & Offers
          </div>
          <p>Best Price destination with offers directly from the manufacturers. </p>
        </div>
      </div>
    </div>


  

  </section>
);


};




export default ProductDisplayPage;
