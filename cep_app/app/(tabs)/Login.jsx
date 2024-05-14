import React, { useContext } from 'react';
import { StyleSheet, Text, View, TextInput, Touchable, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

const Login = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Login</Text>
      <TextInput style={styles.input} placeholder='Roll No.'  />
      <TextInput style={styles.input} placeholder='Password' secureTextEntry={true} />
      <TouchableOpacity>
      <Link href="/Homep" style={styles.buttonContainer} >
        <Text style={styles.buttonText}>Login</Text>
      </Link>
      </TouchableOpacity>
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
