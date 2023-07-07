// images.js
import { createSlice } from "@reduxjs/toolkit";

const imagesSlice = createSlice({
  name: "images",
  initialState: { imageSet: [] },
  reducers: {
    setImageSet: (state, action) => {
      state.imageSet = action.payload;
    },
  },
});

export const { setImageSet } = imagesSlice.actions;

export default imagesSlice.reducer;
