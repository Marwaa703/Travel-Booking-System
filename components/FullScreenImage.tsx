import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import { FONTS } from "@/constants/theme";

interface FullScreenImageModalProps {
  visible: boolean;
  imageUrl: string;
  onClose: () => void;
}

const FullScreenImage: React.FC<FullScreenImageModalProps> = ({
  visible,
  imageUrl,
  onClose,
}) => {
  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.modalContainer}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
        <Image
          source={{ uri: imageUrl }}
          style={styles.fullScreenImage}
          contentFit="contain"
          resizeMode="center"
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  closeButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 1000,
  },
  closeButtonText: {
    fontSize: FONTS.large,
    color: "#fff",
  },
  fullScreenImage: {
    width: "100%",
    height: "100%",
  },
});

export default FullScreenImage;
