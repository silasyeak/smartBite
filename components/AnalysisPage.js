import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Platform, StatusBar
} from 'react-native';
import { useFonts } from 'expo-font';
import { PieChart } from "react-native-chart-kit";
import { db } from '../firebase';
import { doc, getDocs, collection, onSnapshot } from 'firebase/firestore';

const AnalysisPage = ({ navigation }) => {
  const [healthScore, setHealthScore] = useState(0);
  const [profileData, setProfileData] = useState([]);
  const [image, setImage] = useState();

  const customFonts = {
    Montserrat: require('../assets/fonts/Montserrat.ttf'),
  };

  const [isFontsLoaded] = useFonts(customFonts);

  useEffect(() => {
    let getData;

    const fetchProfileData = async () => {
      const data = await getDocs(collection(db, 'users')).then(
        (snapshot) => snapshot.docs.map((doc) => doc.id)
      );
      setProfileData(data);
    };

    fetchProfileData();

    return getData;
  }, [db]);

  useEffect(() => {
    const score = calculateHealthScore();
    setHealthScore(score);
  }, []);

  useEffect(() => {
    if (healthScore <= 5) {
      setImage(require('../assets/not-recommended.png'));
    } else if (healthScore >= 6) {
      setImage(require('../assets/neutral.png'));
    } else if (healthScore >= 7) {
      setImage(require('../assets/recommended.png'));
    }
  }, [healthScore])

  const handleLeftButtonPress = () => {
    navigation.goBack();
  };

  const handleRightButtonPress = () => {
    console.log('Right button pressed');
  };

  const handlePress = () => {

  };

  const nutritionData = {
    calories: 150,
    totalFat: 1,
    saturatedFat: 0.5,
    transFat: 0,
    cholesterol: 0,
    sodium: 0.2497,
    totalCarbohydrates: 31.2,
    dietaryFiber: 1.4,
    sugars: 2.1,
    protein: 5.6,
  };

  const pieData = [
    {
      name: "% Protein",
      value: Math.round(((nutritionData.protein * 4) / nutritionData.calories) * 100),
      color: "#74bc1c",
      legendFontColor: "#181818",
      legendFontSize: 9
    },
    {
      name: "% Fat",
      value: Math.round(((nutritionData.totalFat * 9) / nutritionData.calories) * 100),
      color: "#cc34ac",
      legendFontColor: "#181818",
      legendFontSize: 9
    },
    {
      name: "% Sugar",
      value: Math.round(((nutritionData.sugars * 4) / nutritionData.calories) * 100),
      color: "#fca424",
      legendFontColor: "#181818",
      legendFontSize: 9
    },
    {
      name: "% Carbs",
      value: Math.round(((nutritionData.totalCarbohydrates * 4) / nutritionData.calories) * 100),
      color: "#84d4ec",
      legendFontColor: "#181818",
      legendFontSize: 9
    }
  ];

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 1,
    barPercentage: 0.5
  };

  const bmr = 1600;
  const weight = 70;
  const gender = 'Male';
  const highBloodPressure = true;
  const highCholesterol = false;
  const pcos = false;
  const diabetes = false;
  const obesity = false;
  const heartDisease = false;
  const weightLoss = false;
  const muscleGain = false;
  const maintain = false;

  const calculateHealthScore = () => {
    const {
      calories,
      totalFat,
      saturatedFat,
      transFat,
      cholesterol,
      sodium,
      totalCarbohydrates,
      dietaryFiber,
      sugars,
      protein,
      vitaminD,
      calcium,
      iron,
      potassium
    } = nutritionData;

    totalFatPercent = (totalFat * 9) / calories;
    saturatedFatPercent = (saturatedFat * 9) / calories;
    totalCarbohydratesPercent = (totalCarbohydrates * 4) / calories;
    sugarsPercent = (sugars * 4) / calories;
    proteinPercent = (protein * 4) / calories;

    let score = 0;

    if (highBloodPressure) {
      if (totalFatPercent < (0.28 * bmr)) score += 1;
      if (saturatedFatPercent < (0.06 * bmr)) score += 1;
      if (transFat === 0) score += 1;
      if (cholesterol < 3) score += 1;
      if (sodium < 15) score += 3;
      if (totalCarbohydratesPercent === (0.55 * bmr)) score += 1;
      if (dietaryFiber >= 28 && dietaryFiber <= 30) score += 1;
      if (proteinPercent === (0.18 * bmr)) score += 1;
      if (vitaminD || calcium || iron || potassium > 47) score += 1;

      if (gender === 'Male') {
        if (sugars < 37.5) score += 1;
      } else {
        if (sugars < 25) score += 1;
      }

      return Math.round((score / 12) * 10);
    }
    else if (highCholesterol) {
      if (totalFatPercent < (0.3 * bmr)) score += 1;
      if (saturatedFatPercent < (0.07 * bmr)) score += 3;
      if (transFat === 0) score += 3;
      if (cholesterol < 2.5) score += 1;
      if (sodium < 23) score += 1;
      if (totalCarbohydratesPercent >= (0.45 * bmr) && totalCarbohydratesPercent <= (0.65 * bmr)) score += 1;
      if (sugarsPercent <= (0.1 * bmr)) score += 1;
      if (proteinPercent >= (0.1 * bmr) && protein <= (0.35 * bmr)) score += 1;
      if (vitaminD || calcium || iron || potassium) score += 1;

      if (gender === 'Male') {
        if (dietaryFiber >= 21 && dietaryFiber <= 25) score += 1;
      } else {
        if (dietaryFiber >= 30 && dietaryFiber <= 38) score += 1;
      }

      return Math.round((score / 14) * 10);
    }
    else if (pcos) {
      if (totalFatPercent < (0.2 * bmr)) score += 3;
      if (saturatedFatPercent < (0.1 * bmr)) score += 1;
      if (transFat === 0) score += 1;
      if (cholesterol < 3) score += 1;
      if (sodium >= 15 && sodium <= 20) score += 1;
      if (totalCarbohydratesPercent >= (0.4 * bmr) && totalCarbohydratesPercent <= (0.5 * bmr)) score += 1;
      if (dietaryFiber >= 25 && dietaryFiber <= 30) score += 1;
      if (sugarsPercent <= (0.1 * bmr)) score += 3;
      if (proteinPercent >= (0.15 * bmr) && protein <= (0.2 * bmr)) score += 1;
      if (vitaminD || calcium || iron || potassium) score += 1;

      return Math.round((score / 14) * 10);
    }
    else if (diabetes) {
      if (totalFatPercent > (0.2 * bmr) && totalFatPercent < (0.35 * bmr)) score += 1;
      if (saturatedFatPercent < (0.07 * bmr)) score += 1;
      if (transFat === 0) score += 1;
      if (cholesterol < 3) score += 1;
      if (sodium < 20) score += 1;
      if (totalCarbohydratesPercent < (0.26 * bmr)) score += 3;
      if (dietaryFiber >= 25 && dietaryFiber <= 38) score += 1;
      if (sugarsPercent <= (0.05 * bmr)) score += 3;
      if (proteinPercent >= (0.1 * bmr) && protein <= (0.2 * bmr)) score += 1;
      if (vitaminD || calcium || iron || potassium) score += 1;

      return Math.round((score / 14) * 10);
    }
    else if (obesity) {
      if (totalFatPercent > (0.2 * bmr) && totalFatPercent < (0.25 * bmr)) score += 3;
      if (saturatedFatPercent < (0.1 * bmr)) score += 1;
      if (transFat === 0) score += 1;
      if (cholesterol < 3) score += 1;
      if (sodium < 23) score += 1;
      if (totalCarbohydratesPercent >= (0.45 * bmr) && totalCarbohydratesPercent <= (0.65 * bmr)) score += 1;
      if (dietaryFiber >= 25 && dietaryFiber <= 38) score += 1;
      if (sugarsPercent <= (0.1 * bmr)) score += 1;
      if (proteinPercent >= (0.1 * bmr) && protein <= (0.35 * bmr)) score += 3;
      if (vitaminD || calcium || iron || potassium) score += 1;

      return Math.round((score / 14) * 10);
    }
    else if (heartDisease) {
      if (totalFatPercent > (0.25 * bmr) && totalFatPercent < (0.3 * bmr)) score += 1;
      if (saturatedFatPercent < (0.07 * bmr)) score += 3;
      if (transFat === 0) score += 1;
      if (cholesterol < 3) score += 1;
      if (sodium < 20) score += 3;
      if (totalCarbohydratesPercent >= (0.45 * bmr) && totalCarbohydratesPercent <= (0.65 * bmr)) score += 1;
      if (dietaryFiber >= 25 && dietaryFiber <= 38) score += 1;
      if (sugarsPercent <= (0.1 * bmr)) score += 1;
      if (proteinPercent >= (0.1 * bmr) && protein <= (0.35 * bmr)) score += 1;
      if (vitaminD || calcium || iron || potassium) score += 1;

      return Math.round((score / 14) * 10);
    }
    else {
      if (weightLoss) {
        if (totalFatPercent > (0.2 * bmr)) score += 1;
        if (saturatedFatPercent < (0.1 * bmr)) score += 1;
        if (transFat === 0) score += 1;
        if (cholesterol >= 0) score += 1;
        if (sodium < 23) score += 1;
        if (totalCarbohydratesPercent < (0.4 * bmr)) score += 1;
        if (sugarsPercent <= (0.1 * bmr)) score += 1;
        if (proteinPercent >= (0.25 * bmr) && protein <= (0.3 * bmr)) score += 1;
        if (vitaminD || calcium || iron || potassium) score += 1;

        if (gender === 'Male') {
          if (dietaryFiber < 38) score += 1;
        } else {
          if (dietaryFiber < 25) score += 1;
        }

        return score;
      }

      if (muscleGain) {
        if (totalFatPercent > (0.2 * bmr) && totalFatPercent < (0.35 * bmr)) score += 1;
        if (saturatedFatPercent < (0.1 * bmr)) score += 1;
        if (transFat === 0) score += 1;
        if (cholesterol >= 0) score += 1;
        if (sodium < 23) score += 1;
        if (totalCarbohydratesPercent >= (0.5 * bmr) && totalCarbohydratesPercent <= (0.6 * bmr)) score += 1;
        if (sugarsPercent >= 0) score += 1;
        if (protein > 10) score += 1;
        if (potassium >= 26 && potassium <= 34) score += 1;

        if (gender === 'Male') {
          if (dietaryFiber < 38) score += 1;
        } else {
          if (dietaryFiber < 25) score += 1;
        }

        return score;
      }

      if (maintain) {
        if (totalFatPercent > (0.2 * bmr) && totalFatPercent < (0.35 * bmr)) score += 1;
        if (saturatedFatPercent < (0.1 * bmr)) score += 1;
        if (transFat === 0) score += 1;
        if (cholesterol >= 0) score += 1;
        if (sodium < 23) score += 1;
        if (totalCarbohydratesPercent >= (0.45 * bmr) && totalCarbohydratesPercent <= (0.65 * bmr)) score += 1;
        if (sugarsPercent <= (0.1 * bmr)) score += 1;
        if (proteinPercent >= (0.25 * bmr) && protein <= (0.3 * bmr)) score += 1;
        if (vitaminD || calcium || iron || potassium) score += 1;

        if (gender === 'Male') {
          if (dietaryFiber < 38) score += 1;
        } else {
          if (dietaryFiber < 25) score += 1;
        }

        return score;
      }
    }

  };

  if (!isFontsLoaded) {
  }
  else {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.navbar}>
          <TouchableOpacity
            style={[styles.box, { width: 40, height: 40 }]}
            onPress={handleLeftButtonPress}>
            <Image
              source={require('../assets/arrow.png')}
              style={{ width: 15, height: 15, resizeMode: 'contain' }}
            />
          </TouchableOpacity>
          <Text style={styles.title}>Analysis</Text>
          <TouchableOpacity
            style={[styles.box, { width: 40, height: 40 }]}
            onPress={handleRightButtonPress}>
            <Image
              source={require('../assets/scan.png')}
              style={{ width: 25, height: 25, resizeMode: 'contain' }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <View style={{ marginBottom: 10 }}>
            <Text style={styles.foodName}>Bread</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
              <View style={[styles.box, { width: 160, height: 160 }]}>
                <Image
                  source={{ uri: 'https://media.nedigital.sg/fairprice/fpol/media/images/product/XL/10099606_XL1_20210903.jpg?w=1200&q=70' }}
                  style={{ width: 140, height: 140 }}
                />
              </View>
              <View style={[styles.box, { width: 160, height: 160 }]}>
                <Text style={styles.chartText}>
                  % of nutrients based on total calories
                </Text>
                <PieChart
                  data={pieData}
                  width={160}
                  height={95}
                  chartConfig={chartConfig}
                  accessor="value"
                  backgroundColor="transparent"
                  paddingLeft='5'
                  absolute
                />
              </View>
            </View>
          </View>
          <View style={styles.rating}>
            <View style={styles.row}>
              <Image
                source={require('../assets/rate.png')}
                style={{ width: 20, height: 20, marginRight: 7, resizeMode: 'contain' }}
              />
              <Text style={styles.healthScore}>{healthScore}/10</Text>
            </View>
            <Text style={styles.smallText}>Overall Rating</Text>
            <Image
              source={image}
              style={styles.recommended}
            />

          </View>
          <View style={styles.stats}>
            <View style={styles.icons}>
              <Image
                source={require('../assets/halal.png')}
                style={styles.circle}
              />
              <Image
                source={require('../assets/no-meat.png')}
                style={styles.circle}
              />
              <Image
                source={require('../assets/no-seafood.png')}
                style={styles.circle}
              />
            </View>
            <View style={{ flexDirection: 'row' }}>
              <View style={styles.rowText}>
                <Image
                  source={require('../assets/good.png')}
                  style={{ width: 15, height: 15, resizeMode: 'contain', margin: 5 }}
                />
                <Text style={{ fontSize: 16, marginLeft: 10 }}>High Protein</Text>
              </View>
              <View style={styles.rowText}>
                <Image
                  source={require('../assets/bad.png')}
                  style={{ width: 15, height: 15, resizeMode: 'contain', margin: 5 }}
                />
                <Text style={{ fontSize: 16, marginLeft: 10 }}>High Cholesterol</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <View style={styles.rowText}>
                <Image
                  source={require('../assets/bad.png')}
                  style={{ width: 15, height: 15, resizeMode: 'contain', margin: 5 }}
                />
                <Text style={{ fontSize: 16, marginLeft: 10 }}>High Fat</Text>
              </View>

            </View>
          </View>
          <View style={styles.bottom}>
            <TouchableOpacity style={styles.nextButton} onPress={handlePress}>
              <Image
                source={require('../assets/arrow.png')}
                style={{ width: 15, height: 15, tintColor: 'white', resizeMode: 'contain', transform: [{ scaleX: -1 }] }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
}


const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
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
  },
  foodName: {
    fontSize: 18,
    marginVertical: 10,
    marginLeft: 20,
  },
  chartText: {
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    marginHorizontal: 20,
    marginBottom: 5,
    textAlign: 'center'
  },
  rating: {
    padding: 15,
    margin: '3%',
    borderColor: 'lightgrey',
    borderTopWidth: 2,
    borderBottomWidth: 2,
    width: '94%',
  },
  healthScore: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  smallText: {
    fontSize: 12,
    color: 'grey',
    marginBottom: 30,
    textAlign: 'center',
  },
  recommended: {
    width: '100%',
    height: 50,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  stats: {
    padding: 10,
    justifyContent: 'center',
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  rowText: {
    flexDirection: 'row',
    width: '50%',
    padding: 10,
    fontSize: 16,
    alignItems: 'center'
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 20,
  },
  nextButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrow: {
    fontSize: 20,
    fontWeight: 'bold'
  },
});

export default AnalysisPage;
