import { Routes } from '@/routes';
import React from 'react';
import './global.css';
import { useAppFonts } from './src/theme/fonts';
import { View, ActivityIndicator } from 'react-native';
import { colors } from './src/theme/colors';
export default function App() {
  const fontsLoaded = useAppFonts();

  if (!fontsLoaded) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color={colors.blue} />
      </View>
    );
  }

  return (
    <Routes />
  );
}
