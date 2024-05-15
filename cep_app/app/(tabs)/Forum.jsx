import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, TextInput, ScrollView, Alert } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { backendBase } from './../url';

const Forum = () => {
  const [posts, setPosts] = useState([]);
  const [newPostContent, setNewPostContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        console.log("Fetching posts...");
        const response = await axios.get(`${backendBase}/posts`);
        console.log("Request:", `${backendBase}/posts`);
        console.log("Response:", response.data);
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError("Error fetching posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const createPost = async () => {
    try {
      // Retrieve JWT token from AsyncStorage
      const token = await AsyncStorage.getItem("token");

      console.log("Creating post...");
      const response = await axios.post(
        `${backendBase}/posts/create`,
        {
          content: newPostContent,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Request:", `${backendBase}/posts/create`);
      console.log("Request Body:", {
        content: newPostContent,
      });
      console.log("Response:", response.data);
      console.log("Post created successfully:", response.data);

      // Add the newly created post to the posts array
      setPosts([...posts, response.data]);

      // Clear the new post content input
      setNewPostContent("");
    } catch (error) {
      console.error("Error creating post:", error);
      Alert.alert("Error", "Failed to create post");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Forum</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      <ScrollView style={styles.postContainer}>
        {loading ? (
          <Text>Loading posts...</Text>
        ) : posts.length === 0 ? (
          <Text>No posts available</Text>
        ) : (
          posts.map((post, index) => (
            <View key={index} style={styles.post}>
             
              <Text style={styles.postContent}>{post.content}</Text>
              <Text>{post.author_id}</Text>
              <Text style={styles.postDate}>Posted on: {post.post_date}</Text>
            </View>
          ))
        )}
      </ScrollView>
      <TextInput
        style={styles.input}
        placeholder="Write your post here"
        value={newPostContent}
        onChangeText={setNewPostContent}
      />
      <Button title="Create Post" onPress={createPost} />
    </View>
  );
};

export default Forum;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  postContainer: {
    marginBottom: 20,
  },
  post: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  postContent: {
    fontSize: 16,
    marginBottom: 5,
  },
  postDate: {
    fontSize: 12,
    color: "#888",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
});
