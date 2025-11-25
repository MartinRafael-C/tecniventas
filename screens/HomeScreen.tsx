// screens/HomeScreen.jsx
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import SearchBar from '../components/SearchBar';
import CategoryCard from '../components/CategoryCard';

const HomeScreen = ({ onSelectCategory }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'electronics', name: '📱 Electrónicos', icon: '📱', color: '#667eea' },
    { id: 'appliances', name: '🏠 Electrodomésticos', icon: '🏠', color: '#f59e0b' },
    { id: 'food', name: '🍕 Comida', icon: '🍕', color: '#ef4444' },
    { id: 'books', name: '📚 Libros', icon: '📚', color: '#10b981' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <SearchBar 
          value={searchQuery} 
          onChangeText={setSearchQuery} 
        />

        <Text style={styles.title}>Categorías</Text>
        
        <View style={styles.grid}>
          {categories.map((category) => (
            <View key={category.id} style={styles.gridItem}>
              <CategoryCard
                category={category}
                onPress={() => onSelectCategory(category.id)}
              />
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    padding: 20,
    paddingBottom: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '48%',
    marginBottom: 20,
  },
});

export default HomeScreen;