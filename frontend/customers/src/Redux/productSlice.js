import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    allProduct: {
      productData: null,
    },
  },
  reducers: {
    getProductSuccess: (state, action) => {
      state.allProduct.productData = action.payload;
    },
  },
});
export const { getProductSuccess } = productSlice.actions;

export default productSlice.reducer;
