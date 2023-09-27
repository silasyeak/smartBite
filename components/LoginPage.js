import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
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
                <Button title="Login" onPress={handleLogin} />
                <Button
                    title="Register"
                    onPress={() => navigation.navigate('RegistrationPage')}
                />
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
});

export default LoginPage;
