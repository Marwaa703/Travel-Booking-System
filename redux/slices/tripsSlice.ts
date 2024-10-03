/* eslint-disable prettier/prettier */
import { Trip } from "@/types/trip";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TripsState {
  trips: Trip[];
  isLoading: boolean;
  isError: boolean;
}

const initialState: TripsState = {
  trips: [],
  isLoading: false,
  isError: false,
};

const tripsSlice = createSlice({
  name: "trips",
  initialState,
  reducers: {
    setTrips: (state, action: PayloadAction<Trip[]>) => {
      state.trips = action.payload;
    },

    addTrip: (state, action: PayloadAction<Trip>) => {
      state.trips.push(action.payload);
    },

    removeTrip: (state, action: PayloadAction<string>) => {
      state.trips = state.trips.filter((trip) => trip.tripDetailes.id !== action.payload);
    },

    // Update trip details
    updateTripDetails: (state, action: PayloadAction<{ id: string; details: Partial<Trip['tripDetailes']> }>) => {
      const index = state.trips.findIndex((trip) => trip.tripDetailes.id === action.payload.id);
      if (index !== -1) {
        // Update the trip details by merging existing details with the new payload
        state.trips[index].tripDetailes = { ...state.trips[index].tripDetailes, ...action.payload.details };
      }
    },

    // Toggle favorite status for a trip
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const index = state.trips.findIndex((trip) => trip.tripDetailes.id === action.payload);
      if (index !== -1) {
        state.trips[index].tripDetailes.isFavorite = !state.trips[index].tripDetailes.isFavorite;
      }
    },

    // Add a new location to a trip
    addLocation: (state, action: PayloadAction<{ tripId: string; location: Omit<Trip['locations'][0], 'tripId'> }>) => {
      const tripIndex = state.trips.findIndex((trip) => trip.tripDetailes.id === action.payload.tripId);
      if (tripIndex !== -1) {
        const newLocation = { ...action.payload.location, tripId: action.payload.tripId };
        state.trips[tripIndex].locations.push(newLocation);
      }
    },

    // Remove a location from a trip
    removeLocation: (state, action: PayloadAction<{ tripId: string; order: number }>) => {
      const tripIndex = state.trips.findIndex((trip) => trip.tripDetailes.id === action.payload.tripId);
      if (tripIndex !== -1) {
        state.trips[tripIndex].locations = state.trips[tripIndex].locations.filter(location => location.order !== action.payload.order);
      }
    },

    // todo: add loading and error handling actions
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    setError: (state, action: PayloadAction<boolean>) => {
      state.isError = action.payload;
    },
  },
});


export const {
  setTrips,
  addTrip,
  removeTrip,
  updateTripDetails,
  toggleFavorite,
  addLocation,
  removeLocation,
  setLoading,
  setError,
} = tripsSlice.actions;


export default tripsSlice.reducer;
