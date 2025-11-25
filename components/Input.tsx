// components/Input.jsx
import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const Input = ({ label, error, ...props }) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        {...props}
        style={[styles.input, error && styles.inputError]}
        placeholderTextColor="#9ca3af"
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: '100%',
  },
  label: {
    marginBottom: 8,
    color: '#374151',
    fontWeight: '500',
    fontSize: 14,
  },
  input: {
    width: '100%',
    padding: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    fontSize: 16,
    backgroundColor: 'white',
  },
  inputError: {
    borderColor: '#ef4444',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 12,
    marginTop: 4,
  },
});

export default Input;