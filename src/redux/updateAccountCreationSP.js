import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  serviceProviderCreateAccount: {
    step1: {},
    step2: {},
    step3: {},
  },
};

const spCreateAccountData = createSlice({
  initialState,
  name: "spCreateAccountData",
  reducers: {
    updateForm: (state, action) => {
      const { stepKey, data } = action.payload;
      state.serviceProviderCreateAccount[stepKey] = data;
    },
  },
});

export const { updateForm } = spCreateAccountData.actions;
export default spCreateAccountData.reducer;
