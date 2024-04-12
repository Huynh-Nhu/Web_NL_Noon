import { createSlice } from "@reduxjs/toolkit";

const brandSlice = createSlice({
  name: "brands",
  initialState: {
    getAllBrand: {
      allBrand: null,
      isFetching: false,
      error: false,
    },
    
    
  },
  reducers: {
    getAllBrandStart: (state) => {
      state.getAllBrand.isFetching = true;
    },
    getAllBrandSuccess: (state, action) => {
      state.getAllBrand.allBrand = action.payload;
      state.getAllBrand.isFetching = false;
    },
    getAllBrandFailed: (state) => {
      state.getAllBrand.isFetching = false;
      state.getAllBrand.error = true;
    },
    addBrandSuccess: (state, action) => {
      state.getAllBrand.allBrand.push(action.payload);
    }
    
  },
});
export const {
  getAllBrandStart,
  getAllBrandSuccess,
  getAllBrandFailed,
  addBrandSuccess
  
} = brandSlice.actions;

export default brandSlice.reducer;
