import React, { useEffect, useState } from "react";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import Loading from "../components/Loading";
import ProductCardAdmin from "../components/ProductCardAdmin";
import { IoSearchOutline } from "react-icons/io5";
import EditProductAdmin from "../components/EditProductAdmin";

const ProductAdmin = () => {
  const [productData, setProductData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPageCount, setTotalPageCount] = useState(1);
  const [search, setSearch] = useState("");

  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState(null);

  const fetchProductData = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getProduct,
        data: {
          page: page,
          limit: 12,
          search: search,
        },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        setTotalPageCount(responseData.totalNoPage);
        setProductData(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [page]);

  const handleNext = () => {
    if (page !== totalPageCount) {
      setPage((preve) => preve + 1);
    }
  };

  const handlePrevious = () => {
    if (page > 1) {
      setPage((preve) => preve - 1);
    }
  };

  const handleOnChange = (e) => {
    const { value } = e.target;
    setSearch(value);
    setPage(1);
  };

  useEffect(() => {
    const interval = setTimeout(() => {
      fetchProductData();
    }, 300);

    return () => clearTimeout(interval);
  }, [search]);

  const handleEdit = (product) => {
    setEditData(product);
    setOpenEdit(true);
  };

  return (
    // <section className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
    //   {/* ===== HEADER ===== */}
    //   <div className="sticky top-0 z-10 backdrop-blur bg-white/80 border-b shadow-sm">
    //     <div className="px-6 py-4 flex items-center justify-between gap-6 max-w-7xl mx-auto">
    //       <div>
    //         <h2 className="text-2xl font-bold text-slate-800">
    //           Product Management
    //         </h2>
    //         <p className="text-sm text-slate-500">
    //           Manage your product inventory
    //         </p>
    //       </div>

    //       {/* Search */}
    //       <div className="relative min-w-[280px]">
    //         <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
    //         <input
    //           type="text"
    //           placeholder="Search products..."
    //           value={search}
    //           onChange={handleOnChange}
    //           className="w-full pl-10 pr-4 py-2 rounded-xl border bg-white focus:ring-2 focus:ring-primary-200 outline-none shadow-sm"
    //         />
    //       </div>
    //     </div>
    //   </div>

    //   {/* ===== LOADING ===== */}
    //   {loading && (
    //     <div className="flex justify-center items-center py-10">
    //       <Loading />
    //     </div>
    //   )}

    //   {/* ===== CONTENT ===== */}
    //   <div className="max-w-7xl mx-auto px-6 py-8">
    //     {/* Stats Bar */}
    //     <div className="mb-6 flex justify-between items-center bg-white rounded-2xl p-4 shadow-sm border">
    //       <div>
    //         <p className="text-sm text-slate-500">Total Products</p>
    //         <p className="text-xl font-bold text-slate-800">
    //           {productData.length}
    //         </p>
    //       </div>

    //       <div className="text-sm text-slate-500">
    //         Page {page} of {totalPageCount || 1}
    //       </div>
    //     </div>

    //     {/* Product Grid */}
    //     <div className="min-h-[55vh]">
    //       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
    //         {productData.map((p) => (
    //           <ProductCardAdmin
    //             key={p._id}
    //             data={p}
    //             fetchProductData={fetchProductData}
    //             onEdit={handleEdit}
    //           />
    //         ))}
    //       </div>
    //     </div>

    //     {/* ===== PAGINATION ===== */}
    //     <div className="mt-10 flex items-center justify-between bg-white rounded-2xl p-3 shadow-sm border">
    //       <button
    //         onClick={handlePrevious}
    //         disabled={page === 1}
    //         className={`px-5 py-2 rounded-xl font-medium transition ${
    //           page === 1
    //             ? "bg-slate-100 text-slate-400 cursor-not-allowed"
    //             : "bg-primary-50 text-primary-600 hover:bg-primary-100"
    //         }`}
    //       >
    //         ← Previous
    //       </button>

    //       <div className="flex items-center gap-2 text-sm text-slate-600">
    //         <span className="px-3 py-1 bg-slate-100 rounded-lg">{page}</span>
    //         <span>of</span>
    //         <span className="px-3 py-1 bg-slate-100 rounded-lg">
    //           {totalPageCount}
    //         </span>
    //       </div>

    //       <button
    //         onClick={handleNext}
    //         disabled={page === totalPageCount}
    //         className={`px-5 py-2 rounded-xl font-medium transition ${
    //           page === totalPageCount
    //             ? "bg-slate-100 text-slate-400 cursor-not-allowed"
    //             : "bg-primary-50 text-primary-600 hover:bg-primary-100"
    //         }`}
    //       >
    //         Next →
    //       </button>
    //     </div>
    //   </div>

    //   {/* ===== EDIT MODAL ===== */}
    //   {openEdit && editData && (
    //     <EditProductAdmin
    //       data={editData}
    //       close={() => setOpenEdit(false)}
    //       fetchProductData={fetchProductData}
    //     />
    //   )}
    // </section>

    <section className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
  {/* ===== HEADER ===== */}
  <div className="sticky top-0 z-10 backdrop-blur bg-white/80 border-b shadow-sm">
    <div className="px-3 sm:px-4 md:px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 max-w-7xl mx-auto">
      
      {/* Title */}
      <div>
        <h2 className="text-lg sm:text-2xl font-bold text-slate-800">
          Product Management
        </h2>

        <p className="text-xs sm:text-sm text-slate-500">
          Manage your product inventory
        </p>
      </div>

      {/* Search */}
      <div className="relative w-full sm:w-[320px]">
        <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={handleOnChange}
          className="w-full pl-10 pr-4 py-2 rounded-xl border bg-white focus:ring-2 focus:ring-primary-200 outline-none shadow-sm text-sm"
        />
      </div>
    </div>
  </div>

  {/* ===== LOADING ===== */}
  {loading && (
    <div className="flex justify-center items-center py-10">
      <Loading />
    </div>
  )}

  {/* ===== CONTENT ===== */}
  <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-6">
    
    {/* Stats Bar */}
    <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 bg-white rounded-2xl p-4 shadow-sm border">
      
      <div>
        <p className="text-xs sm:text-sm text-slate-500">
          Total Products
        </p>

        <p className="text-lg sm:text-xl font-bold text-slate-800">
          {productData.length}
        </p>
      </div>

      <div className="text-xs sm:text-sm text-slate-500">
        Page {page} of {totalPageCount || 1}
      </div>
    </div>

    {/* Product Grid */}
    <div className="min-h-[55vh]">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
        {productData.map((p) => (
          <ProductCardAdmin
            key={p._id}
            data={p}
            fetchProductData={fetchProductData}
            onEdit={handleEdit}
          />
        ))}
      </div>
    </div>

    {/* ===== PAGINATION ===== */}
    <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-2xl p-3 shadow-sm border">
      
      <button
        onClick={handlePrevious}
        disabled={page === 1}
        className={`w-full sm:w-auto px-5 py-2 rounded-xl font-medium transition text-sm ${
          page === 1
            ? "bg-slate-100 text-slate-400 cursor-not-allowed"
            : "bg-primary-50 text-primary-600 hover:bg-primary-100"
        }`}
      >
        ← Previous
      </button>

      <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600">
        <span className="px-3 py-1 bg-slate-100 rounded-lg">
          {page}
        </span>

        <span>of</span>

        <span className="px-3 py-1 bg-slate-100 rounded-lg">
          {totalPageCount}
        </span>
      </div>

      <button
        onClick={handleNext}
        disabled={page === totalPageCount}
        className={`w-full sm:w-auto px-5 py-2 rounded-xl font-medium transition text-sm ${
          page === totalPageCount
            ? "bg-slate-100 text-slate-400 cursor-not-allowed"
            : "bg-primary-50 text-primary-600 hover:bg-primary-100"
        }`}
      >
        Next →
      </button>
    </div>
  </div>

  {/* ===== EDIT MODAL ===== */}
  {openEdit && editData && (
    <EditProductAdmin
      data={editData}
      close={() => setOpenEdit(false)}
      fetchProductData={fetchProductData}
    />
  )}
</section>
  );
};

export default ProductAdmin;
