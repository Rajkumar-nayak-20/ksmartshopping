import React, { useEffect, useState } from "react"
import UploadSubCategoryModel from "../components/UploadsubCategoryModel"
import DeleteCategory from "../components/DeletesubCategory"
import Axios from "../utils/Axios"
import SummaryApi from "../common/SummaryApi"
import toast from "react-hot-toast"
import { Plus, Search, Edit2, Trash2, Download } from "lucide-react"
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

  const columnHelper = createColumnHelper()

  // Fetch data
  // const fetchData = async () => {
  //   try {
  //     setLoading(true)
      
  //     const [catRes, subRes] = await Promise.all([
  //       Axios({ ...SummaryApi.getCategory }),
  //       Axios({ ...SummaryApi.getSubCategory })
  //     ])

  //     if (catRes.data.success) {
  //       setCategoryList(catRes.data.data || [])
  //     }
      
  //     if (subRes.data.success) {
  //       const subData = subRes.data.data || []
  //       setSubCategoryData(subData)
  //       setFilteredData(subData)
  //     }
  //   } catch (error) {
  //     toast.error("Failed to fetch data")
  //     console.error("Fetch error:", error)
  //   } finally {
  //     setLoading(false)
  //   }
  // }
  const fetchData = async () => {
  try {
    setLoading(true)
    
    // ✅ SummaryApi endpoints વાપરો
    const [catRes, subRes] = await Promise.all([
      Axios(SummaryApi.getCategory),
      Axios(SummaryApi.getSubCategory)
    ])

    console.log("Category Response:", catRes.data)
    console.log("SubCategory Response:", subRes.data)

    // ✅ Check response structure
    if (catRes.data?.success) {
      setCategoryList(catRes.data.data || [])
    } else {
      console.error("Category API structure error")
    }
    
    if (subRes.data?.success) {
      const subData = subRes.data.data || []
      setSubCategoryData(subData)
      setFilteredData(subData)
    }
  } catch (error) {
    console.error("Fetch error:", error)
    toast.error("Failed to fetch data")
  } finally {
    setLoading(false)
  }
}

 useEffect(() => {
  console.log("Category List Updated:", categoryList)
  console.log("SubCategory Data Updated:", subCategoryData)
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

  // Table columns - Category કૉલમમાં નામ બતાવવા માટે
 // Table columns
// Table columns
const columns = [
  columnHelper.display({
    id: "srno",
    header: "#",
    cell: ({ row }) => row.index + 1,
  }),
  columnHelper.accessor("name", {
    header: "Name",
    cell: info => info.getValue() || "—",
  }),
  columnHelper.accessor("categoryId", {
    header: "Category",
    cell: info => {
      const categoryId = info.getValue();
      
      // ✅ 1. categoryList માંથી category શોધો
      const category = categoryList.find(cat => cat._id === categoryId);
      
      // ✅ 2. જો મળે તો નામ બતાવો
      if (category) {
        return category.name;
      }
      
      // ✅ 3. ન મળે તો "No Category" બતાવો
      return "No Category";
    },
  }),
  columnHelper.accessor("image", {
    header: "Image",
    cell: info => {
      const img = info.getValue();
      return img ? (
        <img src={img} alt="" className="h-10 w-10 rounded object-cover" />
      ) : "No Image";
    },
  }),
  columnHelper.display({
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex gap-2">
        <button
          onClick={() => {
            setEditData(row.original);
            setOpenModal(true);
          }}
          className="p-1 text-blue-600 hover:text-blue-800"
        >
          <Edit2 size={16} />
        </button>
        <button
          onClick={() => {
            setDeleteData(row.original);
            setOpenDelete(true);
          }}
          className="p-1 text-red-600 hover:text-red-800"
        >
          <Trash2 size={16} />
        </button>
      </div>
    ),
  }),
];
console.log("SubCategory Data:", subCategoryData);
console.log("Category List:", categoryList);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Sub Categories</h1>
        <div className="flex gap-3">
          <button
            onClick={() => {
              console.log("Export clicked")
              // Add export logic here
            }}
            className="px-4 py-2 border rounded-lg flex items-center gap-2"
          >
            <Download size={16} />
            Export
          </button>
          <button
            onClick={() => {
              setEditData(null)
              setOpenModal(true)
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700"
          >
            <Plus size={16} />
            Add Sub Category
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search sub-categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
          />
        </div>
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden">
        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">Loading categories...</p>
          </div>
        ) : filteredData.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            {searchTerm ? "No matching sub-categories found" : "No sub-categories added yet"}
          </div>
        ) : (
          <DisplayTable data={filteredData} column={columns} />
        )}
      </div>

      {/* Modal */}
      {openModal && (
        <UploadSubCategoryModel
          close={() => setOpenModal(false)}
          fetchData={fetchData}
          editData={editData}
          categoryList={categoryList}
        />
      )}

      {/* Delete Modal */}
      {openDelete && deleteData && (
        <DeleteCategory
          data={deleteData}
          close={() => setOpenDelete(false)}
          api={SummaryApi.deleteSubCategory}
          setList={setSubCategoryData}
        />
      )}
    </div>
  )
}

export default SubCategoryPage