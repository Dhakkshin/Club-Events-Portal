import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useEffect, useState } from "react";
import { Link } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Homep = () => {
  // Display the token here
  const [token, setToken] = useState("");

  useEffect(() => {
    const fetchToken = async () => {
      const token = await AsyncStorage.getItem("token");
      setToken(token);
    };

    fetchToken();
  }, []);

  return (
    <SafeAreaView>
      <Text style={styles.Welcome}>Welcome</Text>
      <View style={styles.UpcomingContainer}>
        <Text>Upcoming Events</Text>
      </View>
      <View style={styles.EventsApplied}>
        <Text>Events Applied</Text>
      </View>
      <Link href="/Event">checkout</Link>
      <Link href="/Profile">Go to Profile</Link>
      <Text>{token}</Text>
      <Text>Hello</Text>
    </SafeAreaView>
  );
};

export default Homep;

const styles = StyleSheet.create({
  Welcome: {
    fontSize: 20,
  },
  UpcomingContainer: {
    border: 20,
    height: 200,
    backgroundColor: "lightblue",
  },
  EventsApplied: {
    border: 20,
    height: 200,
    backgroundColor: "lightpink",
  },
});
