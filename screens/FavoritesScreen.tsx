// screens/FavoritesScreen.jsx
import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import ProductCard from '../components/ProductCard';

const FavoritesScreen = ({ favorites, onSelectProduct, onToggleFavorite }) => {
  if (favorites.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyEmoji}>💔</Text>
        <Text style={styles.emptyTitle}>No hay favoritos</Text>
        <Text style={styles.emptyText}>
          Explora nuestras categorías y agrega productos a tus favoritos
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <Text style={styles.title}>❤️ Mis Favoritos</Text>
        
        <View style={styles.grid}>
          {favorites.map((product) => (
            <View key={product.id} style={styles.gridItem}>
              <ProductCard
                product={product}
                onPress={() => onSelectProduct(product)}
                onFavorite={onToggleFavorite}
                isFavorite={true}
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
    marginBottom: 24,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '48%',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    backgroundColor: '#ffffff',
  },
  emptyEmoji: {
    fontSize: 80,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 12,
  },
  emptyText: {
    color: '#6b7280',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default FavoritesScreen;