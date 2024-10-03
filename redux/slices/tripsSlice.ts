/* eslint-disable prettier/prettier */
import { Trip } from "@/types/trip";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TripsState {
  trips: Trip[];
}

const initialState: TripsState = {
  trips: [],
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
      state.trips = state.trips.filter((trip) => trip.id !== action.payload);
    },
  },
});

export const { setTrips, addTrip, removeTrip } = tripsSlice.actions;
export default tripsSlice.reducer;
