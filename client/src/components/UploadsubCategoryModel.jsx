import React, { useEffect, useState } from "react"
import { IoClose } from "react-icons/io5"
import uploadImage from "../utils/Uploadimage"
import Axios from "../utils/Axios"
import SummaryApi from "../common/SummaryApi"
import toast from "react-hot-toast"
import AxiosToastError from "../utils/AxiosToastError"

const UploadSubCategoryModel = ({
  close,
  fetchData,
  editData,
  categoryList
}) => {

  const isEdit = Boolean(editData)

  const [data, setData] = useState({
    name: "",
    categoryId: [],
    image: ""
  })

  const [loading, setLoading] = useState(false)

  // ======================
  // LOAD EDIT DATA
  // ======================
  useEffect(() => {
    if (editData) {
      setData({
        name: editData.name || "",
        categoryId: editData.categoryId
          ? [editData.categoryId._id]
          : [],
        image: editData.image || ""
      })
    } else {
      setData({ name: "", categoryId: [], image: "" })
    }
  }, [editData])

  // ======================
  // INPUT CHANGE
  // ======================
  const handleChange = (e) => {
    const { name, value } = e.target
    setData(prev => ({ ...prev, [name]: value }))
  }

  // ======================
  // CATEGORY SELECT
  // ======================
  const handleSelectCategory = (cat) => {
    if (data.categoryId.includes(cat._id)) return

    setData(prev => ({
      ...prev,
      categoryId: [...prev.categoryId, cat._id]
    }))
  }

  const handleRemoveCategory = (id) => {
    setData(prev => ({
      ...prev,
      categoryId: prev.categoryId.filter(cid => cid !== id)
    }))
  }

  // ======================
  // IMAGE UPLOAD
  // ======================
  const handleUploadImage = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    try {
      setLoading(true)
      const response = await uploadImage(file)
      const imageUrl = response?.data?.url

      if (!imageUrl) {
        toast.error("Image upload failed")
        return
      }

      setData(prev => ({ ...prev, image: imageUrl }))
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  // ======================
  // SUBMIT
  // ======================
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!data.name || data.categoryId.length === 0 || !data.image) {
      toast.error("All fields required")
      return
    }

    try {
      setLoading(true)

      const response = await Axios({
        ...(isEdit
          ? SummaryApi.updateSubCategory
          : SummaryApi.createSubCategory),
        data: isEdit
          ? { ...data, _id: editData._id }
          : data
      })

      if (response.data.success) {
        toast.success(
          isEdit ? "Sub Category Updated" : "Sub Category Added"
        )
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
      <div className="bg-white w-full max-w-xl rounded-2xl p-6 shadow-2xl">

        {/* HEADER */}
        <div className="flex justify-between items-center border-b pb-3">
          <h1 className="text-lg font-semibold">
            {isEdit ? "Edit Sub Category" : "Add Sub Category"}
          </h1>
          <button onClick={close}>
            <IoClose size={22} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 grid gap-4">

          {/* NAME */}
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={handleChange}
            placeholder="Sub category name"
            className="border rounded-xl px-4 py-2"
            required
          />

          {/* CATEGORY SELECT – TEXT + CROSS ONLY */}
          <div className="space-y-2">

            {/* Selected Categories */}
            <div className="flex flex-wrap gap-2">
              {data.categoryId.map(id => {
                const cat = categoryList.find(c => c._id === id)
                if (!cat) return null

                return (
                  <div
                    key={id}
                    className="flex items-center gap-2 bg-gray-100 border rounded-md px-3 py-1 text-sm"
                  >
                    <span>{cat.name}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveCategory(id)}
                      className="text-gray-500 hover:text-red-600"
                    >
                      <IoClose size={14} />
                    </button>
                  </div>
                )
              })}
            </div>

            {/* Category List */}
            <div className="border rounded-xl max-h-40 overflow-y-auto">
              {categoryList.map(cat => (
                <div
                  key={cat._id}
                  onClick={() => handleSelectCategory(cat)}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm"
                >
                  {cat.name}
                </div>
              ))}
            </div>
          </div>

          {/* IMAGE UPLOAD */}
          <div className="flex gap-4 items-center">
            <div className="h-32 w-32 bg-gray-100 rounded-xl flex items-center justify-center">
              {data.image ? (
                <img
                  src={data.image}
                  alt="preview"
                  className="max-h-full max-w-full object-contain"
                />
              ) : (
                <span className="text-gray-400 text-sm">No Image</span>
              )}
            </div>

            <label className="cursor-pointer">
              <div className="px-5 py-2 bg-amber-200 rounded-xl">
                Upload Image
              </div>
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleUploadImage}
              />
            </label>
          </div>

          {/* SUBMIT */}
          <button
            disabled={loading}
            className="bg-amber-500 text-white py-3 rounded-xl font-semibold"
          >
            {loading
              ? "Please wait..."
              : isEdit
              ? "Update Sub Category"
              : "Add Sub Category"}
          </button>

        </form>
      </div>
    </section>
  )
}

export default UploadSubCategoryModel
