import { createSlice } from "@reduxjs/toolkit";

const OrderSlice = createSlice({
  name: "order",
  initialState: {
    allOrder: {
      OrderData: null,
    },
  },
  reducers: {
    getOrderSuccess: (state, action) => {
      state.allOrder.OrderData = action.payload;
    },
  },
});
export const { getOrderSuccess } = OrderSlice.actions;

export default OrderSlice.reducer;
