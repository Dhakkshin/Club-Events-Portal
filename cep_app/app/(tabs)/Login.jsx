import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import React from 'react';
const Login = () => {
  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <TextInput style={styles.input} placeholder='email id'/>
      <TextInput style={styles.input} placeholder='password' secureTextEntry={true}/>
      <View style={styles.buttonContainer}>
        <Button title="Login" />
      </View>
    </View>
  );
}
export default Login;
 
const styles = StyleSheet.create({
  container: {
    padding: 60,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 20,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    marginTop: 20,
    backgroundColor: 'red',
    borderRadius: 5,
  },
});
