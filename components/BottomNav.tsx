// components/BottomNav.jsx
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const BottomNav = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'home', label: 'Inicio', icon: '🏠' },
    { id: 'favorites', label: 'Favoritos', icon: '❤️' },
    { id: 'ai', label: 'IA', icon: '⭐' },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          onPress={() => onTabChange(tab.id)}
          style={styles.tab}
          activeOpacity={0.7}
        >
          <Text style={styles.icon}>{tab.icon}</Text>
          <Text style={[
            styles.label,
            activeTab === tab.id && styles.activeLabel
          ]}>
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 5,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 24,
    marginBottom: 4,
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
    color: '#9ca3af',
  },
  activeLabel: {
    color: '#667eea',
  },
});

export default BottomNav;