import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const PaperCard = () => {
  return (
    <View key={paper.paperId} style={styles.paperItem}>
      <Text style={styles.paperTitle}>Paper {paper.paperId}</Text>
      <TouchableOpacity onPress={() => handleImagePress(paper.imageUrl)}>
        <Image source={{ uri: paper.imageUrl }} style={styles.paperImage} />
      </TouchableOpacity>
    </View>
  );
};

export default PaperCard;

const styles = StyleSheet.create({});
