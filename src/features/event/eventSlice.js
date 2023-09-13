import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  events: [],
  activeEvent: {},
};

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    setEvents(state, action) {
      state.events = action.payload;
    },
    setActiveEvent(state, action) {
      state.activeEvent = action.payload;
    },
  },
});

export const { setEvents, setActiveEvent } = eventSlice.actions;

export default eventSlice.reducer;
