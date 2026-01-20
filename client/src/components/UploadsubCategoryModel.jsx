import React, { useEffect, useState } from 'react'
import { IoClose } from "react-icons/io5"
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'

const UploadSubCategoryModel = ({ close, fetchData }) => {

  const [allCategory, setAllCategory] = useState([]) // ✅ LOCAL CATEGORY STATE

  const [subCategoryData, setSubCategoryData] = useState({
    name: "",
    image: "",
    category: []   // UI ma object
  })

  // ======================
  // 🔥 FETCH CATEGORY HERE (IMPORTANT)
  // ======================
  const fetchCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getCategory   // ✅ CORRECT API
      })

      if (response.data.success) {
        setAllCategory(response.data.data)
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }

  useEffect(() => {
    fetchCategory()
  }, [])

  // ======================
  // SUBMIT
  // ======================
  const handleSubmitSubCategory = async (e) => {
    e.preventDefault()

    try {
      const payload = {
        name: subCategoryData.name,
        image: subCategoryData.image,
        category: subCategoryData.category.map(cat => cat._id)
      }

      const response = await Axios({
        ...SummaryApi.createSubCategory,
        data: payload
      })

      if (response.data.success) {
        toast.success(response.data.message)
        close()
        fetchData()
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }

  return (
    <section className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl p-5">

        {/* HEADER */}
        <div className="flex items-center justify-between border-b pb-3">
          <h1 className="font-semibold text-lg">Add Sub Category</h1>
          <button onClick={close}>
            <IoClose size={24} />
          </button>
        </div>

        <form className="mt-4 grid gap-4" onSubmit={handleSubmitSubCategory}>

          {/* SUB CATEGORY NAME */}
          <input
            placeholder="Sub Category Name"
            value={subCategoryData.name}
            onChange={(e) =>
              setSubCategoryData(prev => ({
                ...prev,
                name: e.target.value
              }))
            }
            className="p-3 border rounded-xl"
            required
          />

          {/* AUTO IMAGE */}
          <div className="h-36 w-36 bg-gray-100 rounded-xl flex items-center justify-center">
            {subCategoryData.image ? (
              <img
                src={subCategoryData.image}
                className="h-full w-full object-contain p-2"
              />
            ) : (
              <span className="text-gray-400 text-sm">
                Category image will appear here
              </span>
            )}
          </div>

          {/* SELECT CATEGORY */}
          <select
            className="p-3 border rounded-xl"
            onChange={(e) => {
              const selected = allCategory.find(
                cat => cat._id === e.target.value
              )
              if (!selected) return

              setSubCategoryData({
                name: subCategoryData.name,
                image: selected.image,   // ✅ AUTO IMAGE
                category: [selected]
              })
            }}
          >
            <option value="">Select Category</option>

            {allCategory.map(cat => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>

          {/* SUBMIT */}
          <button
            disabled={
              !subCategoryData.name ||
              !subCategoryData.image ||
              !subCategoryData.category.length
            }
            className="py-3 bg-orange-500 text-white rounded-xl"
          >
            Submit
          </button>

        </form>
      </div>
    </section>
  )
}

export default UploadSubCategoryModel



//3:11