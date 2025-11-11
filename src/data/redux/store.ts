import { configureStore } from "@reduxjs/toolkit";
import { releasesSlice } from "./releasesSlice";
import { profileSlice } from "./profileSlice";

export const store = configureStore({
  reducer: {
    releases: releasesSlice.reducer,
    profile: profileSlice.reducer,
  },
});
