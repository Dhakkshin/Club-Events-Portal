import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Login';
import CreateAcc from './CreateAcc';
import GetStarted from './GetStarted';
import Hello from './Hello';
import Event from './Event';
import Profile from './Profile';
import CreateEvent from './CreateEvent';
import UpcomingEvents from './UpcomingEvents';
import RegisteredEvents from './RegisteredEvents';
import Students from './Students';
import Forum from './Forum';
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer independent={true}> 
      <Stack.Navigator initialRouteName="GetStarted">
        <Stack.Screen name="Home" component={GetStarted} options={{ title: 'Home' }} />
        <Stack.Screen name="Login" component={Login} options={{ title: 'Login' }} />
        <Stack.Screen name="CreateAcc" component={CreateAcc} options={{ title: 'Register' }} />
        <Stack.Screen name="Hello" component={Hello} options={{ title: 'Hello' }} />
        <Stack.Screen name="Event" component={Event} options={{ title: 'Event' }} />
        <Stack.Screen name="Profile" component={Profile} options={{ title: 'Profile' }} />
        <Stack.Screen name="CreateEvent" component={CreateEvent} options={{ title: 'CreateEvent' }} />
        <Stack.Screen name="UpcomingEvents" component={UpcomingEvents} options={{ title: 'UpcomingEvents' }} />
        <Stack.Screen name="RegisteredEvents" component={RegisteredEvents} options={{ title: 'RegisteredEvents' }} />
        <Stack.Screen name="Students" component={Students} options={{ title: 'Students' }} />
        <Stack.Screen name="Forum" component={Forum} options={{ title: 'Forum' }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
