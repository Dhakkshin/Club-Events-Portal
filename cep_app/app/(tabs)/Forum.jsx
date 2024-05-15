import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, TextInput, ScrollView } from "react-native";
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
        const token = await AsyncStorage.getItem("token");
        if (token) {
          const response = await axios.get(`${backendBase}/posts`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setPosts(response.data);
        } else {
          console.log("No token stored");
        }
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
      const token = await AsyncStorage.getItem("token");
      if (token) {
        const response = await axios.post(`${backendBase}/posts/create`, {
          content: newPostContent,
          // Assuming forum_id is required by the backend
          forum_id: "your_forum_id",
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Post created successfully:", response.data);
        // Refresh the posts after creating a new post
        fetchPosts();
        // Clear the new post content input
        setNewPostContent("");
      } else {
        console.log("No token stored");
      }
    } catch (error) {
      console.error("Error creating post:", error);
      setError("Error creating post");
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
          posts.map((post) => (
            <View key={post._id} style={styles.post}>
              <Text style={styles.postContent}>{post.content}</Text>
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
