import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTS, SHADOWS } from "@/constants/theme";
import CategoryCard from "@/components/blogs/CategoryCard";
import { categories, recent_blogs, oldest_blogs } from "@/DummyData/blogs.json";
import BlogPostCard from "@/components/blogs/BlogPostCard";
import Ionicons from "@expo/vector-icons/Ionicons";
import OldestPostCard from "@/components/blogs/OldestPostCard";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "@react-navigation/native";
import Hero from "@/components/core/Hero";
import { travelerImage1, travelerImage2 } from "@/constants/icons";
import Header from "@/components/core/Header";
import ScreenWraper from "@/components/containers/ScreenWraper";
import { bottomTabsHeight } from "@/constants/dimentions";

interface Blog {
  id: number;
  title: string;
  image: string;
  description: string;
  author: string;
  readingTime: string;
  publishedTime: string;
  category: string;
}

interface Category {
  name: string;
  image: string;
}

const Blogs: React.FC = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  const renderCategory = ({ item }: { item: Category }) => (
    <View key={item.name}>
      <CategoryCard
        title={item.name}
        image={item.image}
        onPress={() => toggleCategory(item.name)}
      />
      {/* Show posts if the category is expanded */}
      {expandedCategories.includes(item.name) && (
        <FlatList
          data={[
            ...recent_blogs.filter((post) => post.category === item.name),
            ...oldest_blogs.filter((post) => post.category === item.name),
          ]}
          keyExtractor={(post) => post.id.toString()}
          renderItem={({ item: post }: { item: Blog }) => (
            <OldestPostCard
              post={post}
              onPress={() =>
                navigation.navigate("blogDetails", { blogId: post.id })
              }
            />
          )}
          numColumns={2}
          columnWrapperStyle={styles.row}
          ListEmptyComponent={() => (
            <View style={styles.emptyStateContainer}>
              <Text style={styles.emptyStateText}>
                No posts found in this category
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );

  const renderBlogPostCard = ({ item }: { item: Blog }) => (
    <BlogPostCard
      id={item.id}
      name={item.title}
      image={item.image}
      description={item.description}
      author={item.author}
      readingTime={item.readingTime}
      publishedTime={item.publishedTime}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <>
            {/* Header Section */}
            <Header title="Our Blogs" rightIcon="" leftIcon="" />
            <View style={styles.headerContainer}>
              {/* <View style={styles.header}>
                <Ionicons
                  name="person-circle-outline"
                  size={30}
                  color={COLORS.primary}
                />
                <Ionicons
                  name="notifications-outline"
                  size={30}
                  color={COLORS.primary}
                />
              </View> */}
              <Hero travelerImage={travelerImage1} />

              {/* <View style={styles.welcomeContainer}>
                <Text style={styles.welcomeText}>
                  Explore the Latest Travel Blogs & Updates
                </Text>
              </View> */}

              {/* Categories Section */}
              <Text style={styles.sectionTitle}>Categories</Text>
              <FlatList
                data={categories}
                keyExtractor={(category) => category.name}
                renderItem={renderCategory}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollView}
              />
            </View>
          </>
        }
        data={recent_blogs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderBlogPostCard}
        ListEmptyComponent={() => (
          <View style={styles.emptyStateContainer}>
            <Text style={styles.emptyStateText}>No recent blogs found</Text>
          </View>
        )}
        ListFooterComponent={
          <>
            {/* Old Posts Section */}
            <Text style={styles.sectionTitle}>Old Posts</Text>
            <FlatList
              data={oldest_blogs}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }: { item: Blog }) => (
                <OldestPostCard
                  post={item}
                  onPress={() =>
                    navigation.navigate("blogDetails", { blogId: item.id })
                  }
                />
              )}
              numColumns={2}
              columnWrapperStyle={styles.row}
              ListEmptyComponent={() => (
                <View style={styles.emptyStateContainer}>
                  <Text style={styles.emptyStateText}>No old blogs found</Text>
                </View>
              )}
            />
          </>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
    paddingBottom: bottomTabsHeight,
  },
  // header: {
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   paddingHorizontal: 10,
  //   marginVertical: 10,
  // },
  headerContainer: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: COLORS.bg,
  },
  // welcomeContainer: {
  //   marginBottom: 30,
  //   paddingHorizontal: 10,
  //   backgroundColor: "#fff",
  //   shadowColor: SHADOWS.large.shadowColor,
  //   shadowOffset: SHADOWS.large.shadowOffset,
  //   shadowOpacity: SHADOWS.large.shadowOpacity,
  // },
  // welcomeText: {
  //   fontSize: 35,
  //   fontWeight: "bold",
  //   color: COLORS.textPrimary,
  // },
  scrollView: {
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 24,
    // fontWeight: "bold",
    marginVertical: 10,
    paddingHorizontal: 10,
    color: COLORS.textPrimary,
    marginBottom: 10,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyStateText: {
    fontSize: 18,
    color: COLORS.textSecondary,
  },
  row: {
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
});

export default Blogs;
