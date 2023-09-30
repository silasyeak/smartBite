import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, Text, Image, Pressable } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function LandingPage({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/smartbiteLogo.png')} style={styles.image} />
      <StatusBar style="auto" />

      <View style={styles.horizontalStack}>
        <Pressable style={styles.button1} onPress={() => navigation.navigate('LoginPage')}>
          <Text style={styles.text}>Login</Text>
        </Pressable>
        
        <Pressable style={styles.button2} onPress={() => navigation.navigate('RegistrationPage')}>
          <Text style={styles.text}>Register</Text>
        </Pressable>

      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  horizontalStack: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
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
  },
  button1: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#154B2D',
    borderRadius: 10,
    marginRight: 10,  
  },
  button2:{
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#94D533',
    borderRadius: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  }
});
