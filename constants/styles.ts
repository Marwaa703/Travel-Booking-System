import { TripStatus } from "@/types/trip";
import { COLORS } from "./theme";

export const getStatusStyle = (status: TripStatus) => {
  switch (status) {
    case "active":
      return { backgroundColor: COLORS.success, color: "white" };
    case "paused":
      return { backgroundColor: "#fba834", color: "black" };
    case "canceled":
      return { backgroundColor: "lightcoral", color: "red" };
    case "completed":
      return { backgroundColor: "lightblue", color: "blue" };
    default:
      return { backgroundColor: "#fff", color: "#000" };
  }
};
