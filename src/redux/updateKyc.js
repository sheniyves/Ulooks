import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customerKycForm: {
    step1: {},
    step2: {},
  },
  serviceProviderKycForm: {
    step1: {},
    step2: {},
  },
};

const kycData = createSlice({
  initialState,
  name: "kycForm",
  reducers: {
    updateForm: (state, action) => {
      const { stepKey, data } = action.payload;
      state.customerKycForm[stepKey] = data;
    },
    updateSPForm: (state, action) => {
      const { stepKey, data } = action.payload;
      state.serviceProviderKycForm[stepKey] = data;
    },
  },
});

export const { updateForm, updateSPForm } = kycData.actions;
export default kycData.reducer;
