import { TripInstruction } from "@/types/trip";
import api from "../axiosApi";

// Add Instruction
export const addInstruction = async (instructionData: TripInstruction) => {
  try {
    const res = await api.post("/instructions", instructionData);
    return res.data;
  } catch (error: any) {
    if (error.response) {
      const errorMessage =
        error.response.data?.message ||
        error.response.statusText ||
        "Failed to add instruction";
      console.error(
        "Add instruction failed with server response:",
        errorMessage,
      );
      throw new Error(errorMessage);
    } else {
      console.error("Add instruction failed with error:", error.message);
      throw new Error(error.message || "Failed to add instruction");
    }
  }
};

// Get all instructions by Trip ID
export const getInstructionsByTripId = async (tripId: string) => {
  try {
    const res = await api.get(`/trips/${tripId}/instructions`);
    return res.data;
  } catch (error: any) {
    console.error("Get instructions by trip ID failed with error:", error);
    if (error.response) {
      const errorMessage =
        error.response.data.error || "Failed to retrieve instructions";
      throw new Error(errorMessage);
    } else {
      console.error("Request failed:", error.message);
      throw new Error(error.message || "Failed to retrieve instructions");
    }
  }
};

// // Get a single instruction by ID
// export const getInstructionById = async (instructionId: string) => {
//   try {
//     const res = await api.get(`/instructions/${instructionId}`);
//     return res.data;
//   } catch (error: any) {
//     if (error.response) {
//       const errorMessage =
//         error.response.data?.message ||
//         error.response.statusText ||
//         "Failed to retrieve instruction";
//       console.error(
//         "Get instruction by ID failed with server response:",
//         errorMessage,
//       );
//       throw new Error(errorMessage);
//     } else {
//       console.error("Get instruction by ID failed with error:", error.message);
//       throw new Error(error.message || "Failed to retrieve instruction");
//     }
//   }
// };

// // Update an instruction
// export const updateInstruction = async (
//   instructionId: string,
//   updates: Partial<TripInstruction>,
// ) => {
//   try {
//     const res = await api.put(`/instructions/${instructionId}`, updates);
//     return res.data;
//   } catch (error: any) {
//     if (error.response) {
//       const errorMessage =
//         error.response.data?.message ||
//         error.response.statusText ||
//         "Failed to update instruction";
//       console.error(
//         "Update instruction failed with server response:",
//         errorMessage,
//       );
//       throw new Error(errorMessage);
//     } else {
//       console.error("Update instruction failed with error:", error.message);
//       throw new Error(error.message || "Failed to update instruction");
//     }
//   }
// };

// // Delete an instruction
// export const deleteInstruction = async (instructionId: string) => {
//   try {
//     const res = await api.delete(`/instructions/${instructionId}`);
//     return res.data;
//   } catch (error: any) {
//     if (error.response) {
//       const errorMessage =
//         error.response.data?.message ||
//         error.response.statusText ||
//         "Failed to delete instruction";
//       console.error(
//         "Delete instruction failed with server response:",
//         errorMessage,
//       );
//       throw new Error(errorMessage);
//     } else {
//       console.error("Delete instruction failed with error:", error.message);
//       throw new Error(error.message || "Failed to delete instruction");
//     }
//   }
// };
