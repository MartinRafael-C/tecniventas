import React from 'react';
import { TouchableOpacity, Text, Image, View } from 'react-native';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onPress: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-white rounded-xl shadow-md m-2 overflow-hidden w-44"
    >
      <Image
        source={{ uri: product.image || product.thumbnail }}
        className="w-full h-44"
        resizeMode="cover"
      />
      <View className="p-3">
        <Text className="font-bold text-base text-gray-900" numberOfLines={2}>
          {product.title}
        </Text>
        <Text className="text-lg font-bold text-blue-600 mt-1">
          ${product.price}
        </Text>
      </View>
    </TouchableOpacity>
  );
};