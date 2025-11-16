import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { ProductCard } from '../src/components/ProductCard';
import { api } from '../src/services/api';
import { Product } from '../src/types';
import { Ionicons } from '@expo/vector-icons';

export default function CategoryListScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { category, search } = useLocalSearchParams<{
    category?: string;
    search?: string;
  }>();

  useEffect(() => {
    loadProducts();
  }, [category, search]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      let result: Product[] = [];
      if (search) {
        result = await api.searchProducts(search);
      } else if (category) {
        result = await api.getProductsByCategory(category);
      }
      setProducts(result);
    } catch (error) {
      console.error('Error cargando productos:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderProduct = ({ item }: { item: Product }) => (
    <View style={{ width: '50%' }}>
      <ProductCard
        product={item}
        onPress={() => router.push(`/product/${item.id}`)}
      />
    </View>
  );

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <View className="flex-row items-center p-4 bg-blue-600">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-white text-xl font-bold">
          {category || `Resultados para "${search}"`}
        </Text>
      </View>

      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={{ padding: 4 }}
        ListEmptyComponent={() => (
          <View className="flex-1 justify-center items-center mt-20">
            <Text className="text-gray-500 text-lg">No se encontraron productos.</Text>
          </View>
        )}
      />
    </View>
  );
}
