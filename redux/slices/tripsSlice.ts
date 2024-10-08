/* eslint-disable prettier/prettier */
import { Trip, TripDetailes } from "@/types/trip";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TripsState {
  trips: TripDetailes[];
  favoriteTrips: TripDetailes[];
  isLoading: boolean;
  isError: boolean;
}

const initialState: TripsState = {
  trips: [],
  favoriteTrips: [],
  isLoading: false,
  isError: false,
};

const tripsSlice = createSlice({
  name: "trips",
  initialState,
  reducers: {
    setTrips: (state, action: PayloadAction<TripDetailes[]>) => {
      state.trips = action.payload;
    },

    addTrip: (state, action: PayloadAction<TripDetailes>) => {
      state.trips.push(action.payload);
    },

    removeTrip: (state, action: PayloadAction<string>) => {
      state.trips = state.trips.filter((trip) => trip.id !== action.payload);
      state.favoriteTrips = state.favoriteTrips.filter((trip) => trip.id !== action.payload);
    },

    updateTripDetails: (state, action: PayloadAction<{ id: string; details: Partial<TripDetailes> }>) => {
      const index = state.trips.findIndex((trip) => trip.id === action.payload.id);
      if (index !== -1) {
        state.trips[index] = { ...state.trips[index], ...action.payload.details };
      }
    },

    toggleFavorite: (state, action: PayloadAction<string>) => {
      const index = state.trips.findIndex((trip) => trip.id === action.payload);
      if (index !== -1) {
        state.trips[index].isFavorite = !state.trips[index].isFavorite;
      }
    },

    // toggleFavorite: (state, action: PayloadAction<string>) => {
    //   const tripIndex = state.trips.findIndex((trip) => trip.tripDetailes.id === action.payload);
    //   if (tripIndex !== -1) {
    //     const trip = state.trips[tripIndex];

    //     const favoriteIndex = state.favoriteTrips.findIndex((favTrip) => favTrip.tripDetailes.id === action.payload);
    //     if (favoriteIndex === -1) {
    //       state.favoriteTrips.push(trip);
    //     } else {
    //       state.favoriteTrips.splice(favoriteIndex, 1);
    //     }
    //   }
    // },

    // addLocation: (state, action: PayloadAction<{ tripId: string; location: Omit<TripDetailes> }>) => {
    //   const tripIndex = state.trips.findIndex((trip) => trip.tripDetailes.id === action.payload.tripId);
    //   if (tripIndex !== -1) {
    //     const newLocation = { ...action.payload.location, tripId: action.payload.tripId };
    //     state.trips[tripIndex].locations.push(newLocation);
    //   }
    // },

    // removeLocation: (state, action: PayloadAction<{ tripId: string; order: number }>) => {
    //   const tripIndex = state.trips.findIndex((trip) => trip.tripDetailes.id === action.payload.tripId);
    //   if (tripIndex !== -1) {
    //     state.trips[tripIndex].locations = state.trips[tripIndex].locations.filter(location => location.location_order !== action.payload.order);
    //   }
    // },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    setError: (state, action: PayloadAction<boolean>) => {
      state.isError = action.payload;
    },
  },
});

// Selector to get favorite trips
export const selectFavoriteTrips = (state: { trips: TripsState }) => state.trips.favoriteTrips;

// Export actions
export const {
  setTrips,
  addTrip,
  removeTrip,
  updateTripDetails,
  toggleFavorite,
  setLoading,
  setError,
} = tripsSlice.actions;

// Export reducer
export default tripsSlice.reducer;
