import { TripDetailes, Trip } from "@/types/trip";
import api from "../axiosApi";

// Add Trip
export const addTrip = async (tripData: TripDetailes) => {
  try {
    const res = await api.post("/trips", tripData);
    return res.data;
  } catch (error: any) {
    if (error.response) {
      const errorMessage =
        error.response.data?.message ||
        error.response.statusText ||
        "Failed to add trip";
      console.error("Add trip failed with server response:", errorMessage);
      throw new Error(errorMessage);
    } else {
      console.error("Add trip failed with error:", error.message);
      throw new Error(error.message || "Failed to add trip");
    }
  }
};

// Get all trips
export const getAllTrips = async () => {
  try {
    const res = await api.get("/trips");
    console.log("Fetched trips:", res.data);
    return res.data;
  } catch (error: any) {
    console.error("Get all trips failed with error:", error);
    if (error.response) {
      console.error("Response data:", error.response.data);
      const errorMessage =
        error.response.data.error || "Failed to retrieve trips";
      throw new Error(errorMessage);
    } else {
      console.error("Request failed:", error.message);
      throw new Error(error.message || "Failed to retrieve trips");
    }
  }
};

// Get a single trip by ID
export const getTripById = async (tripId: string) => {
  try {
    const res = await api.get(`/trips/${tripId}`);
    return res.data;
  } catch (error: any) {
    if (error.response) {
      const errorMessage =
        error.response.data?.message ||
        error.response.statusText ||
        "Failed to retrieve trip";
      console.error(
        "Get trip by ID failed with server response:",
        errorMessage,
      );
      throw new Error(errorMessage);
    } else {
      console.error("Get trip by ID failed with error:", error.message);
      throw new Error(error.message || "Failed to retrieve trip");
    }
  }
};

// Update a trip
export const updateTrip = async (
  tripId: string,
  updates: Partial<TripDetailes>,
) => {
  try {
    const res = await api.put(`/trips/${tripId}`, updates);
    return res.data;
  } catch (error: any) {
    if (error.response) {
      const errorMessage =
        error.response.data?.message ||
        error.response.statusText ||
        "Failed to update trip";
      console.error("Update trip failed with server response:", errorMessage);
      throw new Error(errorMessage);
    } else {
      console.error("Update trip failed with error:", error.message);
      throw new Error(error.message || "Failed to update trip");
    }
  }
};

// Delete a trip
export const deleteTrip = async (tripId: string) => {
  try {
    const res = await api.delete(`/trips/${tripId}`);
    return res.data; //we can use it in alert for message for the company that this trip is deleted
  } catch (error: any) {
    if (error.response) {
      const errorMessage =
        error.response.data?.message ||
        error.response.statusText ||
        "Failed to delete trip";
      console.error("Delete trip failed with server response:", errorMessage);
      throw new Error(errorMessage);
    } else {
      console.error("Delete trip failed with error:", error.message);
      throw new Error(error.message || "Failed to delete trip");
    }
  }
};

// Get trips by company ID
export const getTripsByCompanyId = async (companyId: string) => {
  try {
    const res = await api.get(`/trips/company/${companyId}`);
    console.log("Fetched trips for company:", res.data);
    return res.data;
  } catch (error: any) {
    if (error.response) {
      const errorMessage =
        error.response.data?.message ||
        error.response.statusText ||
        "Failed to retrieve trips for company";
      console.error(
        "Get trips by company ID failed with server response:",
        errorMessage,
      );
      throw new Error(errorMessage);
    } else {
      console.error(
        "Get trips by company ID failed with error:",
        error.message,
      );
      throw new Error(error.message || "Failed to retrieve trips for company");
    }
  }
};
