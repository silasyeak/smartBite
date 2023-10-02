import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, SafeAreaView } from 'react-native';
import Picker from 'react-native-picker';
import { useNavigation } from '@react-navigation/native';

function ProfilePage() {
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [healthGoal, setHealthGoal] = useState('');
    const navigation = useNavigation();

    const handleSubmit = () => {
        alert(`Profile Info:\nHeight: ${height}\nWeight: ${weight}\nAge: ${age}\nGender: ${gender}\nHealth Goal: ${healthGoal}`);
        navigation.navigate('AnalysisPage')
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <Text style={styles.title}>Profile</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Height (cm)"
                    value={height}
                    onChangeText={setHeight}
                    keyboardType="numeric"
                />

                <TextInput
                    style={styles.input}
                    placeholder="Weight (kg)"
                    value={weight}
                    onChangeText={setWeight}
                    keyboardType="numeric"
                />

                <TextInput
                    style={styles.input}
                    placeholder="Age"
                    value={age}
                    onChangeText={setAge}
                    keyboardType="numeric"
                />

                {/* <Picker
                    selectedValue={gender}
                    style={styles.picker}
                    onValueChange={setGender}
                >
                    <Picker.Item label="Select Gender" value="" />
                    <Picker.Item label="Male" value="Male" />
                    <Picker.Item label="Female" value="Female" />
                </Picker>

                <Picker
                    selectedValue={healthGoal}
                    style={styles.picker}
                    onValueChange={setHealthGoal}
                >
                    <Picker.Item label="Select Health Goal" value="" />
                    <Picker.Item label="Muscle Gain" value="Muscle Gain" />
                    <Picker.Item label="Weight Loss" value="Weight Loss" />
                </Picker> */}

                <View style={styles.horizontalStack}>
                    <Pressable style={styles.button1} onPress={handleSubmit}>
                        <Text style={styles.text}>Submit</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingLeft: 10,
        borderRadius: 15,
    },
    picker: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
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

export default ProfilePage;
