import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { api } from '../../src/services/api';
import { Product } from '../../src/types';
import { Ionicons } from '@expo/vector-icons';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadProductDetails();
    }
  }, [id]);

  const loadProductDetails = async () => {
    setLoading(true);
    try {
      const productData = await api.getProductById(Number(id));
      setProduct(productData);
    } catch (error) {
      console.error('Error cargando detalles del producto:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  if (!product) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Producto no encontrado.</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <View className="flex-row items-center p-4 bg-blue-600 absolute top-0 left-0 right-0 z-10">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-white text-xl font-bold">{product.title}</Text>
      </View>
      <ScrollView contentContainerStyle={{ paddingTop: 80 }}>
        <Image
          source={{ uri: product.thumbnail }}
          className="w-full h-80"
          resizeMode="cover"
        />
        <View className="p-4">
          <Text className="text-2xl font-bold mb-2">{product.title}</Text>
          <Text className="text-lg text-gray-700 mb-2">${product.price}</Text>
          <Text className="text-base text-gray-600 mb-4">
            {product.description}
          </Text>
          <View className="flex-row justify-between items-center">
            <Text className="text-yellow-500 text-lg">
              Rating: {product.rating} / 5
            </Text>
            <Text className="text-gray-500">In Stock: {product.stock}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
