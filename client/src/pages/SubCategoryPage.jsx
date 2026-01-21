import React, { useEffect, useState } from "react"
import UploadSubCategoryModel from "../components/UploadsubCategoryModel"
import DeleteCategory from "../components/DeletesubCategory"
import Axios from "../utils/Axios"
import SummaryApi from "../common/SummaryApi"
import AxiosToastError from "../utils/AxiosToastError"
import { Edit2, Trash2, Plus } from "lucide-react"
import DisplayTable from "../components/DisplayTable"
import { createColumnHelper } from "@tanstack/react-table"
import ViewImage from "../components/viewimage"

const SubCategoryPage = () => {
  const [openModal, setOpenModal] = useState(false)
  const [editData, setEditData] = useState(null)

  const [openDelete, setOpenDelete] = useState(false)
  const [deleteData, setDeleteData] = useState(null)

  const [subCategoryData, setSubCategoryData] = useState([])
  const [categoryList, setCategoryList] = useState([])
  const [imageURL, setImageURL] = useState("")

  const columnHelper = createColumnHelper()

  // ======================
  // FETCH DATA
  // ======================
  const fetchData = async () => {
    try {
      const catRes = await Axios({ ...SummaryApi.getCategory })
      const subRes = await Axios({ ...SummaryApi.getSubCategory })

      if (catRes.data.success) setCategoryList(catRes.data.data)
      if (subRes.data.success) setSubCategoryData(subRes.data.data)
    } catch (error) {
      AxiosToastError(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // ======================
  // TABLE COLUMNS (BULLETPROOF)
  // ======================
  const column = [

    // Sr.No
    columnHelper.display({
      id: "srno",
      header: "Sr.No",
      cell: ({ row }) => row.index + 1,
    }),

    // Name
    columnHelper.accessor("name", {
      header: "Name",
      cell: info => info.getValue(),
    }),

    // Image
    columnHelper.accessor("image", {
      header: "Image",
      cell: info => {
        const img = info.getValue()
        return img ? (
          <img
            src={img}
            alt="subcategory"
            className="h-10 w-10 rounded object-cover cursor-pointer"
            onClick={() => setImageURL(img)}
          />
        ) : (
          <span className="text-gray-400 text-sm">No Image</span>
        )
      },
    }),

    // ✅ CATEGORY (HANDLES ALL CASES)
    columnHelper.display({
      id: "category",
      header: "Category",
      cell: ({ row }) => {
        const catData = row.original.categoryId

        if (!catData) {
          return <span className="text-gray-400">-</span>
        }

        // Array case
        if (Array.isArray(catData)) {
          return (
            <div className="flex flex-wrap gap-2">
              {catData.map((cat, i) => (
                <span
                  key={cat?._id || i}
                  className="bg-blue-600 text-white text-xs px-2 py-1 rounded"
                >
                  {cat?.name || cat}
                </span>
              ))}
            </div>
          )
        }

        // Object case
        if (typeof catData === "object") {
          return (
            <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">
              {catData.name}
            </span>
          )
        }

        // String / ID case
        return (
          <span className="text-gray-600 text-sm">
            {catData}
          </span>
        )
      },
    }),

    // Actions
    columnHelper.display({
      id: "action",
      header: "Action",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <button
            onClick={() => {
              setEditData(row.original)
              setOpenModal(true)
            }}
            className="p-2 bg-blue-100 text-blue-600 rounded"
          >
            <Edit2 size={14} />
          </button>

          <button
            onClick={() => {
              setDeleteData(row.original)
              setOpenDelete(true)
            }}
            className="p-2 bg-red-100 text-red-600 rounded"
          >
            <Trash2 size={14} />
          </button>
        </div>
      ),
    }),
  ]

  return (
    <section className="p-6 space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Sub Category</h1>
        <button
          onClick={() => {
            setEditData(null)
            setOpenModal(true)
          }}
          className="bg-amber-500 text-white px-5 py-2 rounded-xl flex items-center gap-2"
        >
          <Plus size={18} /> Add Sub Category
        </button>
      </div>

      {/* TABLE */}
      <DisplayTable
        data={subCategoryData}
        column={column}
      />

      {/* ADD / EDIT */}
      {openModal && (
        <UploadSubCategoryModel
          close={() => setOpenModal(false)}
          fetchData={fetchData}
          editData={editData}
          categoryList={categoryList}
        />
      )}

      {/* DELETE */}
      {openDelete && deleteData && (
        <DeleteCategory
          data={deleteData}
          close={() => setOpenDelete(false)}
          api={SummaryApi.deleteSubCategory}
          setList={setSubCategoryData}
        />
      )}

      {/* IMAGE VIEW */}
      {imageURL && (
        <ViewImage
          url={imageURL}
          close={() => setImageURL("")}
        />
      )}

    </section>
  )
}

export default SubCategoryPage
