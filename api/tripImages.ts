import { TripImage } from "@/types/trip";
import api from "./axiosApi";

// Create a trip image
export const createTripImage = async (
  imageData: TripImage,
): Promise<TripImage> => {
  try {
    const response = await api.post<TripImage>("/tripImages", imageData);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to create trip image, error: ${error}`);
  }
};

// Get images by trip ID
export const getImagesByTripId = async (
  tripId: string,
): Promise<TripImage[]> => {
  try {
    const response = await api.get<TripImage[]>(`/tripImages/${tripId}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch trip images, error: ${error}`);
  }
};

// Get a trip image by ID
export const getTripImageById = async (imageId: string): Promise<TripImage> => {
  try {
    const response = await api.get<TripImage>(`/tripImages/${imageId}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch trip image, error: ${error}`);
  }
};

// Update a trip image
export const updateTripImage = async (
  imageId: string,
  imageData: TripImage,
): Promise<TripImage> => {
  try {
    const response = await api.put<TripImage>(
      `/tripImages/${imageId}`,
      imageData,
    );
    return response.data;
  } catch (error) {
    throw new Error(`Failed to update trip image, error: ${error}`);
  }
};

// Delete a trip image
export const deleteTripImage = async (imageId: string): Promise<void> => {
  try {
    await api.delete(`/tripImages/${imageId}`);
  } catch (error) {
    throw new Error(`Failed to delete trip image, error: ${error}`);
  }
};
