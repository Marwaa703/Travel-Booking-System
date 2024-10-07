import { TripInstruction } from "@/types/trip";
import api from "./axiosApi";

export const getAllInstructionsByTripId = async (
  tripId: string,
): Promise<TripInstruction[]> => {
  try {
    const response = await api.get<TripInstruction[]>(
      `/trips/${tripId}/instructions`,
    );
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch trip instructions, error: ${error}`);
  }
};

// Get a trip instruction by ID
export const getTripInstructionById = async (
  instructionId: string,
): Promise<TripInstruction> => {
  try {
    const response = await api.get<TripInstruction>(
      `/instructions/${instructionId}`,
    );
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch trip instruction, error: ${error}`);
  }
};

// Create a trip instruction
export const createTripInstruction = async (
  instructionData: TripInstruction,
): Promise<TripInstruction> => {
  try {
    const response = await api.post<TripInstruction>(
      "/instructions",
      instructionData,
    );
    return response.data;
  } catch (error) {
    throw new Error(`Failed to create trip instruction, error: ${error}`);
  }
};

// Update a trip instruction
export const updateTripInstruction = async (
  instructionId: string,
  instructionData: TripInstruction,
): Promise<TripInstruction> => {
  try {
    const response = await api.put<TripInstruction>(
      `/instructions/${instructionId}`,
      instructionData,
    );
    return response.data;
  } catch (error) {
    throw new Error(`Failed to update trip instruction, error: ${error}`);
  }
};

// Delete a trip instruction
export const deleteTripInstruction = async (
  instructionId: string,
): Promise<void> => {
  try {
    await api.delete(`/instructions/${instructionId}`);
  } catch (error) {
    throw new Error(`Failed to delete trip instruction, error: ${error}`);
  }
};
