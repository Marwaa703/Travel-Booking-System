import { TripImage, TripFormData } from "@/types/trip";
import api from "../axiosApi";

// Add Trip Image
export const addTripImage = async (imageData: TripImage) => {
  try {
    const res = await api.post("/tripImages", imageData);
    return res.data;
  } catch (error: any) {
    if (error.response) {
      const errorMessage =
        error.response.data?.message ||
        error.response.statusText ||
        "Failed to add trip image";
      console.error(
        "Add trip image failed with server response:",
        errorMessage,
      );
      throw new Error(errorMessage);
    } else {
      console.error("Add trip image failed with error:", error.message);
      throw new Error(error.message || "Failed to add trip image");
    }
  }
};

// Get all images for a specific trip
export const getImagesByTripId = async (tripId: string) => {
  try {
    const res = await api.get(`/tripImages/${tripId}`);
    return res.data;
  } catch (error: any) {
    console.error("Get images by trip ID failed with error:", error);
    if (error.response) {
      const errorMessage =
        error.response.data.error || "Failed to retrieve trip images";
      throw new Error(errorMessage);
    } else {
      console.error("Request failed:", error.message);
      throw new Error(error.message || "Failed to retrieve trip images");
    }
  }
};

// Get a single trip image by ID
export const getTripImageById = async (imageId: string) => {
  try {
    const res = await api.get(`/tripImages/${imageId}`);
    return res.data;
  } catch (error: any) {
    if (error.response) {
      const errorMessage =
        error.response.data?.message ||
        error.response.statusText ||
        "Failed to retrieve trip image";
      console.error(
        "Get trip image by ID failed with server response:",
        errorMessage,
      );
      throw new Error(errorMessage);
    } else {
      console.error("Get trip image by ID failed with error:", error.message);
      throw new Error(error.message || "Failed to retrieve trip image");
    }
  }
};

// Update a trip image
export const updateTripImage = async (
  imageId: string,
  updates: Partial<TripImage>,
) => {
  try {
    const res = await api.put(`/tripImages/${imageId}`, updates);
    return res.data;
  } catch (error: any) {
    if (error.response) {
      const errorMessage =
        error.response.data?.message ||
        error.response.statusText ||
        "Failed to update trip image";
      console.error(
        "Update trip image failed with server response:",
        errorMessage,
      );
      throw new Error(errorMessage);
    } else {
      console.error("Update trip image failed with error:", error.message);
      throw new Error(error.message || "Failed to update trip image");
    }
  }
};

// Delete a trip image
export const deleteTripImage = async (imageId: string) => {
  try {
    const res = await api.delete(`/tripImages/${imageId}`);
    return res.data;
  } catch (error: any) {
    if (error.response) {
      const errorMessage =
        error.response.data?.message ||
        error.response.statusText ||
        "Failed to delete trip image";
      console.error(
        "Delete trip image failed with server response:",
        errorMessage,
      );
      throw new Error(errorMessage);
    } else {
      console.error("Delete trip image failed with error:", error.message);
      throw new Error(error.message || "Failed to delete trip image");
    }
  }
};
