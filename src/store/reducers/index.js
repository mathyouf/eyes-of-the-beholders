import { combineReducers } from "@reduxjs/toolkit";
import preferencesReducer from "./preferences";
import imagesReducer from "./images";
import ratingsReducer from "./ratings";
import trainingReducer from "./training";

export const rootReducer = combineReducers({
  preferences: preferencesReducer,
  images: imagesReducer,
  ratings: ratingsReducer,
  training: trainingReducer,
});
