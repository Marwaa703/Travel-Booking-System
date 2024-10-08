import { createTripImage } from "@/redux/actions/imageActions";
import { createTrip } from "@/redux/actions/tripActions";
import { createLocation } from "@/redux/actions/locationActions";
import { Trip, TripDetailes } from "@/types/trip";
import { setLoading, addTrip, setError } from "../slices/tripsSlice";
import { AppDispatch } from "../store";

// export const createFullTrip =
//   (tripData: Trip) => async (dispatch: AppDispatch) => {
//     dispatch(setLoading(true));
//     try {
//       const newTrip = await createTrip(tripData.tripDetailes);
//       dispatch(addTrip(newTrip as unknown as TripDetailes));
//       console.log({ newTrip });
//       const promises = [
//         ...tripData.locations.map((location) => createLocation(location)),
//         ...tripData.images.map((image) => createTripImage(image)),
//       ];

//       await Promise.all(promises);
//     } catch (error) {
//       dispatch(setError(true));
//     } finally {
//       dispatch(setLoading(false));
//     }
//   };
export const createFullTrip =
  (tripData: Trip) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      console.log("lolpop");
      const newTrip = await addTrip(tripData.details);
      dispatch(addTrip(newTrip as unknown as TripDetailes));

      const promises = [
        ...tripData.locations.map(
          (location) => createLocation(location), // Dispatching here
        ),
        ...tripData.images.map(
          (image) => createTripImage(image), // Dispatching here
        ),
      ];

      await Promise.all(promises);
    } catch (error) {
      dispatch(setError(true));
      console.error("Error creating full trip:", error); // Log the error for debugging
    } finally {
      dispatch(setLoading(false));
    }
  };
