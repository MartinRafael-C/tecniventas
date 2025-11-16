import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { router } from 'expo-router';
import { SearchBar } from '../../src/components/SearchBar';
import { CategoryCard } from '../../src/components/CategoryCard';
import { api, categoryConfig } from '../../src/services/api';

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const cats = await api.getCategories();
      setCategories(cats);
    } catch (error) {
      console.error('Error cargando categorías:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push({
        pathname: "/category-list",
        params: { search: searchQuery }
      });
    }
  };

  const handleCategoryPress = (category: string) => {
    router.push({
      pathname: "/category-list",
      params: { category }
    });
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      <View className="bg-blue-600 pt-12 pb-4">
        <Text className="text-white text-3xl font-bold px-4 mb-4">
          TecniVentas
        </Text>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
        />
      </View>

      <ScrollView>
        <Text className="text-2xl font-bold text-gray-800 px-4 mt-6 mb-4">
          Categorías
        </Text>

        <FlatList
          data={categories}
          numColumns={2}
          scrollEnabled={false}
          contentContainerStyle={{ paddingHorizontal: 8 }}
          renderItem={({ item }) => {
            const config = categoryConfig[item] || {
              name: item,
              icon: "📦",
            };

            return (
              <CategoryCard
                name={config.name}
                icon={config.icon}
                onPress={() => handleCategoryPress(item)}
              />
            );
          }}
          keyExtractor={(item) => item}
        />
      </ScrollView>
    </View>
  );
}
