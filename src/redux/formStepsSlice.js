import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  personalizeAccountSP: 1,
  personalizeAccountC: 1,
  createAccountSp: 1,
  KYC: 1,
};

export const formStepsSlice = createSlice({
  name: "formSteps",
  initialState,
  reducers: {
    updateStep: (state, action) => {
      const {formKey, step} = action.payload
      state[formKey] = step;
    },  
  },
});

export const { updateStep } = formStepsSlice.actions;
export default formStepsSlice.reducer;
