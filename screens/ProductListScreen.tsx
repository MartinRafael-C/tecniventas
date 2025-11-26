// screens/ProductListScreen.jsx
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import ProductCard from '../components/ProductCard';
import { fetchProductsByCategory } from '../services/apiService';

const ProductListScreen = ({ category, onSelectProduct, favorites, onToggleFavorite }) => {
  const { theme } = useTheme();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, [category]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await fetchProductsByCategory(category);
      setProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const categoryNames = {
    electronics: '📱 Electrónicos',
    appliances: '🏠 Electrodomésticos',
    food: '🍕 Comida',
    books: '📚 Libros',
  };

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: theme.background }]}>
        <Text style={styles.loadingEmoji}>⏳</Text>
        <ActivityIndicator size="large" color={theme.primary} />
        <Text style={[styles.loadingText, { color: theme.textSecondary }]}>Cargando productos...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.text }]}>{categoryNames[category]}</Text>
        
        <View style={styles.grid}>
          {products.map((product) => (
            <View key={product.id} style={styles.gridItem}>
              <ProductCard
                product={product}
                onPress={() => onSelectProduct(product)}
                onFavorite={onToggleFavorite}
                isFavorite={favorites.some(f => f.id === product.id)}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  loadingText: {
    color: '#6b7280',
    fontSize: 18,
    marginTop: 12,
  },
});

export default ProductListScreen;