/* eslint-disable prettier/prettier */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, UserTypes } from "@/types/user";

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  currentUser: User | null;
  role: UserTypes | null; 
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  currentUser: null,
  role: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signupStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signupSuccess: (
      state,
      action: PayloadAction<{ token: string; user: User; role: UserTypes }>
    ) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.currentUser = action.payload.user;
      state.role = action.payload.role;
      state.loading = false;
      state.error = null;
    },
    signupFailure: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = false;
      state.token = null;
      state.currentUser = null;
      state.role = null;
      state.loading = false;
      state.error = action.payload;
    },
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (
      state,
      action: PayloadAction<{ token: string; user: User; role: UserTypes }>
    ) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.currentUser = action.payload.user;
      state.role = action.payload.role;
      state.loading = false;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = false;
      state.token = null;
      state.currentUser = null;
      state.role = null;
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.currentUser = null;
      state.role = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  signupStart,
  signupSuccess,
  signupFailure,
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
