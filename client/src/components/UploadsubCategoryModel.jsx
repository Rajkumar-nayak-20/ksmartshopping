import React, { useEffect, useState } from "react"
import { X, Upload, Check, Plus as PlusIcon } from "lucide-react"
import uploadImage from "../utils/Uploadimage"
import Axios from "../utils/Axios"
import SummaryApi from "../common/SummaryApi"
import toast from "react-hot-toast"

const UploadSubCategoryModel = ({
  close,
  fetchData,
  editData,
  categoryList
}) => {
  const isEdit = Boolean(editData)

  const [formData, setFormData] = useState({
    name: "",
    categoryId: "", // ✅ માત્ર ID
    image: ""
  })
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  
  // ✅ Selected category નામ બતાવવા
  const [selectedCategoryName, setSelectedCategoryName] = useState("")

  // Load edit data
  useEffect(() => {
    if (editData) {
      setFormData({
        name: editData.name || "",
        categoryId: editData.categoryId || "",
        image: editData.image || ""
      })
      
      // ✅ Edit મોડમાં category નામ શોધો
      if (editData.categoryId) {
        const category = categoryList.find(cat => cat._id === editData.categoryId)
        setSelectedCategoryName(category?.name || "")
      }
    }
  }, [editData, categoryList])

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // ✅ જો category select કર્યું હોય, તો નામ બતાવો
    if (name === "categoryId") {
      const category = categoryList.find(cat => cat._id === value)
      setSelectedCategoryName(category?.name || "")
    }
  }

  // Handle image upload (સમાન)
  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    try {
      setUploading(true)
      const response = await uploadImage(file)
      const imageUrl = response?.data?.url

      if (imageUrl) {
        setFormData(prev => ({
          ...prev,
          image: imageUrl
        }))
        toast.success("Image uploaded successfully")
      }
    } catch (error) {
      toast.error("Failed to upload image")
    } finally {
      setUploading(false)
    }
  }

  // Handle form submit (API માં માત્ર ID મોકલો)
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validation
    if (!formData.name.trim()) {
      toast.error("Please enter sub-category name")
      return
    }

    if (!formData.categoryId) {
      toast.error("Please select a category")
      return
    }

    if (!formData.image) {
      toast.error("Please upload an image")
      return
    }

    try {
      setLoading(true)

      // ✅ API માં માત્ર ID મોકલો, નામ નહીં
      const payload = {
        name: formData.name.trim(),
        categoryId: formData.categoryId, // માત્ર ID
        image: formData.image
      }

      if (isEdit) {
        payload._id = editData._id
      }

      const response = await Axios({
        ...(isEdit ? SummaryApi.updateSubCategory : SummaryApi.createSubCategory),
        data: payload
      })

      if (response.data.success) {
        toast.success(isEdit ? "Updated successfully" : "Created successfully")
        close()
        fetchData()
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md">
        {/* Header */}
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold">
            {isEdit ? "Edit Sub Category" : "Add Sub Category"}
          </h2>
          <button
            onClick={close}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sub Category Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter name"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Category Select */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Parent Category *
            </label>
            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Category</option>
              {categoryList.map(category => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
            
            {/* ✅ Selected category નામ બતાવો */}
            {selectedCategoryName && (
              <p className="mt-1 text-sm text-green-600">
                You selected: <strong>{selectedCategoryName}</strong>
              </p>
            )}
          </div>

          {/* Image Upload (સમાન) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image *
            </label>
            {formData.image ? (
              <div className="space-y-2">
                <img
                  src={formData.image}
                  alt="Preview"
                  className="h-32 w-32 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, image: "" }))}
                  className="text-sm text-red-600 hover:text-red-700"
                >
                  Remove Image
                </button>
              </div>
            ) : (
              <label className="block cursor-pointer">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                  <Upload className="mx-auto text-gray-400 mb-2" size={24} />
                  <p className="text-sm text-gray-600">
                    {uploading ? "Uploading..." : "Click to upload image"}
                  </p>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploading}
                  />
                </div>
              </label>
            )}
          </div>

          {/* Submit Button (સમાન) */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </>
              ) : isEdit ? (
                <>
                  <Check size={18} />
                  <span>Update Sub-Category</span>
                </>
              ) : (
                <>
                  <PlusIcon size={18} />
                  <span>Create Sub-Category</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UploadSubCategoryModel