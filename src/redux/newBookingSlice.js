import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  step: 1,
  location: "",
  priceRange: 60,
  date: {},
  individual: "",
  serviceLocation: "",
  uploadedImage: null,
};

const newBookingSlice = createSlice({
  name: "newBookingSlice",
  initialState,
  reducers: {
    setStep: (state, action) => {
      state.step = action.payload;
    },
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    setPriceRange: (state, action) => {
      state.priceRange = action.payload;
    },
    setDate: (state, action) => {
      state.date = action.payload;
    },
    setIndividual: (state, action) => {
      state.individual = action.payload;
    },
    setServiceLocation: (state, action) => {
      state.serviceLocation = action.payload;
    },
    setUploadedImage: (state, action) => {
      state.uploadedImage = action.payload;
    },
  },
});

export const {
  setDate,
  setLocation,
  setPriceRange,
  setStep,
  setIndividual,
  setServiceLocation,
  setUploadedImage,
} = newBookingSlice.actions;

export default newBookingSlice.reducer;
