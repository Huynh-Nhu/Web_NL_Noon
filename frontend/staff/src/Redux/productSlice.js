import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: 'products',
    initialState: {
        getAllProducts: {
            allProduct: null,
            isFetching: false,
            error: false,
        }
    },
    reducers: {
        getAllProductStart: (state) => {
            state.getAllProducts.isFetching = true
        },
        getAllProductSuccess: (state,action) => { 
            state.getAllProducts.isFetching= false;
            state.getAllProducts.allProduct = action.payload
        },
        getAllProductFailed: (state )=> {
            state.getAllProducts.error = true;
        },
    
    }
})

export const {
    getAllProductStart,
    getAllProductSuccess,
    getAllProductFailed,
} = productSlice.actions

export default productSlice.reducer;