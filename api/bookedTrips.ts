import api from "./axiosApi";

// Get all booked trips by user ID
export const getBookedTripsByUserId = async (userId: string) => {
  try {
    const res = await api.get(`/users/${userId}/booked_trips`);
    //console.log("Fetched booked trips for user:", res.data);
    return res.data;
  } catch (error: any) {
    if (error.response) {
      const errorMessage =
        error.response.data?.error ||
        error.response.statusText ||
        "Failed to retrieve booked trips";
      console.error(
        "Get booked trips by user ID failed with server response:",
        errorMessage,
      );
      throw new Error(errorMessage);
    } else {
      console.error(
        "Get booked trips by user ID failed with error:",
        error.message,
      );
      throw new Error(error.message || "Failed to retrieve booked trips");
    }
  }
};

//Get all user booked by trip ID
export const getUserBookedByTripId = async (tripId: string) => {
  try {
    const res = await api.get(`/trips/${tripId}/booked_users`);
    console.log("Fetched user booked for trip:", res.data);
    return res.data;
  } catch (error: any) {
    if (error.response) {
      const errorMessage =
        error.response.data?.error ||
        error.response.statusText ||
        "Failed to retrieve booked trips";
      console.error(
        "Get user booked by trip ID failed with server response:",
        errorMessage,
      );
      throw new Error(errorMessage);
    } else {
      console.error(
        "Get user booked by trip ID failed with error:",
        error.message,
      );
      throw new Error(error.message || "Failed to retrieve user booked");
    }
  }
};
