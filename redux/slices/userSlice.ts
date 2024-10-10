import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, UserTypes } from "@/types/user";

interface UserWithId extends User {
  id?: string;
  role: UserTypes;
}

interface UserState {
  list: UserWithId[];
  error: string | null;
  loading: boolean;
}

const initialState: UserState = {
  list: [],
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    createUser: (
      state,
      action: PayloadAction<{ id: string; userData: User; role: UserTypes }>,
    ) => {
      const newUser: UserWithId = {
        id: action.payload.id,
        ...action.payload.userData,
        role: action.payload.role,
      };
      state.list.push(newUser);
    },

    // Update an existing user by ID
    setUser: (
      state,
      action: PayloadAction<{
        id: string;
        updatedData: Partial<Omit<User, "role">>;
      }>,
    ) => {
      const index = state.list.findIndex(
        (user) => user.id === action.payload.id,
      );
      if (index !== -1) {
        state.list[index] = {
          ...state.list[index],
          ...action.payload.updatedData,
        };
      }
    },

    // Delete a user by ID
    removeUser: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter((user) => user.id !== action.payload);
    },

    // Set users (when loading from API)
    setUsers: (state, action: PayloadAction<UserWithId[]>) => {
      state.list = action.payload;
    },

    // Add a single user (for login)
    addUser: (state, action: PayloadAction<UserWithId>) => {
      const existingUserIndex = state.list.findIndex(
        (user) => user.id === action.payload.id,
      );
      if (existingUserIndex === -1) {
        state.list.push(action.payload);
      } else {
        state.list[existingUserIndex] = action.payload;
      }
    },

    // Update a specific user's role by ID
    setUserRole: (
      state,
      action: PayloadAction<{ id: string; role: UserTypes }>,
    ) => {
      const user = state.list.find((user) => user.id === action.payload.id);
      if (user) {
        user.role = action.payload.role;
      }
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const {
  createUser,
  setUser,
  removeUser,
  setUsers,
  addUser,
  setUserRole,
  setError,
  setLoading,
} = userSlice.actions;

export default userSlice.reducer;
