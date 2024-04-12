import { createSlice } from "@reduxjs/toolkit";

const customerSlice = createSlice({
  name: "customer",
  initialState: {
    getAllCustomer: {
      customer: null,
    },
  },
  reducers: {
    getAllCustomerSuccess: (state, action) => {
      state.getAllCustomer.customer = action.payload;
    },
  },
});

export const { getAllCustomerSuccess } = customerSlice.actions;

export default customerSlice.reducer;
