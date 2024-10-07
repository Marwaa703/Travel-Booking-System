// Import your types

import { Location } from "@/types/trip";
import api from "./axiosApi";

// Create a trip location
export const createTripLocation = async (
  locationData: Location,
): Promise<Location> => {
  try {
    const response = await api.post<Location>("/tripLocations", locationData);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to create trip location, error: ${error}`);
  }
};

// Get locations by trip ID
export const getLocationsByTripId = async (
  tripId: string,
): Promise<Location[]> => {
  try {
    const response = await api.get<Location[]>(`/tripLocations/${tripId}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch trip locations, error: ${error}`);
  }
};

// Get a trip location by ID
export const getTripLocationById = async (
  locationId: string,
): Promise<Location> => {
  try {
    const response = await api.get<Location>(`/tripLocations/${locationId}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch trip location, error: ${error}`);
  }
};

// Update a trip location
export const updateTripLocation = async (
  locationId: string,
  locationData: Location,
): Promise<Location> => {
  try {
    const response = await api.put<Location>(
      `/tripLocations/${locationId}`,
      locationData,
    );
    return response.data;
  } catch (error) {
    throw new Error(`Failed to update trip location, error: ${error}`);
  }
};

// Delete a trip location
export const deleteTripLocation = async (locationId: string): Promise<void> => {
  try {
    await api.delete(`/tripLocations/${locationId}`);
  } catch (error) {
    throw new Error(`Failed to delete trip location, error: ${error}`);
  }
};
