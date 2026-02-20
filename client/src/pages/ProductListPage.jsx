import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "../utils/Axios";
import summaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";

const ProductListPage = () => {
  const [data, setData] = useState();
  const [page, setpage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(1);
  const parms = useParams();
  const subCategory = parms?.subCategory?.split("-")
 const subcategoryName = subCategory?.slice(0, subCategory?.length - 1).join("-")
  

  const fetchProductdata = async () => {
    const categoryId = parms?.category?.split("-")?.slice(-1)[0];
const subCategoryId = parms?.subCategory?.split("-")?.slice(-1)[0];
    try {
      setLoading(true);
      const response = await Axios({
        ...summaryApi.getProductByCategoryAndSubCategory,
        data: {
          categoryId :categoryId ,
          subCategoryId :subCategoryId,
          page: page,
          limit: 10,
        },
      })
      const { data : responseData } = response 
      if(responseData?.success){
        if(responseData.page==1){
          setData(responseData?.data)
        }else{
          
          setData([...data,...responseData?.data])
        }
        
        
        // setData(responseData?.data)
        setTotalPage(responseData?.totalPage)
      } 
    } catch (error) {
      AxiosToastError(error)

    }finally{
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchProductdata()
  }, [parms])
  return (
    <section className="sticky top-24 lg:top-20">
      <div className="container sticky top-24 mx-auto  grid grid-cols-[90px_1fr] md:grid-cols-[200px_1fr] lg:grid-cols-[280px_1fr]">
        {/* subcategory  */}
        <div className="min-h-[79vh] bg-amber-300"></div>

        {/* product */}
        <div className=" ">
          <div className="bg-white  shadow-md p-2">
          <h3>
            {subcategoryName}
          </h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductListPage;
