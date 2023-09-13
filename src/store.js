import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import eventReducer from "./features/event/eventSlice";
import modalReducer from "./features/modal/modalSlice";
import { transactionSliceReducer } from "./features/paymentForms/paymentSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    event: eventReducer,
    modal: modalReducer,
    transaction: transactionSliceReducer,
  },
});
