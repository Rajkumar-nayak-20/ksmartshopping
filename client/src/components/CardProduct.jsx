import React, { useState } from "react";
import { DisplayPriceInRupees } from "../utils/DisplayPriceRupees";
import { Link } from "react-router-dom";
import { valideURLConvert } from "../utils/valideURLConvert";
import summaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import toast from "react-hot-toast";
import AddToCartButton from "./AddToCartButton";

const CardProduct = ({ data }) => {
  // Discount calculation
  const hasDiscount = data.discount > 0;
  const discountedPrice = hasDiscount
    ? data.price - (data.price * data.discount) / 100
    : data.price;
  const url = `/product/${valideURLConvert(data.name)}-${data._id}`;
  const [loading, setLoading] = useState(false);


  // const increaseQty = ()=>{

  // }
  return (
    <Link to={url}>
      <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 p-3 w-56">
        {/* Image Section */}
        <div className="relative bg-gray-50 rounded-xl h-36 flex items-center justify-center overflow-hidden">
          <img
            src={data.image?.[0]}
            alt={data.name}
            className="h-full object-contain transition-transform duration-300 hover:scale-105"
          />

          {/* Discount Badge */}
          {hasDiscount && (
            <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
              {data.discount}% OFF
            </span>
          )}
        </div>

        {/* Delivery Time */}
        <div className="mt-3">
          <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full font-medium">
            10 min
          </span>
        </div>

        {/* Product Name */}
        <div className="mt-2">
          <h2 className="text-sm font-semibold text-gray-800 line-clamp-2">
            {data.name}
          </h2>
        </div>

        {/* Unit */}
        <div className="text-xs text-gray-500 mt-1">{data.unit}</div>

        {/* Price + Button */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex flex-col">
            {/* Discounted Price */}
            <span className="text-base font-bold text-gray-900">
              {DisplayPriceInRupees(discountedPrice)}
            </span>

            {/* Original Price Cut */}
            {hasDiscount && (
              <span className="text-xs text-gray-400 line-through">
                {DisplayPriceInRupees(data.price)}
              </span>
            )}
          </div>

          <div>
            {data.stock == 0 ? (
              <p className="text-red-500 text-sm text-center">Out of Stock</p>
            ) : (
             <AddToCartButton data={data}/>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardProduct;
