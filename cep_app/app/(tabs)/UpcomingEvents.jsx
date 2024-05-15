import { StyleSheet, Text, View, Button, Modal, Alert, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendBase } from "./../url";
import AsyncStorage from "@react-native-async-storage/async-storage";


const UpcomingEvents = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

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

  const openEventDetails = async (eventId) => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        throw new Error("Token not found");
      }

      const response = await axios.get(`${backendBase}/event/${eventId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSelectedEvent(response.data);
      setModalVisible(true);
    } catch (error) {
      console.error("Error fetching event details:", error);
    }
  };

  const registerForEvent = async (eventId) => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        throw new Error("Token not found");
      }

      const response = await axios.post(
        `${backendBase}/register_event/${eventId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Registration response:", response.data);
      Alert.alert(response.data.message);
      // You can handle success or failure here, such as displaying a message to the user
    } catch (error) {
      console.error("Error registering for event:", error);
    }
  };

  return (
    <ScrollView>
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
            <View style={styles.buttonContainer}>
              <Button
                title="View Details"
                onPress={() => openEventDetails(event.event_id)}
              />
              <Button
                title="Register"
                onPress={() => registerForEvent(event.event_id)}
              />
            </View>
          </View>
        ))
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalHeader}>Event Details</Text>
          {selectedEvent && (
            <View style={styles.eventDetailsContainer}>
              <Text>Name: {selectedEvent.name}</Text>
              <Text>Date: {selectedEvent.date}</Text>
              <Text>Description: {selectedEvent.description}</Text>
              {/* Add more details here */}
            </View>
          )}
          <Button
            title="Close"
            onPress={() => setModalVisible(false)}
          />
        </View>
      </Modal>
    </View>
    </ScrollView>
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalHeader: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  eventDetailsContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
});
