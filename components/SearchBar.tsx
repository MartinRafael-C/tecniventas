// components/SearchBar.jsx
import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

const SearchBar = ({ value, onChangeText, placeholder = "Buscar productos..." }) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        <Text style={styles.icon}>🔍</Text>
        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          style={styles.input}
          placeholderTextColor="#9ca3af"
        />
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
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  icon: {
    fontSize: 20,
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#1f2937',
  },
});

export default SearchBar;