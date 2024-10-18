import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "@react-navigation/native";
import { COLORS } from "@/constants/theme";

type BlogPostProps = {
  id: number;
  name: string;
  image: string;
  description: string;
  author: string;
  readingTime: string;
  publishedTime: string;
};

const BlogPostCard: React.FC<BlogPostProps> = ({
  id,
  name,
  image,
  description,
  author,
  readingTime,
  publishedTime,
}) => {
  const navigation = useNavigation<NavigationProp<any>>();

  const handlePress = () => {
    navigation.navigate("blogDetails", { blogId: id });
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.cardContainer}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {description}
        </Text>
        <Text style={styles.meta}>
          By {author} · {readingTime} ·{" "}
          {new Date(publishedTime).toLocaleDateString()}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 10,
    backgroundColor: COLORS.bg_surface,
    borderRadius: 10,
    elevation: 2,
  },
  image: {
    width: Dimensions.get("window").width * 0.3,
    height: 100,
    borderRadius: 10,
  },
  content: {
    flex: 1,
    paddingLeft: 15,
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    // fontWeight: "bold",
    marginBottom: 5,
    color: COLORS.textPrimary,
  },
  description: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 10,
  },
  meta: {
    fontSize: 12,
    color: COLORS.textSubtitle,
  },
});

export default BlogPostCard;
