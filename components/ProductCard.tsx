// components/ProductCard.jsx
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Card from './Card';

const ProductCard = ({ product, onPress, onFavorite, isFavorite }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Card style={styles.container}>
        <TouchableOpacity
          onPress={() => onFavorite(product)}
          style={styles.favoriteButton}
        >
          <Text style={styles.favoriteIcon}>{isFavorite ? '❤️' : '🤍'}</Text>
        </TouchableOpacity>
        
        {product.image && (
          <Image 
            source={{ uri: product.image }} 
            style={styles.image}
            resizeMode="cover"
          />
        )}
        
        <Text style={styles.title} numberOfLines={2}>{product.name}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {product.description}
        </Text>
        
        <View style={styles.footer}>
          <Text style={styles.price}>${product.price}</Text>
          {product.weight && (
            <Text style={styles.weight}>{product.weight}</Text>
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
    backgroundColor: 'white',
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
  favoriteIcon: {
    fontSize: 20,
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
    color: '#1f2937',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#6b7280',
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
    color: '#667eea',
  },
  weight: {
    fontSize: 12,
    color: '#9ca3af',
  },
});

export default ProductCard;