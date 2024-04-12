import { createSlice } from "@reduxjs/toolkit";

const cardSlice = createSlice({
  name: "card",
  initialState: {
    cardProduct: {
      cardData: null,
      message: null
    },
  },
  reducers: {
    cardSuccess: (state, action) => {
      state.cardProduct.cardData = action.payload;
    },
    deleteCartSuccess: (state, action) => {
      state.cardProduct.cardData = action.payload =null;
      state.cardProduct.message = action.payload = null;

    },
    updateCartSuccess: (state, action) => {
      state.cardProduct.message = action.payload;

    }
  },
});
export const { cardSuccess , deleteCartSuccess , updateCartSuccess} = cardSlice.actions;

export default cardSlice.reducer;
