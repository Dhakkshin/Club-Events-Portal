import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
const Event = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Event Name</Text>
      <Text style={styles.description}>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias beatae
        ipsa quo minus sint velit atque soluta recusandae veniam! Saepe
        laborum earum culpa quos quam facere, nesciunt epellendus aperiam ea.
      </Text>
      <TouchableOpacity style={styles.button} onPress={() => console.log('Register')}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <Link href="/CreateEvent">
          <Text >Login</Text>
        </Link>
    </View>
  );
};

export default Event;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#666',
  },
  button: {
    backgroundColor: '#ff4d4d',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
