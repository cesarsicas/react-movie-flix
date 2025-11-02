import { configureStore } from "@reduxjs/toolkit";
import { releasesSlice } from "./releasesSlice";

export const store = configureStore({
  reducer: {
    releases: releasesSlice.reducer,
  },
});

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
