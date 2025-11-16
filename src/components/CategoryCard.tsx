import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';

interface CategoryCardProps {
  name: string;
  icon: string;
  onPress: () => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  name,
  icon,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-white rounded-2xl p-4 m-2 shadow-md items-center justify-center w-36 h-36"
    >
      <Text className="text-5xl mb-2">{icon}</Text>
      <Text className="text-sm font-semibold text-gray-800 text-center">
        {name}
      </Text>
    </TouchableOpacity>
  );
};