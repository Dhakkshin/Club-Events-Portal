import axios from "axios";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { backendBase } from './../url';

const Profile = () => {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          const response = await axios.get(`${backendBase}/profile`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setProfileData(response.data);
        } else {
          console.log("No token stored");
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, []);

  return (
    <View style={styles.container}>
      {profileData && (
        <>
          <View style={[styles.row, styles.rowContainer]}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.text}>{profileData.name}</Text>
          </View>
          <View style={[styles.row, styles.rowContainer]}>
            <Text style={styles.label}>Department:</Text>
            <Text style={styles.text}>{profileData.department}</Text>
          </View>
          <View style={[styles.row, styles.rowContainer]}>
            <Text style={styles.label}>Year:</Text>
            <Text style={styles.text}>{profileData.year}</Text>
          </View>
          <View style={[styles.row, styles.rowContainer]}>
            <Text style={styles.label}>Roll No:</Text>
            <Text style={styles.text}>{profileData.rollno}</Text>
          </View>
          <View style={[styles.row, styles.rowContainer]}>
            <Text style={styles.label}>Phone:</Text>
            <Text style={styles.text}>{profileData.phone}</Text>
          </View>
        </>
      )}
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowContainer: {
    marginBottom: 10, // Add some space between each row
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 5,
    color: "#333", // Dark gray color for labels
  },
  text: {
    fontSize: 16,
    color: "#555", // Medium gray color for text
  },
});
