import { configureStore } from "@reduxjs/toolkit";
import formStepsSlice from "../redux/formStepsSlice";
import bookingsSlice from "../redux/bookingsSlice";
import reviewSlice from "../redux/reviewSlice"
import fundsSlice from "../redux/addFundsSlice"
import newBookingSlice from "../redux/newBookingSlice"
import personalizationFormData from "../redux/updatePersonalizationForm"
import kycData from "../redux/updateKyc"
import serviceProviderAccountCreation from "../redux/updateAccountCreationSP"
import { loadState, saveState } from "../Utils/localStorage";

const presistedState = loadState();

export const store = configureStore({
  reducer: {
    formStep: formStepsSlice,
    bookings: bookingsSlice,
    fundsSlice,
    reviewSlice,
    personalizationFormData,
    kycData,
    serviceProviderAccountCreation,
    newBookings: newBookingSlice,
  },
  preloadedState: presistedState || undefined,
});

store.subscribe(() => {
   saveState({ bookings: store.getState().bookings });
});
