// import React, { useEffect, useState } from "react";
// import CardLoading from "../components/CardLoading";
// import SummaryApi from "../common/SummaryApi";
// import Axios from "../utils/Axios";
// import AxiosToastError from "../utils/AxiosToastError";
// import CardProduct from "../components/CardProduct";
// import InfiniteScroll from "react-infinite-scroll-component";
// import { useLocation } from "react-router-dom";
// import noDataImage from "../assets/nothing here yet.webp";
// import Search from "../components/search";
// import CartBottomBar from "../components/CartBottomBar";
// import { useSelector } from "react-redux";

// const SearchPage = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [page, setPage] = useState(1);
//   const [totalPage, setTotalPage] = useState(1);

//   const loadingArrayCard = new Array(10).fill(null);

//   const location = useLocation();
//   const searchText = location?.search?.slice(3);

//   // 🔥 CART DATA
//   const cartItems = useSelector((state) => state.cartItem.cart || []);

//   const totalQty = cartItems.reduce((acc, item) => acc + item.quantity, 0);

//   const totalPrice = cartItems.reduce(
//     (acc, item) => acc + item.quantity * item.productId.price,
//     0,
//   );

//   const fetchData = async (currentPage = 1) => {
//     try {
//       setLoading(true);

//       const response = await Axios({
//         ...SummaryApi.searchProduct,
//         data: {
//           search: searchText,
//           page: currentPage,
//         },
//       });

//       const { data: responseData } = response;

//       if (responseData.success) {
//         if (currentPage === 1) {
//           setData(responseData.data);
//         } else {
//           setData((prev) => [...prev, ...responseData.data]);
//         }

//         setTotalPage(responseData.totalPage);
//       }
//     } catch (error) {
//       AxiosToastError(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setPage(1);
//       fetchData(1);
//     }, 400);

//     return () => clearTimeout(timer);
//   }, [searchText]);

//   useEffect(() => {
//     if (page > 1) {
//       fetchData(page);
//     }
//   }, [page]);

//   const handleFetchMore = () => {
//     if (page < totalPage) {
//       setPage((prev) => prev + 1);
//     }
//   };

//   return (
//     <section className="bg-gray-50 min-h-screen">
//       {/* 🔥 IMPORTANT FIX */}
//       <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-4 pb-24">
//         {/* Mobile Search */}
//         <div className="lg:hidden mb-4">
//           <Search />
//         </div>

//         <p className="font-semibold mb-2">Search Results: {data.length}</p>

//         <InfiniteScroll
//           dataLength={data.length}
//           hasMore={page < totalPage}
//           next={handleFetchMore}
//         >
//           <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 py-3">
//             {data.map((p, index) => (
//               <CardProduct data={p} key={p?._id + "searchProduct" + index} />
//             ))}

//             {loading &&
//               loadingArrayCard.map((_, index) => (
//                 <CardLoading key={"loadingsearchpage" + index} />
//               ))}
//           </div>
//         </InfiniteScroll>

//         {!data.length && !loading && (
//           <div className="flex flex-col items-center py-10">
//             <img src={noDataImage} className="w-40 sm:w-52 object-contain" />
//             <p className="font-semibold mt-3">No Data Found</p>
//           </div>
//         )}
//       </div>

//       {/* 🔥 CART BAR */}
//       <CartBottomBar totalQty={totalQty} totalPrice={totalPrice} />
//     </section>
//   );
// };

// export default SearchPage;




import React, { useEffect, useState } from "react";
import CardLoading from "../components/CardLoading";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import CardProduct from "../components/CardProduct";
import InfiniteScroll from "react-infinite-scroll-component";
import { useLocation } from "react-router-dom";
import noDataImage from "../assets/nothing here yet.webp";
import Search from "../components/search";
import CartBottomBar from "../components/CartBottomBar";
import { useSelector } from "react-redux";

const SearchPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const loadingArrayCard = new Array(10).fill(null);

  const location = useLocation();
  const searchText = location?.search?.slice(3);

  // CART DATA
  const cartItems = useSelector(
    (state) => state.cartItem.cart || [],
  );

  // TOTAL QUANTITY
  const totalQty = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0,
  );

  // TOTAL PRICE WITH DISCOUNT
  const totalPrice = cartItems.reduce((acc, item) => {
    const originalPrice =
      Number(item.productId.price) || 0;

    const discount =
      Number(item.productId.discount) || 0;

    const finalPrice =
      originalPrice -
      (originalPrice * discount) / 100;

    return acc + item.quantity * finalPrice;
  }, 0);

  // FETCH PRODUCTS
  const fetchData = async (currentPage = 1) => {
    try {
      setLoading(true);

      const response = await Axios({
        ...SummaryApi.searchProduct,
        data: {
          search: searchText,
          page: currentPage,
        },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        if (currentPage === 1) {
          setData(responseData.data);
        } else {
          setData((prev) => [
            ...prev,
            ...responseData.data,
          ]);
        }

        setTotalPage(responseData.totalPage);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  // SEARCH EFFECT
  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1);
      fetchData(1);
    }, 400);

    return () => clearTimeout(timer);
  }, [searchText]);

  // PAGINATION EFFECT
  useEffect(() => {
    if (page > 1) {
      fetchData(page);
    }
  }, [page]);

  // LOAD MORE
  const handleFetchMore = () => {
    if (page < totalPage) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <section className="bg-gray-50 min-h-screen w-full overflow-x-hidden">

      {/* MAIN CONTAINER */}
      <div className="max-w-7xl mx-auto w-full px-3 sm:px-4 md:px-5 lg:px-6 py-4 pb-28 overflow-hidden">

        {/* MOBILE SEARCH */}
        <div className="block lg:hidden mb-4 sticky top-0 z-20 bg-gray-50 py-2">
          <Search />
        </div>

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">

          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-800">
              Search Results
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Total Products :
              <span className="font-semibold text-primary-600 ml-1">
                {data.length}
              </span>
            </p>
          </div>
        </div>

        {/* PRODUCTS */}
        <InfiniteScroll
          dataLength={data.length}
          hasMore={page < totalPage}
          next={handleFetchMore}
          loader={
            <div
              className="
              grid
              grid-cols-1
              sm:grid-cols-2
              md:grid-cols-3
              lg:grid-cols-4
              xl:grid-cols-5
              gap-4
              justify-items-center
              mt-4
            "
            >
              {loadingArrayCard.map((_, index) => (
                <div
                  key={"loading" + index}
                  className="w-full max-w-[280px]"
                >
                  <CardLoading />
                </div>
              ))}
            </div>
          }
        >

          {/* PRODUCT GRID */}
          <div
            className="
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            gap-4
            justify-items-center
            py-3
          "
          >
            {data.map((p, index) => (
              <div
                key={p?._id + "searchProduct" + index}
                className="
                  w-full
                  max-w-[280px]
                  min-w-0
                  overflow-hidden
                "
              >
                <CardProduct data={p} />
              </div>
            ))}

            {loading &&
              loadingArrayCard.map((_, index) => (
                <div
                  key={"loadingsearchpage" + index}
                  className="w-full max-w-[280px]"
                >
                  <CardLoading />
                </div>
              ))}
          </div>
        </InfiniteScroll>

        {/* NO DATA */}
        {!data.length && !loading && (
          <div className="flex flex-col items-center justify-center py-14">

            <img
              src={noDataImage}
              alt="No Data"
              className="w-40 sm:w-52 object-contain"
            />

            <p className="font-semibold mt-4 text-gray-700 text-base">
              No Products Found
            </p>

            <p className="text-sm text-gray-500 mt-1 text-center">
              Try searching with another keyword
            </p>
          </div>
        )}
      </div>

      {/* CART BAR */}
      <CartBottomBar
        totalQty={totalQty}
        totalPrice={totalPrice}
      />
    </section>
  );
};

export default SearchPage;