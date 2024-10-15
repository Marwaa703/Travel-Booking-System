import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { TripStatus } from "@/types/trip"; // Importing TripStatus type
import ActionButton from "../buttons/ActionButton";

const defaultImage = require("@/assets/imgDefault.png");

interface TripManagementCardProps {
  id: string;
  image: string;
  title: string;
  rating: number | null;
  price?: number;
  status: TripStatus;
  handleEdit: (tripId: string) => void;
  handleDelete: (tripId: string) => void;
  handleChangeStatus: (tripId: string, newStatus: TripStatus) => void;
}

const TripManagementCard: React.FC<TripManagementCardProps> = ({
  id,
  image,
  title,
  rating,
  price,
  status,
  handleEdit,
  handleDelete,
  handleChangeStatus,
}) => {
  const imageSource = image ? { uri: image } : defaultImage;

  const canDelete = status === "paused" || status === "canceled";

  const getStatusStyle = () => {
    switch (status) {
      case "active":
        return { backgroundColor: "lightgreen", color: "green" };
      case "paused":
        return { backgroundColor: "lightyellow", color: "goldenrod" };
      case "canceled":
        return { backgroundColor: "lightcoral", color: "red" };
      case "completed":
        return { backgroundColor: "lightblue", color: "blue" };
      default:
        return { backgroundColor: "#fff", color: "#000" };
    }
  };

  const statusStyle = getStatusStyle();

  return (
    <View
      style={[
        styles.cardContainer,
        {
          borderRightWidth: status === "active" ? 2 : 0,
          borderRightColor: "green",
        },
      ]}
    >
      {/* Image */}
      <View style={styles.imageContainer}>
        <Image source={imageSource} style={styles.image} />
      </View>

      {/* Text content */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.rating}>Rating: {rating}</Text>
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
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionContainer}>
        {status !== "active" && (
          <ActionButton
            onPress={() =>
              handleChangeStatus(id, status === "paused" ? "active" : "paused")
            }
            text={status === "paused" ? "Activate" : "Pause"}
            style={styles.actionButton}
          />
        )}
        {canDelete && (
          <ActionButton
            onPress={() => handleDelete(id)}
            text="Delete"
            variant="action"
            textColor="red"
            style={styles.actionButton}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 2,
    padding: 10,
    marginBottom: 15,
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
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  rating: {
    fontSize: 12,
    color: "#999",
  },
  priceText: {
    fontSize: 12,
    color: "#007BFF",
    fontWeight: "bold",
  },
  statusContainer: {
    padding: 5,
    borderRadius: 5,
    alignSelf: "flex-start",
    marginTop: 10,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 5,
  },
});

export default TripManagementCard;
