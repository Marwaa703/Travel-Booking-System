import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import companiesSlice from "@/redux/slices/companiesSlice";
import userSlice from "@/redux/slices/userSlice";
import tripsSlice from "@/redux/slices/tripsSlice";
// Persist configurations for each slice
const tripsPersistConfig = {
  key: "trips",
  storage: AsyncStorage,
};

const userPersistConfig = {
  key: "user",
  storage: AsyncStorage,
};

const companiesPersistConfig = {
  key: "companies",
  storage: AsyncStorage,
};

// Create persisted reducers
const persistedTripsReducer = persistReducer(tripsPersistConfig, tripsSlice);
const persistedUserReducer = persistReducer(userPersistConfig, userSlice);
const persistedCompaniesReducer = persistReducer(
  companiesPersistConfig,
  companiesSlice,
);

// Configure the store
export const store = configureStore({
  reducer: {
    trips: persistedTripsReducer,
    user: persistedUserReducer,
    companies: persistedCompaniesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Persist the store
export const persistor = persistStore(store);

// Define RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Create typed hooks for dispatch and selector
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
