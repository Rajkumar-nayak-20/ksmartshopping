import Axios from "../utils/Axios"
import SummaryApi from "../common/SummaryApi"
import {
  setAllCategory,
  setAllSubCategory,
  setLoadingCategory
} from "./productSlice"


// ================= FETCH CATEGORY =================
export const fetchCategory = async (dispatch) => {
  try {
    dispatch(setLoadingCategory(true))

    const response = await Axios({
      ...SummaryApi.getCategory    })

    console.log("Category API Response:", response.data)

    if (response.data?.success) {
      dispatch(setAllCategory(response.data.data))
    }

  } catch (error) {
    console.error("Category Fetch Error:", error)
  } finally {
    dispatch(setLoadingCategory(false))
  }
}


// ================= FETCH SUB CATEGORY =================
export const fetchSubCategory = async (dispatch) => {
  try {
    dispatch(setLoadingCategory(true))

    const response = await Axios({
      ...SummaryApi.getSubCategory
    })

    console.log("SubCategory API Response:", response.data)

    if (response.data?.success) {
      dispatch(setAllSubCategory(response.data.data))
    }

  } catch (error) {
    console.error("SubCategory Fetch Error:", error)
  } finally {
    dispatch(setLoadingCategory(false))
  }
}
