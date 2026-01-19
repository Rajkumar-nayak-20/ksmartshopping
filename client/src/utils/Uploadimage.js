// import Axios from "./Axios";
// import summaryApi from "../common/SummaryApi";

// const Uploadimage = async (file) => {
//     try {
//          const formData = new FormData()
//         formData.append('image', Image)
//         const response = await Axios({
//             ...summaryApi.uploadImage,
//             data: formData 
//         })
//         return response
        
//     } catch (error) {
//         return error
//     }          

// }

// export default Uploadimage



import Axios from "./Axios"
import summaryApi from "../common/SummaryApi"

const Uploadimage = async (file) => {
  try {
    const formData = new FormData()
    formData.append("image", file) // ✅ FIXED

    const response = await Axios({
      ...summaryApi.uploadImage,
      method: "POST",              // ✅ REQUIRED
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data" // ✅ REQUIRED
      }
    })

    return response.data
  } catch (error) {
    console.error("Upload Image Error:", error)
    throw error
  }
}

export default Uploadimage
