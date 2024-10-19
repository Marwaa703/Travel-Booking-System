/* eslint-disable react-native/no-unused-styles */
import React from "react";
import {
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { ColorPalette, COLORS } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";

interface BlogPost {
  id: number;
  title: string;
  image: string;
}

interface OldestPostCardProps {
  post: BlogPost;
  onPress: () => void;
}

const { width } = Dimensions.get("window");
const cardWidth = width / 2 - 40;

const OldestPostCard: React.FC<OldestPostCardProps> = ({ post, onPress }) => {
  // configure styles
  const theme = useTheme();
  const styles = stylesObj(theme);
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: post.image }} style={styles.image} />
      <Text style={styles.title}>{post.title}</Text>
    </TouchableOpacity>
  );
};

const stylesObj = (COLORS: ColorPalette) =>
  StyleSheet.create({
    card: {
      width: cardWidth,
      marginBottom: 20,
      borderRadius: 8,
      overflow: "hidden",
      backgroundColor: COLORS.bg,
      marginRight: 10,
    },
    image: {
      width: "100%",
      height: 150,
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
    },
    title: {
      padding: 10,
      textAlign: "center",
      fontSize: 16,
      fontWeight: "bold",
      color: COLORS.textPrimary,
    },
  });

export default OldestPostCard;
