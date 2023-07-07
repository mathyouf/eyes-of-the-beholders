// ratings.js
import { createSlice } from "@reduxjs/toolkit";

const ratingsSlice = createSlice({
  name: "ratings",
  initialState: {},
  reducers: {
    setRating: (state, action) => {
      state[action.payload.imageId] = action.payload.rating;
    },
  },
});

export const { setRating } = ratingsSlice.actions;

export default ratingsSlice.reducer;
