// screens/ProductDetailScreen.jsx
import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import Card from '../components/Card';
import Button from '../components/Button';

const ProductDetailScreen = ({ product, onBack }) => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backText}>← Volver</Text>
        </TouchableOpacity>
        
        <Card>
          {product.image && (
            <Image
              source={{ uri: product.image }}
              style={styles.image}
              resizeMode="cover"
            />
          )}
          
          <Text style={styles.title}>{product.name}</Text>
          
          <View style={styles.infoContainer}>
            <View style={styles.infoBox}>
              <Text style={styles.infoLabel}>Precio</Text>
              <Text style={styles.price}>${product.price}</Text>
            </View>
            
            <View style={styles.infoBox}>
              <Text style={styles.infoLabel}>Peso</Text>
              <Text style={styles.weight}>{product.weight}</Text>
            </View>
          </View>
          
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionTitle}>Descripción</Text>
            <Text style={styles.description}>{product.description}</Text>
          </View>
          
          <Button style={styles.addButton}>
            🛒 Agregar al Carrito
          </Button>
        </Card>
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
  backButton: {
    backgroundColor: '#f3f4f6',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  backText: {
    fontSize: 16,
    color: '#374151',
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 12,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  infoContainer: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 20,
  },
  infoBox: {
    flex: 1,
  },
  infoLabel: {
    color: '#6b7280',
    fontSize: 14,
    marginBottom: 4,
  },
  price: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#667eea',
  },
  weight: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
  },
  descriptionContainer: {
    marginBottom: 20,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 12,
  },
  description: {
    color: '#6b7280',
    lineHeight: 24,
    fontSize: 16,
  },
  addButton: {
    width: '100%',
  },
});

export default ProductDetailScreen;