/* eslint-disable prettier/prettier */

import { UserTypes } from "@/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  role: UserTypes;
  userData: Record<string, any> | null;
}

const initialState: UserState = {
  role: "Anonymous",
  userData: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{
        role: UserTypes;
        userData: any;
      }>,
    ) => {
      state.role = action.payload.role;
      state.userData = action.payload.userData;
    },
    logout: (state) => {
      state.role = "Anonymous";
      state.userData = null;
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
