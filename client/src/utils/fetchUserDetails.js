// import axios from "axios"
// import summaryApi from "../common/SummaryApi"

// const fetchUserDetails = async()=>{
//     try {
//         const response = await axios({
//             ...summaryApi.userDetails
//         }

//         )


//         return response
//     } catch (error) {
//         console.log(error);
        
        
//     }
// }


// export default fetchUserDetails


import Axios from "./Axios"
import summaryApi from "../common/SummaryApi"

// const fetchUserDetails = async () => {
//   try {
//     const response = await Axios({
//       ...summaryApi.userDetails
//     })

//     return response.data   // ✅ JSON
//   } catch (error) {
//     console.log("fetch user error:", error)
//     return null
//   }
// }

// export default fetchUserDetails




const fetchUserDetails = async () => {
  try {
    const response = await Axios({
      ...summaryApi.userDetails
    })

    return response.data?.data || null   // ✅ FIX

  } catch (error) {
    console.log("fetch user error:", error)
    return null
  }
}
 export default fetchUserDetails