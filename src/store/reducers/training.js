// training.js
import { createSlice } from "@reduxjs/toolkit";

const trainingSlice = createSlice({
  name: "training",
  initialState: { isTraining: false },
  reducers: {
    startTraining: (state) => {
      state.isTraining = true;
    },
    stopTraining: (state) => {
      state.isTraining = false;
    },
  },
});

export const { startTraining, stopTraining } = trainingSlice.actions;

export default trainingSlice.reducer;
