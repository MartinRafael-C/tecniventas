// components/ScreenContainer.jsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const ScreenContainer = ({ children, style = {} }) => {
  return (
    <LinearGradient
      colors={['#667eea', '#764ba2']}
      style={[styles.container, style]}
    >
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ScreenContainer;