import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TripInstruction } from "@/types/trip";

interface TripInstructionState {
  instructions: TripInstruction[];
  loading: boolean;
  error: boolean;
}

const initialState: TripInstructionState = {
  instructions: [],
  loading: false,
  error: false,
};

const tripInstructionSlice = createSlice({
  name: "tripInstruction",
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<boolean>) {
      state.error = action.payload;
    },
    setInstructions(state, action: PayloadAction<TripInstruction[]>) {
      state.instructions = action.payload;
    },
    addInstruction(state, action: PayloadAction<TripInstruction>) {
      state.instructions.push(action.payload);
    },
    updateInstructionDetails(
      state,
      action: PayloadAction<{
        instruction_id: string;
        details: Partial<TripInstruction>;
      }>,
    ) {
      const index = state.instructions.findIndex(
        (instruction) =>
          instruction.instruction_id === action.payload.instruction_id,
      );
      if (index !== -1) {
        state.instructions[index] = {
          ...state.instructions[index],
          ...action.payload.details,
        };
      }
    },
    removeInstruction(state, action: PayloadAction<string>) {
      state.instructions = state.instructions.filter(
        (instruction) => instruction.instruction_id !== action.payload,
      );
    },
  },
});

export const {
  setLoading,
  setError,
  setInstructions,
  addInstruction,
  updateInstructionDetails,
  removeInstruction,
} = tripInstructionSlice.actions;
export default tripInstructionSlice.reducer;
