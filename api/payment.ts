import axios from "axios";
import api from "./axiosApi";

// Fetch trip details by ID
export const fetchTripDetails = async (tripId: string) => {
  try {
    const res = await api.get(`/trips/${tripId}`);
    return res.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Failed to fetch trip details";
    console.error("Fetch trip details failed:", errorMessage);
    throw new Error(
      `Error fetching trip details for ID ${tripId}: ${errorMessage}`,
    );
  }
};
// Make a payment
export const makePayment = async (
  companyId: number | string,
  tripId: string,
  userWalletAddress: string,
  amountInWei: string,
) => {
  try {
    console.log("Making payment with data:", {
      companyId,
      tripId,
      userWalletAddress,
      amountInWei,
    });

    const res = await axios.post("http://192.168.1.4:3002/payment", {
      companyId,
      tripId,
      userWalletAddress,
      amountInWei,
    });
    return res.data;
  } catch (error: any) {
    console.error("Payment error:", error);
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Failed to process payment";
    console.error("Payment failed:", errorMessage);
    throw new Error(
      `Error making payment for trip ID ${tripId} at company ID ${companyId}: ${errorMessage}`,
    );
  }
};

export const bookTrip = async (
  tripId: string,
  userId: string,
  transactionHash: string,
) => {
  try {
    console.log("Booking trip with data:", {
      tripId,
      userId,
      transactionHash,
    });

    const res = await api.post("/booked_trip", {
      trip_id: tripId,
      user_id: userId,
      transactionHash,
    });
    console.log(res.data);
    return res.data;
  } catch (error: any) {
    console.error("Booking error:", error);
    console.error("Booking error details:", error.response?.data);
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Failed to book the trip";
    console.error("Book trip failed:", errorMessage);
    throw new Error(
      `Error booking trip ID ${tripId} for user ID ${userId}: ${errorMessage}`,
    );
  }
};
