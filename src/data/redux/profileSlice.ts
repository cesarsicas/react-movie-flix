import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ProfileModel } from "../../domain/model/ProfileModel";

interface ProfileState {
  profile: ProfileModel | null;
}

const initialState: ProfileState = {
  profile: null,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    saveLocalProfile: (state, action: PayloadAction<ProfileModel>) => {
      state.profile = action.payload;
    },
  },
});

export const { saveLocalProfile } = profileSlice.actions;
export default profileSlice.reducer;
