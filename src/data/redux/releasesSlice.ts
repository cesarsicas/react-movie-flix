import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type MovieModel from "../../model/MovieModel";

interface ReleasesState {
  movies: MovieModel[];
}

const initialState: ReleasesState = {
  movies: [],
};

export const releasesSlice = createSlice({
  name: "releases",
  initialState,
  reducers: {
    saveLocalReleases: (state, action: PayloadAction<MovieModel[]>) => {
      state.movies = action.payload;
    },

    clearLocalReleases: (state) => {
      state.movies = [];
    },
  },
});

export const { saveLocalReleases, clearLocalReleases } = releasesSlice.actions;
export default releasesSlice.reducer;
