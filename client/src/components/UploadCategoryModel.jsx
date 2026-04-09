
import React, { useEffect, useState } from 'react'
import { IoClose } from "react-icons/io5"
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'
import Uploadimage from '../utils/Uploadimage'

const UploadCategoryModel = ({
  close,
  fetchData,
  editData,
  categoryList // ✅ ADDED (for validation only)
}) => {

  const isEdit = Boolean(editData)

  const [data, setData] = useState({
    name: "",
    image: ""
  })

  const [loading, setLoading] = useState(false)

  // EDIT MODE DATA LOAD
  useEffect(() => {
    if (editData) {
      setData({
        name: editData.name || "",
        image: editData.image || ""
      })
    } else {
      setData({ name: "", image: "" })
    }
  }, [editData])

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setData(prev => ({ ...prev, [name]: value }))
  }

  // IMAGE UPLOAD
  const handleUploadCategoryImage = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    try {
      setLoading(true)
      const response = await Uploadimage(file)

      const imageUrl = response?.data?.url
      if (!imageUrl) return toast.error("Upload failed")

      setData(prev => ({ ...prev, image: imageUrl }))
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault()

    // ==========================
    // ✅ DUPLICATE NAME VALIDATION
    // ==========================
    const isDuplicate = categoryList?.some(cat =>
      cat.name.trim().toLowerCase() === data.name.trim().toLowerCase() &&
      cat._id !== editData?._id
    )

    if (isDuplicate) {
      toast.error("Category already exists")
      return
    }
    // ==========================

    try {
      setLoading(true)
      const response = await Axios({
        ...(isEdit ? SummaryApi.updateCategory : SummaryApi.addCategory),
        data: isEdit
          ? { ...data, _id: editData._id }
          : data
      })

      if (response.data.success) {
        toast.success(isEdit ? "Category updated" : "Category added")
        close()
        fetchData()
      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-4xl rounded-2xl p-6 shadow-2xl">

        {/* HEADER */}
        <div className="flex justify-between items-center border-b pb-3">
          <h1 className="text-lg font-semibold">
            {isEdit ? "Edit Category" : "Add Category"}
          </h1>
          <button onClick={close}>
            <IoClose size={22} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 grid gap-4">

          <input
            type="text"
            name="name"
            value={data.name}
            onChange={handleOnChange}
            placeholder="Category name"
            className="border rounded-xl px-4 py-2"
          />

          <div className="flex gap-4 items-center">
            <div className="h-36 w-36 bg-gray-100 flex items-center justify-center rounded-xl">
              {data.image ? (
                <img
                  src={data.image}
                  alt="preview"
                  className="max-h-full max-w-full object-contain"
                />
              ) : (
                <span className="text-sm text-gray-400">No Image</span>
              )}
            </div>

            <label>
              <div className="px-5 py-2 rounded-xl bg-primary-200 cursor-pointer">
                Upload Image
              </div>
              <input
                type="file"
                hidden
                onChange={handleUploadCategoryImage}
              />
            </label>
          </div>

          <button
            disabled={!data.name || !data.image || loading}
            className="
              bg-amber-500 text-white
              py-3 rounded-xl font-semibold
              disabled:bg-gray-300
            "
          >
            {loading
              ? "Please wait..."
              : isEdit ? "Update Category" : "Add Category"}
          </button>

        </form>
      </div>
    </section>
  )
}

export default UploadCategoryModel

