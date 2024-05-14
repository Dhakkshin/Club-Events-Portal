import React, { useContext } from 'react';
import { View, Button, StyleSheet, Image,Text } from 'react-native';
import {Link} from 'expo-router';
// Assuming the image file is located in the 'images' folder within your project directory
const clglogo = require('./../../assets/images/PSG_College_of_Technology_logo.png');
const GetStarted = () => {
    const handlePress = () => {
        console.log("Button pressed!");
      };
      return (
        <View style={styles.container}>
          <Image source={clglogo} style={styles.logo} />
          <View style={styles.button}>
          <Link href="/CreateAcc" style={{color:'white'}}>Get Started</Link>
          </View>
        </View>
      );
}

export default GetStarted

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
      width: 210, 
      height: 300, 
      marginBottom: 20, 
    },
  });
  