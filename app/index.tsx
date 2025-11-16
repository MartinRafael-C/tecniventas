import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';

export default function Index() {
  useEffect(() => {
    // Simular carga inicial
    const timer = setTimeout(() => {
      router.replace('/auth/login');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="flex-1 bg-blue-600 justify-center items-center">
      <Text className="text-6xl mb-4">🛒</Text>
      <Text className="text-4xl font-bold text-white mb-8">
        TecniVentas
      </Text>
      <ActivityIndicator size="large" color="#FFFFFF" />
    </View>
  );
}