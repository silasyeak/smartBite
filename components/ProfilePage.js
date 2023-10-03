import React, { useEffect, useState, useCallback } from 'react';
import { Alert, Text, View, StyleSheet, TextInput, Image, TouchableOpacity, Dimensions, BackHandler, ScrollView, ImageBackground } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { auth, db } from '../firebase';
import { doc, setDoc, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { getStorage } from "firebase/storage";
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const ProfilePage = () => {
    const navigation = useNavigation();

    const user = auth.currentUser;

    const [image, setImage] = useState(null);
    const [uri, setUri] = useState(null);

    const [height, setHeight] = useState(null);
    const [weight, setWeight] = useState(null);
    const [age, setAge] = useState(null);
    const [gender, setGender] = useState(null);
    const [foodPreferences, setFoodPreferences] = useState(null);
    const [foodAllergies, setFoodAllergies] = useState(null);
    const [medicalHistory, setMedicalHistory] = useState(null);
    const [pal, setPal] = useState(null);
    const [healthGoal, setHealthGoal] = useState(null);

    const updateUserProfile = () => {
        // setDoc(doc(db, 'users', user.uid), {
        //     id: user.uid,
        //     timestamp: serverTimestamp()
        // }).then(() => {
        //     navigation.navigate('AnalysisPage');
        // }).catch(error => {
        //     Alert.alert(error.message);
        // });
        setDoc(doc(db, 'users', 'brem'), {
            id: 'brem',
            photoURL: uri,
            weight: weight,
            height: height,
            age: age,
            gender: gender,
            foodPreferences: foodPreferences,
            foodAllergies: foodAllergies,
            medicalHistory: medicalHistory,
            pal: pal,
            healthGoal: healthGoal,
            timestamp: serverTimestamp()
        }).then(() => {
            navigation.navigate('AnalysisPage');
        }).catch(error => {
            Alert.alert(error.message);
        });
    };

    const uploadImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1,
            base64: true,
        })
        if (!result.cancelled) {
            setImage(result.assets[0].uri);
            setUri(result.uri)
        }
    }

    // useEffect(() => {
    //     onSnapshot(doc(db, 'users', user.uid), (snapshot) => {
    //         // if user profile exists
    //         if (snapshot.exists()) {
    //             // display the existing user profile details
    //             setImage(snapshot.data().photoURL);
    //             setJob(snapshot.data().job);
    //             setAge(snapshot.data().age);
    //             setBio(snapshot.data().bio);
    //         }
    //     })
    // }, []);

    useFocusEffect(
        useCallback(() => {
            // Go back to home screen on back press instead of login screen
            const onBackPress = () => {
                navigation.navigate('AnalysisPage');
                return true;
            }
            BackHandler.addEventListener('hardwareBackPress', onBackPress);
        }, [])
    );

    const handleLeftButtonPress = () => {
        navigation.goBack();
    };

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <ImageBackground
                    source={require('../assets/background.png')}
                    resizeMode='contain'
                    imageStyle={{ bottom: 50 }}
                >
                    <View style={styles.navbar}>
                        <TouchableOpacity
                            style={[styles.box, { width: 40, height: 40 }]}
                            onPress={handleLeftButtonPress}>
                            <Image
                                source={require('../assets/arrow.png')}
                                style={{ width: 15, height: 15, resizeMode: 'contain' }}
                            />
                        </TouchableOpacity>
                        <Text style={styles.title}>Profile</Text>
                        <View style={{ width: 40, height: 40 }}></View>
                    </View>

                    <View style={styles.container}>
                        <View style={{ position: 'relative' }}>
                            {image !== null ? (
                                <Image source={{ uri: image }} style={styles.image} />
                            ) : (
                                <Image source={require('../assets/profile.jpg')} style={styles.image} />
                            )}

                            <TouchableOpacity style={styles.button} onPress={uploadImage}>

                                <Image style={{ width: 25, height: 25, resizeMode: 'contain' }} source={require('../assets/camera.png')} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>

                <View style={styles.container}>
                    <View style={styles.inputContainer}>
                        <View style={{ width: '40%', paddingRight: '2%' }}>
                            <Text style={styles.label}>Height:</Text>
                            <TextInput
                                value={height}
                                placeholder='cm'
                                onChangeText={(text) => setHeight(text)}
                                style={[styles.input, { marginBottom: 10 }]}
                            />
                        </View>
                        <View style={{ width: '40%', paddingLeft: '2%' }}>
                            <Text style={styles.label}>Weight:</Text>
                            <TextInput
                                value={weight}
                                placeholder='kg'
                                onChangeText={(text) => setWeight(text)}
                                style={[styles.input, { marginBottom: 10 }]}
                            />
                        </View>
                    </View>

                    <View style={{ width: '80%' }}>
                        <Text style={styles.label}>Age:</Text>
                        <TextInput
                            value={age}
                            onChangeText={(text) => setAge(text)}
                            placeholder='00'
                            style={styles.input}
                            keyboardType={'numeric'}
                            maxLength={3}
                        />
                    </View>

                    <View style={{ width: '80%' }}>
                        <Text style={styles.label}>Gender:</Text>
                        <View style={[styles.input, { paddingHorizontal: -20, justifyContent: 'center' }]}>
                            <Picker
                                selectedValue={gender}
                                styles={{ width: 100 }}
                                onValueChange={(gender) => setGender(gender)}
                            >
                                <Picker.Item label="Select Gender" value="" />
                                <Picker.Item label="Male" value="Male" />
                                <Picker.Item label="Female" value="Female" />
                            </Picker>
                        </View>
                    </View>

                    <View style={{ width: '80%' }}>
                        <Text style={styles.label}>Food Preferences:</Text>
                        <View style={[styles.input, { paddingHorizontal: -20, justifyContent: 'center' }]}>
                            <Picker
                                selectedValue={foodPreferences}
                                styles={{ width: 100 }}
                                onValueChange={(preference) => setFoodPreferences(preference)}
                            >
                                <Picker.Item label="Select food preference" value="" />
                                <Picker.Item label="None" value="none" />
                                <Picker.Item label="Halal" value="halal" />
                                <Picker.Item label="Paleo" value="paleo" />
                                <Picker.Item label="Vegetarian" value="vegetarian" />
                            </Picker>
                        </View>
                    </View>

                    <View style={{ width: '80%' }}>
                        <Text style={styles.label}>Food Allergies:</Text>
                        <View style={[styles.input, { paddingHorizontal: -20, justifyContent: 'center' }]}>
                            <Picker
                                selectedValue={foodAllergies}
                                styles={{ width: 100 }}
                                onValueChange={(allergy) => setFoodAllergies(allergy)}
                            >
                                <Picker.Item label="Select food allergies" value="" />
                                <Picker.Item label="None" value="none" />
                                <Picker.Item label="Shellfish" value="shellfish" />
                                <Picker.Item label="Dairy" value="dairy" />
                                <Picker.Item label="Nuts" value="nuts" />
                            </Picker>
                        </View>
                    </View>

                    <View style={{ width: '80%' }}>
                        <Text style={styles.label}>Medical History:</Text>
                        <View style={[styles.input, { paddingHorizontal: -20, justifyContent: 'center' }]}>
                            <Picker
                                selectedValue={medicalHistory}
                                styles={{ width: 100 }}
                                onValueChange={(condition) => setMedicalHistory(condition)}
                            >
                                <Picker.Item label="Select medical condition" value="" />
                                <Picker.Item label="None" value="none" />
                                <Picker.Item label="High Cholesterol" value="highCholesterol" />
                                <Picker.Item label="High Blood Pressure" value="highBloodPressure" />
                                <Picker.Item label="Polycystic Ovary Syndrome" value="pcos" />
                            </Picker>
                        </View>
                    </View>

                    <View style={{ width: '80%' }}>
                        <Text style={styles.label}>Physical Activity Level:</Text>
                        <View style={[styles.input, { paddingHorizontal: -20, justifyContent: 'center' }]}>
                            <Picker
                                selectedValue={pal}
                                styles={{ width: 100 }}
                                onValueChange={(level) => setPal(level)}
                            >
                                <Picker.Item label="Select physical activity level" value="" />
                                <Picker.Item label="None" value="none" />
                                <Picker.Item label="Sedentary" value="sedentary" />
                                <Picker.Item label="Lightly Active" value="light" />
                                <Picker.Item label="Moderately Active" value="moderate" />
                                <Picker.Item label="Very Active" value="very" />
                            </Picker>
                        </View>
                    </View>

                    {foodAllergies === 'none' && medicalHistory === 'none' && (
                        <View style={{ width: '80%' }}>
                            <Text style={styles.label}>Health Goals:</Text>
                            <View style={[styles.input, { paddingHorizontal: -20, justifyContent: 'center' }]}>
                                <Picker
                                    selectedValue={healthGoal}
                                    styles={{ width: 100 }}
                                    onValueChange={(goal) => setHealthGoal(goal)}
                                >
                                    <Picker.Item label="Select health goal" value="" />
                                    <Picker.Item label="Muscle Gain" value="muscleGain" />
                                    <Picker.Item label="Weight Loss" value="weightLoss" />
                                    <Picker.Item label="Maintain" value="maintain" />
                                </Picker>
                            </View>
                        </View>
                    )}

                    <TouchableOpacity
                        onPress={updateUserProfile}
                        style={{
                            backgroundColor: '#24343c',
                            height: 70,
                            width: '50%',
                            alignSelf: 'center',
                            justifyContent: 'center',
                            marginVertical: 40,
                            borderRadius: 10,
                        }}
                    >
                        <Text style={{ fontSize: 20, fontFamily: 'Roboto', color: 'white', textAlign: 'center' }}>Done</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 20,
        paddingHorizontal: 20,
    },
    box: {
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'Roboto',
        color: 'white'
    },
    image: {
        width: 130,
        height: 130,
        borderRadius: 100,
        marginBottom: 20,
        backgroundColor: 'gray',
    },
    button: {
        position: 'absolute',
        bottom: 20,
        right: 5,
        width: 40,
        height: 40,
        borderRadius: 25,
        backgroundColor: '#24343c',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'Roboto',
        marginBottom: 5,
    },
    input: {
        fontSize: 16,
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        color: '#462D64',
        height: 50,
        marginBottom: 10,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'lightgrey',
        padding: 15,
    },
});

export default ProfilePage
