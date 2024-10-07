import { AppDispatch } from "@/redux/store";
import {
  setLoading,
  setError,
  setLocations,
  addLocation,
  updateLocationDetails,
  removeLocation,
} from "@/redux/slices/tripLocationSlice";
import {
  getLocationsByTripId,
  addLocation as apiAddLocation,
  updateLocation as apiUpdateLocation,
  deleteLocation as apiDeleteLocation,
} from "@/api/trips/tripLocations";

// Fetch all locations for a specific trip
export const fetchLocationsByTripId =
  (tripId: string) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const locations = await getLocationsByTripId(tripId);
      dispatch(setLocations(locations));
    } catch (error) {
      dispatch(setError(true));
    } finally {
      dispatch(setLoading(false));
    }
  };

// Add a new location
export const createLocation =
  (locationData: Location) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const newLocation = await apiAddLocation(locationData);
      dispatch(addLocation(newLocation));
    } catch (error) {
      dispatch(setError(true));
    } finally {
      dispatch(setLoading(false));
    }
  };

// Update an existing location
export const updateLocation =
  (locationId: string, updates: Partial<Location>) =>
  async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const updatedLocation = await apiUpdateLocation(locationId, updates);
      // Assuming locationId corresponds to tripId
      dispatch(
        updateLocationDetails({ tripId: locationId, details: updatedLocation }),
      );
    } catch (error) {
      dispatch(setError(true));
    } finally {
      dispatch(setLoading(false));
    }
  };

// Delete a location
export const deleteLocation =
  (locationId: string) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      await apiDeleteLocation(locationId);
      dispatch(removeLocation(locationId));
    } catch (error) {
      dispatch(setError(true));
    } finally {
      dispatch(setLoading(false));
    }
  };
