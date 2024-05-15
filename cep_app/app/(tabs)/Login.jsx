import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { backendBase } from "./../url";
import { useNavigation } from "@react-navigation/native";

const Login = () => {
  const navigation = useNavigation();

  const [rollNo, setRollNo] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State variable for error message

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${backendBase}/login`, {
        rollno: rollNo.toLowerCase(),
        password: password,
      });

      if (response.status === 200) {
        const token = response.data.access_token;
        await AsyncStorage.setItem("token", token);
        navigation.push("Hello");
        setRollNo("");
        setPassword("");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Invalid credentials
        setErrorMessage("Invalid credentials. Please try again.");
      } else {
        // Other errors
        setErrorMessage("An error occurred. Please try again later.");
      }
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
      {errorMessage !== "" && (
        <Text style={styles.errorText}>{errorMessage}</Text>
      )}
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
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    backgroundColor: "red",
    paddingVertical: 15,
    borderRadius: 5,
    textAlign: "center",
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
  },
  errorText: {
    textAlign: "center",
    color: "red",
    marginBottom: 10,
  },
});
