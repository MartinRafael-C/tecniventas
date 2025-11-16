import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { api } from '../src/services/api';
import { Product } from '../src/types';
import { useFavoritesStore } from '../src/stores/favoritesStore';

export default function ProductDetailScreen() {
  const params = useLocalSearchParams();
  const { id } = params;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();
  const favorite = product ? isFavorite(product.id) : false;

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      const result = await api.getProductById(Number(id));
      setProduct(result);
    } catch (error) {
      console.error('Error cargando producto:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = () => {
    if (!product) return;
    if (favorite) {
      removeFavorite(product.id);
    } else {
      addFavorite(product);
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
        <Text className="text-xl text-gray-600">Producto no encontrado</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white">
      <Image
        source={{ uri: product.image || product.thumbnail }}
        className="w-full h-96"
        resizeMode="contain"
      />

      <View className="p-6">
        <View className="flex-row justify-between items-start mb-4">
          <Text className="text-2xl font-bold text-gray-900 flex-1">
            {product.title}
          </Text>
          <TouchableOpacity
            onPress={toggleFavorite}
            className="ml-4 bg-gray-100 rounded-full p-3"
          >
            <Text className="text-2xl">{favorite ? '❤️' : '🤍'}</Text>
          </TouchableOpacity>
        </View>

        <Text className="text-3xl font-bold text-blue-600 mb-4">
          ${product.price}
        </Text>

        <View className="bg-gray-100 rounded-xl p-4 mb-4">
          <Text className="text-gray-600 font-semibold mb-1">Categoría:</Text>
          <Text className="text-gray-900 text-lg">{product.category}</Text>
        </View>

        {product.weight && (
          <View className="bg-gray-100 rounded-xl p-4 mb-4">
            <Text className="text-gray-600 font-semibold mb-1">Peso:</Text>
            <Text className="text-gray-900 text-lg">{product.weight} kg</Text>
          </View>
        )}

        <Text className="text-xl font-bold text-gray-800 mb-2">
          Descripción
        </Text>
        <Text className="text-gray-600 text-base leading-6">
          {product.description}
        </Text>

        <TouchableOpacity className="bg-blue-600 rounded-xl py-4 mt-6">
          <Text className="text-white text-center font-bold text-lg">
            Agregar al Carrito
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}