// components/Button.jsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Button = ({ children, onPress, variant = 'primary', style = {}, disabled = false }) => {
  const buttonStyle = [
    styles.base,
    styles[variant],
    disabled && styles.disabled,
    style,
  ];

  const textStyle = [
    styles.text,
    variant === 'secondary' && styles.textSecondary,
  ];

  return (
    <TouchableOpacity 
      style={buttonStyle} 
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={textStyle}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: '#667eea',
  },
  secondary: {
    backgroundColor: '#f3f4f6',
  },
  danger: {
    backgroundColor: '#ef4444',
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  textSecondary: {
    color: '#374151',
  },
});

export default Button;