// components/ProductCard.tsx
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import Card from './Card';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  weight: string;
  image?: string;
}

interface ProductCardProps {
  product: Product;
  onPress: () => void;
  onFavorite: (product: Product) => void;
  isFavorite: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onPress, onFavorite, isFavorite }) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Card style={styles.container}>
        <TouchableOpacity
          onPress={() => onFavorite(product)}
          style={[styles.favoriteButton, { backgroundColor: theme.card }]}
        >
          <Ionicons 
            name={isFavorite ? "heart" : "heart-outline"} 
            size={20} 
            color={isFavorite ? "#ef4444" : theme.textSecondary} 
          />
        </TouchableOpacity>
        
        {product.image && (
          <Image 
            source={{ uri: product.image }} 
            style={styles.image}
            resizeMode="cover"
          />
        )}
        
        <Text style={[styles.title, { color: theme.text }]} numberOfLines={2}>
          {product.name}
        </Text>
        <Text style={[styles.description, { color: theme.textSecondary }]} numberOfLines={2}>
          {product.description}
        </Text>
        
        <View style={styles.footer}>
          <Text style={[styles.price, { color: theme.primary }]}>
            ${product.price}
          </Text>
          {product.weight && (
            <Text style={[styles.weight, { color: theme.textSecondary }]}>
              {product.weight}
            </Text>
          )}
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    position: 'relative',
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    borderRadius: 18,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 8,
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  weight: {
    fontSize: 12,
  },
});

export default ProductCard;