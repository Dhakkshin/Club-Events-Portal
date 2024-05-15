import React from 'react';
import { View, Button, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Assuming the image file is located in the 'images' folder within your project directory
const clglogo = require('./../../assets/images/PSG_College_of_Technology_logo.png');

const GetStarted = () => {
    const navigation = useNavigation();

    const handlePress = () => {
        navigation.navigate('CreateAcc');
    };

    return (
        <View style={styles.container}>
            <Image source={clglogo} style={styles.logo} />
            <View style={styles.button}>
                <Button title="Get Started" onPress={handlePress} color="transparent" />
            </View>
        </View>
    );
}

export default GetStarted;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: 'black',
    },
    logo: {
        width: 210,
        height: 300,
        marginBottom: 20,
    },
});
