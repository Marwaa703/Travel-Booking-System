/* eslint-disable react-native/no-unused-styles */
import React from "react";
import { View, Text, Image, StyleSheet, Alert } from "react-native";
import { Trip, TripDetailes, TripStatus } from "@/types/trip"; // Importing TripStatus type
import ActionButton from "../buttons/ActionButton";
import { ColorPalette, COLORS } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import Spacer from "../Spacer";
import { getStatusStyle } from "@/constants/styles";
import { useAppDispatch } from "@/redux/store";
import { deleteFullTrip, updateTripStatus } from "@/redux/actions/tripActions";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";
import { getUserBookedByTripId } from "@/api/bookedTrips";
import { formattedDate } from "@/utils";
import { useTheme } from "@/hooks/useTheme";

const defaultImage = require("@/assets/imgDefault.png");

interface TripManagementCardProps {
  trip: Trip;
}

const TripManagementCard: React.FC<TripManagementCardProps> = ({ trip }) => {
  // configure styles
  const theme = useTheme();
  const styles = stylesObj(theme);
  const router = useRouter();

  const { status, trip_id, company_id, images, name, price } = trip;
  const image = images[0]?.image_url;
  const imageSource = image ? { uri: image } : defaultImage;

  const dispatch = useAppDispatch();
  const canDelete = status === "paused" || status === "canceled";
  const statusStyle = getStatusStyle(status as TripStatus);

  const handleDeleteTrip = () => {
    // can't delete active or booked trip
    if (status !== "active" && status !== "completed") {
      dispatch(deleteFullTrip(trip_id as string))
        .then(() => {
          // Toast.show({
          //   type: "success",
          //   text1: "Trip Deleted",
          //   text2: "The trip has been deleted successfully.",
          //   position: "top",
          // });
        })
        .catch(() => {
          // Toast.show({
          //   type: "error",
          //   text1: "Failed to Delete Trip",
          //   text2: "An error occurred while deleting the trip.",
          //   position: "top",
          // });
        });
    } else {
      // Toast.show({
      //   type: "error",
      //   text1: "Cannot Delete Trip",
      //   text2: "Active or completed trips cannot be deleted.",
      //   position: "top",
      // });
    }
  };

  const handleChangeStatus = async () => {
    try {
      const bookedUsers = await getUserBookedByTripId(trip_id as string);
      if (bookedUsers.length > 0) {
        // Toast notification or alert that the status cannot be changed
        // Toast.show({
        //   type: "error",
        //   text1: "Cannot Change Status",
        //   text2: "This trip cannot be paused because there are users booked.",
        //   position: "top",
        // });
        Alert.alert(
          "This trip cannot be paused because there are users booked.",
        );
        return;
      }
    } catch (error) {
      // Toast.show({
      //   type: "error",
      //   text1: "Error Fetching Booked Users",
      //   text2:
      //     error.message || "An error occurred while checking booked users.",
      //   position: "top",
      // });
      return;
    }
    const newStatus = status === "paused" ? "active" : "paused";
    const updated: Partial<TripDetailes> = {
      status: newStatus,
    };
    dispatch(updateTripStatus(trip_id as string, updated))
      .then(() => {
        // Toast.show({
        //   type: "success",
        //   text1: "Status Updated",
        //   text2: "The trip status has been updated successfully.",
        //   position: "top",
        // });
      })
      .catch(() => {
        // Toast.show({
        //   type: "error",
        //   text1: "Failed to Update Status",
        //   text2: "An error occurred while updating the trip status.",
        //   position: "top",
        // });
      });
  };

  const handleInstructions = (id: string) => {
    router.push(`tripInstruction?id=${id}`);
  };

  return (
    <View style={[styles.cardContainer]}>
      <Toast position="bottom" />
      {/* Image */}
      <View style={styles.imageContainer}>
        <Image source={imageSource} style={styles.image} />
      </View>
      {/* Text content */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{name}</Text>
        <View
          style={{ flexDirection: "row", alignItems: "center", columnGap: 4 }}
        >
          <Ionicons name="time-outline" size={14} color={COLORS.primary} />
          <Text style={styles.date}>{formattedDate(trip?.date)}</Text>
        </View>
        <View
          style={{ flexDirection: "row", alignItems: "center", columnGap: 4 }}
        >
          <Ionicons name="timer-outline" size={14} color={COLORS.primary} />
          <Text style={styles.date}>{formattedDate(trip?.end_date)}</Text>
        </View>
        {price && <Text style={styles.priceText}>{price} / Person</Text>}
      </View>

      {/* Status Display */}
      <View
        style={[
          styles.statusContainer,
          { backgroundColor: statusStyle.backgroundColor },
        ]}
      >
        <Text style={[styles.statusText, { color: statusStyle.color }]}>
          {status && status.charAt(0).toUpperCase() + status.slice(1)}
        </Text>
      </View>
      <Spacer />

      {/* Action Buttons */}
      <View style={[styles.actionContainer]}>
        {canDelete && (
          <ActionButton
            onPress={handleDeleteTrip}
            text="Delete"
            variant="action"
            textColor="red"
            style={[styles.actionButton]}
          />
        )}
        {status === "active" && (
          <ActionButton
            onPress={() => handleInstructions(trip_id as string)}
            text={"Instructions"}
            style={[styles.actionButton, { marginRight: 4 }]}
            variant="secondary"
          />
        )}
        {(status === "paused" || status === "active") && (
          <ActionButton
            onPress={handleChangeStatus}
            text={status === "paused" ? "Activate" : "Pause"}
            style={styles.actionButton}
          />
        )}
      </View>
    </View>
  );
};

const stylesObj = (COLORS: ColorPalette) =>
  StyleSheet.create({
    cardContainer: {
      width: "100%",
      backgroundColor: COLORS.bg_surface,
      borderRadius: 10,
      elevation: 2,
      shadowColor: "#000",
      shadowOffset: { width: 1, height: 0 },
      shadowOpacity: 0.9,
      shadowRadius: 2,
      padding: 10,
      marginBottom: 15,
      position: "relative",
    },
    imageContainer: {
      width: "100%",
      height: 80,
      justifyContent: "center",
      alignItems: "center",
    },
    image: {
      width: "100%",
      height: "100%",
      alignSelf: "center",
      borderRadius: 10,
    },
    textContainer: {
      paddingVertical: 8,
      rowGap: 4,
    },
    title: {
      fontSize: 16,
      fontWeight: "400",
      color: COLORS.textPrimary,
    },
    // rating: {
    //   fontSize: 12,
    //   color: "#999",
    // },
    priceText: {
      fontSize: 14,
      color: COLORS.accent,
      fontWeight: "400",
    },
    statusContainer: {
      padding: 6,
      paddingHorizontal: 8,
      borderRadius: 50,
      alignSelf: "flex-start",
      position: "absolute",
      top: 16,
      right: 16,
    },
    statusText: {
      fontSize: 12,
      fontWeight: "400",
      letterSpacing: 0.9,
    },
    actionContainer: {
      flexDirection: "row",
      justifyContent: "flex-end",
    },
    actionButton: {
      flex: 1,
    },
    date: {
      color: COLORS.textSecondary,
    },
  });

export default TripManagementCard;
