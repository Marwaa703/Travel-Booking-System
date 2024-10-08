import { AppDispatch } from "@/redux/store";
import {
  setLoading,
  setError,
  setInstructions,
  addInstruction,
  updateInstructionDetails,
  removeInstruction,
} from "@/redux/slices/tripInstructionSlice";
import {
  getInstructionsByTripId,
  addInstruction as apiAddInstruction,
  updateInstruction as apiUpdateInstruction,
  deleteInstruction as apiDeleteInstruction,
} from "@/api/trips/tripInstruction";
import { TripInstruction } from "@/types/trip";

export const fetchInstructionsByTripId =
  (tripId: string) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const instructions = await getInstructionsByTripId(tripId);
      dispatch(setInstructions(instructions));
    } catch (error) {
      dispatch(setError(true));
    } finally {
      dispatch(setLoading(false));
    }
  };

export const createInstruction =
  (instructionData: TripInstruction) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const newInstruction = await apiAddInstruction(instructionData);
      dispatch(addInstruction(newInstruction));
    } catch (error) {
      dispatch(setError(true));
    } finally {
      dispatch(setLoading(false));
    }
  };

export const updateInstruction =
  (instructionId: string, updates: Partial<TripInstruction>) =>
  async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const updatedInstruction = await apiUpdateInstruction(
        instructionId,
        updates,
      );
      dispatch(
        updateInstructionDetails({
          instruction_id: instructionId,
          details: updatedInstruction,
        }),
      );
    } catch (error) {
      dispatch(setError(true));
    } finally {
      dispatch(setLoading(false));
    }
  };

export const deleteInstruction =
  (instructionId: string) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      await apiDeleteInstruction(instructionId);
      dispatch(removeInstruction(instructionId));
    } catch (error) {
      dispatch(setError(true));
    } finally {
      dispatch(setLoading(false));
    }
  };
