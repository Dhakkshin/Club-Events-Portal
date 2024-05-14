// HomeScreen.js
import React from 'react';
import { AuthProvider } from './../../context/Authcontext';
import AppNav from './../../navigation/AppNav';

export default function HomeScreen() {
  return (
    <AuthProvider>
      <AppNav />
    </AuthProvider>
  );
}
