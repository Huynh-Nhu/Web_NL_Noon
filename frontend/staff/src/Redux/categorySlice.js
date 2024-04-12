import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "Category",
  initialState: {
    getAllCategory: {
      allCate: null,
      isFetching: false,
      error: false,
    },
    
  },
  reducers: {
    getAllCateStart: (state) => {
      state.getAllCategory.isFetching = true;
    },
    getAllCateSuccess: (state, action) => {
      state.getAllCategory.allCate = action.payload;
      state.getAllCategory.isFetching = false;
    },
    getAllCateFailed: (state) => {
      state.getAllCategory.isFetching = false;
      state.getAllCategory.error = true;
    },
    // addCategorySuccess: (state, action) => {
    //   state.getAllCategory.allCate.push(action.payload);
    // }
  },
});
export const { getAllCateStart, getAllCateSuccess, getAllCateFailed ,addCategorySuccess} =
  categorySlice.actions;

export default categorySlice.reducer;
