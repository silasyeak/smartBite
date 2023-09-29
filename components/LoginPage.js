import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const handleLogin = () => {
        // Do the login logic here (e.g., send to backend)
        Alert.alert('Login Success', `Welcome back!`);
        navigation.navigate('ProfilePage')
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Login</Text>

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
                <Pressable style = {styles.button1} onPress={handleLogin}>
                    <Text style = {styles.text}>Login</Text>
                </Pressable>
                <Pressable style = {styles.button2} onPress={() => navigation.navigate('RegistrationPage')}>
                    <Text style = {styles.text}>Register</Text>
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

export default LoginPage;
