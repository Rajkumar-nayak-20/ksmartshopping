import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import summaryApi from '../common/SummaryApi'
import CardLoading from './CardLoading'
import CardProduct from './CardProduct'

const CategoryWiseProductDisplay = ({id,name}) => {
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(false)
    const fetchCategoryWiseProduct = async() =>{
      try {
        const response =await Axios({
          ...summaryApi.getProductByCategory,
          data :{
            id : id
          }
        })
        const{data : responseData}=response
        if(responseData.success){
          setData(responseData.data)
        }
        console.log(responseData);
        
      } catch (error) {
        AxiosToastError(error)
      }finally{
          setLoading(false)
      }
    }
    useEffect(()=>{
      fetchCategoryWiseProduct()
    },[])
    const loadingCardNumber =new Array(6).fill(null)
 return (
  <section className="py-8 bg-gradient-to-b from-white to-gray-50">
    
    {/* Header */}
    <div className="container mx-auto px-4 flex justify-between items-center mb-6">
      
      <div>
        <h3 className="text-xl md:text-2xl font-bold text-gray-800 relative inline-block">
          {name}
          <span className="absolute -bottom-1 left-0 w-10 h-1 bg-green-500 rounded"></span>
        </h3>
      </div>

      <Link
        to=""
        className="text-sm font-medium px-4 py-2 border border-green-500 text-green-600 rounded-full hover:bg-green-500 hover:text-white transition-all duration-300"
      >
        See All →
      </Link>
    </div>

    {/* Product Row */}
    <div className="container mx-auto px-4">
      <div className="flex gap-4 md:gap-6 lg:gap-8 overflow-x-auto scrollbar-hide pb-2">
        
        {loading &&
          loadingCardNumber.map((_, index) => (
            <CardLoading key={"CategorywiseProductDisplay" + index} />
          ))}

        {!loading &&
          data.map((p, index) => (
            <div
              key={p._id + "CategorywiseProductDisplay" + index}
              className="transform hover:-translate-y-2 transition duration-300"
            >
              <CardProduct data={p} />
            </div>
          ))}
      </div>
    </div>
  </section>
);

}

export default CategoryWiseProductDisplay