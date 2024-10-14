import { AppDispatch } from "@/redux/store";
import {
  setLoading,
  setError,
  setTrips,
  addTrip,
  updateTripDetails,
  removeTrip,
} from "@/redux/slices/tripsSlice";
import {
  addTrip as apiAddTrip,
  updateTrip as apiUpdateTrip,
  deleteTrip as apiDeleteTrip,
  getFullTrips,
  getCompanyTrips,
} from "@/api/trips/trip";
import { TripDetailes, Trip } from "@/types/trip";

// Fetch all trips
export const fetchTrips =
  (companyId?: string) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      // Fetch trips, optionally filtering by company ID
      const trips = await getFullTrips(companyId);
      dispatch(setTrips(trips));
    } catch (error) {
      console.error("Error fetching trips:", error); // Added logging for debugging
      dispatch(setError(true));
    } finally {
      dispatch(setLoading(false));
    }
  };

export const fetchCompanyTrips =
  (companyId: string) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      // will be adjusted for some trips
      const res = await getCompanyTrips(companyId);
      dispatch(setTrips(res));
    } catch (error) {
      dispatch(setError(true));
    } finally {
      dispatch(setLoading(false));
    }
  };

// Add a new trip
export const createTrip = (tripData: Trip) => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  try {
    const newTrip = await apiAddTrip(tripData);
    dispatch(addTrip(newTrip));
  } catch (error) {
    dispatch(setError(true));
  } finally {
    dispatch(setLoading(false));
  }
};

// Update an existing trip
export const updateTrip =
  (tripId: string, updates: Partial<TripDetailes>) =>
  async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const updatedTrip = await apiUpdateTrip(tripId, updates);
      dispatch(updateTripDetails({ id: tripId, details: updatedTrip }));
    } catch (error) {
      dispatch(setError(true));
    } finally {
      dispatch(setLoading(false));
    }
  };

// Delete a trip
export const deleteTrip = (tripId: string) => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  try {
    await apiDeleteTrip(tripId);
    dispatch(removeTrip(tripId));
  } catch (error) {
    dispatch(setError(true));
  } finally {
    dispatch(setLoading(false));
  }
};
