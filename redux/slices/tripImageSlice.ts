import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TripImage } from "@/types/trip";

interface TripImageState {
  images: TripImage[];
  loading: boolean;
  error: boolean;
}

const initialState: TripImageState = {
  images: [],
  loading: false,
  error: false,
};

const tripImageSlice = createSlice({
  name: "tripImage",
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<boolean>) {
      state.error = action.payload;
    },
    setImages(state, action: PayloadAction<TripImage[]>) {
      state.images = action.payload;
    },
    addImage(state, action: PayloadAction<TripImage>) {
      state.images.push(action.payload);
    },
    updateImageDetails(
      state,
      action: PayloadAction<{ index: number; details: TripImage }>,
    ) {
      if (
        action.payload.index >= 0 &&
        action.payload.index < state.images.length
      ) {
        state.images[action.payload.index] = {
          ...state.images[action.payload.index],
          ...action.payload.details,
        };
      }
    },
    removeImage(state, action: PayloadAction<number>) {
      state.images.splice(action.payload, 1);
    },
  },
});

export const {
  setLoading,
  setError,
  setImages,
  addImage,
  updateImageDetails,
  removeImage,
} = tripImageSlice.actions;
export default tripImageSlice.reducer;
