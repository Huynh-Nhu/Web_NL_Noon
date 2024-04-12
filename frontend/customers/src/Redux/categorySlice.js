import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    allCategory: {
      categoryData: null,
    },
  },
  reducers: {
    categorySuccess: (state, action) => {
      state.allCategory.categoryData = action.payload;
    },
  },
});
export const { categorySuccess } = categorySlice.actions;

export default categorySlice.reducer;
