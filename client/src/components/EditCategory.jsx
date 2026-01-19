import React, { useEffect, useState } from 'react'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'
import { X, ImagePlus } from 'lucide-react'

const EditCategory = ({ close, data, fetchData }) => {

  const [formData, setFormData] = useState({
    name: "",
    image: ""   // final uploaded image URL
  })

  const [preview, setPreview] = useState("")
  const [loading, setLoading] = useState(false)

  // ✅ Load old data when edit opens
  useEffect(() => {
    if (data) {
      setFormData({
        name: data.name || "",
        image: data.image || ""
      })
      setPreview(data.image || "")
    }
  }, [data])

  // ======================
  // IMAGE CHOOSE + UPLOAD
  // ======================
  const handleImageChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    try {
      const formDataImage = new FormData()
      formDataImage.append("image", file)

      setLoading(true)

      const response = await Axios({
        ...SummaryApi.uploadImage,
        data: formDataImage
      })

      // 🔥 IMPORTANT (adjust if backend response differs)
      const imageUrl = response.data?.data?.url

      if (imageUrl) {
        setFormData(prev => ({ ...prev, image: imageUrl }))
        setPreview(imageUrl)
      } else {
        console.log("Upload response:", response.data)
      }

    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  // ======================
  // UPDATE CATEGORY
  // ======================
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.image) {
      toast.error("Please select an image")
      return
    }

    try {
      setLoading(true)

      const response = await Axios({
        ...SummaryApi.updateCategory,
        data: {
          _id: data._id,
          name: formData.name,
          image: formData.image
        }
      })

      if (response.data.success) {
        toast.success("Category updated")
        fetchData()
        close()
      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md rounded-2xl p-6 relative space-y-5"
      >
        <button
          type="button"
          onClick={close}
          className="absolute right-4 top-4"
        >
          <X />
        </button>

        <h2 className="text-lg font-semibold">Edit Category</h2>

        {/* CATEGORY NAME */}
        <input
          type="text"
          value={formData.name}
          onChange={(e) =>
            setFormData(prev => ({ ...prev, name: e.target.value }))
          }
          placeholder="Category name"
          className="w-full border rounded-xl px-4 py-2"
          required
        />

        {/* IMAGE PICKER */}
        <label className="block cursor-pointer">
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleImageChange}
          />

          <div className="border-2 border-dashed rounded-xl p-4 text-center hover:border-amber-400 transition">
            {preview ? (
              <img
                src={preview}
                alt="preview"
                className="h-32 mx-auto object-contain"
              />
            ) : (
              <div className="flex flex-col items-center gap-2 text-gray-500">
                <ImagePlus />
                <span>Select category image</span>
              </div>
            )}
          </div>
        </label>

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-amber-500 text-white py-2 rounded-xl hover:bg-amber-600"
        >
          {loading ? "Updating..." : "Update Category"}
        </button>
      </form>
    </section>
  )
}

export default EditCategory
