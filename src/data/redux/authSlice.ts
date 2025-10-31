import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type UserModel from "../../model/UserModel";

interface UserState {
  name: string;
  email: string;
}

const initialState: UserState = {
  name: "",
  email: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveLocalUser: (state, action: PayloadAction<UserModel>) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
    },

    clearLocalUser: (state) => {
      state.name = "";
      state.email = "";
    },
  },
});

export const { saveLocalUser, clearLocalUser } = userSlice.actions;
export default userSlice.reducer;
