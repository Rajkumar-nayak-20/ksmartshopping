
import React, { useEffect, useState, useCallback, useRef } from "react";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { Link, useParams } from "react-router-dom";
import AxiosToastError from "../utils/AxiosToastError";
import Loading from "../components/Loading";
import CardProduct from "../components/CardProduct";
import { useSelector } from "react-redux";
import { valideURLConvert } from "../utils/valideURLConvert";
import {
  Menu,
  X,
  Filter,
  Grid,
  List,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  Package,
  TrendingUp,
  Clock,
  DollarSign,
  Star,
} from "lucide-react";

const ProductListPage = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(1);
  const [DisplaySubCategory, setDisplaySubCategory] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sortBy, setSortBy] = useState("popularity");
  const [viewMode, setViewMode] = useState("grid");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
  const [showFilters, setShowFilters] = useState(false);

  const params = useParams();
  const loadMoreRef = useRef();

  const AllSubCategory = useSelector(
    (state) => state.product?.allSubCategory || [],
  );

  const categoryId = params?.category?.split("-")?.slice(-1)[0];
  const subCategoryId = params?.subCategory?.split("-")?.slice(-1)[0] || "all";

  const subCategoryName =
    subCategoryId === "all"
      ? "All Products"
      : params?.subCategory?.split("-")?.slice(0, -1)?.join(" ");

  // Sort products
  const sortProducts = (products, sortType) => {
    const sorted = [...products];
    switch (sortType) {
      case "price_low":
        return sorted.sort((a, b) => a.price - b.price);
      case "price_high":
        return sorted.sort((a, b) => b.price - a.price);
      case "newest":
        return sorted.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        );
      case "rating":
        return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      default:
        return sorted;
    }
  };

  // Filter by price
  const filterByPrice = (products) => {
    return products.filter(
      (p) => p.price >= priceRange.min && p.price <= priceRange.max,
    );
  };

  // Fetch products
  const fetchProductdata = async (currentPage = 1, isLoadMore = false) => {
    try {
      if (!isLoadMore) setLoading(true);

      const response = await Axios({
        ...SummaryApi.getProductByCategoryAndSubCategory,
        data: {
          categoryId,
          subCategoryId: subCategoryId === "all" ? undefined : subCategoryId,
          page: currentPage,
          limit: 12,
        },
      });

      const { data: responseData } = response;
      if (responseData.success) {
        setData((prev) =>
          currentPage === 1
            ? responseData.data
            : [...prev, ...responseData.data],
        );
        setTotalPage(responseData.totalPage);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  // Reset and fetch when filters change
  useEffect(() => {
    if (!categoryId) return;
    setPage(1);
    setData([]);
    fetchProductdata(1);
  }, [categoryId, subCategoryId]);

  // Load more
  useEffect(() => {
    if (page > 1) {
      fetchProductdata(page, true);
    }
  }, [page]);

  // Filter subcategories
  useEffect(() => {
    if (!categoryId) return;
    const sub = AllSubCategory.filter((s) => {
      if (Array.isArray(s.category)) {
        return s.category.some((el) => String(el._id) === String(categoryId));
      }
      return String(s.category?._id) === String(categoryId);
    });
    setDisplaySubCategory(sub);
  }, [categoryId, AllSubCategory]);

  // Infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && page < totalPage) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 0.1 },
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [loading, page, totalPage]);

  const filteredAndSortedData = sortProducts(filterByPrice(data), sortBy);

  // Mobile Sidebar Component
  const MobileSidebar = () => (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold">Sub-Categories</h3>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <X size={20} />
          </button>
        </div>
        <div className="overflow-y-auto h-full pb-20">
          <Link
            to={`/${params.category}/all`}
            onClick={() => setSidebarOpen(false)}
            className={`block px-4 py-3 ${subCategoryId === "all" ? "bg-green-50 text-green-600 font-semibold" : "hover:bg-gray-50"}`}
          >
            All Sub-Categories
          </Link>
          {DisplaySubCategory.map((s) => {
            const link = `/${params.category}/${valideURLConvert(s.name)}-${s._id}`;
            const isActive = String(subCategoryId) === String(s._id);
            return (
              <Link
                key={s._id}
                to={link}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 ${isActive ? "bg-green-50 text-green-600 font-semibold" : "hover:bg-gray-50"}`}
              >
                {s.image && (
                  <img
                    src={s.image}
                    alt={s.name}
                    className="w-8 h-8 object-contain rounded"
                  />
                )}
                <span>{s.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );

  // Filter Modal for Mobile
  const FilterModal = () => (
    <>
      {showFilters && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setShowFilters(false)}
        />
      )}
      <div
        className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl z-50 transform transition-transform duration-300 ease-in-out ${showFilters ? "translate-y-0" : "translate-y-full"}`}
      >
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="text-lg font-semibold">Filters</h3>
          <button
            onClick={() => setShowFilters(false)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-4 space-y-4 max-h-[70vh] overflow-y-auto">
          <div>
            <label className="font-medium mb-2 block">Price Range</label>
            <div className="flex gap-3">
              <input
                type="number"
                placeholder="Min"
                value={priceRange.min}
                onChange={(e) =>
                  setPriceRange({ ...priceRange, min: Number(e.target.value) })
                }
                className="flex-1 p-2 border rounded"
              />
              <input
                type="number"
                placeholder="Max"
                value={priceRange.max}
                onChange={(e) =>
                  setPriceRange({ ...priceRange, max: Number(e.target.value) })
                }
                className="flex-1 p-2 border rounded"
              />
            </div>
          </div>
          <div>
            <label className="font-medium mb-2 block">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="popularity">Popularity</option>
              <option value="newest">Newest First</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
          <button
            onClick={() => setShowFilters(false)}
            className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </>
  );

  return (
    <section className="bg-gray-50 min-h-screen">
      {/* Mobile Sidebar */}
      <MobileSidebar />

      {/* Mobile Filter Modal */}
      <FilterModal />

      <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-3 lg:py-4">
        <div className="flex gap-4 lg:gap-6">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-72 bg-white rounded-xl shadow-sm h-[calc(100vh-100px)] sticky top-24 overflow-hidden">
            <div className="p-5 border-b bg-gradient-to-r from-green-50 to-white">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <Package className="w-5 h-5 text-green-600" />
                Sub-Categories
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Browse by Sub-Category
              </p>
            </div>

            <div className="overflow-y-auto h-[calc(100%-80px)] custom-scrollbar">
              <Link
                to={`/${params.category}/all`}
                className={`flex items-center justify-between px-5 py-3 transition-all duration-200 ${
                  subCategoryId === "all"
                    ? "bg-green-50 text-green-700 border-l-4 border-green-600"
                    : "hover:bg-gray-50 text-gray-700"
                }`}
              >
                <span className="font-medium">All Products</span>
                <ChevronRight
                  size={16}
                  className="opacity-0 group-hover:opacity-100"
                />
              </Link>

              {DisplaySubCategory.map((s) => {
                const link = `/${params.category}/${valideURLConvert(s.name)}-${s._id}`;
                const isActive = String(subCategoryId) === String(s._id);
                return (
                  <Link
                    key={s._id}
                    to={link}
                    className={`flex items-center gap-3 px-5 py-3 transition-all duration-200 ${
                      isActive
                        ? "bg-green-50 text-green-700 border-l-4 border-green-600"
                        : "hover:bg-gray-50 text-gray-700"
                    }`}
                  >
                    {s.image && (
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <img
                          src={s.image}
                          alt={s.name}
                          className="w-7 h-7 object-contain"
                        />
                      </div>
                    )}
                    <span className="flex-1 text-sm font-medium">{s.name}</span>
                    {isActive && <ChevronRight size={16} />}
                  </Link>
                );
              })}
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {/* Header Section */}
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-4 sticky top-20 z-20 backdrop-blur-sm bg-white/95">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                    {subCategoryName}
                  </h1>
                  <p className="text-sm text-gray-500 mt-1">
                    {filteredAndSortedData.length} products found
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {/* Mobile Menu Button */}
                  <button
                    onClick={() => setSidebarOpen(true)}
                    className="lg:hidden p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    <Menu size={20} />
                  </button>

                  {/* Mobile Filter Button */}
                  <button
                    onClick={() => setShowFilters(true)}
                    className="lg:hidden p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    <SlidersHorizontal size={20} />
                  </button>

                  {/* View Mode Toggle */}
                  <div className="hidden sm:flex bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 rounded transition-all ${viewMode === "grid" ? "bg-white shadow text-green-600" : "text-gray-600"}`}
                    >
                      <Grid size={18} />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 rounded transition-all ${viewMode === "list" ? "bg-white shadow text-green-600" : "text-gray-600"}`}
                    >
                      <List size={18} />
                    </button>
                  </div>

                  {/* Sort Dropdown - Desktop */}
                  <div className="hidden sm:block relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none bg-gray-100 px-4 py-2 pr-8 rounded-lg text-sm font-medium cursor-pointer hover:bg-gray-200 transition-colors"
                    >
                      <option value="popularity">Sort: Popularity</option>
                      <option value="newest">Sort: Newest</option>
                      <option value="price_low">
                        Sort: Price: Low to High
                      </option>
                      <option value="price_high">
                        Sort: Price: High to Low
                      </option>
                      <option value="rating">Sort: Top Rated</option>
                    </select>
                    <ChevronDown
                      size={16}
                      className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none"
                    />
                  </div>
                </div>
              </div>

              {/* Price Filter - Desktop */}
              <div className="hidden lg:flex items-center gap-4 mt-4 pt-4 border-t">
                <div className="flex items-center gap-2">
                  <DollarSign size={16} className="text-gray-400" />
                  <span className="text-sm text-gray-600">Price Range:</span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={priceRange.min}
                    onChange={(e) =>
                      setPriceRange({
                        ...priceRange,
                        min: Number(e.target.value),
                      })
                    }
                    className="w-24 px-2 py-1 border rounded text-sm"
                  />
                  <span>-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={priceRange.max}
                    onChange={(e) =>
                      setPriceRange({
                        ...priceRange,
                        max: Number(e.target.value),
                      })
                    }
                    className="w-24 px-2 py-1 border rounded text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Products Grid/List View */}
            <div
              className={` grid gap-10 sm:gap-8 md:gap-8 ${
                viewMode === "grid"
                  ? "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4"
                  : "grid-cols-1"
              }`}
            >
              {filteredAndSortedData.map((product, index) => (
                <div
                  key={product._id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <CardProduct data={product} viewMode={viewMode} />
                </div>
              ))}
            </div>

            {/* Loading Indicator */}
            {loading && page === 1 && (
              <div className="flex justify-center py-12">
                <Loading />
              </div>
            )}

            {/* Load More Trigger for Infinite Scroll */}
            {!loading && page < totalPage && (
              <div ref={loadMoreRef} className="flex justify-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-green-500 border-t-transparent"></div>
              </div>
            )}

            {/* Load More Button (Alternative) */}
            {!loading && page < totalPage && (
              <div className="flex justify-center pb-8">
                <button
                  onClick={() => setPage((prev) => prev + 1)}
                  className="px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg"
                >
                  Load More Products
                </button>
              </div>
            )}

            {/* Empty State */}
            {!loading && filteredAndSortedData.length === 0 && (
              <div className="text-center py-12">
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  No products found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your filters or browse other categories
                </p>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #a8a8a8;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default ProductListPage;
