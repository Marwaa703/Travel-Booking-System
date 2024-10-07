import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Location } from "@/types/trip";

interface TripLocationState {
  locations: Location[];
  loading: boolean;
  error: boolean;
}

const initialState: TripLocationState = {
  locations: [],
  loading: false,
  error: false,
};

const tripLocationSlice = createSlice({
  name: "tripLocation",
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<boolean>) {
      state.error = action.payload;
    },
    setLocations(state, action: PayloadAction<Location[]>) {
      state.locations = action.payload;
    },
    addLocation(state, action: PayloadAction<Location>) {
      state.locations.push(action.payload);
    },
    updateLocationDetails(
      state,
      action: PayloadAction<{ tripId: string; details: Location }>,
    ) {
      const index = state.locations.findIndex(
        (location) => location.tripId === action.payload.tripId,
      );
      if (index !== -1) {
        state.locations[index] = {
          ...state.locations[index],
          ...action.payload.details,
        };
      }
    },
    removeLocation(state, action: PayloadAction<string>) {
      state.locations = state.locations.filter(
        (location) => location.tripId !== action.payload,
      );
    },
  },
});

export const {
  setLoading,
  setError,
  setLocations,
  addLocation,
  updateLocationDetails,
  removeLocation,
} = tripLocationSlice.actions;
export default tripLocationSlice.reducer;
