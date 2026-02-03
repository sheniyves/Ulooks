import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  person: "",
  bookingsForm: {},
  date: "",
  subService: [],
  monthsSubscribed: [],
  frequencyPerMonth: "",
  timeFrame: "",
  availableTime: "",
  subscribed: false
};

const bookingsSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    addBookingForm: (state, action) => {
      state.bookingsForm = action.payload;
    },
    addPerson: (state, action) => {
      state.person = action.payload;
    },
    addDate: (state, action) => {
      state.date = action.payload;
    },
    addSubService: (state, action) => {
      state.subService = action.payload;
    },
    addAvailableTime: (state, action) => {
      state.availableTime = action.payload;
    },
    addScheduledMonths: (state, action) => {
      state.monthsSubscribed = action.payload;
    },
    addFrequencyPerMonth: (state, action) => {
      state.frequencyPerMonth = action.payload;
    },
     addTimeframe: (state, action) => {
      state.timeFrame = action.payload;
    },
     addSubscribed: (state, action) => {
      state.subscribed = action.payload;
    },
     
  },
});

export const {
  addBookingForm,
  addPerson,
  addDate,
  addSubService,
  addAvailableTime,
  addScheduledMonths,
  addFrequencyPerMonth,
  addTimeframe,
  addSubscribed
} = bookingsSlice.actions;

export default bookingsSlice.reducer;
