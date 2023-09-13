import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  content: "register",
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModalIsOpen(state, action) {
      state.isOpen = action.payload;
    },
    setModalContent(state, action) {
      state.content = action.payload;
    },
  },
});

export const { setModalIsOpen, setModalContent } = modalSlice.actions;

export default modalSlice.reducer;
