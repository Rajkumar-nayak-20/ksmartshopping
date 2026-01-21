import Axios from "../utils/Axios"
import toast from "react-hot-toast"
import React from "react"

const DeletesubCategory = ({ data, close, api, setList }) => {

  const handleDelete = async () => {
    try {
      const response = await Axios({
        url: api.url,
        method: api.method,
        data: { _id: data._id }
      })

      if (response.data.success) {
        toast.success("Deleted successfully")

        if (setList) {
          setList(prev => prev.filter(item => item._id !== data._id))
        }

        close()
      }
    } catch {
      toast.error("Delete failed")
    }
  }

  return (
    <section className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-full max-w-sm space-y-4">
        <h3 className="text-lg font-semibold">
          Are you sure you want to delete?
        </h3>

        <div className="flex justify-end gap-3">
          <button onClick={close} className="px-4 py-2 border rounded">
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </section>
  )
}

export default DeletesubCategory
