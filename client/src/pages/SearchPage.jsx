import React, { useEffect, useState } from 'react'
import CardLoading from '../components/CardLoading'
import SummaryApi from '../common/SummaryApi'
import Axios from '../utils/Axios'
import AxiosToastError from '../utils/AxiosToastError'
import CardProduct from '../components/CardProduct'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useLocation } from 'react-router-dom'
import noDataImage from '../assets/nothing here yet.webp'
import Search from '../components/search'   // 👈 import search bar

const SearchPage = () => {

  const [data,setData] = useState([])
  const [loading,setLoading] = useState(false)
  const [page,setPage] = useState(1)
  const [totalPage,setTotalPage] = useState(1)

  const loadingArrayCard = new Array(10).fill(null)

  const location = useLocation()
  const searchText = location?.search?.slice(3)

  const fetchData = async(currentPage = 1) => {
    try {

      setLoading(true)

      const response = await Axios({
        ...SummaryApi.searchProduct,
        data : {
          search : searchText,
          page : currentPage
        }
      })

      const { data : responseData } = response

      if(responseData.success){

        if(currentPage === 1){
          setData(responseData.data)
        }else{
          setData(prev => [...prev, ...responseData.data])
        }

        setTotalPage(responseData.totalPage)

      }

    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }


  // debounce search
  useEffect(()=>{

    const timer = setTimeout(()=>{
      setPage(1)
      fetchData(1)
    },400)

    return () => clearTimeout(timer)

  },[searchText])


  // pagination fetch
  useEffect(()=>{
    if(page > 1){
      fetchData(page)
    }
  },[page])



  const handleFetchMore = ()=>{
    if(page < totalPage){
      setPage(prev => prev + 1)
    }
  }


  return (
    <section className='bg-white'>
      <div className='container mx-auto p-4'>

        {/* Mobile Search */}
        <div className='lg:hidden mb-4'>
          <Search/>
        </div>

        <p className='font-semibold'>
          Search Results: {data.length}
        </p>

        <InfiniteScroll
          dataLength={data.length}
          hasMore={page < totalPage}
          next={handleFetchMore}
        >

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 py-4 gap-4'>

          {
            data.map((p,index)=>(
              <CardProduct
                data={p}
                key={p?._id+"searchProduct"+index}
              />
            ))
          }

          {
            loading && loadingArrayCard.map((_,index)=>(
              <CardLoading key={"loadingsearchpage"+index}/>
            ))
          }

        </div>

        </InfiniteScroll>


        {
          !data.length && !loading && (
            <div className='flex flex-col justify-center items-center w-full mx-auto'>
              <img
                src={noDataImage}
                className='w-full h-full max-w-xs max-h-xs block'
              />
              <p className='font-semibold my-2'>
                No Data found
              </p>
            </div>
          )
        }

      </div>
    </section>
  )
}

export default SearchPage