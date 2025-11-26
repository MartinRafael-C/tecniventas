// screens/HomeScreen.tsx
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import SearchBar from '../components/SearchBar';
import CategoryCard from '../components/CategoryCard';

interface HomeScreenProps {
  onSelectCategory: (categoryId: string) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onSelectCategory }) => {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'electronics', name: 'Electrónicos', icon: '📱', color: '#667eea' },
    { id: 'appliances', name: 'Electrodomésticos', icon: '🏠', color: '#f59e0b' },
    { id: 'food', name: 'Comida', icon: '🍕', color: '#ef4444' },
    { id: 'books', name: 'Libros', icon: '📚', color: '#10b981' },
  ];

  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.background }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.content}>
        <SearchBar 
          value={searchQuery} 
          onChangeText={setSearchQuery} 
        />

        <Text style={[styles.title, { color: theme.text }]}>
          {searchQuery ? 'Resultados de búsqueda' : 'Categorías'}
        </Text>
        
        {filteredCategories.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
              No se encontraron categorías
            </Text>
          </View>
        ) : (
          <View style={styles.grid}>
            {filteredCategories.map((category) => (
              <View key={category.id} style={styles.gridItem}>
                <CategoryCard
                  category={category}
                  onPress={() => onSelectCategory(category.id)}
                />
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
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
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default HomeScreen;