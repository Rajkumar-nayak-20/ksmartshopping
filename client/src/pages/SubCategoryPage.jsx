import React, { useEffect, useState } from "react"
import UploadSubCategoryModel from "../components/UploadsubCategoryModel"
import DeleteCategory from "../components/DeletesubCategory"
import Axios from "../utils/Axios"
import SummaryApi from "../common/SummaryApi"
import toast from "react-hot-toast"
import { Plus, Search, Edit2, Trash2, Download, Filter, ChevronDown, ChevronUp, Layers, Package, X, ZoomIn } from "lucide-react"
import DisplayTable from "../components/DisplayTable"
import { createColumnHelper } from "@tanstack/react-table"

const SubCategoryPage = () => {
  const [openModal, setOpenModal] = useState(false)
  const [editData, setEditData] = useState(null)
  const [openDelete, setOpenDelete] = useState(false)
  const [deleteData, setDeleteData] = useState(null)
  const [subCategoryData, setSubCategoryData] = useState([])
  const [categoryList, setCategoryList] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredData, setFilteredData] = useState([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({ total: 0, active: 0 })
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' })
  const [selectedImage, setSelectedImage] = useState(null) // ✅ New state for image modal

  const columnHelper = createColumnHelper()

  // Image Modal Component
  const ImageModal = ({ imageUrl, onClose }) => {
    if (!imageUrl) return null;

    return (
      <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-[9999] p-4 animate-fadeIn">
        <div className="relative max-w-4xl max-h-[90vh]">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-white text-lg font-medium">Image Preview</h3>
            <button
              onClick={onClose}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X size={24} className="text-white" />
            </button>
          </div>
          
          <div className="bg-white rounded-xl overflow-hidden shadow-2xl">
            <img 
              src={imageUrl} 
              alt="Full Preview" 
              className="w-full h-auto max-h-[70vh] object-contain"
            />
            
            <div className="p-4 bg-gray-900 flex justify-between items-center">
              <a 
                href={imageUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-2"
              >
                <ZoomIn size={16} />
                Open in new tab
              </a>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Fetch data function
  const fetchData = async () => {
    try {
      setLoading(true)
      
      // Make API calls
      const [catRes, subRes] = await Promise.all([
        Axios(SummaryApi.getCategory),
        Axios(SummaryApi.getSubCategory)
      ])

      console.log("Categories API Response:", catRes.data)
      console.log("SubCategories API Response:", subRes.data)

      // Set category list
      if (catRes.data?.success) {
        setCategoryList(catRes.data.data || [])
      }
      
      // Set sub-category data
      if (subRes.data?.success) {
        const subData = subRes.data.data || []
        console.log("SubCategory Data:", subData)
        setSubCategoryData(subData)
        setFilteredData(subData)
        
        // Calculate stats
        setStats({
          total: subData.length,
          active: subData.length // Update with actual active count if available
        })
      }
    } catch (error) {
      console.error("Fetch error:", error)
      toast.error("Failed to fetch data")
    } finally {
      setLoading(false)
    }
  }

  // Fetch data on component mount
  useEffect(() => {
    fetchData()
  }, [])

  // Debug logs
  useEffect(() => {
    console.log("Updated Category List:", categoryList)
    console.log("Updated SubCategory Data:", subCategoryData)
    
    // Check if category names are being found
    if (subCategoryData.length > 0 && categoryList.length > 0) {
      console.log("Matching categories with subcategories:")
      subCategoryData.forEach((subCat, index) => {
        const foundCat = categoryList.find(cat => cat._id === subCat.categoryId)
        console.log(`SubCategory ${index + 1}:`, {
          subCategoryName: subCat.name,
          subCategoryId: subCat._id,
          categoryId: subCat.categoryId,
          foundCategoryName: foundCat?.name || "Not Found",
          foundCategoryId: foundCat?._id
        })
      })
    }
  }, [categoryList, subCategoryData])

  // Search functionality
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredData(subCategoryData)
    } else {
      const filtered = subCategoryData.filter(item =>
        item.name?.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredData(filtered)
    }
  }, [searchTerm, subCategoryData])

  // Handle sort
  const handleSort = (key) => {
    let direction = 'asc'
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    
    const sorted = [...filteredData].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1
      return 0
    })
    
    setFilteredData(sorted)
    setSortConfig({ key, direction })
  }

  // Handle delete success
  const handleDeleteSuccess = () => {
    fetchData() // Refresh data after delete
  }

  // Table columns - FIXED VERSION with image click
  const columns = [
    columnHelper.display({
      id: "srno",
      header: () => (
        <div className="flex items-center gap-1">
          <span>NO</span>
          <button onClick={() => handleSort('_id')} className="opacity-50 hover:opacity-100">
            {sortConfig.key === '_id' ? 
              (sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />) : 
              <ChevronDown size={14} />
            }
          </button>
        </div>
      ),
      cell: ({ row }) => (
        <div className="font-medium text-gray-700">{row.index + 1}</div>
      ),
    }),
    columnHelper.accessor("name", {
      header: () => (
        <div className="flex items-center gap-1">
          <span>Sub Category</span>
          <button onClick={() => handleSort('name')} className="opacity-50 hover:opacity-100">
            {sortConfig.key === 'name' ? 
              (sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />) : 
              <ChevronDown size={14} />
            }
          </button>
        </div>
      ),
      cell: info => (
        <div className="flex items-center gap-3">
          {info.row.original.image && (
            <div 
              className="relative group cursor-pointer"
              onClick={() => setSelectedImage(info.row.original.image)}
            >
              <img 
                src={info.row.original.image} 
                alt="" 
                className="h-10 w-10 rounded-lg object-cover border-2 border-gray-200 group-hover:border-orange-400 transition-all duration-200"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 rounded-lg transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <ZoomIn size={16} className="text-white" />
              </div>
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap">
                Click to preview
              </div>
            </div>
          )}
          <div>
            <div className="font-medium text-gray-900">{info.getValue() || "—"}</div>
            <div className="text-xs text-gray-500">{info.row.original._id?.slice(-6)}</div>
          </div>
        </div>
      ),
    }),
    columnHelper.accessor("categoryId", {
      header: "Parent Category",
      cell: (info) => {
        const categoryId = info.getValue();
        const rowData = info.row.original;
        
        // First check embedded category object
        if (rowData.category && typeof rowData.category === 'object') {
          return (
            <div className="flex items-center gap-2">
              <Package size={14} className="text-orange-500" />
              <span className="font-medium">{rowData.category.name || "No Category"}</span>
            </div>
          );
        }
        
        // Then find in categoryList
        if (categoryId && categoryList.length > 0) {
          const category = categoryList.find(cat => cat._id === categoryId);
          return category ? (
            <div className="flex items-center gap-2">
              <Package size={14} className="text-orange-500" />
              <span className="font-medium">{category.name}</span>
            </div>
          ) : "No Category";
        }
        
        return "No Category";
      },
    }),
    columnHelper.accessor("image", {
      header: "Image Preview",
      cell: info => {
        const img = info.getValue();
        if (!img) return "No Image";
        
        return (
          <div 
            className="group relative cursor-pointer inline-block"
            onClick={() => setSelectedImage(img)}
          >
            <div className="relative overflow-hidden rounded-lg border-2 border-gray-200 group-hover:border-orange-400 transition-all duration-200">
              <img 
                src={img} 
                alt="Sub-category" 
                className="h-16 w-16 object-cover group-hover:scale-105 transition-transform duration-200"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end justify-center p-2">
                <ZoomIn size={16} className="text-white mb-1" />
              </div>
            </div>
            {/* <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap">
              Click to enlarge
            </div> */}
          </div>
        );
      },
    }),
    // columnHelper.accessor("createdAt", {
    //   header: "Created",
    //   cell: info => {
    //     const date = info.getValue();
    //     return date ? new Date(date).toLocaleDateString('en-US', {
    //       day: 'numeric',
    //       month: 'short',
    //       year: 'numeric'
    //     }) : "—";
    //   },
    // }),
    columnHelper.display({
      id: "status",
      header: "Status",
      cell: ({ row }) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          Active
        </span>
      ),
    }),
    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const rowData = row.original;
        return (
          <div className="flex gap-1">
            <button
              onClick={() => {
                console.log("Editing:", rowData);
                setEditData(rowData);
                setOpenModal(true);
              }}
              className="p-2 text-orange-600 hover:text-white hover:bg-orange-600 rounded-lg transition-all duration-200 border border-orange-200 hover:border-orange-600 group relative"
              title="Edit"
            >
              <Edit2 size={16} />
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap">
                Edit
              </div>
            </button>
            <button
              onClick={() => {
                console.log("Deleting:", rowData);
                setDeleteData(rowData);
                setOpenDelete(true);
              }}
              className="p-2 text-red-600 hover:text-white hover:bg-red-600 rounded-lg transition-all duration-200 border border-red-200 hover:border-red-600 group relative"
              title="Delete"
            >
              <Trash2 size={16} />
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap">
                Delete
              </div>
            </button>
          </div>
        );
      },
    }),
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50/30 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 shadow-lg">
            <Layers size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Sub Categories</h1>
            <p className="text-gray-600">Manage your product sub-categories and hierarchy</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Sub Categories</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.total}</p>
            </div>
            <div className="p-3 rounded-full bg-orange-100">
              <Package className="text-orange-600" size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-500">+12%</span>
            <span className="text-gray-500 ml-2">from last month</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Active Sub Categories</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.active}</p>
            </div>
            <div className="p-3 rounded-full bg-green-100">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-500">
            {Math.round((stats.active / stats.total) * 100)}% of total
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">With Images</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {subCategoryData.filter(item => item.image).length}
              </p>
            </div>
            <div className="p-3 rounded-full bg-blue-100">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-500">
            Have image uploaded
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100 mb-6">
        <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search sub-categories by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            {/* <button
              onClick={() => {
                console.log("Export clicked");
                toast.success("Export feature coming soon!");
              }}
              className="px-5 py-3 border border-gray-300 rounded-xl flex items-center gap-2 hover:bg-gray-50 transition-colors font-medium"
            >
              <Download size={18} />
              Export CSV
            </button> */}
            {/* <button
              onClick={() => {
                console.log("Filter clicked");
              }}
              className="px-5 py-3 border border-gray-300 rounded-xl flex items-center gap-2 hover:bg-gray-50 transition-colors font-medium"
            >
              <Filter size={18} />
              Filter
            </button> */}
            <button
              onClick={() => {
                console.log("Opening add modal");
                setEditData(null);
                setOpenModal(true);
              }}
              className="px-5 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl flex items-center gap-2 hover:from-orange-600 hover:to-amber-600 transition-all duration-200 shadow-lg hover:shadow-xl font-medium"
            >
              <Plus size={20} />
              Add New Sub Category
            </button>
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-2xl shadow-lg border border-orange-100 overflow-hidden">
        {loading ? (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
            <p className="mt-4 text-gray-600 font-medium">Loading sub-categories...</p>
            <p className="text-sm text-gray-500 mt-2">Please wait while we fetch your data</p>
          </div>
        ) : filteredData.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-block p-6 rounded-full bg-orange-100 mb-4">
              <Layers size={48} className="text-orange-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {searchTerm ? "No results found" : "No sub-categories yet"}
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              {searchTerm 
                ? "Try adjusting your search or filter to find what you're looking for." 
                : "Get started by creating your first sub-category to organize your products better."
              }
            </p>
            {!searchTerm && (
              <button
                onClick={() => setOpenModal(true)}
                className="px-8 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl hover:from-orange-600 hover:to-amber-600 transition-all duration-200 font-medium shadow-lg"
              >
                <Plus size={20} className="inline mr-2" />
                Create First Sub Category
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Sub Category List</h3>
                  <p className="text-sm text-gray-500">
                    Showing <span className="font-semibold">{filteredData.length}</span> of{" "}
                    <span className="font-semibold">{subCategoryData.length}</span> sub-categories
                  </p>
                </div>
                <div className="text-sm text-gray-500">
                  
                </div>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <DisplayTable 
                data={filteredData} 
                column={columns}
                className="min-w-full"
                rowClassName="hover:bg-orange-50/50 transition-colors duration-150"
              />
            </div>
            
            <div className="p-6 border-t border-gray-200 bg-gray-50/50">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-sm text-gray-600">
                  Page 1 of 1 • {filteredData.length} items
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                    Previous
                  </button>
                  <button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg text-sm hover:from-orange-600 hover:to-amber-600">
                    1
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Image Preview Modal */}
      {selectedImage && (
        <ImageModal 
          imageUrl={selectedImage} 
          onClose={() => setSelectedImage(null)} 
        />
      )}

      {/* Add/Edit Modal */}
      {openModal && (
        <UploadSubCategoryModel
          close={() => {
            console.log("Closing modal");
            setOpenModal(false);
            setEditData(null);
          }}
          fetchData={fetchData}
          editData={editData}
          categoryList={categoryList}
        />
      )}

      {/* Delete Modal */}
      {openDelete && deleteData && (
        <DeleteCategory
          data={deleteData}
          close={() => {
            setOpenDelete(false);
            setDeleteData(null);
          }}
          api={SummaryApi.deleteSubCategory}
          setList={setSubCategoryData}
          onSuccess={handleDeleteSuccess}
          type="sub-category"
        />
      )}
    </div>
  )
}

export default SubCategoryPage