import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import AnalysisPage from './components/AnalysisPage';
import RegistrationPage from './components/RegistrationPage';
import ProfilePage from './components/ProfilePage';
import AnalysisPage from './components/AnalysisPage';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >

        <Stack.Screen
          name="LandingPage"
          component={LandingPage}
        />
        <Stack.Screen
          name="LoginPage"
          component={LoginPage}
        /> 

        <Stack.Screen
          name="AnalysisPage"
          component={AnalysisPage}
        />
        <Stack.Screen
          name="RegistrationPage"
          component={RegistrationPage}
        />
        <Stack.Screen
          name="ProfilePage"
          component={ProfilePage}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 300,  // Or whatever size you need
    height: 300, // Or whatever size you need
    resizeMode: 'contain' // or 'stretch', 'cover', etc.
  }
});
