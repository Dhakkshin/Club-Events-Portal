import axios from "axios";
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, Alert } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { backendBase } from "../url"; // Import backendBase from "../url"

const CreateEvent = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventVenue, setEventVenue] = useState('');
  const [organization, setOrganization] = useState('');

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = (date) => {
    setEventDate(date.toISOString().split('T')[0]); // Format the date as per your requirement
    hideDatePicker();
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleTimeConfirm = (time) => {
    setEventTime(time.toLocaleTimeString()); // Format the time as per your requirement
    hideTimePicker();
  };

  const handleSubmit = async () => {
    try {
      // Retrieve JWT token from AsyncStorage
      const token = await AsyncStorage.getItem("token");

      // Make sure token exists
      if (!token) {
        Alert.alert("Error", "JWT token not found. Please log in.");
        return;
      }

      // Send a POST request to create event
      const response = await axios.post(
        `${backendBase}/create_event`,
        {
          name: eventName,
          description: eventDescription,
          date: eventDate,
          time: eventTime,
          venue: eventVenue,
          departments: ["CS", "IT"],
          years: ["1", "2"],
          organisation: organization,
          poster: "poster_url", // Adjust as necessary
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include JWT token in the Authorization header
          },
        }
      );

      // Check response and show appropriate alert
      if (response.data.message === "Event created successfully") {
        Alert.alert("Success", "Event created successfully");
        // Optionally, you can reset the form fields here
      } else {
        Alert.alert("Error", "Failed to create event");
      }
    } catch (error) {
      console.error("Error creating event:", error);
      Alert.alert("Error", "Failed to create event");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Create Event</Text>
      <TextInput
        style={styles.input}
        placeholder='Event Name'
        value={eventName}
        onChangeText={text => setEventName(text)}
      />
      <TextInput
        style={styles.descriptionInput}
        placeholder='Description of the event'
        multiline
        value={eventDescription}
        onChangeText={text => setEventDescription(text)}
      />
      <TextInput
        style={styles.input}
        placeholder='Event Venue'
        value={eventVenue}
        onChangeText={text => setEventVenue(text)}
      />
      <TextInput
        style={styles.input}
        placeholder='Organization'
        value={organization}
        onChangeText={text => setOrganization(text)}
      />
      <View style={styles.dateTimeContainer}>
        <View style={styles.dateTimePicker}>
          <TextInput
            style={styles.input}
            placeholder='Date'
            value={eventDate}
            editable={false}
          />
          <Button title="Select Date" onPress={showDatePicker} />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleDateConfirm}
            onCancel={hideDatePicker}
          />
        </View>
        <View style={styles.dateTimePicker}>
          <TextInput
            style={styles.input}
            placeholder='Time'
            value={eventTime}
            editable={false}
          />
          <Button title="Select Time" onPress={showTimePicker} />
          <DateTimePickerModal
            isVisible={isTimePickerVisible}
            mode="time"
            onConfirm={handleTimeConfirm}
            onCancel={hideTimePicker}
          />
        </View>
      </View>
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
}

export default CreateEvent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  descriptionInput: {
    height: 120,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateTimePicker: {
    flex: 1,
    marginRight: 10,
  },
});
