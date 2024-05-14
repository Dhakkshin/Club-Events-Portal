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
          <Text style={styles.text}>Name: {profileData.name}</Text>
          <Text style={styles.text}>Department: {profileData.department}</Text>
          <Text style={styles.text}>Year: {profileData.year}</Text>
          <Text style={styles.text}>Roll No: {profileData.rollno}</Text>
          <Text style={styles.text}>Phone: {profileData.phone}</Text>
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
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
});