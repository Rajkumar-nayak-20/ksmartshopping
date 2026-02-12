import React, { useState } from 'react'
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../utils/UploadImage';
import Loading from '../components/Loading';
import ViewImage from '../components/ViewImage';
import { MdDelete } from "react-icons/md";
import { useSelector } from 'react-redux'
import { IoClose } from "react-icons/io5";
import AddFieldComponent from '../components/AddFieldComponent';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import successAlert from '../utils/SuccessAlert';
import { useEffect } from 'react';

const EditProductAdmin = ({ close ,data : propsData,fetchProductData}) => {
  const [data, setData] = useState({
    _id : propsData._id,
    name: propsData.name,
    image: propsData.image,
    category: propsData.category,
    subCategory: propsData.subCategory,
    unit: propsData.unit,
    stock: propsData.stock,
    price: propsData.price,
    discount: propsData.discount,
    description: propsData.description,
    more_details: propsData.more_details || {},
  })
  const [imageLoading, setImageLoading] = useState(false)
  const [ViewImageURL, setViewImageURL] = useState("")
  const allCategory = useSelector(state => state.product.allCategory)
  const [selectCategory, setSelectCategory] = useState("")
  const [selectSubCategory, setSelectSubCategory] = useState("")
  const allSubCategory = useSelector(state => state.product.allSubCategory)

  const [openAddField, setOpenAddField] = useState(false)
  const [fieldName, setFieldName] = useState("")


  const handleChange = (e) => {
    const { name, value } = e.target

    setData((preve) => {
      return {
        ...preve,
        [name]: value
      }
    })
  }

  const handleUploadImage = async (e) => {
    const file = e.target.files[0]

    if (!file) {
      return
    }
    setImageLoading(true)
    const response = await uploadImage(file)
    const { data: ImageResponse } = response
    const imageUrl = ImageResponse.data.url

    setData((preve) => {
      return {
        ...preve,
        image: [...preve.image, imageUrl]
      }
    })
    setImageLoading(false)

  }

  const handleDeleteImage = async (index) => {
    data.image.splice(index, 1)
    setData((preve) => {
      return {
        ...preve
      }
    })
  }

  const handleRemoveCategory = async (index) => {
    data.category.splice(index, 1)
    setData((preve) => {
      return {
        ...preve
      }
    })
  }
  const handleRemoveSubCategory = async (index) => {
    data.subCategory.splice(index, 1)
    setData((preve) => {
      return {
        ...preve
      }
    })
  }

  const handleAddField = () => {
    setData((preve) => {
      return {
        ...preve,
        more_details: {
          ...preve.more_details,
          [fieldName]: ""
        }
      }
    })
    setFieldName("")
    setOpenAddField(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("data", data)

    try {
      const response = await Axios({
        ...SummaryApi.updateProductDetails,
        data: data
      })
      const { data: responseData } = response

      if (responseData.success) {
        successAlert(responseData.message)
        if(close){
          close()
        }
        fetchProductData()
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
    }


  }

return (
  <section className='fixed inset-0 bg-black/60 backdrop-blur-sm z-50 p-4 flex justify-center items-center'>
    <div className='bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden max-h-[95vh] flex flex-col'>

      {/* Header */}
      <div className='flex items-center justify-between px-6 py-4 border-b bg-gradient-to-r from-primary-50 to-blue-50'>
        <h2 className='text-xl font-bold text-slate-800'>Edit Product</h2>
        <button
          onClick={close}
          className='p-2 rounded-full hover:bg-red-100 text-slate-600 hover:text-red-500 transition'
        >
          <IoClose size={22} />
        </button>
      </div>

      {/* Form Body */}
      <div className='overflow-y-auto p-6'>
        <form className='grid gap-6' onSubmit={handleSubmit}>

          {/* Name */}
          <div className='grid gap-2'>
            <label className='text-sm font-semibold text-slate-700'>Product Name</label>
            <input
              name='name'
              value={data.name}
              onChange={handleChange}
              className='border rounded-xl px-4 py-2 focus:ring-2 focus:ring-primary-200 outline-none'
            />
          </div>

          {/* Description */}
          <div className='grid gap-2'>
            <label className='text-sm font-semibold text-slate-700'>Description</label>
            <textarea
              name='description'
              rows={3}
              value={data.description}
              onChange={handleChange}
              className='border rounded-xl px-4 py-2 focus:ring-2 focus:ring-primary-200 outline-none resize-none'
            />
          </div>

          {/* Image Upload */}
          <div>
            <p className='font-semibold text-slate-700 mb-2'>Product Images</p>

            <label className='h-28 border-2 border-dashed rounded-xl flex items-center justify-center cursor-pointer hover:bg-blue-50 transition'>
              {imageLoading ? (
                <Loading />
              ) : (
                <div className='flex flex-col items-center text-slate-500'>
                  <FaCloudUploadAlt size={32} />
                  <span className='text-sm mt-2'>Upload Image</span>
                </div>
              )}
              <input
                type='file'
                hidden
                accept='image/*'
                onChange={handleUploadImage}
              />
            </label>

            {/* Image Preview */}
            <div className='flex flex-wrap gap-4 mt-4'>
              {data.image.map((img, index) => (
                <div key={img + index} className='relative group w-24 h-24 bg-slate-50 rounded-xl border overflow-hidden'>
                  <img
                    src={img}
                    alt='product'
                    className='w-full h-full object-contain cursor-pointer'
                    onClick={() => setViewImageURL(img)}
                  />
                  <button
                    type='button'
                    onClick={() => handleDeleteImage(index)}
                    className='absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition'
                  >
                    <MdDelete size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Category */}
          <div>
            <label className='font-semibold text-slate-700'>Category</label>
            <select
              value={selectCategory}
              onChange={(e) => {
                const value = e.target.value
                const category = allCategory.find(el => el._id === value)

                setData(prev => ({
                  ...prev,
                  category: [...prev.category, category]
                }))

                setSelectCategory("")
              }}
              className='w-full border rounded-xl px-4 py-2 mt-2 focus:ring-2 focus:ring-primary-200'
            >
              <option value="">Select Category</option>
              {allCategory.map(c => (
                <option key={c._id} value={c._id}>{c.name}</option>
              ))}
            </select>

            <div className='flex flex-wrap gap-2 mt-3'>
              {data.category.map((c, index) => (
                <div key={c._id + index} className='bg-blue-100 text-blue-700 px-3 py-1 rounded-full flex items-center gap-2 text-sm'>
                  {c.name}
                  <IoClose
                    size={16}
                    className='cursor-pointer hover:text-red-500'
                    onClick={() => handleRemoveCategory(index)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* SubCategory */}
          <div>
            <label className='font-semibold text-slate-700'>Sub Category</label>
            <select
              value={selectSubCategory}
              onChange={(e) => {
                const value = e.target.value
                const subCategory = allSubCategory.find(el => el._id === value)

                setData(prev => ({
                  ...prev,
                  subCategory: [...prev.subCategory, subCategory]
                }))

                setSelectSubCategory("")
              }}
              className='w-full border rounded-xl px-4 py-2 mt-2 focus:ring-2 focus:ring-primary-200'
            >
              <option value="">Select Sub Category</option>
              {allSubCategory.map(c => (
                <option key={c._id} value={c._id}>{c.name}</option>
              ))}
            </select>

            <div className='flex flex-wrap gap-2 mt-3'>
              {data.subCategory.map((c, index) => (
                <div key={c._id + index} className='bg-green-100 text-green-700 px-3 py-1 rounded-full flex items-center gap-2 text-sm'>
                  {c.name}
                  <IoClose
                    size={16}
                    className='cursor-pointer hover:text-red-500'
                    onClick={() => handleRemoveSubCategory(index)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Price / Stock / Discount Grid */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <input name='price' value={data.price} onChange={handleChange}
              placeholder='Price'
              className='border rounded-xl px-4 py-2 focus:ring-2 focus:ring-primary-200' />

            <input name='stock' value={data.stock} onChange={handleChange}
              placeholder='Stock'
              className='border rounded-xl px-4 py-2 focus:ring-2 focus:ring-primary-200' />

            <input name='discount' value={data.discount} onChange={handleChange}
              placeholder='Discount'
              className='border rounded-xl px-4 py-2 focus:ring-2 focus:ring-primary-200' />
          </div>

          {/* Submit */}
          <button className='mt-4 bg-gradient-to-r from-primary-500 to-primary-600 text-orange-500 py-3 rounded-xl font-semibold shadow hover:scale-[1.02] transition'>
            Update Product
          </button>

        </form>
      </div>

    </div>
  </section>
)
}
export default EditProductAdmin


