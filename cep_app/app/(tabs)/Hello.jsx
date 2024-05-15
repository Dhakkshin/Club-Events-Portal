import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Hello = () => {
  const navigation = useNavigation();

  const handleProfile = () => {
    navigation.navigate('Profile');
  };

  const handleCreateEvent = () => {
    navigation.navigate('CreateEvent');
  };

  const handleUE = () => {
    navigation.navigate('UpcomingEvents');
  };
  const handleRegisteredEvents = () => {
    navigation.navigate('RegisteredEvents');
  };
  const handleStudents = () => {
    navigation.navigate('Students');
  };
  const handleForum = () => {
    navigation.navigate('Forum');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.welcomeText}>Welcome</Text>
      <TouchableOpacity style={styles.button} onPress={handleUE}>
        <Text style={styles.buttonText}>Upcoming Events</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleProfile}>
        <Text style={styles.buttonText}>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleCreateEvent}>
        <Text style={styles.buttonText}>Create Event</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleRegisteredEvents}>
        <Text style={styles.buttonText}>Registered Event</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleStudents}>
        <Text style={styles.buttonText}>Registered Students</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleForum}>
        <Text style={styles.buttonText}>Forum</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Hello;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 20,
    marginBottom: 20,
  },
  sectionContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'green',
    paddingVertical: 15,
    borderRadius: 5,
    width: 200, // Fixed width for all buttons
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
