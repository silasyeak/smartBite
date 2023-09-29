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
import { VictoryBar, VictoryChart, VictoryTheme } from "victory-native";

const AnalysisPage = ({ navigation }) => {
  const [healthScore, setHealthScore] = useState(0);

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

  const data = [
    { nutrient: 'Protein', grams: nutritionData.protein },
    { nutrient: 'Fats', grams: nutritionData.totalFat },
    { nutrient: 'Sugar', grams: nutritionData.sugars },
    { nutrient: 'Carbs', grams: nutritionData.totalCarbohydrates }
  ];

  const bmr = 1600;
  const gender = 'Male';
  const highBloodPressure = true;
  const highCholesterol = false;
  const pcos = false;

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
      if (sodium < 15) score += 1;
      if (totalCarbohydratesPercent === (0.55 * bmr)) score += 1;
      if (dietaryFiber >= 28 && dietaryFiber <= 30) score += 1;
      if (proteinPercent === (0.18 * bmr)) score += 1;
      if (vitaminD) score += 1;

      if (gender === 'Male') {
        if (sugars < 37.5) score += 1;
      } else {
        if (sugars < 25) score += 1;
      }
    }

    if (highCholesterol) {
      if (totalFatPercent < (0.3 * bmr)) score += 1;
      if (saturatedFatPercent < (0.07 * bmr)) score += 1;
      if (transFat === 0) score += 1;
      if (cholesterol < 2.5) score += 1;
      if (sodium < 23) score += 1;
      if (totalCarbohydratesPercent >= (0.45 * bmr) && totalCarbohydratesPercent <= (0.65 * bmr)) score += 1;
      if (sugarsPercent <= (0.1 * bmr)) score += 1;
      if (proteinPercent >= (0.1 * bmr) && protein <= (0.35 * bmr)) score += 1;
      if (vitaminD) score += 1;

      if (gender === 'Male') {
        if (dietaryFiber >= 21 && dietaryFiber <= 25) score += 1;
      } else {
        if (dietaryFiber >= 30 && dietaryFiber <= 38) score += 1;
      }
    }

    return score;
  };

  useEffect(() => {
    const score = calculateHealthScore();
    setHealthScore(score);
  }, []);

  return (
    <SafeAreaView style={styles.view}>
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
              <VictoryChart
                padding={{ top: 40, bottom: 60, left: 70, right: 55 }}
                width={230} height={200}
                domainPadding={3}
                theme={VictoryTheme.material}
              >
                <VictoryBar
                  style={{ data: { fill: "#c43a31" } }}
                  data={data} x="nutrient" y="grams" />
              </VictoryChart>
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
            source={require('../assets/recommended.png')}
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
    </SafeAreaView>
  );
};

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
    paddingVertical: 10,
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
  },
  foodName: {
    fontSize: 18,
    marginVertical: 10,
    marginLeft: 20,
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
