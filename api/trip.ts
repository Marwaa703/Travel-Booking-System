import {
  Location,
  Trip,
  TripDetails,
  TripFormData,
  TripImage,
} from "@/types/trip";
import api from "./axiosApi";

// get all trips
export const createTrip = async (
  tripData: TripFormData,
): Promise<{
  tripDetails: TripDetails;
  locations: Location[];
  images: TripImage[];
}> => {
  const { tripDetails, locations, images } = tripData;

  try {
    // Step 1: Create Trip
    const tripResponse = await api.post<Trip>("/trips", tripDetails);
    const tripId = tripResponse.data.tripDetailes.id; // Assuming the trip ID is in the response data

    // Step 2: Create Trip Locations with tripId
    const locationsResponse = await Promise.all(
      locations.map((location) =>
        api.post<Location>("/tripLocations", {
          ...location,
          tripId,
        }),
      ),
    );

    // Step 3: Create Trip Images with tripId
    const imagesResponse = await Promise.all(
      images.map((image) =>
        api.post<TripImage>("/tripImages", {
          ...image,
          tripId,
        }),
      ),
    );

    // Prepare the updated trip data
    return {
      tripDetails: tripResponse.data.tripDetailes,
      locations: locationsResponse.map((response) => response.data), // Extract data from each response
      images: imagesResponse.map((response) => response.data), // Extract data from each response
    };
  } catch (error) {
    console.error("Error during createTrip:", error);
    throw new Error("Failed to create trip."); // You can handle the error as needed
  }
};

// Get all trips
export const getAllTrips = async (): Promise<TripDetails[]> => {
  try {
    const response = await api.get<TripDetails[]>("/trips");
    return response.data;
  } catch (error) {
    console.log(error, "Failed to fetch trips");
    throw new Error(`Failed to fetch trips: error: ${error}`);
  }
};

// Get a trip by ID
export const getTripById = async (tripId: string): Promise<Trip> => {
  try {
    const response = await api.get<Trip>(`/trips/${tripId}`);
    return response.data;
  } catch (error) {
    console.log(error, "Failed to fetch trip");
    throw new Error(`Failed to fetch trip: error: ${error}`);
  }
};

// Update a trip
export const updateTrip = async (
  tripId: string,
  tripData: TripFormData,
): Promise<Trip> => {
  try {
    const response = await api.put<Trip>(`/trips/${tripId}`, tripData);
    return response.data;
  } catch (error) {
    console.log(error, "Failed to update trip");
    throw new Error(`Failed to update trip: error: ${error}`);
  }
};

// Delete a trip
export const deleteTrip = async (tripId: string): Promise<void> => {
  try {
    await api.delete(`/trips/${tripId}`);
  } catch (error) {
    console.log(error, "Failed to delete trip");
    throw new Error(`Failed to delete trip: error: ${error}`);
  }
};
