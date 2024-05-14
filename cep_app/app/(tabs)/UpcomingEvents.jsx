import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendBase } from './../url'

const UpcomingEvents = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUpcomingEvents = async () => {
      try {
        // Fetch JWT token from your authentication system
        const token = 'your_jwt_token_here';
        
        // Make an API call to retrieve events with JWT token in headers
        const response = await axios.get(`${backendBase}/events`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        // Filter out events that have already occurred
        const upcoming = response.data.filter(event => new Date(event.date) > new Date())
        setUpcomingEvents(upcoming)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching upcoming events:', error)
        setLoading(false)
      }
    }

    fetchUpcomingEvents()
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Upcoming Events</Text>
      {loading ? (
        <Text>Loading...</Text>
      ) : upcomingEvents.length === 0 ? (
        <Text>No upcoming events</Text>
      ) : (
        upcomingEvents.map(event => (
          <View key={event.event_id} style={styles.eventContainer}>
            <Text style={styles.eventName}>{event.name}</Text>
            <Text>Date: {event.date}</Text>
            <Text>Organization: {event.organization}</Text>
          </View>
        ))
      )}
    </View>
  )
}

export default UpcomingEvents

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  eventContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  eventName: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
})
