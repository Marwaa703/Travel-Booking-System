import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface BookedTrip {
  user_id: string;
  trip_id: string;
}

interface BookedTripsState {
  trips: BookedTrip[];
  usersBookedByTripId: { [key: string]: string[] }; // key as trip_id, value as an array of user_ids
}

const initialState: BookedTripsState = {
  trips: [],
  usersBookedByTripId: {},
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
      state.trips = action.payload;
    },
    setUsersBookedByTrip: (
      state,
      action: PayloadAction<{ trip_id: string; users: string[] }>,
    ) => {
      state.usersBookedByTripId[action.payload.trip_id] = action.payload.users;
    },
  },
});

export const {
  addBookedTrip,
  removeBookedTrip,
  setBookedTrips,
  setUsersBookedByTrip,
} = bookedTripSlice.actions;

// Selectors
export const selectAllBookedTrips = (state: RootState) =>
  state.bookedTrips.trips;

export const selectBookedTripsByUser =
  (user_id: string) => (state: RootState) =>
    state.bookedTrips.trips.filter((trip) => trip.user_id === user_id);

export const selectUsersBookedByTrip =
  (trip_id: string) => (state: RootState) =>
    state.bookedTrips.usersBookedByTripId[trip_id] || [];

export default bookedTripSlice.reducer;
