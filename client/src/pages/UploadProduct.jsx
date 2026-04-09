import React, { useState, useEffect } from "react"
import { FaCloudUploadAlt, FaSpinner, FaPlus } from "react-icons/fa"
import { MdDelete, MdOutlineAddCircleOutline } from "react-icons/md"
import { IoClose } from "react-icons/io5"
import { useSelector, useDispatch } from "react-redux"
import { motion, AnimatePresence } from "framer-motion"

import uploadImage from "../utils/Uploadimage"
import ViewImage from "../components/viewimage"
import AddFieldComponent from "../components/AddFieldComponent"
import Axios from "../utils/Axios"
import SummaryApi from "../common/SummaryApi"
import AxiosToastError from "../utils/AxiosToastError"
import successAlert from "../utils/SuccessAlert"

import { fetchCategory, fetchSubCategory } from "../store/productAction"

const UploadProduct = () => {
  const dispatch = useDispatch()

  const allCategory = useSelector((state) => state.product?.allCategory || [])
  const allSubCategory = useSelector((state) => state.product?.allSubCategory || [])

  const [data, setData] = useState({
    name: "",
    image: [],
    category: [],
    subCategory: [],
    unit: "",
    stock: "",
    price: "",
    discount: "",
    description: "",
    more_details: {},
  })

  const [selectCategory, setSelectCategory] = useState("")
  const [selectSubCategory, setSelectSubCategory] = useState("")
  const [ViewImageURL, setViewImageURL] = useState("")
  const [openAddField, setOpenAddField] = useState(false)
  const [fieldName, setFieldName] = useState("")
  const [uploadingImage, setUploadingImage] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchCategory(dispatch)
    fetchSubCategory(dispatch)
  }, [dispatch])

  const handleChange = (e) => {
    const { name, value } = e.target
    setData((prev) => ({ ...prev, [name]: value }))
  }

  // const handleUploadImage = async (e) => {
  //   const file = e.target.files[0]
  //   if (!file) return

  //   setUploadingImage(true)
  //   try {
  //     const response = await uploadImage(file)
  //     const imageUrl = response?.data?.url || response?.data?.data?.url
  //     if (imageUrl) {
  //       setData((prev) => ({ ...prev, image: [...prev.image, imageUrl] }))
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   } finally {
  //     setUploadingImage(false)
  //     e.target.value = null
  //   }
  // }
  const handleUploadImage = async (e) => {
  const files = Array.from(e.target.files); // 🔥 multiple files
  if (!files.length) return;

  setUploadingImage(true);

  try {
    for (let file of files) {
      const response = await uploadImage(file); // same API

      const imageUrl =
        response?.data?.url || response?.data?.data?.url;

      if (imageUrl) {
        setData((prev) => ({
          ...prev,
          image: [...prev.image, imageUrl], // same logic
        }));
      }
    }
  } catch (error) {
    console.log(error);
  } finally {
    setUploadingImage(false);
    e.target.value = null;
  }
};

  const handleDeleteImage = (index) => {
    const newImages = [...data.image]
    newImages.splice(index, 1)
    setData({ ...data, image: newImages })
  }

  const handleCategorySelect = (value) => {
    if (!value || data.category.includes(value)) return
    setData((prev) => ({ ...prev, category: [...prev.category, value] }))
    setSelectCategory("")
  }

  const handleSubCategorySelect = (value) => {
    if (!value || data.subCategory.includes(value)) return
    setData((prev) => ({ ...prev, subCategory: [...prev.subCategory, value] }))
    setSelectSubCategory("")
  }

  const handleRemoveCategory = (index) => {
    const updated = [...data.category]
    updated.splice(index, 1)
    setData({ ...data, category: updated })
  }

  const handleRemoveSubCategory = (index) => {
    const updated = [...data.subCategory]
    updated.splice(index, 1)
    setData({ ...data, subCategory: updated })
  }

  const handleAddField = () => {
    if (!fieldName.trim()) return
    setData((prev) => ({
      ...prev,
      more_details: { ...prev.more_details, [fieldName]: "" },
    }))
    setFieldName("")
    setOpenAddField(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (data.image.length === 0) {
      AxiosToastError({ message: "Please upload at least one image" })
      return
    }

    setSubmitting(true)
    try {
      const response = await Axios({ ...SummaryApi.createProduct, data })
      if (response.data.success) {
        successAlert(response.data.message)
        setData({
          name: "",
          image: [],
          category: [],
          subCategory: [],
          unit: "",
          stock: "",
          price: "",
          discount: "",
          description: "",
          more_details: {},
        })
      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 min-h-screen p-3">
      {/* Header - Ultra Compact */}
      <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 p-3 mb-3 sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
            <FaPlus className="text-white text-sm" />
          </div>
          <h1 className="text-base font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            New Product
          </h1>
        </div>
      </div>

      {/* Main Form - Compact */}
      <div className="max-w-2xl mx-auto">
        <motion.form
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="space-y-3"
        >
          {/* Basic Info - Minimal */}
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="space-y-3">
              <input
                type="text"
                name="name"
                placeholder="Product name *"
                value={data.name}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <textarea
                name="description"
                placeholder="Short description *"
                value={data.description}
                onChange={handleChange}
                rows={2}
                className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 resize-none"
                required
              />
            </div>
          </div>

          {/* Images - Compact Grid */}
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 bg-green-100 rounded-lg">
                <FaCloudUploadAlt className="text-green-600 text-sm" />
              </div>
              <span className="text-xs font-medium text-gray-700">Product Images</span>
            </div>

            <div className="flex gap-2 flex-wrap">
              {/* Upload Button */}
              <label className="relative w-16 h-16 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition-colors">
                {uploadingImage ? (
                  <FaSpinner className="text-blue-500 text-lg animate-spin" />
                ) : (
                  <>
                    <FaCloudUploadAlt className="text-gray-400 text-lg" />
                    <span className="text-[10px] text-gray-500 mt-0.5">Upload</span>
                  </>
                )}
                <input
                  type="file"
                  multiple
                  hidden
                  accept="image/*"
                  onChange={handleUploadImage}
                  disabled={uploadingImage}
                />
              </label>

              {/* Image Previews */}
              <AnimatePresence>
                {data.image.map((img, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="relative w-16 h-16 group"
                  >
                    <img
                      src={img}
                      alt=""
                      className="w-full h-full object-cover rounded-lg cursor-pointer border border-gray-200"
                      onClick={() => setViewImageURL(img)}
                    />
                    <button
                      type="button"
                      onClick={() => handleDeleteImage(index)}
                      className="absolute -top-1 -right-1 bg-red-500 text-white p-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <IoClose size={14} />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Categories - Side by Side */}
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="grid grid-cols-2 gap-2">
              {/* Category */}
              <div>
                <select
                  value={selectCategory}
                  onChange={(e) => handleCategorySelect(e.target.value)}
                  className="w-full px-2 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500"
                >
                  <option value="" disabled>Category</option>
                  {allCategory.map((c) => (
                    <option key={c._id} value={c._id}>{c.name}</option>
                  ))}
                </select>
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {data.category.map((id, index) => {
                    const cat = allCategory.find(c => c._id === id)
                    return (
                      <span key={index} className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-blue-50 text-blue-700 rounded text-[10px]">
                        {cat?.name}
                        <IoClose size={12} onClick={() => handleRemoveCategory(index)} className="cursor-pointer" />
                      </span>
                    )
                  })}
                </div>
              </div>

              {/* SubCategory */}
              <div>
                <select
                  value={selectSubCategory}
                  onChange={(e) => handleSubCategorySelect(e.target.value)}
                  className="w-full px-2 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500"
                >
                  <option value="" disabled>SubCategory</option>
                  {allSubCategory.map((c) => (
                    <option key={c._id} value={c._id}>{c.name}</option>
                  ))}
                </select>
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {data.subCategory.map((id, index) => {
                    const sub = allSubCategory.find(s => s._id === id)
                    return (
                      <span key={index} className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-green-50 text-green-700 rounded text-[10px]">
                        {sub?.name}
                        <IoClose size={12} onClick={() => handleRemoveSubCategory(index)} className="cursor-pointer" />
                      </span>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Pricing & Stock - Compact Grid */}
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="grid grid-cols-4 gap-2">
              <div className="grid gap-1">
 

 <input
  list="unit-options"
  name="unit"
  value={data.unit}
  onChange={handleChange}
  placeholder="Select or type unit"
  required
  className="w-full px-2 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500"
/>

<datalist id="unit-options">
  <option value="kg" />
  <option value="g" />
  <option value="L" />
  <option value="ml" />
  <option value="pcs" />
  <option value="pack" />
  <option value="box" />
  <option value="bottle" />
  <option value="dozen" />
</datalist>

</div>

              <div>
                <input
                  type="number"
                  placeholder="Stock"
                  name="stock"
                  value={data.stock}
                  onChange={handleChange}
                  className="w-full px-2 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <input
                  type="number"
                  placeholder="Price"
                  name="price"
                  value={data.price}
                  onChange={handleChange}
                  className="w-full px-2 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <input
                  type="number"
                  placeholder="Discount %"
                  name="discount"
                  value={data.discount}
                  onChange={handleChange}
                  className="w-full px-2 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Additional Fields - Minimal */}
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="space-y-2">
              <AnimatePresence>
                {Object.entries(data.more_details).map(([key, value]) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="flex gap-1.5"
                  >
                    <input
                      type="text"
                      placeholder={key.replace(/_/g, ' ')}
                      value={value}
                      onChange={(e) => setData(prev => ({
                        ...prev,
                        more_details: { ...prev.more_details, [key]: e.target.value }
                      }))}
                      className="flex-1 px-2 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const { [key]: _, ...rest } = data.more_details
                        setData(prev => ({ ...prev, more_details: rest }))
                      }}
                      className="px-2 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
                    >
                      <MdDelete size={14} />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>

              <button
                type="button"
                onClick={() => setOpenAddField(true)}
                className="w-full py-2 px-3 border border-dashed border-gray-300 rounded-lg text-xs text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors flex items-center justify-center gap-1"
              >
                <MdOutlineAddCircleOutline size={14} />
                Add Field
              </button>
            </div>
          </div>

          {/* Submit Button - Compact */}
          <motion.button
            type="submit"
            disabled={submitting}
            whileTap={{ scale: 0.98 }}
            className={`w-full py-2.5 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-lg shadow-sm hover:shadow transition-all flex items-center justify-center gap-1.5 ${
              submitting ? "opacity-75 cursor-not-allowed" : ""
            }`}
          >
            {submitting ? (
              <>
                <FaSpinner className="animate-spin" size={14} />
                Creating...
              </>
            ) : (
              <>
                <FaPlus size={14} />
                Create Product
              </>
            )}
          </motion.button>
        </motion.form>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {ViewImageURL && (
          <ViewImage url={ViewImageURL} close={() => setViewImageURL("")} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {openAddField && (
          <AddFieldComponent
            value={fieldName}
            onChange={(e) => setFieldName(e.target.value)}
            submit={handleAddField}
            close={() => {
              setOpenAddField(false)
              setFieldName("")
            }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default UploadProduct