import React, { useState, useEffect } from "react";
import { FaCloudUploadAlt, FaSpinner, FaPlus } from "react-icons/fa";
import { MdDelete, MdOutlineAddCircleOutline } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

import uploadImage from "../utils/UploadImage";
import ViewImage from "../components/ViewImage";
import AddFieldComponent from "../components/AddFieldComponent";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import successAlert from "../utils/SuccessAlert";
import { fetchCategory, fetchSubCategory } from "../store/productAction";

const UploadProduct = () => {
  const dispatch = useDispatch();

  const allCategory = useSelector((state) => state.product?.allCategory || []);
  const allSubCategory = useSelector(
    (state) => state.product?.allSubCategory || []
  );

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
  });

  const [selectCategory, setSelectCategory] = useState("");
  const [selectSubCategory, setSelectSubCategory] = useState("");
  const [ViewImageURL, setViewImageURL] = useState("");
  const [openAddField, setOpenAddField] = useState(false);
  const [fieldName, setFieldName] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchCategory(dispatch);
    fetchSubCategory(dispatch);
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(true);

    try {
      const response = await uploadImage(file);

      const imageUrl =
        response?.data?.data?.url ||
        response?.data?.url ||
        response?.data?.secure_url;

      if (!imageUrl) {
        AxiosToastError({ message: "Image upload failed" });
        return;
      }

      setData((prev) => ({
        ...prev,
        image: [...prev.image, imageUrl],
      }));
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setUploadingImage(false);
      e.target.value = "";
    }
  };

  const handleDeleteImage = (index) => {
    const newImages = [...data.image];
    newImages.splice(index, 1);
    setData({ ...data, image: newImages });
  };

  const handleCategorySelect = (value) => {
    if (!value || data.category.includes(value)) return;
    setData((prev) => ({
      ...prev,
      category: [...prev.category, value],
    }));
    setSelectCategory("");
  };

  const handleSubCategorySelect = (value) => {
    if (!value || data.subCategory.includes(value)) return;
    setData((prev) => ({
      ...prev,
      subCategory: [...prev.subCategory, value],
    }));
    setSelectSubCategory("");
  };

  const handleRemoveCategory = (index) => {
    const updated = [...data.category];
    updated.splice(index, 1);
    setData({ ...data, category: updated });
  };

  const handleRemoveSubCategory = (index) => {
    const updated = [...data.subCategory];
    updated.splice(index, 1);
    setData({ ...data, subCategory: updated });
  };

  const handleAddField = () => {
    if (!fieldName.trim()) return;

    setData((prev) => ({
      ...prev,
      more_details: {
        ...prev.more_details,
        [fieldName]: "",
      },
    }));

    setFieldName("");
    setOpenAddField(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.image.length === 0) {
      AxiosToastError({ message: "Please upload at least one image" });
      return;
    }

    setSubmitting(true);

    try {
      const response = await Axios({
        ...SummaryApi.createProduct,
        data,
      });

      if (response.data.success) {
        successAlert(response.data.message);

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
        });
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 min-h-screen p-4">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Create Product</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={data.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={data.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          {/* Image Upload */}
          <div>
            <label className="border-2 border-dashed p-4 flex justify-center items-center cursor-pointer rounded">
              {uploadingImage ? (
                <FaSpinner className="animate-spin" />
              ) : (
                <FaCloudUploadAlt />
              )}
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleUploadImage}
              />
            </label>

            <div className="flex gap-2 mt-2 flex-wrap">
              {data.image.map((img, index) => (
                <div key={index} className="relative w-16 h-16">
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover rounded"
                    onClick={() => setViewImageURL(img)}
                  />
                  <IoClose
                    size={14}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full cursor-pointer"
                    onClick={() => handleDeleteImage(index)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Category */}
          <select
            value={selectCategory}
            onChange={(e) => handleCategorySelect(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="">Select Category</option>
            {allCategory.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>

          {/* SubCategory */}
          <select
            value={selectSubCategory}
            onChange={(e) => handleSubCategorySelect(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="">Select SubCategory</option>
            {allSubCategory.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="unit"
            placeholder="Unit"
            value={data.unit}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={data.stock}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={data.price}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <input
            type="number"
            name="discount"
            placeholder="Discount"
            value={data.discount}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-blue-600 text-white p-2 rounded"
          >
            {submitting ? "Creating..." : "Create Product"}
          </button>
        </form>
      </div>

      {ViewImageURL && (
        <ViewImage url={ViewImageURL} close={() => setViewImageURL("")} />
      )}
    </div>
  );
};

export default UploadProduct;
