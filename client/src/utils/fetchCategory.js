// src/utils/fetchCategory.js
import Axios from './Axios';
import SummaryApi from '../common/SummaryApi';

export const fetchCategory = async (dispatch, setLoadingCategory, setAllCategory) => {
  try {
    dispatch(setLoadingCategory(true));
    const response = await Axios(SummaryApi.getAllCategory);
    dispatch(setAllCategory(response.data.data));
  } catch (error) {
    console.error('Error fetching categories:', error);
  } finally {
    dispatch(setLoadingCategory(false));
  }
};

export const fetchSubCategory = async (dispatch, setLoadingCategory, setAllSubCategory) => {
  try {
    dispatch(setLoadingCategory(true));
    const response = await Axios(SummaryApi.getAllSubCategory);
    dispatch(setAllSubCategory(response.data.data));
  } catch (error) {
    console.error('Error fetching subcategories:', error);
  } finally {
    dispatch(setLoadingCategory(false));
  }
};