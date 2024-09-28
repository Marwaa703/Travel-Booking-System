/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, SafeAreaView, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { COLORS, SHADOWS } from "@/constants/theme"; 
import blogsData from "@/blogs.json"; 
import { Ionicons } from '@expo/vector-icons';

interface Blog {
  id: number;
  title: string;
  author: string;
  readingTime: string;
  publishedTime: string;
  description: string;
  image: string;
}

const BlogDetails: React.FC = () => {
  const route = useRoute();
  const { blogId } = route.params as { blogId: number }; 
  const [blog, setBlog] = useState<Blog | null>(null); 

  useEffect(() => {
    const allBlogs = [...blogsData.recent_blogs, ...blogsData.oldest_blogs];
    const foundBlog = allBlogs.find((b: Blog) => b.id === blogId);
    setBlog(foundBlog || null); 
  }, [blogId]);

  if (!blog) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header Section */}
        <View style={styles.headerContainer}>
          <View style={styles.header}>
            <Ionicons name="person-circle-outline" size={30} color={COLORS.primary} />
            <Ionicons name="notifications-outline" size={30} color={COLORS.primary} />
          </View>
          <View style={styles.welcomeContainer}>
            <Text style={styles.title}>{blog.title}</Text>
          </View>
        </View>
        
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: blog.image }} style={styles.image} />
          </View>
          <Text style={styles.meta}>
            By {blog.author} · {blog.readingTime} · {new Date(blog.publishedTime).toLocaleDateString()}
          </Text>
          <Text style={styles.description}>{blog.description}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 13,
    backgroundColor: '#fff',
    marginBottom:50,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    // marginBottom: 2,
    color: COLORS.secondary,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: SHADOWS.large.shadowColor,
    shadowOffset: SHADOWS.large.shadowOffset,
    shadowOpacity: SHADOWS.large.shadowOpacity,
    shadowRadius: SHADOWS.large.shadowRadius,
    elevation: SHADOWS.large.elevation,
  },
  image: {
    width: Dimensions.get('window').width * 0.95, 
    height: Dimensions.get('window').height * 0.4, 
    borderRadius: 10,
  },
  meta: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 15,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
    color: COLORS.textPrimary,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 25,
    marginBottom:1
  },
  headerContainer: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  welcomeContainer: {
    marginTop: 30,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    shadowColor: SHADOWS.large.shadowColor,
    shadowOffset: SHADOWS.large.shadowOffset,
    shadowOpacity: SHADOWS.large.shadowOpacity,
  },
});

export default BlogDetails;