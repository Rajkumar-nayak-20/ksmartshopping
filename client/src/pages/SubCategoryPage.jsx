import React, { useEffect, useState } from 'react'
import UploadSubCategoryModel from '../components/UploadsubCategoryModel'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import { HiPencil } from "react-icons/hi"
import { MdDelete } from "react-icons/md"

const SubCategoryPage = () => {
  const [openAddSubCategory, setOpenAddSubCategory] = useState(false)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  // ✅ FIX: USE GET SUBCATEGORY API
  const fetchSubCategory = async () => {
    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.getSubCategory   // ✅ CORRECT API
      })

      if (response.data.success) {
        setData(response.data.data)
      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSubCategory()
  }, [])

  return (
    <section className="bg-gray-50 min-h-screen">

      {/* HEADER */}
      <div className="bg-white p-4 rounded-xl shadow flex items-center justify-between">
        <h2 className="font-semibold text-lg">Sub Categories</h2>
        <button
          onClick={() => setOpenAddSubCategory(true)}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-orange-400 to-amber-400 text-white font-semibold hover:opacity-90 transition"
        >
          + Add Sub Category
        </button>
      </div>

      {/* LIST */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {data.map((sub) => (
          <div
            key={sub._id}
            className="bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden"
          >
            <div className="h-40 bg-gray-100 flex items-center justify-center">
              <img
                src={sub.image}
                alt={sub.name}
                className="w-full h-full object-contain p-4"
              />
            </div>

            <div className="p-3 space-y-1">
              {/* SUB CATEGORY NAME */}
              <h3 className="font-semibold text-sm truncate">
                {sub.name}
              </h3>

              {/* CATEGORY NAME BADGES */}
              <div className="flex flex-wrap gap-1 text-xs">
                {sub.category?.map(cat => (
                  <span
                    key={cat._id}
                    className="px-2 py-0.5 bg-orange-100 text-orange-600 rounded-full"
                  >
                    {cat.name}
                  </span>
                ))}
              </div>

              <div className="mt-3 flex justify-end gap-2">
                <button className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100">
                  <HiPencil size={18} />
                </button>
                <button className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100">
                  <MdDelete size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {openAddSubCategory && (
        <UploadSubCategoryModel
          close={() => setOpenAddSubCategory(false)}
          fetchData={fetchSubCategory}
        />
      )}
    </section>
  )
}

export default SubCategoryPage
