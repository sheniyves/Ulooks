import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customerPersonalizationForm: {
    step1: {},
    step2: {},
  },
  serviceProviderPersonalizationForm: {
    step1: {},
    step2: {},
  },
};

const personalizationFormData = createSlice({
  initialState,
  name: "personalizationForm",
  reducers: {
    updateForm: (state, action) => {
      const { stepKey, data } = action.payload;
      state.customerPersonalizationForm[stepKey] = data;
    },
    updateSPForm: (state, action) => {
      const { stepKey, data } = action.payload;
      state.serviceProviderPersonalizationForm[stepKey] = data;
    },
  },
});

export const { updateForm, updateSPForm } = personalizationFormData.actions;
export default personalizationFormData.reducer;
