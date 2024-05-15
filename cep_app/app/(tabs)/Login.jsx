import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { backendBase } from "./../url";
import { useNavigation } from '@react-navigation/native';
const Login = () => {
  const navigation = useNavigation();

  const [rollNo, setRollNo] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    console.log("Login button pressed");
    try {
      const response = await axios.post(`${backendBase}/login`, {
        rollno: rollNo.toLowerCase(), // Convert rollNo to lowercase before sending
        password: password,
      });
      console.log("API call made");
      console.log("Response status:", response.status);
      console.log("Response data:", response.data);

      if (response.status === 200) {
        const token = response.data.access_token;
        await AsyncStorage.setItem("token", token);
        console.log("Token saved to AsyncStorage");
        const retrieved = await AsyncStorage.getItem("token");
        console.log("Retrieved token:", retrieved);
        navigation.push('Hello');

        // Clear input fields
        setRollNo("");
        setPassword("");
      }
    } catch (error) {
      console.log("API call failed");
      console.log(error.response ? error.response.data : error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Roll No."
        value={rollNo}
        onChangeText={setRollNo}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.buttonContainer} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};


export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    backgroundColor: "red",
    backgroundColor: "red",
    paddingVertical: 15,
    borderRadius: 5,
    textAlign: "center",
    textAlign: "center",
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
  },
});
