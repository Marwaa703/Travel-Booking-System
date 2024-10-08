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
  getAllTrips,
  addTrip as apiAddTrip,
  updateTrip as apiUpdateTrip,
  deleteTrip as apiDeleteTrip,
  getTripsByCompanyId as apiGetTripsByCompanyId,
} from "@/api/trips/trip";
import { TripDetailes, Trip } from "@/types/trip";

// Fetch all trips
export const fetchTrips = () => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  try {
    const trips = await getAllTrips();
    dispatch(setTrips(trips));
  } catch (error) {
    dispatch(setError(true));
  } finally {
    dispatch(setLoading(false));
  }
};

// Fetch trips by company ID
export const fetchTripsByCompanyId =
  (companyId: string) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const trips = await apiGetTripsByCompanyId(companyId);
      dispatch(setTrips(trips));
    } catch (error) {
      dispatch(setError(true));
    } finally {
      dispatch(setLoading(false));
    }
  };

// Add a new trip
export const createTrip =
  (tripData: TripDetailes) => async (dispatch: AppDispatch) => {
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
