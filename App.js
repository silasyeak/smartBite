import React from 'react';
import { StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import AnalysisPage from './components/AnalysisPage';
import RegistrationPage from './components/RegistrationPage';
import ProfilePage from './components/ProfilePage';
import { decode, encode } from 'base-64'

if (!global.btoa) { global.btoa = encode }

if (!global.atob) { global.atob = decode }

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={styles.SafeArea}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
        >

          {/* <Stack.Screen
          name="LandingPage"
          component={LandingPage}
        />
        <Stack.Screen
          name="LoginPage"
          component={LoginPage}
        /> 

        <Stack.Screen
          name="RegistrationPage"
          component={RegistrationPage}
        /> */}

          <Stack.Screen
            name="ProfilePage"
            component={ProfilePage}
          />

          <Stack.Screen
            name="AnalysisPage"
            component={AnalysisPage}
          />

        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  SafeArea: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
});