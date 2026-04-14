import React, { useEffect, useState } from "react";
import {
  X,
  Upload,
  Check,
  Plus as PlusIcon,
  Image as ImageIcon,
  FolderTree,
} from "lucide-react";
import UploadImage from "../utils/Uploadimage";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";

const UploadSubCategoryModel = ({
  close,
  fetchData,
  editData,
  categoryList,
}) => {
  const isEdit = Boolean(editData);

  const [formData, setFormData] = useState({
    name: "",
    categoryId: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedCategoryName, setSelectedCategoryName] = useState("");

  // Load edit data
  useEffect(() => {
    if (editData) {
      console.log("Edit Data received:", editData);
      setFormData({
        name: editData.name || "",
        categoryId: editData.categoryId || editData.category?.[0]?._id || "",
        image: editData.image || "",
      });

      if (editData.categoryId) {
        const category = categoryList.find(
          (cat) => cat._id === editData.categoryId,
        );
        setSelectedCategoryName(category?.name || "");
      } else if (editData.category?.[0]?._id) {
        const category = categoryList.find(
          (cat) => cat._id === editData.category[0]._id,
        );
        setSelectedCategoryName(category?.name || "");
      }
    } else {
      setFormData({
        name: "",
        categoryId: "",
        image: "",
      });
      setSelectedCategoryName("");
    }
  }, [editData, categoryList]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "categoryId") {
      const category = categoryList.find((cat) => cat._id === value);
      setSelectedCategoryName(category?.name || "");
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploading(true);
      const response = await UploadImage(file);
      const imageUrl = response?.data?.url;

      if (imageUrl) {
        setFormData((prev) => ({
          ...prev,
          image: imageUrl,
        }));
        toast.success("Image uploaded successfully");
      }
    } catch (error) {
      toast.error("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form Data:", formData);
    console.log("Category List:", categoryList);

    if (!formData.name.trim()) {
      toast.error("Please enter sub-category name");
      return;
    }

    if (!formData.categoryId) {
      toast.error("Please select a category");
      return;
    }

    if (!formData.image) {
      toast.error("Please upload an image");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        name: formData.name.trim(),
        category: [formData.categoryId],
        image: formData.image,
      };

      if (isEdit) {
        payload._id = editData._id;
      }

      console.log("Sending payload:", payload);

      const response = await Axios({
        ...(isEdit
          ? SummaryApi.updateSubCategory
          : SummaryApi.createSubCategory),
        data: payload,
      });

      console.log("API Response:", response.data);

      if (response.data.success) {
        toast.success(isEdit ? "Updated successfully" : "Created successfully");
        close();
        fetchData();
      } else {
        toast.error(response.data.message || "Operation failed");
      }
    } catch (error) {
      console.error("Submit error:", {
        message: error.message,
        response: error.response?.data,
        requestPayload: payload,
      });
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4 animate-fadeIn">
      <div className="bg-white rounded-xl w-full max-w-lg shadow-2xl animate-slideUp">
        {/* Header with gradient */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-blue-50 to-white">
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              {isEdit ? "Edit Sub Category" : "Add New Sub Category"}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {isEdit
                ? "Update your sub-category details"
                : "Create a new sub-category under a parent category"}
            </p>
          </div>
          <button
            onClick={close}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <X size={22} className="text-gray-500 hover:text-gray-700" />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-6 max-h-[70vh] overflow-y-auto"
        >
          {/* Name Field */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <FolderTree size={16} />
              Sub Category Name
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Mobile Phones, Laptops, etc."
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              required
            />
          </div>

          {/* Category Select */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <FolderTree size={16} />
              Parent Category
              <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white transition-all duration-200"
                required
              >
                <option value="" className="text-gray-400">
                  Select a category
                </option>
                {categoryList.map((category) => (
                  <option
                    key={category._id}
                    value={category._id}
                    className="py-2"
                  >
                    {category.name}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>

            {selectedCategoryName && (
              <div className="mt-2 p-3 bg-green-50 border border-green-100 rounded-lg">
                <p className="text-sm text-green-700 font-medium">
                  Selected Category:{" "}
                  <span className="font-bold">{selectedCategoryName}</span>
                </p>
              </div>
            )}
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <ImageIcon size={16} />
              Category Image
              <span className="text-red-500">*</span>
            </label>

            {formData.image ? (
              <div className="space-y-3">
                <div className="relative group">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="h-48 w-full object-cover rounded-xl border-2 border-gray-200 group-hover:border-blue-300 transition-all duration-200"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      Click to change
                    </span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <label className="flex-1">
                    <div className="cursor-pointer py-2 px-4 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 text-center text-sm font-medium transition-colors duration-200">
                      Change Image
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, image: "" }))
                    }
                    className="flex-1 py-2 px-4 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 text-sm font-medium transition-colors duration-200"
                  >
                    Remove Image
                  </button>
                </div>
              </div>
            ) : (
              <label className="block cursor-pointer">
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 group">
                  <div className="flex flex-col items-center gap-3">
                    <div className="p-4 bg-blue-100 rounded-full group-hover:bg-blue-200 transition-colors duration-200">
                      {uploading ? (
                        <div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
                      ) : (
                        <Upload size={24} className="text-blue-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">
                        {uploading ? "Uploading Image..." : "Upload Image"}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Click to browse or drag & drop
                      </p>
                      <p className="text-xs text-gray-400 mt-2">
                        PNG, JPG, GIF up to 5MB
                      </p>
                    </div>
                  </div>
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

          {/* Action Buttons */}
          <div className="pt-6 flex gap-3 border-t border-gray-100">
            <button
              type="button"
              onClick={close}
              disabled={loading}
              className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 font-medium transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center justify-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg"
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
  );
};

// Add these CSS animations to your global CSS file

export default UploadSubCategoryModel;
