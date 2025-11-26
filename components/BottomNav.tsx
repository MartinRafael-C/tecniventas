// components/BottomNav.tsx
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const { theme } = useTheme();
  
  const tabs = [
    { id: 'home', label: 'Inicio', icon: 'home' as const },
    { id: 'favorites', label: 'Favoritos', icon: 'heart' as const },
    { id: 'ai', label: 'IA', icon: 'sparkles' as const },
    { id: 'settings', label: 'Ajustes', icon: 'settings' as const },
  ];

  return (
    <View style={[styles.container, { 
      backgroundColor: theme.surface,
      borderTopColor: theme.border,
    }]}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const scaleAnim = new Animated.Value(1);

        const handlePressIn = () => {
          Animated.spring(scaleAnim, {
            toValue: 0.9,
            useNativeDriver: true,
          }).start();
        };

        const handlePressOut = () => {
          Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 3,
            useNativeDriver: true,
          }).start();
        };

        return (
          <Animated.View key={tab.id} style={{ transform: [{ scale: scaleAnim }] }}>
            <TouchableOpacity
              onPress={() => onTabChange(tab.id)}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              style={styles.tab}
              activeOpacity={0.7}
            >
              <Ionicons 
                name={isActive ? tab.icon : `${tab.icon}-outline` as any}
                size={24} 
                color={isActive ? theme.primary : theme.textSecondary}
              />
              <Text style={[
                styles.label,
                { color: isActive ? theme.primary : theme.textSecondary }
              ]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    paddingBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 4,
  },
});

export default BottomNav;