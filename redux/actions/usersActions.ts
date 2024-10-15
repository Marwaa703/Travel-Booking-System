import { AppDispatch } from "@/redux/store";
import {
  setLoading,
  setError,
  setUsers,
  addUser,
  createUser,
  removeUser,
  setUser,
  updateUser,
} from "@/redux/slices/userSlice";

import { User, UserTypes } from "@/types/user";
import userApi from "@/api/userApi";
import { updateAuthUser, updateAuthUserData } from "../slices/authSlice";

// Sign up a new user
export const signupUser = (userData: User) => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  try {
    const newUser = await userApi.signupUser(userData);
    dispatch(
      addUser({
        ...newUser,
        role: "User",
      }),
    );
  } catch (error) {
    dispatch(setError(error as string));
  } finally {
    dispatch(setLoading(false));
  }
};

// Login a user
export const loginUser =
  (credentials: { email: string; password: string }) =>
  async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const user = await userApi.loginUser(credentials);
      dispatch(addUser(user));
    } catch (error) {
      dispatch(setError(error as string));
    } finally {
      dispatch(setLoading(false));
    }
  };

// Fetch all users
export const fetchUsers = () => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  try {
    const users = await userApi.getAllUsers();
    dispatch(setUsers(users));
  } catch (error) {
    dispatch(setError(error as string));
  } finally {
    dispatch(setLoading(false));
  }
};

// Fetch a user by ID
export const fetchUserById =
  (userId: string) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const user = await userApi.getUser(userId);
      dispatch(addUser(user));
    } catch (error) {
      dispatch(setError(error as string));
    } finally {
      dispatch(setLoading(false));
    }
  };

// Update a user
export const updateUserData =
  (userId: string, userData: User, profile_picture?: string) =>
  async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const updatedUser = await userApi.updateUser(userId, userData);
      dispatch(updateUser({ ...updatedUser, profile_picture }));
      dispatch(updateAuthUserData({ ...updatedUser, profile_picture }));
      //   will update auth in case of user
      console.log({ updatedUser });
      //   dispatch(updateAuthUser(updatedUser));
    } catch (error) {
      dispatch(setError(error as string));
    } finally {
      dispatch(setLoading(false));
    }
  };

// Delete a user
export const deleteUser = (userId: string) => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  try {
    await userApi.deleteUser(userId);
    dispatch(removeUser(userId));
  } catch (error) {
    dispatch(setError(error as string));
  } finally {
    dispatch(setLoading(false));
  }
};
