import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendBase } from "./../url";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UpcomingEvents = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUpcomingEvents = async () => {
      try {
        // Fetch JWT token from AsyncStorage
        const token = await AsyncStorage.getItem("token");

        if (!token) {
          throw new Error("Token not found");
        }

        console.log("Token retrieved:", token);

        // Make an API call to retrieve events with JWT token in headers
        const response = await axios.get(`${backendBase}/events`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Response data before filter:", response.data);

        // Filter out events that have already occurred
        const upcoming = response.data.filter(
          (event) => new Date(event.date) > new Date()
        );

        console.log("Filtered upcoming events:", upcoming);

        setUpcomingEvents(upcoming);
      } catch (error) {
        console.error("Error fetching upcoming events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUpcomingEvents();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Upcoming Events</Text>
      {loading ? (
        <Text>Loading...</Text>
      ) : upcomingEvents.length === 0 ? (
        <Text>No upcoming events</Text>
      ) : (
        upcomingEvents.map((event) => (
          <View key={event.event_id} style={styles.eventContainer}>
            <Text style={styles.eventName}>{event.name}</Text>
            <Text>Date: {event.date}</Text>
            <Text>Organization: {event.organization}</Text>
          </View>
        ))
      )}
    </View>
  );
};

export default UpcomingEvents;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  eventContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  eventName: {
    fontWeight: "bold",
    marginBottom: 5,
  },
});
