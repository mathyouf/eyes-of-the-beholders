// reducers/preferences.js
import { createSlice } from "@reduxjs/toolkit";

const preferencesSlice = createSlice({
  name: "preferences",
  initialState: {}, // Initial state is an empty object
  reducers: {
    setPreferences: (state, action) => {
      const { name, values } = action.payload;
      state[name] = values;
    },
  },
});

export const { setPreferences } = preferencesSlice.actions;

export default preferencesSlice.reducer;
