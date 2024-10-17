import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Modal, Alert, TouchableOpacity } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import Button from "../Buttons";
import * as Location from "expo-location";
import { COLORS, FONTS } from "@/constants/theme";

interface LocationPickerProps {
  onLocationSelect: (latitude: number, longitude: number) => void; // Function to return selected location
  active?: boolean;
}

const LocationPicker: React.FC<LocationPickerProps> = ({
  onLocationSelect,
  active = false,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [mapRegion, setMapRegion] = useState<Region>({
    latitude: 30.0444, // Cairo latitude
    longitude: 31.2357, // Cairo longitude
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const handleMapPress = (event: any) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedLocation({ latitude, longitude });
  };

  const handleConfirmSelection = () => {
    if (selectedLocation) {
      onLocationSelect(selectedLocation.latitude, selectedLocation.longitude);
      setIsModalVisible(false); // Close the modal after selection
    } else {
      Alert.alert("Please select a location on the map.");
    }
  };

  const handleLocateUser = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status === "granted") {
      let location = await Location.getCurrentPositionAsync({});
      const newUserLocation = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setUserLocation(newUserLocation); // Set user location

      // Center the map on the user's location
      setSelectedLocation(newUserLocation); // Update selected location to user location
      setMapRegion({
        ...newUserLocation,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    } else {
      Alert.alert("Permission to access location was denied.");
    }
  };
  useEffect(() => {}, [userLocation?.latitude]);

  return (
    <View style={styles.container}>
      <Ionicons
        name="location"
        size={30}
        color={active ? COLORS.accent : COLORS.primary}
        onPress={() => setIsModalVisible(true)}
      />

      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <MapView
            style={styles.map}
            region={mapRegion}
            onPress={handleMapPress}
          >
            {selectedLocation && <Marker coordinate={selectedLocation} />}
            {userLocation && (
              <Marker
                coordinate={userLocation}
                pinColor="blue"
                title="Your Location"
              />
            )}
          </MapView>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.myLocation}
              onPress={handleLocateUser}
            >
              <Ionicons
                name="locate-outline"
                size={26}
                color={COLORS.primary}
              />
            </TouchableOpacity>
            <Button
              width={"80%"}
              fontSize={FONTS.small}
              title="Confirm Location"
              onPress={handleConfirmSelection}
            />

            <Button
              width={"60%"}
              fontSize={FONTS.small}
              title="Cancel"
              onPress={() => setIsModalVisible(false)}
              type="secondary"
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: 10,
    position: "absolute",
    bottom: 0, // Position buttons at the bottom
    marginHorizontal: "auto",
    marginLeft: 10,
  },
  myLocation: {
    width: 40,
    height: 40,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    marginEnd: 10,
  },
});

export default LocationPicker;
