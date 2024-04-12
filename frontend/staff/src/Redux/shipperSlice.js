import { createSlice } from "@reduxjs/toolkit";

const shipperSlice = createSlice({
    name: 'shipper',
    initialState: {
        shipper : {
            allShipper : null,
        }
    },
    reducers: {
       shipperSuccess: (state, action) => {
            state.shipper.allShipper =action.payload
        }
    }
})

export const {
   shipperSuccess
} = shipperSlice.actions

export default shipperSlice.reducer;