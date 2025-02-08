import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import userReducer from "./userSlice";
import modalReducer from "./modalSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    modal: modalReducer,
  },
});

export default store;
