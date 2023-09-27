import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AnalysisPage = () => {
  const [healthScore, setHealthScore] = useState(0);

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

  const highBloodPressure = true;
  const highCholesterol = false;
  const pcos = false;
  const weight = 'underweight';

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
    cholesterolPercent = cholesterol / 3;
    sodiumPercent = sodium / 23;
    totalCarbohydratesPercent = (totalCarbohydrates * 4) / calories;
    sugarsPercent = (sugars * 4) / calories;
    proteinPercent = (protein * 4) / calories;

    let score = 0;

    if (highBloodPressure) {
      if (weight == 'underweight') {
        if (totalFatPercent <= 0.2) score += 1;
        if (saturatedFatPercent <= 0.05) score += 1;
        if (transFat === 0) score += 1;
        if (cholesterolPercent <= 0.05) score += 1;
        if (sodiumPercent <= 0.06) score += 1;
        if (totalCarbohydratesPercent >= 0.5 && totalCarbohydratesPercent <= 0.6) score += 1;
        if (dietaryFiber >= 0.25) score += 1;
        if (sugarsPercent <= 0.1) score += 1;
        if (proteinPercent >= 0.1 && protein <= 0.2) score += 1;
        if (vitaminD) score += 1;
      } else if (weight == 'normal') {
        if (totalFatPercent >= 0.15 && totalFat <= 0.2) score += 1;
        if (saturatedFatPercent <= 0.05) score += 1;
        if (transFat === 0) score += 1;
        if (cholesterolPercent <= 0.05) score += 1;
        if (sodiumPercent <= 0.06) score += 1;
        if (totalCarbohydratesPercent >= 0.5 && totalCarbohydrates <= 0.6) score += 1;
        if (dietaryFiber >= 0.25) score += 1;
        if (sugarsPercent <= 0.1) score += 1;
        if (proteinPercent >= 0.1 && protein <= 0.2) score += 1;
        if (vitaminD) score += 1;
      } else if (weight == 'overweight') {
        if (totalFatPercent >= 0.1 && totalFat <= 0.15) score += 1;
        if (saturatedFatPercent <= 0.05) score += 1;
        if (transFat === 0) score += 1;
        if (cholesterolPercent <= 0.05) score += 1;
        if (sodiumPercent <= 0.06) score += 1;
        if (totalCarbohydratesPercent >= 0.45 && totalCarbohydrates <= 0.55) score += 1;
        if (dietaryFiber >= 0.25) score += 1;
        if (sugarsPercent <= 0.08) score += 1;
        if (proteinPercent >= 0.15 && protein <= 0.2) score += 1;
        if (vitaminD) score += 1;
      } else if (weight == 'obese') {
        if (totalFatPercent <= 0.1) score += 1;
        if (saturatedFatPercent <= 0.05) score += 1;
        if (transFat === 0) score += 1;
        if (cholesterolPercent <= 0.05) score += 1;
        if (sodiumPercent <= 0.06) score += 1;
        if (totalCarbohydratesPercent >= 0.4 && totalCarbohydrates <= 0.5) score += 1;
        if (dietaryFiber >= 0.25) score += 1;
        if (sugarsPercent <= 0.06) score += 1;
        if (proteinPercent >= 0.15 && protein <= 0.2) score += 1;
        if (vitaminD) score += 1;
      }
    }

    if (highCholesterol) {
      if (weight == 'underweight') {
        if (totalFatPercent <= 0.25) score += 1;
        if (saturatedFatPercent <= 0.07) score += 1;
        if (transFat === 0) score += 1;
        if (cholesterolPercent <= 0.05) score += 1;
        if (sodiumPercent <= 0.07) score += 1;
        if (totalCarbohydratesPercent >= 0.5 && totalCarbohydratesPercent <= 0.65) score += 1;
        if (dietaryFiber >= 0.25) score += 1;
        if (sugarsPercent <= 0.1) score += 1;
        if (proteinPercent >= 0.12 && protein <= 0.2) score += 1;
        if (vitaminD) score += 1;
      } else if (weight == 'normal') {
        if (totalFatPercent >= 0.2 && totalFat <= 0.25) score += 1;
        if (saturatedFatPercent <= 0.07) score += 1;
        if (transFat === 0) score += 1;
        if (cholesterolPercent <= 0.05) score += 1;
        if (sodiumPercent <= 0.07) score += 1;
        if (totalCarbohydratesPercent >= 0.5 && totalCarbohydrates <= 0.6) score += 1;
        if (dietaryFiber >= 0.25) score += 1;
        if (sugarsPercent <= 0.1) score += 1;
        if (proteinPercent >= 0.1 && protein <= 0.2) score += 1;
        if (vitaminD) score += 1;
      } else if (weight == 'overweight') {
        if (totalFatPercent >= 0.15 && totalFat <= 0.2) score += 1;
        if (saturatedFatPercent <= 0.07) score += 1;
        if (transFat === 0) score += 1;
        if (cholesterolPercent <= 0.05) score += 1;
        if (sodiumPercent <= 0.07) score += 1;
        if (totalCarbohydratesPercent >= 0.45 && totalCarbohydrates <= 0.55) score += 1;
        if (dietaryFiber >= 0.25) score += 1;
        if (sugarsPercent <= 0.08) score += 1;
        if (proteinPercent >= 0.15 && protein <= 0.2) score += 1;
        if (vitaminD) score += 1;
      } else if (weight == 'obese') {
        if (totalFatPercent <= 0.15) score += 1;
        if (saturatedFatPercent <= 0.07) score += 1;
        if (transFat === 0) score += 1;
        if (cholesterolPercent <= 0.05) score += 1;
        if (sodiumPercent <= 0.07) score += 1;
        if (totalCarbohydratesPercent >= 0.4 && totalCarbohydrates <= 0.5) score += 1;
        if (dietaryFiber >= 0.25) score += 1;
        if (sugarsPercent <= 0.06) score += 1;
        if (proteinPercent >= 0.15 && protein <= 0.2) score += 1;
        if (vitaminD) score += 1;
      }
    }

    if (pcos) {
      if (weight == 'underweight') {
        if (totalFatPercent <= 0.3) score += 1;
        if (saturatedFatPercent <= 0.07) score += 1;
        if (transFat === 0) score += 1;
        if (cholesterolPercent <= 0.05) score += 1;
        if (sodiumPercent <= 0.07) score += 1;
        if (totalCarbohydratesPercent >= 0.55 && totalCarbohydratesPercent <= 0.65) score += 1;
        if (dietaryFiber >= 0.25) score += 1;
        if (sugarsPercent <= 0.1) score += 1;
        if (proteinPercent >= 0.12 && protein <= 0.2) score += 1;
        if (vitaminD) score += 1;
      } else if (weight == 'normal') {
        if (totalFatPercent >= 0.25 && totalFat <= 0.3) score += 1;
        if (saturatedFatPercent <= 0.07) score += 1;
        if (transFat === 0) score += 1;
        if (cholesterolPercent <= 0.05) score += 1;
        if (sodiumPercent <= 0.07) score += 1;
        if (totalCarbohydratesPercent >= 0.5 && totalCarbohydrates <= 0.6) score += 1;
        if (dietaryFiber >= 0.25) score += 1;
        if (sugarsPercent <= 0.1) score += 1;
        if (proteinPercent >= 0.15 && protein <= 0.2) score += 1;
        if (vitaminD) score += 1;
      } else if (weight == 'overweight') {
        if (totalFatPercent >= 0.2 && totalFat <= 0.25) score += 1;
        if (saturatedFatPercent <= 0.07) score += 1;
        if (transFat === 0) score += 1;
        if (cholesterolPercent <= 0.05) score += 1;
        if (sodiumPercent <= 0.07) score += 1;
        if (totalCarbohydratesPercent >= 0.45 && totalCarbohydrates <= 0.55) score += 1;
        if (dietaryFiber >= 0.25) score += 1;
        if (sugarsPercent <= 0.08) score += 1;
        if (proteinPercent >= 0.15 && protein <= 0.2) score += 1;
        if (vitaminD) score += 1;
      } else if (weight == 'obese') {
        if (totalFatPercent <= 0.2) score += 1;
        if (saturatedFatPercent <= 0.07) score += 1;
        if (transFat === 0) score += 1;
        if (cholesterolPercent <= 0.05) score += 1;
        if (sodiumPercent <= 0.07) score += 1;
        if (totalCarbohydratesPercent >= 0.4 && totalCarbohydrates <= 0.5) score += 1;
        if (dietaryFiber >= 0.25) score += 1;
        if (sugarsPercent <= 0.06) score += 1;
        if (proteinPercent >= 0.15 && protein <= 0.2) score += 1;
        if (vitaminD) score += 1;
      }
    }

    return score;
  };

  useEffect(() => {
    const score = calculateHealthScore();
    setHealthScore(score);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Analysis Page</Text>
      <Text style={styles.healthScore}>Health Score: {healthScore}/10</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  healthScore: {
    fontSize: 18,
    marginTop: 20,
  },
});

export default AnalysisPage;
