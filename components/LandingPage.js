import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function LandingPage({navigation}) {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/smartbiteLogo.png')} style={styles.image} />
      <StatusBar style="auto" />
      <Button
        title="Login"
        onPress={() => navigation.navigate('LoginPage')}
      />
      <Button
        title= "Register"
        onPress={() => navigation.navigate('RegistrationPage')}
      />



    </View>
    
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
