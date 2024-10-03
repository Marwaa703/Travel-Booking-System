import React, { useState } from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import Button from "../Buttons";
import TextInputField from "./TextInputField";
import Spacer from "../Spacer";

interface TripImage {
  imageUrl: string;
  caption: string;
}

interface TripImageFormProps {
  onSubmit: (data: TripImage[]) => void;
}

const TripImageForm = ({ onSubmit }: TripImageFormProps) => {
  const [imageUrl, setImageUrl] = useState("");
  const [caption, setCaption] = useState("");

  const [images, setImages] = useState<TripImage[]>([]);

  const handleAddImage = () => {
    if (imageUrl && caption) {
      setImages([...images, { imageUrl, caption }]);
      setCaption("");
      setImageUrl("");
    } else alert("Can't add empty values");
  };

  const handleSubmit = () => {
    onSubmit(images);
  };

  const handleDeleteImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };
  return (
    <View>
      <TextInputField
        name={"image"}
        onChangeText={(text) => setImageUrl(text)}
        icon="image-outline"
        onBlur={undefined}
        value={imageUrl}
        trim={false}
      />
      <TextInputField
        trim={false}
        name={"caption"}
        onChangeText={(text) => setCaption(text)}
        icon="logo-closed-captioning"
        onBlur={undefined}
        value={caption}
      />

      <Spacer />
      <TouchableOpacity onPress={handleAddImage} style={styles.addButton}>
        <Text>+</Text>
      </TouchableOpacity>
      <Spacer />

      {images.map((img, index) => (
        <View key={index} style={styles.addedLocationRow}>
          {img.imageUrl ? (
            <Image
              source={{ uri: img.imageUrl }}
              style={styles.locationImage}
              onError={() =>
                setImages(
                  images.map((img, i) =>
                    i === index ? { ...img, imageUrl: "" } : img,
                  ),
                )
              }
            />
          ) : null}
          <Text style={styles.locationName}>
            {img.caption.substring(0, 30)}
            {img.caption.length >= 30 ? "..." : ""}
          </Text>
          <TouchableOpacity onPress={() => handleDeleteImage(index)}>
            <Text style={styles.deleteButton}>🗑️</Text>
          </TouchableOpacity>
        </View>
      ))}
      <Spacer />
      <Button
        type="primary"
        width={"100%"}
        title="Submit Trip"
        onPress={handleSubmit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  addButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#e0e0e0",
    marginHorizontal: "auto",
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

export default TripImageForm;
