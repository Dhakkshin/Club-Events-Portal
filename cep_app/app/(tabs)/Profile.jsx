import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

const Profile = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Name: S Karthik Srinivas</Text>
      <Text style={styles.text}>Roll No: -22Z31</Text>
      <Button title="Logout" onPress={() => console.log("Logout button pressed")} />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
});
