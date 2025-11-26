// components/SearchBar.tsx
import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  value, 
  onChangeText, 
  placeholder = "Buscar productos..." 
}) => {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <View style={[styles.searchBox, { 
        backgroundColor: theme.card,
        borderColor: theme.border,
      }]}>
        <Ionicons name="search" size={20} color={theme.textSecondary} />
        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          style={[styles.input, { color: theme.text }]}
          placeholderTextColor={theme.textSecondary}
        />
        {value.length > 0 && (
          <Ionicons 
            name="close-circle" 
            size={20} 
            color={theme.textSecondary}
            onPress={() => onChangeText('')}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 10,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
});

export default SearchBar;