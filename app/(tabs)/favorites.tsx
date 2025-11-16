import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { router } from 'expo-router';
import { ProductCard } from '../../src/components/ProductCard';
import { useFavoritesStore } from '../../src/stores/favoritesStore';

export default function FavoritesScreen() {
  const { favorites } = useFavoritesStore();

  if (favorites.length === 0) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <Text className="text-6xl mb-4">❤️</Text>
        <Text className="text-xl font-bold text-gray-800 mb-2">
          Sin favoritos aún
        </Text>
        <Text className="text-gray-600 text-center px-8">
          Agrega productos a tus favoritos para verlos aquí
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      <View className="bg-blue-600 pt-12 pb-4">
        <Text className="text-white text-3xl font-bold px-4">
          Mis Favoritos
        </Text>
      </View>
      <FlatList
        data={favorites}
        numColumns={2}
        contentContainerStyle={{ padding: 8 }}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() => router.push(`/product/${item.id}`)}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}