import { createSlice } from "@reduxjs/toolkit";

const transactionSlice = createSlice({
  name: "transaction",
  initialState: {
    totalPrice: 0,
  },
  reducers: {
    setTotalPrice(state, action) {
      state.totalPrice = action.payload;
    },
  },
});

export const { setTotalPrice } = transactionSlice.actions;
export const transactionSliceReducer = transactionSlice.reducer;
