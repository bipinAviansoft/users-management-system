import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModalOpen: (state, action) => {
      state.modalOpen = action.payload;
    },
    closeModal: (state, action) => {
      state.modalOpen = action.payload;
    },
  },
});

export const { setModalOpen, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
