/* eslint-disable react-native/no-unused-styles */
import { Image, StyleSheet, Text, View } from "react-native";
import React, { memo } from "react";
import { Marker } from "react-native-maps";
import { Location } from "@/types/trip";
import { ColorPalette } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";

interface CustomMarkerProps {
  location: Location;
}
const CustomMarker = memo(
  function CustomMarker({ location }: CustomMarkerProps) {
    // configure styles
    const theme = useTheme();
    const styles = stylesObj(theme);
    return (
      <Marker
        coordinate={{ latitude: location?.lat, longitude: location?.lon }}
        title={location?.name}

        //   style={{ width: 80, height: 80 }}
      >
        <View style={styles.markerContainer}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: location?.image_url }} style={styles.image} />
          </View>
          <View style={styles.orderContainer}>
            <Text style={styles.orderText}>{location?.location_order}</Text>
          </View>
        </View>
      </Marker>
    );
  },
  (prevProps, nextProps) => prevProps.location === nextProps.location,
);

export default CustomMarker;

const stylesObj = (COLORS: ColorPalette) =>
  StyleSheet.create({
    markerContainer: {
      alignItems: "center",
    },
    imageContainer: {
      borderRadius: 50,
      overflow: "hidden",
      width: 80,
      height: 80,
    },
    image: {
      width: "100%",
      height: "100%",
    },
    orderContainer: {
      position: "absolute",
      top: 10, // Position the order text inside the image
      backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
      borderRadius: 20,
      padding: 0,
      width: 25,
      height: 25,
      justifyContent: "center",
      alignItems: "center",
    },
    orderText: {
      color: "white",
      fontSize: 16,
      fontWeight: "bold",
    },
  });
