import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import LocationSearch from "../LocationSearch";
import TextInputField from "./TextInputField";
import { Location } from "@/types/trip";
import Spacer from "../Spacer";
import Button from "../Buttons";
import TextNote from "./TextNote";
import LocationPicker from "../maps/LocationPicker";

interface TripLocationFormProps {
  onNext: (locations: Location[]) => void;
}

const TripLocationForm: React.FC<TripLocationFormProps> = ({ onNext }) => {
  const [placeholder, setPlaceholder] = useState("Search for places");

  const [locations, setLocations] = useState<Location[]>([]);
  const [imageUrl, setImageUrl] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<{
    name: string;
    lat: number;
    lon: number;
  } | null>(null);

  const handleAddLocation = () => {
    if (imageUrl && selectedLocation) {
      setLocations([
        ...locations,
        {
          ...selectedLocation,
          location_order: locations.length + 1,
          image_url: imageUrl,
        },
      ]);
      setImageUrl(""); // Clear the image URL input after adding
      setSelectedLocation(null);
      setPlaceholder("Search for places");
    }
  };

  const handleSelectLocation = (location: {
    name: string;
    lat: number;
    lon: number;
  }) => {
    setSelectedLocation(location);
  };

  const handleDeleteLocation = (index: number) => {
    setLocations(locations.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    onNext(locations);
  };

  return (
    <View>
      <View style={styles.locationRow}>
        <TextNote
          note="Write location name, and choose pick it from map?"
          style={{ alignSelf: "flex-start" }}
        />
        <Spacer height={4} />
        <View style={styles.row}>
          <View style={{ width: "88%" }}>
            <TextInputField
              trim={false}
              name={"location Name"}
              onChangeText={(text) => setImageUrl(text)}
              icon="image-outline"
              onBlur={undefined}
              value={imageUrl}
            />
          </View>
          <LocationPicker
            onLocationSelect={(lat, lon) => console.log({ loc: { lat, lon } })}
          />
        </View>
        <Spacer />
        <TextNote
          note="or search for the location here..!"
          style={{ alignSelf: "flex-start" }}
        />
        <View style={styles.row}>
          <View style={{ width: "88%" }}>
            <LocationSearch
              placeholder={placeholder}
              setPlaceholder={setPlaceholder}
              onSelectLocation={(location) => handleSelectLocation(location)}
            />
          </View>
        </View>
        <Spacer />
        <TextInputField
          trim={false}
          name={"location Image link"}
          onChangeText={(text) => setImageUrl(text)}
          icon="image-outline"
          onBlur={undefined}
          value={imageUrl}
        />
        <TextNote
          style={{ alignSelf: "flex-start" }}
          note="Support Image links ending with .jpg, .jpeg, or .png!"
        />

        <Spacer />

        <Spacer />
        <TouchableOpacity onPress={handleAddLocation} style={styles.addButton}>
          <Text>+</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.addedLocationsContainer}>
        {locations.length === 0 && (
          <Text>Add locations to be displayed here</Text>
        )}
        {locations.map((loc, index) => (
          <View key={index} style={styles.addedLocationRow}>
            {loc.image_url ? (
              <Image
                source={{ uri: loc.image_url }}
                style={styles.locationImage}
                onError={() =>
                  setLocations(
                    locations.map((l, i) =>
                      i === index ? { ...l, imageUrl: "" } : l,
                    ),
                  )
                }
              />
            ) : null}
            <Text style={styles.locationName}>{loc.name.substring(0, 30)}</Text>
            <TouchableOpacity onPress={() => handleDeleteLocation(index)}>
              <Text style={styles.deleteButton}>🗑️</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <Button title="Next" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  locationRow: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  addButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#e0e0e0",
  },
  addedLocationsContainer: {
    marginTop: 16,
    marginBottom: 16,
  },
  addedLocationRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 8,
  },
  locationImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 8,
  },
  locationName: {
    flex: 1,
    marginLeft: 8,
    maxWidth: 100,
  },
  deleteButton: {
    marginLeft: 8,
  },
});
export default TripLocationForm;
