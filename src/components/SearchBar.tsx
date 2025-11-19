import React from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledText = styled(Text);

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onSearch: () => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  onSearch,
  placeholder = 'Buscar productos...',
}) => {
  return (
    <StyledView className="flex-row gap-2">
      <StyledTextInput
        className="flex-1 px-4 py-3 bg-white rounded-xl text-gray-800"
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        onSubmitEditing={onSearch}
        returnKeyType="search"
      />
      <StyledTouchableOpacity
        onPress={onSearch}
        className="bg-white px-6 py-3 rounded-xl items-center justify-center"
      >
        <StyledText className="text-xl">🔍</StyledText>
      </StyledTouchableOpacity>
    </StyledView>
  );
};