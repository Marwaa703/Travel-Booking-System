import React, { useState } from "react";
import { View, Text, TextInput, Dimensions } from "react-native";
import Button from "../Buttons";
import Spacer from "../Spacer";
import { Location } from "@/constants/types";
import IconButton from "../IconButton";
interface TripLocationFormProps {
  onNext: (locations: Location[]) => void;
}
const TripLocationForm = ({ onNext }: TripLocationFormProps) => {
  const [locations, setLocations] = useState<Location[]>([
    { order: 1, lat: 0, long: 0, imageUrl: "", name: "" },
  ]);

  const handleAddLocation = () => {
    setLocations([
      ...locations,
      { order: locations.length + 1, lat: 0, long: 0, imageUrl: "", name: "" },
    ]);
  };

  const handleSubmit = () => {
    // Validate and submit locations
    onNext(locations);
  };

  return (
    <View style={{}}>
      {locations.map((loc, index) => (
        <View key={index} style={{ width: "100%" }}>
          <TextInput
            placeholder="Location Name"
            value={loc.name}
            onChangeText={(text) => {
              const newLocations = [...locations];
              newLocations[index].name = text;
              setLocations(newLocations);
            }}
          />
          <TextInput
            placeholder="Latitude"
            value={String(loc.lat)}
            keyboardType="numeric"
            onChangeText={(text) => {
              const newLocations = [...locations];
              newLocations[index].lat = Number(text);
              setLocations(newLocations);
            }}
          />
          <TextInput
            placeholder="Longitude"
            value={String(loc.long)}
            keyboardType="numeric"
            onChangeText={(text) => {
              const newLocations = [...locations];
              newLocations[index].long = Number(text);
              setLocations(newLocations);
            }}
          />
          {/* Add Image URL Input */}
          <TextInput
            placeholder="Image URL"
            value={loc.imageUrl}
            onChangeText={(text) => {
              const newLocations = [...locations];
              newLocations[index].imageUrl = text;
              setLocations(newLocations);
            }}
          />
        </View>
      ))}

      <Button
        type="primary"
        width={80}
        title="Add Another Location"
        onPress={handleAddLocation}
      />
      <Spacer />
      <IconButton title="Next" onPress={handleSubmit} direction="next" />
    </View>
  );
};

export default TripLocationForm;
