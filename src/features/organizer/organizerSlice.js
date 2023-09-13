import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  organizer: {},
};

const organizerSlice = createSlice({
  name: "organizer",
  initialState,
  reducers: {
    setOrganizer(state, action) {
      state.organizer = action.payload;
    },
  },
});

export const { setOrganizer } = organizerSlice.actions;

export default organizerSlice.reducer;