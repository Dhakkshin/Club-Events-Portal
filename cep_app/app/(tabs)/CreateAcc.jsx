import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const CreateAcc = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [department, setDepartment] = useState('');
  const [year, setYear] = useState('');

  const handleRegister = () => {
    const userData = {
      name,
      rollno: rollNo,
      phone,
      password,
      department,
      year,
    };
    if (password !== confirmPassword) {
      Alert.alert('Passwords do not match');
      return;
    }

    axios.post('https://flask-dbms.vercel.app/signup', userData)
      .then(res => {
        Alert.alert(res.data.message);
        // Optionally, navigate to another screen upon successful registration
      })
      .catch(error => {
        Alert.alert('Registration failed', error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Register Here</Text>
      <TextInput
        style={styles.input}
        placeholder='Name'
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder='Roll No.'
        value={rollNo}
        onChangeText={setRollNo}
      />
      <TextInput
        style={styles.input}
        placeholder='Phone'
        value={phone}
        onChangeText={setPhone}
      />
      <TextInput
        style={styles.input}
        placeholder='Department Z for CSE'
        value={department}
        onChangeText={setDepartment}
      />
      <TextInput
  style={styles.input}
  placeholder='Year 1-5'
  value={year.toString()} // Convert year to string for display
  onChangeText={(text) => {
    // Check if the entered text is a valid integer
    const parsedYear = parseInt(text);
    if (!isNaN(parsedYear)) {
      // Ensure year is between 1 and 5
      if (parsedYear >= 1 && parsedYear <= 5) {
        setYear(parsedYear); // Set year as integer
      }
    }
  }}
  keyboardType='numeric'
/>
      <TextInput
        style={styles.input}
        placeholder='Password'
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder='Confirm Password'
        secureTextEntry={true}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <TouchableOpacity style={styles.buttonContainer} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <View style={styles.loginContainer}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginLink}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
