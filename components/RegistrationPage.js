import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const RegistrationPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const handleRegister = () => {
        // Do the registration logic here (e.g., send to backend)
        Alert.alert('Registration Success', `Welcome, ${username}!`);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Register</Text>

            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />

            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />

            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
               <View style={styles.horizontalStack}>
                <Pressable style = {styles.button1} onPress={handleRegister}>
                    <Text style = {styles.text}>Register</Text>
                </Pressable>
                <Pressable style = {styles.button2} onPress={() => navigation.navigate('LandingPage')}>
                    <Text style = {styles.text}>Home</Text>
                </Pressable>
                
            </View>
    


        </View>
    );
};

const styles = StyleSheet.create({
    horizontalStack: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
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
    text:{
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold', 
        letterSpacing: 0.25,
        color: 'white',
    }
});

export default RegistrationPage;