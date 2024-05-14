// AppNav.js
import React, { useContext } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { AuthContext } from './../context/Authcontext'; 
import Homep from './../app/(tabs)/Homep';
import GetStarted from './../app/(tabs)/GetStarted';

const AppNav = () => {
  const { isLoading, userToken } = useContext(AuthContext);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <>
      {userToken !== null ? <Homep/> : <GetStarted/>}
    </>
  );
};

export default AppNav;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
