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
      action: PayloadAction<{ id: string; updatedData: Partial<Omit<User, 'role'>> }>
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

// Add a single user (for login)
addUser: (state, action: PayloadAction<UserWithId>) => {
  const existingUserIndex = state.users.findIndex(user => user.id === action.payload.id);
  if (existingUserIndex === -1) {
    state.users.push(action.payload); 
  } else {
    state.users[existingUserIndex] = action.payload; 
  }
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

export const { createUser, updateUser, deleteUser, setUsers,addUser, setUserRole } = userSlice.actions;

export default userSlice.reducer;
