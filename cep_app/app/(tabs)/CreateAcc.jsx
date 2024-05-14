import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
const CreateAcc = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Register Here</Text>
      <TextInput style={styles.input} placeholder='Name' />
      <TextInput style={styles.input} placeholder='Roll No.' />
      <TextInput style={styles.input} placeholder='Phone' />
      <TextInput style={styles.input} placeholder='Department ex:Z for Cse ' />
      <TextInput style={styles.input} placeholder='year 1-5' keyboardType='numeric'/>
      <TextInput style={styles.input} placeholder='Password' secureTextEntry={true} />
      <TextInput style={styles.input} placeholder='Confirm Password' secureTextEntry={true} />
      <TouchableOpacity style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <View style={styles.loginContainer}>
        <Text>Already have an account? </Text>
        <Link href="/Login">
          <Text style={styles.loginLink}>Login</Text>
        </Link>
      </View>
    </View>
  )
}
export default CreateAcc;

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
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  loginLink: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});
