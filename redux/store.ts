import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import companiesSlice from "@/redux/slices/companiesSlice";
import userSlice from "@/redux/slices/userSlice";
import tripsSlice from "@/redux/slices/tripsSlice";
import authSlice from "@/redux/slices/authSlice";
import imagesSlice from "@/redux/slices/tripImageSlice";
import instructionsSlice from "@/redux/slices/tripInstructionSlice";
import bookedTripReducer from "@/redux/slices/bookedTripSlice";
import themeReducer from "@/redux/slices/themeSlice";

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

const authPersistConfig = {
  key: "auth",
  storage: AsyncStorage,
};

const imagesPersistConfig = {
  key: "images",
  storage: AsyncStorage,
};

const instructionsPersistConfig = {
  key: "instructions",
  storage: AsyncStorage,
};

const bookedTripsPersistConfig = {
  key: "bookedTrips",
  storage: AsyncStorage,
};
const themePersistConfig = {
  key: "theme",
  storage: AsyncStorage,
};

// Create persisted reducers
const persistedTripsReducer = persistReducer(tripsPersistConfig, tripsSlice);
const persistedUserReducer = persistReducer(userPersistConfig, userSlice);
const persistedCompaniesReducer = persistReducer(
  companiesPersistConfig,
  companiesSlice,
);
const persistedAuthReducer = persistReducer(authPersistConfig, authSlice);
const persistedImagesReducer = persistReducer(imagesPersistConfig, imagesSlice);
const persistedInstructionsReducer = persistReducer(
  instructionsPersistConfig,
  instructionsSlice,
);
const persistedBookedTripsReducer = persistReducer(
  bookedTripsPersistConfig,
  bookedTripReducer,
);
const persistedThemeReducer = persistReducer(themePersistConfig, themeReducer);

// Configure the store
export const store = configureStore({
  reducer: {
    trips: persistedTripsReducer,
    user: persistedUserReducer,
    companies: persistedCompaniesReducer,
    auth: persistedAuthReducer,
    images: persistedImagesReducer,
    instructions: persistedInstructionsReducer,
    bookedTrips: persistedBookedTripsReducer,
    theme: persistedThemeReducer,
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
