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
      const index = state.trips.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) state.trips.push(action.payload);
    },

    removeTrip: (state, action: PayloadAction<string>) => {
      state.trips = state.trips.filter((trip) => trip.id !== action.payload);
    },

    updateTripDetails: (
      state,
      action: PayloadAction<{ id: string; details: Partial<Trip> }>,
    ) => {
      const index = state.trips.findIndex(
        (trip) => trip.id === action.payload.id,
      );
      if (index !== -1) {
        state.trips[index] = {
          ...state.trips[index],
          ...action.payload.details,
        };
      }
    },

    toggleFavorite: (state, action: PayloadAction<string>) => {
      const index = state.trips.findIndex((trip) => trip.id === action.payload);
      if (index !== -1) {
        state.trips[index].isFavorite = !state.trips[index].isFavorite;
        // then select all fav trips locally
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

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    setError: (state, action: PayloadAction<boolean>) => {
      state.isError = action.payload;
    },
  },
});

// Selector to get favorite trips
export const selectFavoriteTrips = (state: { trips: TripsState }) =>
  state.trips.trips.filter((t) => t.isFavorite);
export const selectCompanyTrips = (state: TripsState, companyId: string) =>
  state.trips.filter((t) => t.company_id === companyId);
export const selectTripById = (state: TripsState, tripId: string) =>
  state.trips.filter((t) => t.trip_id === tripId)[0];

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
