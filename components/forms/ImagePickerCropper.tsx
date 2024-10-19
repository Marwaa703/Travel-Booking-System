/* eslint-disable react-native/no-unused-styles */
import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { ColorPalette, COLORS, FONTS } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";

interface ImagePickerCropperProps {
  onSelectImage: (uri: string) => void;
}

const ImagePickerCropper = ({ onSelectImage }: ImagePickerCropperProps) => {
  // configure styles
  const theme = useTheme();
  const styles = stylesObj(theme);
  const pickImage = async () => {
    // Request permission to access the camera roll
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    // Launch the image picker with editing enabled and square aspect ratio
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true, // Enable editing
      aspect: [1, 1], // Set aspect ratio to square
      quality: 1,
    });

    if (!pickerResult.canceled && pickerResult.assets) {
      const editedImageUri = pickerResult.assets[0].uri;

      if (onSelectImage) onSelectImage(editedImageUri); // Call the callback with the image URI
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImage}>
        <Text style={styles.changeProfileText}>Change Profile Picture</Text>
      </TouchableOpacity>
    </View>
  );
};

const stylesObj = (COLORS: ColorPalette) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },

    changeProfileText: {
      color: COLORS.secondary,
      marginTop: 10,
      fontSize: FONTS.small,
    },
  });

export default ImagePickerCropper;
