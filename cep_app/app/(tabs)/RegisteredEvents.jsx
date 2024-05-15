import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { backendBase } from "./../url";

const RegisteredEvents = () => {
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRegisteredEvents = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          throw new Error("Token not found");
        }

        const response = await axios.get(`${backendBase}/registered_events`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setRegisteredEvents(response.data);
      } catch (error) {
        console.error("Error fetching registered events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRegisteredEvents();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Registered Events</Text>
      {loading ? (
        <Text>Loading...</Text>
      ) : registeredEvents.length === 0 ? (
        <Text>No registered events</Text>
      ) : (
        registeredEvents.map((event) => (
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

export default RegisteredEvents;
