/* eslint-disable prettier/prettier */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, UserTypes } from "@/types/user"; 

interface UserWithId extends User {
  id: string; 
  role: UserTypes;
}

interface UserState {
  users: UserWithId[]; 
}

const initialState: UserState = {
  users: [], 
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // Create a new user with role
    createUser: (
      state,
      action: PayloadAction<{ id: string; userData: User; role: UserTypes }>
    ) => {
      const newUser: UserWithId = {
        id: action.payload.id,
        ...action.payload.userData,
        role: action.payload.role,
      };
      state.users.push(newUser);
    },

    // Update an existing user by ID
    updateUser: (
      state,
      action: PayloadAction<{ id: string; updatedData: Partial<User> }>
    ) => {
      const index = state.users.findIndex(user => user.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = {
          ...state.users[index],
          ...action.payload.updatedData, 
        };
      }
    },

    // Delete a user by ID
    deleteUser: (state, action: PayloadAction<{ id: string }>) => {
      state.users = state.users.filter(user => user.id !== action.payload.id);
    },

    // Set users (when loading from API)
    setUsers: (state, action: PayloadAction<UserWithId[]>) => {
      state.users = action.payload;
    },

    // Update a specific user's role by ID
    setUserRole: (
      state,
      action: PayloadAction<{ id: string; role: UserTypes }>
    ) => {
      const user = state.users.find(user => user.id === action.payload.id);
      if (user) {
        user.role = action.payload.role;
      }
    },
  },
});


export const { createUser, updateUser, deleteUser, setUsers, setUserRole } = userSlice.actions;

export default userSlice.reducer;
