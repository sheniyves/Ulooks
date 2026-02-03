import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDetailsSubmitted: false,
};

const fundsSlice = createSlice({
  name: "addsFunds",
  initialState,
  reducers: {
    isCardDetailsSubmitted: (state, action) => {
      state.isDetailsSubmitted = action.payload;
    },
    isTransferDetailsSubmitted: (state, action) => {
      state.isDetailsSubmitted = action.payload;
    },
  },
});

export const { isCardDetailsSubmitted, isTransferDetailsSubmitted } = fundsSlice.actions;
export default fundsSlice.reducer;
