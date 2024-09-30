import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import Button from "../Buttons";
import IconButton from "../IconButton";

interface TripImage {
  imageUrl: string;
  caption: string;
}
interface TripImageFormProps {
  onSubmit: (data: TripImage[]) => void;
}
const TripImageForm = ({ onSubmit }: TripImageFormProps) => {
  const [images, setImages] = useState<TripImage[]>([
    { imageUrl: "", caption: "" },
  ]);

  const handleAddImage = () => {
    setImages([...images, { imageUrl: "", caption: "" }]);
  };

  const handleSubmit = () => {
    // Validate and submit images
    onSubmit(images);
  };

  return (
    <View>
      {images.map((img, index) => (
        <View key={index}>
          <TextInput
            placeholder="Image URL"
            value={img.imageUrl}
            onChangeText={(text) => {
              const newImages = [...images];
              newImages[index].imageUrl = text;
              setImages(newImages);
            }}
          />
          <TextInput
            placeholder="Caption"
            value={img.caption}
            onChangeText={(text) => {
              const newImages = [...images];
              newImages[index].caption = text;
              setImages(newImages);
            }}
          />
        </View>
      ))}
      <View style={styles.buttons}>
        <Button
          type="secondary"
          width={"100%"}
          title="Add Another Image"
          onPress={handleAddImage}
        />
        {/* <Spacer /> */}
        <Button
          type="primary"
          width={80}
          title="Submit Trip"
          onPress={handleSubmit}
        />
      </View>
    </View>
  );
};

export default TripImageForm;
const styles = StyleSheet.create({
  buttons: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
