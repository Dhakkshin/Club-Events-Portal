import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
const Homep = () => {
  return (
    <SafeAreaView>
        <Text style={styles.Welcome}>
        Welcome
        </Text>
        <View style={styles.UpcomingContainer}>
            <Text>Upcoming Events</Text>
        </View>
        <View style={styles.EventsApplied}>
            <Text>Events Applied</Text>
        </View>
    </SafeAreaView>
  )
}

export default Homep

const styles = StyleSheet.create({
    Welcome:{
        fontSize:20,
    },
    UpcomingContainer:{

        border:20,
        height:200,
        backgroundColor:'lightblue',

    },
    EventsApplied:{
        border:20,
        height:200,
        backgroundColor:'lightpink'
    }
})