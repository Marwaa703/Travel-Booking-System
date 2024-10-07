import { Location } from "@/types/trip";
import api from "../axiosApi";

// Add a new location
export const addLocation = async (locationData: Location) => {
  try {
    const res = await api.post("/tripLocations", locationData);
    return res.data;
  } catch (error: any) {
    if (error.response) {
      const errorMessage =
        error.response.data?.message ||
        error.response.statusText ||
        "Failed to add location";
      console.error("Add location failed with server response:", errorMessage);
      throw new Error(errorMessage);
    } else {
      console.error("Add location failed with error:", error.message);
      throw new Error(error.message || "Failed to add location");
    }
  }
};

// Get all locations for a specific trip
export const getLocationsByTripId = async (tripId: string) => {
  try {
    const res = await api.get(`/tripLocations/${tripId}`);
    return res.data;
  } catch (error: any) {
    console.error("Get locations by trip ID failed with error:", error);
    if (error.response) {
      const errorMessage =
        error.response.data.error || "Failed to retrieve locations";
      throw new Error(errorMessage);
    } else {
      console.error("Request failed:", error.message);
      throw new Error(error.message || "Failed to retrieve locations");
    }
  }
};

// Get a single location by ID
export const getLocationById = async (locationId: string) => {
  try {
    const res = await api.get(`/tripLocations/${locationId}`);
    return res.data;
  } catch (error: any) {
    if (error.response) {
      const errorMessage =
        error.response.data?.message ||
        error.response.statusText ||
        "Failed to retrieve location";
      console.error(
        "Get location by ID failed with server response:",
        errorMessage,
      );
      throw new Error(errorMessage);
    } else {
      console.error("Get location by ID failed with error:", error.message);
      throw new Error(error.message || "Failed to retrieve location");
    }
  }
};

// Update a location
export const updateLocation = async (
  locationId: string,
  updates: Partial<Location>,
) => {
  try {
    const res = await api.put(`/tripLocations/${locationId}`, updates);
    return res.data;
  } catch (error: any) {
    if (error.response) {
      const errorMessage =
        error.response.data?.message ||
        error.response.statusText ||
        "Failed to update location";
      console.error(
        "Update location failed with server response:",
        errorMessage,
      );
      throw new Error(errorMessage);
    } else {
      console.error("Update location failed with error:", error.message);
      throw new Error(error.message || "Failed to update location");
    }
  }
};

// Delete a location
export const deleteLocation = async (locationId: string) => {
  try {
    const res = await api.delete(`/tripLocations/${locationId}`);
    return res.data; // Return confirmation message or data
  } catch (error: any) {
    if (error.response) {
      const errorMessage =
        error.response.data?.message ||
        error.response.statusText ||
        "Failed to delete location";
      console.error(
        "Delete location failed with server response:",
        errorMessage,
      );
      throw new Error(errorMessage);
    } else {
      console.error("Delete location failed with error:", error.message);
      throw new Error(error.message || "Failed to delete location");
    }
  }
};
