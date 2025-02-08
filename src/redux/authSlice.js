import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("authorization")) || null,
  loggedUser: JSON.parse(localStorage.getItem("loggedUserData")) || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("authorization", JSON.stringify(action.payload));
    },
    setLoggedInUser: (state, action) => {
      state.loggedUser = action.payload;
      localStorage.setItem("loggedUserData", JSON.stringify(action.payload));
    },
    logout: (state, action) => {
      state.user = null;
      localStorage.removeItem("authorization");
      localStorage.removeItem("loggedUserData");
    },
  },
});

export const { loginSuccess, logout, setLoggedInUser } = authSlice.actions;
export default authSlice.reducer;
