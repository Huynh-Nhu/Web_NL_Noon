import { createSlice } from "@reduxjs/toolkit";

const DetailSlice = createSlice({
  name: "detail",
  initialState: {
    allDetail: {
      detailData: null,
    },
  },
  reducers: {
    getDetailSuccess: (state, action) => {
      state.allDetail.detailData = action.payload;
    },
  },
});
export const { getDetailSuccess } = DetailSlice.actions;

export default DetailSlice.reducer;
