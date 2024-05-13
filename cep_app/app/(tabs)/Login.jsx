import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Link } from 'expo-router';

const Login = ({ navigation }) => {
  const handleLogin = () => {
    // Add logic for handling login/authentication
    // Example: navigation.navigate('Home') to navigate to the Home screen after successful login
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Login</Text>
      <TextInput style={styles.input} placeholder='Email Id' keyboardType='email-address' />
      <TextInput style={styles.input} placeholder='Password' secureTextEntry={true} />
      <Link href="/Homep" style={styles.buttonContainer} onPress={handleLogin}>
        <Text style={styles.buttonText}>Logine</Text>
      </Link>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
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
  buttonContainer: {
    backgroundColor: 'red',
    paddingVertical: 15,
    borderRadius: 5,
    textAlign: 'center',
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
});
