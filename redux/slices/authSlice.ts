import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, UserTypes } from "@/types/user";

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  currentUser: UserTypes | null;
  role: UserTypes | null;
  loading: boolean;
  error: string | null;
  subscriptions: SubscriptionsState;
}

export interface SubscriptionsState {
  companies: string[];
  locations: string[];
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  currentUser: null,
  role: null,
  loading: false,
  error: null,
  subscriptions: { companies: [], locations: [] },
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
      action: PayloadAction<{
        token: string;
        user: UserTypes;
        role: UserTypes;
      }>,
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
      action: PayloadAction<{
        token: string;
        user: UserTypes;
        role: UserTypes;
      }>,
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
    updateAuthUser: (state, action: PayloadAction<UserTypes>) => {
      console.log("auth slice", action.payload);
      if (state.currentUser?.id === action.payload?.id)
        state.currentUser = action.payload;
    },
    updateAuthUserData: (state, action: PayloadAction<Partial<User>>) => {
      if (state.currentUser.id === action.payload.id) {
        state.currentUser = { ...state.currentUser, ...action.payload };
      } else {
        console.log("can't find user with id", action.payload?.id);
      }
    },
    subscribe: (
      state,
      action: PayloadAction<{ type: "Location" | "Company"; value: string }>,
    ) => {
      if (action.payload.type === "Company") {
        const index = state.subscriptions.companies.findIndex(
          (id) => id === action.payload.value,
        );
        if (index === -1) {
          state.subscriptions.companies.push(action.payload.value);
        }
      } else if (action.payload.type === "Location") {
        const index = state.subscriptions.locations.findIndex(
          (id) => id === action.payload.value,
        );
        if (index === -1) {
          state.subscriptions.locations.push(action.payload.value);
        }
      }
    },
    unsubscribe: (
      state,
      action: PayloadAction<{ type: "Location" | "Company"; value: string }>,
    ) => {
      if (action.payload.type === "Company") {
        state.subscriptions.companies = state.subscriptions.companies.filter(
          (id) => id !== action.payload.value,
        );
      } else if (action.payload.type === "Location") {
        state.subscriptions.locations = state.subscriptions.locations.filter(
          (id) => id !== action.payload.value,
        );
      }
    },
  },
});

export const {
  signupStart,
  updateAuthUser,
  signupSuccess,
  signupFailure,
  loginStart,
  updateAuthUserData,
  loginSuccess,
  loginFailure,
  logout,
  subscribe,
  unsubscribe,
} = authSlice.actions;

export default authSlice.reducer;
