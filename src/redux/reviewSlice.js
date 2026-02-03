import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reviewForm: {},
  review: [],
};

const reviewSlice = createSlice({
  name: "reviewSlice",
  initialState,
  reducers: {
    addReviewForm: (state, action) => {
      state.reviewForm = action.payload;
    },
    addReview: (state, action) => {
      state.review = action.payload;
    },
  },
});

export const { addReview, addReviewForm } = reviewSlice.actions
export default reviewSlice.reducer
