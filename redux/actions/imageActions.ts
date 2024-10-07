import { AppDispatch } from "@/redux/store";
import {
  setLoading,
  setError,
  setImages,
  addImage,
  updateImageDetails,
  removeImage,
} from "@/redux/slices/tripImageSlice";
import {
  getImagesByTripId,
  addTripImage as apiAddTripImage,
  updateTripImage as apiUpdateTripImage,
  deleteTripImage as apiDeleteTripImage,
} from "@/api/trips/tripImages";
import { TripImage } from "@/types/trip";

// Fetch all images for a specific trip
export const fetchImagesByTripId =
  (tripId: string) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const images = await getImagesByTripId(tripId);
      dispatch(setImages(images));
    } catch (error) {
      dispatch(setError(true));
    } finally {
      dispatch(setLoading(false));
    }
  };

// Add a new trip image
export const createTripImage =
  (imageData: TripImage) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const newImage = await apiAddTripImage(imageData);
      dispatch(addImage(newImage));
    } catch (error) {
      dispatch(setError(true));
    } finally {
      dispatch(setLoading(false));
    }
  };

// Update an existing trip image
export const updateTripImage =
  (imageId: string, updates: Partial<TripImage>) =>
  async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const updatedImage = await apiUpdateTripImage(imageId, updates);
      // Find the index of the updated image in the state
      const index = 0; // Replace with logic to find the index based on the updated image ID
      dispatch(updateImageDetails({ index, details: updatedImage }));
    } catch (error) {
      dispatch(setError(true));
    } finally {
      dispatch(setLoading(false));
    }
  };

// Delete a trip image
export const deleteTripImage =
  (imageId: string) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      await apiDeleteTripImage(imageId);
      const index = 0; // Replace with logic to find the index based on the image ID
      dispatch(removeImage(index));
    } catch (error) {
      dispatch(setError(true));
    } finally {
      dispatch(setLoading(false));
    }
  };
