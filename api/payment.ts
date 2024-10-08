/* eslint-disable prettier/prettier */
import api from "./axiosApi";

// Fetch trip details by ID
export const fetchTripDetails = async (tripId: string) => {
  try {
    const res = await api.get(`/trips/${tripId}`);
    return res.data;
  } catch (error: any) {
    
    const errorMessage = error.response?.data?.message || error.message || "Failed to fetch trip details";
    console.error("Fetch trip details failed:", errorMessage);
    throw new Error(`Error fetching trip details for ID ${tripId}: ${errorMessage}`); 
  }
};

// Make a payment
export const makePayment = async (
  companyId: number | string,
  tripId: string,
  userWalletAddress: string,
  amountInWei: string
) => {
  try {
    const res = await api.post("/payment", {
      companyId,
      tripId,
      userWalletAddress,
      amountInWei,
    });
    return res.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || error.message || "Failed to process payment";
    console.error("Payment failed:", errorMessage);
    throw new Error(`Error making payment for trip ID ${tripId} at company ID ${companyId}: ${errorMessage}`); 
  }
};

// Book the trip after payment
export const bookTrip = async (tripId: string, userId: number, transactionHash: string) => {
  try {
    const res = await api.post("/booked_trip", {
      tripId,
      userId,
      transactionHash,
    });
    return res.data;
  } catch (error: any) {
    
    const errorMessage = error.response?.data?.message || error.message || "Failed to book the trip";
    console.error("Book trip failed:", errorMessage);
    throw new Error(`Error booking trip ID ${tripId} for user ID ${userId}: ${errorMessage}`);
  }
};
