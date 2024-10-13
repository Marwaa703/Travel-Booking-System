import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface BookedTrip {
  user_id: string;
  trip_id: string;
}

// Define the state type
interface BookedTripsState {
  trips: BookedTrip[];
}

const initialState: BookedTripsState = {
  trips: [],
};

const bookedTripSlice = createSlice({
  name: "bookedTrips",
  initialState,
  reducers: {
    addBookedTrip: (state, action: PayloadAction<BookedTrip>) => {
      state.trips.push(action.payload);
    },
    removeBookedTrip: (state, action: PayloadAction<{ trip_id: string }>) => {
      state.trips = state.trips.filter(
        (trip) => trip.trip_id !== action.payload.trip_id,
      );
    },
    setBookedTrips: (state, action: PayloadAction<BookedTrip[]>) => {
      state.trips = action.payload; // Update the trips with the fetched ones
    },
  },
});

export const { addBookedTrip, removeBookedTrip, setBookedTrips } =
  bookedTripSlice.actions;

export const selectAllBookedTrips = (state: RootState) =>
  state.bookedTrips.trips;

export const selectBookedTripsByUser =
  (user_id: string) => (state: RootState) =>
    state.bookedTrips.trips.filter((trip) => trip.user_id === user_id);

export default bookedTripSlice.reducer;
