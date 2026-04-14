import React, { useState } from "react";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import { Trash2, X } from "lucide-react";

const DeleteCategory = ({ data, close, fetchData }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.deleteCategory,
        data: { _id: data._id },
      });

      if (response.data.success) {
        toast.success("Category deleted successfully");
        fetchData();
        close();
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-white w-full max-w-md rounded-xl p-6 relative">
        <button onClick={close} className="absolute top-4 right-4">
          <X />
        </button>

        <div className="text-center">
          <div className="mx-auto w-14 h-14 flex items-center justify-center rounded-full bg-red-100 mb-4">
            <Trash2 className="text-red-600" />
          </div>

          <h2 className="text-lg font-semibold text-gray-800">
            Delete Category
          </h2>

          <p className="text-sm text-gray-500 mt-2">
            Are you sure you want to delete
            <span className="font-semibold text-gray-800"> “{data.name}”</span>?
            <br />
            This action cannot be undone.
          </p>

          <div className="flex gap-3 mt-6">
            <button
              onClick={close}
              className="flex-1 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              onClick={handleDelete}
              disabled={loading}
              className="flex-1 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
            >
              {loading ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeleteCategory;
