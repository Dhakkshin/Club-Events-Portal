import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";

const CreateEvent = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = (date) => {
    setEventDate(date.toDateString()); // Format the date as per your requirement
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

  const handleSubmit = () => {
    // Add your submit logic here
    console.log("Event Name:", eventName);
    console.log("Event Description:", eventDescription);
    console.log("Event Date:", eventDate);
    console.log("Event Time:", eventTime);
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
