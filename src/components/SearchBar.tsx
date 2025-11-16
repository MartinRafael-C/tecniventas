import React from 'react';
import { View, TextInput } from 'react-native';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder = 'Buscar productos...',
}) => {
  return (
    <View className="bg-white rounded-xl shadow-sm mx-4 my-2">
      <TextInput
        className="px-4 py-3 text-base"
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
      />
    </View>
  );
};