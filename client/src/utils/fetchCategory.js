import Axios from "./Axios";
import SummaryApi from "../common/SummaryApi";

export const fetchCategory = async (
  dispatch,
  setLoadingCategory,
  setAllCategory
) => {
  try {
    dispatch(setLoadingCategory(true));
    const response = await Axios(SummaryApi.getCategory);

    if (response.data.success) {
      dispatch(setAllCategory(response.data.data));
    }
  } catch (error) {
    console.error("Category fetch error:", error);
  } finally {
    dispatch(setLoadingCategory(false));
  }
};

export const fetchSubCategory = async (
  dispatch,
  setLoadingCategory,
  setAllSubCategory
) => {
  try {
    dispatch(setLoadingCategory(true));
    const response = await Axios(SummaryApi.getSubCategory);

    if (response.data.success) {
      dispatch(setAllSubCategory(response.data.data));
    }
  } catch (error) {
    console.error("SubCategory fetch error:", error);
  } finally {
    dispatch(setLoadingCategory(false));
  }
};
