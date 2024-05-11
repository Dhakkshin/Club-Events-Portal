import React from 'react';
import { View, Button, StyleSheet, Image } from 'react-native';

// Assuming the image file is located in the 'images' folder within your project directory
const clglogo = require('/Users/karthiksrinivas/clubevents_portal/Club-Events-Portal/cep_app/images/PSG_College_of_Technology_logo.png');
export default function HomeScreen() {
  const handlePress = () => {
    console.log("Button pressed!");
  };

  return (
    <View style={styles.container}>
      <Image source={clglogo} style={styles.logo} />
      <View style={styles.button}>
      <Button title="Get started" onPress={handlePress} color="red" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button:{
    backgroundColor:'black',
  },
  logo: {
    width: 210, // Set the width of the image
    height: 300, // Set the height of the image
    marginBottom: 20, // Add some margin below the image
  },
});
