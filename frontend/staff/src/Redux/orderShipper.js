import { createSlice } from "@reduxjs/toolkit";

const OrderShipperSlice = createSlice({
  name: "orderShipper",
  initialState: {
    orderShipper: {
      allOrderShipper: null,
    },
  },
  reducers: {
    orderShipperSuccess: (state, action) => {
      state.orderShipper.allOrderShipper = action.payload;
    },
    updateOrderSuccess: (state, action) => {
        const id = action.payload?._id;
        const orderUpdate = action?.payload;
      state.orderShipper.allOrderShipper =
        state.orderShipper.allOrderShipper.forEach(order => {
            if(order._id === id) {
                order.status = orderUpdate.status;
            }
        });
    },
  },
});

export const { orderShipperSuccess, updateOrderSuccess } =
  OrderShipperSlice.actions;

export default OrderShipperSlice.reducer;
