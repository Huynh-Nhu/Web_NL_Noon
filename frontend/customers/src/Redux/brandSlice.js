import { createSlice } from "@reduxjs/toolkit";

const BrandSlice = createSlice({
  name: "brand",
  initialState: {
    allBrand: {
      brandData: null,
    },
  },
  reducers: {
    brandSuccess: (state, action) => {
      state.allBrand.brandData = action.payload;
    },
  },
});
export const { brandSuccess } = BrandSlice.actions;

export default BrandSlice.reducer;
