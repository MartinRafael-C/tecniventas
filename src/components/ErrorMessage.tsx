import React from 'react';
import { View, Text } from 'react-native';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <View className="flex-1 justify-center items-center p-4">
      <Text className="text-6xl mb-4">😞</Text>
      <Text className="text-xl font-bold text-gray-800 mb-2">
        Elemento no disponible
      </Text>
      <Text className="text-gray-600 text-center">{message}</Text>
    </View>
  );
};