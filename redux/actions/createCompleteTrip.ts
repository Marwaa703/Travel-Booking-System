/* eslint-disable prettier/prettier */
import { createTripImage } from "@/redux/actions/imageActions";
import { createTrip } from "@/redux/actions/tripActions";
import {  createLocation } from "@/redux/actions/locationActions";
import { TripFormData } from "@/types/trip";
import { setLoading, addTrip, setError } from "../slices/tripsSlice";
import { AppDispatch } from "../store";


export const createFullTrip =
  (tripData: TripFormData) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const newTrip = await addTrip(tripData.tripDetails);
      dispatch(addTrip(newTrip));

      const promises = [
        ...tripData.locations.map((location) => createLocation(location)),
        ...tripData.images.map((image) => createTripImage(image)),
      ];

      await Promise.all(promises);
    } catch (error) {
      dispatch(setError(true));
    } finally {
      dispatch(setLoading(false));
    }
  };
