import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allCategory: [],
  allSubCategory: [],
  loadingCategory: false,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setAllCategory: (state, action) => {
      state.allCategory = action.payload;
    },
    setAllSubCategory: (state, action) => {
      state.allSubCategory = action.payload;
    },
    setLoadingCategory: (state, action) => {
      state.loadingCategory = action.payload;
    },
  },
});

export const {
  setAllCategory,
  setAllSubCategory,
  setLoadingCategory,
} = productSlice.actions;

export default productSlice.reducer;