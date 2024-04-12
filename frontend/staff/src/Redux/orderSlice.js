import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        getAllOrder : {
            allOrder : null,
        }
    },
    reducers: {
        getOrderSuccess: (state, action) => {
            state.getAllOrder.allOrder =action.payload
        }
    }
})

export const {
    getOrderSuccess
} = orderSlice.actions

export default orderSlice.reducer;