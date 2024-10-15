import React, { useState } from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import Button from "../Buttons";
import TextInputField from "./TextInputField";
import Spacer from "../Spacer";
import { TripImage } from "@/types/trip";
import TextNote from "./TextNote";
import Notify from "../notifications/Notify";
import Toast, { ToastShowParams } from "react-native-toast-message";

interface TripImageFormProps {
  onSubmit: (data: TripImage[]) => void;
  loading: boolean;
  msg: string;
}

const TripImageForm = ({ onSubmit, loading, msg }: TripImageFormProps) => {
  const [imageUrl, setImageUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [images, setImages] = useState<TripImage[]>([]);
  const [toastData, setToastData] = useState<ToastShowParams | null>(null); // State for toast messages

  const handleAddImage = () => {
    if (imageUrl && caption) {
      setImages([...images, { image_url: imageUrl, caption }]);
      setCaption("");
      setImageUrl("");
    } else
      setToastData({
        text1: "Invalid user inputs?",
        text2: "can't add empty values for image link, and caption",
        type: "error",
      });
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
        name={"image link"}
        onChangeText={(text) => setImageUrl(text)}
        icon="image-outline"
        onBlur={undefined}
        value={imageUrl}
        trim={false}
      />
      <TextNote
        style={{ alignSelf: "flex-start" }}
        note="Support Image links ending with .jpg, .jpeg, or .png!"
      />
      <Spacer />
      <TextInputField
        trim={false}
        name={"caption text, will appear on trip gallery"}
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
          {img.image_url ? (
            <Image
              source={{ uri: img.image_url }}
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

      {toastData && <Notify data={toastData} />}
      <Toast ref={(ref) => Toast.setRef(ref)} />
      <Button
        type="primary"
        width={"100%"}
        title="Submit Trip"
        loading={loading}
        loadingMessage={msg}
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
